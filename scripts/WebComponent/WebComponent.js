import diff from "./diff.js";
import {globalAttributesFull, globalAttributesPartial} from "./globalAttributeList.js";
import {typeChecker, typeConverter} from "./typeUtils.js";

/**
 * A base class for creating native Web Components. Documentation at
 * https://github.com/jacecotton/tcds/tree/main/scripts/WebComponent
 *
 * @todo Add a `required` option to props and state.
 * @todo Filter global attributes at point of state reflection too.
 *
 * @param {Element} [BaseElement=HTMLElement] - The HTML element interface to
 *   extend. `HTMLElement` if an autonomous custom element, something else if a
 *   customized built-in (not recommended).
 * @param {object} options - `attachShadow` settings. Useful to set `mode` to
 *   `closed` if desired (default is `open`), or things like `delegatesFocus`
 *   for buttons and other inputs.
 */

const WebComponent = (BaseElement = HTMLElement, options = {}) => class extends BaseElement {
  constructor() {
    super();
    this.attachShadow({mode: "open", ...options});

    // Grab a copy of child class-defined `state` and `props` objects to use
    // as settings (type, default, reflected, etc.)
    this.#stateSettings = this.constructor.state || {};
    this.#propSettings = this.constructor.props || {};

    // Reset `state` and `props` to empty objects, then intercept any updates
    // to them from the child class, validate the changes, and fire "update"
    // events.
    this.state = new Proxy({}, this.#stateHandler());
    this.props = new Proxy({}, this.#propsHandler());

    // Listen to those updates and collect a batch of them.
    this.addEventListener("update", this.#batchUpdates.bind(this));

    // Populate props and state from attributes, observe further attribute
    // changes and update respective props and state.
    this.#attributeHandler([...this.attributes]);
    this.#attributeObserver.observe(this, {attributes: true});

    // Populate `state` and `props` with child class-provided defaults, if
    // applicable.
    this.#populateDefaults();

    // Manually schedule an update if the component has been connected but
    // doesn't have any state or props (which would trigger an update).
    this.isConnected
      && Object.keys(this.state).length === 0
      && Object.keys(this.props).length === 0
      && this.dispatchEvent(new CustomEvent("update"));
  }

  #stateSettings;
  #propSettings;
  #renderPasses = 0;
  #batch = {state: {}, props: {}};
  #debounce = null;
  #baseStyles = this.constructor.baseStyles
    || document.querySelector("link[title=tcds]")?.href
    || "https://unpkg.com/@txch/tcds/dist/tcds.css";

  disconnectedCallback() {
    this.#attributeObserver.disconnect();
  }

  get #attributeObserver() {
    return new MutationObserver((mutations) => {
      this.#attributeHandler(
        [...mutations].map(({attributeName}) => ({
          name: attributeName,
          value: this.getAttribute(attributeName),
        }))
      );
    });
  }

  #attributeHandler(attributes) {
    attributes.filter((attribute) => {
      return !globalAttributesFull.includes(attribute.name.toLowerCase())
        && !globalAttributesPartial.some(global => attribute.name.toLowerCase().includes(global));
    }).forEach((attribute) => {
      const {name, value} = attribute;
      const isState = this.#stateSettings[name]?.["reflected"];
      const settings = isState ? this.#stateSettings : this.#propSettings;
      const data = isState ? this.state : this.props;
      const type = settings[name]?.["type"];

      data[name] = type ? typeConverter(value, type) : value;
    });
  }

  #stateHandler() {
    return {
      set: (store, state, value) => {
        const type = this.#stateSettings[state]?.["type"];
        const isInvalidType = type && !typeChecker(value, type);

        const isSame = type !== Array
          ? (store[state] === value)
          : (store[state]?.slice().sort().join() === value.slice().sort().join());

        if(isSame || isInvalidType) {
          return true;
        }

        const oldValue = store[state];
        store[state] = value;

        this.dispatchEvent(new CustomEvent("update", {
          detail: {
            state: {
              oldState: {[state]: oldValue},
              newState: {[state]: value},
            },
          },
        }));

        return true;
      },

      // Manipulations of object or array properties (via `split`, `push`, etc.)
      // will not trigger the `set` handler, as the value is being mutated but
      // not redeclared. So we have to proxy the child property, initializing it
      // to its current value and handling it with the above `set` method.
      get: (store, state) => {
        if(state === "_isProxy") {
          return true;
        }

        const isObject = ["object", "array"].includes(
          Object.prototype.toString.call(store[state]).slice(8, -1).toLowerCase()
        );

        if(isObject && !store[state]._isProxy) {
          store[state] = new Proxy(store[state], this.#stateHandler());
        }

        return store[state];
      },
    };
  }

  #propsHandler() {
    return {
      set: (props, prop, value) => {
        const type = this.#propSettings[prop]?.["type"];
        let attribute = this.getAttribute(prop);

        if(type !== Boolean && attribute === null) {
          return true;
        }

        if(type) {
          attribute = typeConverter(attribute, type);
          value = typeConverter(value, type);
        }

        const isSame = type !== Array
          ? (props[prop] === value)
          : (props[prop]?.slice().sort().join() === value.slice().sort().join());

        const isOutOfSync = type !== Array
          ? (attribute !== value)
          : (attribute.slice().sort().join() !== value.slice().sort().join());

        if(isSame || isOutOfSync) {
          return true;
        }

        const oldValue = props[prop];
        props[prop] = value;

        this.dispatchEvent(new CustomEvent("update", {
          detail: {
            props: {
              oldProps: {[prop]: oldValue},
              newProps: {[prop]: value},
            },
          },
        }));

        return true;
      },
    };
  }

  #populateDefaults() {
    Object.keys(this.#stateSettings).forEach((state) => {
      const {type, default: defaultValue} = this.#stateSettings[state];

      if(this.state[state] !== undefined) {
        return;
      }

      if(type === Boolean) {
        // If boolean, anything other than an explicit default value of `true`
        // should be inferred as `false` (meaning `defaultValue` can be left
        // undefined).
        this.state[state] = defaultValue === true;
      } else if(defaultValue !== undefined) {
        this.state[state] = defaultValue;
      }
    });

    Object.keys(this.#propSettings).forEach((prop) => {
      const {type, default: defaultValue} = this.#propSettings[prop];

      if(this.getAttribute(prop) !== null) {
        return;
      }

      if(type === Boolean) {
        this.toggleAttribute(prop, defaultValue === true);
        // Toggling an attribute "off" that was already absent won't trigger the
        // observer and cause a `props` update, so we have to do it directly
        // here as well.
        this.props[prop] = defaultValue === true;
      } else if(defaultValue !== undefined) {
        this.setAttribute(prop, defaultValue);
      }
    });
  }

  #batchUpdates(event) {
    if(event.detail?.state) {
      const {newState, oldState} = event.detail.state;
      this.#batch.state.newState = {...this.#batch.state.newState, ...newState};
      this.#batch.state.oldState = {...this.#batch.state.oldState, ...oldState};
    }

    if(event.detail?.props) {
      const {newProps, oldProps} = event.detail.props;
      this.#batch.props.newProps = {...this.#batch.props.newProps, ...newProps};
      this.#batch.props.oldProps = {...this.#batch.props.oldProps, ...oldProps};
    }

    // animationFrame-based heuristic to batch back-to-back `update` calls.
    if(this.#debounce !== null) {
      cancelAnimationFrame(this.#debounce);
    }

    this.#debounce = requestAnimationFrame(this.#update.bind(this));
  }

  #update() {
    // Grab copy of state and prop update batch before emptying.
    const {state, props} = Object.assign({}, this.#batch);

    this.#batch = {state: {}, props: {}};
    this.#debounce = null;

    // External stylesheets cannot be adopted programmatically, so insert here
    // with link. The browser should recognize it does not have to download the
    // file again, so this serves only to associate the base TCDS styles with
    // all component shadow roots.
    diff(`
      <style id="tcds">@import url(${this.#baseStyles})</style>
      ${this.render?.()}
    `, this.shadowRoot);

    const stateToReflect = Object.keys(state?.newState || {})
      .filter(state => this.#stateSettings?.[state]?.["reflected"]);
    stateToReflect.length && this.#reflectState(stateToReflect);

    this.#renderPasses++;

    if(this.#renderPasses === 1) {
      const childComponentsAreDefined = [...this.shadowRoot.querySelectorAll(":not(:defined)")]
        .map(child => customElements.whenDefined(child.localName));

      Promise.all(childComponentsAreDefined).then(() => {
        this.dispatchEvent(new Event("mount"));
        this.mountedCallback?.();
        this.updatedCallback?.(state, props);
      }).catch((error) => {
        console.error("Child components are not defined.", error);
      });
    } else {
      this.updatedCallback?.(state, props);
    }
  }

  #reflectState(stateToReflect) {
    stateToReflect.forEach((state) => {
      let value = this.state[state];
      let attribute = this.getAttribute(state);

      if(typeof value === "boolean") {
        attribute = typeConverter(attribute, Boolean);

        if(attribute !== value) {
          this.toggleAttribute(state, value);
        }
      } else {
        value = typeConverter(value, String);

        if(attribute !== value) {
          this.setAttribute(state, value);
        }
      }
    });
  }

  parts = new Proxy({}, {
    get: (parts, part) => {
      if(!parts[part]) {
        const query = this.shadowRoot.querySelectorAll(`[part~=${part}]`);
        const value = query.length > 1 ? Array.from(query) : query[0];

        if(value) {
          parts[part] = value;
        }
      }

      return parts[part];
    },
  });
};

customElements.define("static-slot", class StaticSlot extends HTMLElement {/* noop */});

export default WebComponent;
