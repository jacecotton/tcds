import diff from "./diff.js";

/**
 * A base class for creating native Web Components. Documentation at
 * https://github.com/jacecotton/tcds/tree/main/scripts/WebComponent
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
    this.attachShadow({ mode: "open", ...options });

    this.#stateSettings = this.constructor.state || {};
    this.#propSettings = this.constructor.props || {};

    this.state = new Proxy({}, this.#stateHandler());
    this.props = new Proxy({}, this.#propsHandler());

    this.addEventListener("update", this.#batchUpdates.bind(this));

    this.#attributeHandler([...this.attributes]);
    this.#attributeObserver.observe(this, { attributes: true });

    this.#populateDefaults();

    /**
     * Manually schedule an update if the component has been connected but
     * doesn't have any state or props (which would trigger an update).
     */
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

  disconnectedCallback() {
    this.#attributeObserver.disconnect();
  }

  get #attributeObserver() {
    return new MutationObserver((mutations) => {
      this.#attributeHandler(
        [...mutations].map(({ attributeName }) => ({
          name: attributeName,
          value: this.getAttribute(attributeName),
        }))
      );
    });
  }

  #attributeHandler(attributes) {
    attributes.forEach((attribute) => {
      const reflectedState = attribute.name in this.#stateSettings && this.#stateSettings[attribute.name]["reflected"];
      const settings = reflectedState ? this.#stateSettings : this.#propSettings;
      const data = reflectedState ? this.state : this.props;
      const type = settings[attribute.name]?.type;

      data[attribute.name] = type ? this.#typeConverter(attribute.value, type) : attribute.value;
    });
  }

  #stateHandler() {
    return {
      set: (store, state, value) => {
        const type = this.#stateSettings[state]?.type;
        const isValidType = !type || this.#typeChecker(value, type);

        if(store[state] === value || !isValidType) {
          return true;
        }

        const reflected = this.#stateSettings[state]?.reflected;
        let attribute = reflected && this.getAttribute(state);

        if(attribute && type) {
          attribute = this.#typeConverter(attribute, type);
        }

        if(reflected && attribute !== value) {
          if(type === Boolean) {
            this.toggleAttribute(state, value);
          } else {
            this.setAttribute(state, this.#typeConverter(value, String));
          }
        }

        const oldValue = store[state];
        store[state] = value;

        this.dispatchEvent(new CustomEvent("update", {
          bubbles: true,
          cancelable: true,
          detail: {
            state: {
              oldState: { [state]: oldValue },
              newState: { [state]: value },
            },
          },
        }));

        return true;
      },

      get: (store, state) => {
        if(state === "_isProxy") {
          return true;
        }

        if(["object", "array"].includes(Object.prototype.toString.call(store[state]).slice(8, -1).toLowerCase()) && !store[state]._isProxy) {
          store[state] = new Proxy(store[state], this.#stateHandler());
        }

        return store[state];
      },
    };
  }

  #propsHandler() {
    return {
      set: (props, prop, value) => {
        const type = this.#propSettings[prop]?.type;
        let attribute = this.getAttribute(prop);

        if(type !== Boolean && attribute === null) {
          return true;
        }

        if(type) {
          attribute = this.#typeConverter(attribute, type);
          value = this.#typeConverter(value, type);
        }

        const outOfSync = type !== Array
          ? (attribute !== value)
          : (attribute.slice().sort().join() !== value.slice().sort().join());

        if(!outOfSync) {
          const oldValue = props[prop];
          props[prop] = value;

          this.dispatchEvent(new CustomEvent("update", {
            bubbles: true,
            cancelable: true,
            detail: {
              props: {
                oldProps: { [prop]: oldValue },
                newProps: { [prop]: value },
              },
            },
          }));
        }

        return true;
      },
    };
  }

  #populateDefaults() {
    const defaultState = Object.keys(this.#stateSettings).filter(state => "default" in this.#stateSettings[state]);

    defaultState.forEach((state) => {
      if(this.state[state] === undefined) {
        this.state[state] = this.#stateSettings[state]["default"];
      }
    });

    Object.keys(this.#propSettings).forEach((prop) => {
      const { type, default: defaultValue } = this.#propSettings[prop];

      // If an attribute for this prop is already present, we should not
      // populate the prop with the default value.
      if(this.getAttribute(prop) !== null) {
        return;
      }

      // Populate the `props` store with default values by setting the
      // attributes and triggering the mutation observer which will update the
      // `props` store from there. We can't mutate `props` directly because the
      // proxy enforces one-way synchronization (DOM to `props`).
      if(type === Boolean) {
        if(defaultValue === true) {
          this.toggleAttribute(prop, true);
        } else {
          // We can't just toggle the attribute "off" here, because if the
          // attribute is not present then the mutation observer will not be
          // triggered and the `props` store will not update with the default
          // value. So we have to set it directly. The proxy will allow this
          // because a `false` value is congruent with the DOM if the attribute
          // is absent.
          this.props[prop] = false;
        }
      } else if(defaultValue) {
        this.setAttribute(prop, defaultValue);
      }
    });
  }

  #batchUpdates(event) {
    // Add incoming state and props to existing batch (or start a new one).
    if(event.detail?.state) {
      const { newState, oldState } = event.detail.state;
      this.#batch.state.newState = {...this.#batch.state.newState, ...newState};
      this.#batch.state.oldState = {...this.#batch.state.oldState, ...oldState};
    }

    if(event.detail?.props) {
      const { newProps, oldProps } = event.detail.props;
      this.#batch.props.newProps = {...this.#batch.props.newProps, ...newProps};
      this.#batch.props.oldProps = {...this.#batch.props.oldProps, ...oldProps};
    }

    // Here we wait for back-to-back `update` events to be batched before
    // calling our `#update` method (debouncing). To do this, we utilize an
    // animation frame-based heuristic: the following animation frame request is
    // canceled if this method, `#batchUpdates`, is called again before the next
    // available animation frame (indicating multiple `update` event firings
    // within a single animation frame). If the previous request is canceled, we
    // try again with a new request. If that request is uninterrupted, it will
    // finally call `#update`, which will in turn reset `#debounce` to `null` and
    // empty the `#batch` object, indicating completion.
    if(this.#debounce !== null) {
      cancelAnimationFrame(this.#debounce);
    }

    this.#debounce = requestAnimationFrame(this.#update.bind(this));
  }

  #update() {
    this.#debounce = null;
    const batch = Object.assign({}, this.#batch);

    // Updates the host (outer) DOM.
    if(batch.state && batch.state.newState) {
      const reflectedState = Object.keys(batch.state.newState)
        .filter(state => this.#stateSettings?.[state]?.["reflected"]);
      reflectedState.length > 0 && this.#reflectState(reflectedState);
    }

    // Updates the shadow (inner) DOM.
    this.#render();

    if(this.#renderPasses < 1) {
      // The component will have mounted after the first render pass and all
      // child components have connected.
      const childComponentsAreDefined = Array.from(this.shadowRoot.querySelectorAll(":not(:defined)"))
        .map(child => customElements.whenDefined(child.localName));

      Promise.all(childComponentsAreDefined).then(() => {
        this.mountedCallback?.();
        this.#updateCallbacks(batch);
      }).catch(error => console.log(error));
    } else {
      this.#updateCallbacks(batch);
    }

    this.#renderPasses++;
    this.#batch = {state: {}, props: {}};
  }

  #reflectState(stateKeys) {
    // Note, by now the new `state` value has already been validated by the
    // proxy, so we can work from here assuming it's of the correct type.
    stateKeys.forEach((state) => {
      let value = this.state[state];
      let attribute = this.getAttribute(state);

      if(typeof value === "boolean") {
        attribute = this.#typeConverter(attribute, Boolean);

        if(attribute !== value) {
          this.toggleAttribute(state, value);
        }
      } else {
        value = this.#typeConverter(value, String);

        if(attribute !== value) {
          this.setAttribute(state, value);
        }
      }
    });
  }

  #render() {
    const baseStyles = Array.from(document.styleSheets).find(sheet => sheet.title === "tcds")?.href
      || "https://unpkg.com/@txch/tcds/dist/tcds.css";

    diff(`
      <style id="tcds">@import url("${baseStyles}")</style>
      ${this.render?.()}
    `, this.shadowRoot);
  }

  #updateCallbacks(batch) {
    const { state, props } = batch;
    const updateCallbacks = this.updatedCallback?.(state, props) || {};

    if("state" in updateCallbacks) {
      for(let key in updateCallbacks.state) {
        if(state.newState && key in state.newState) {
          updateCallbacks.state[key]();
        }
      }
    }

    if("props" in updateCallbacks) {
      for(let key in updateCallbacks.props) {
        if(props.newProps && key in props.newProps) {
          updateCallbacks.props[key]();
        }
      }
    }
  }

  #typeConverter(value, type) {
    return this.#typeChecker(value, type) ? value : {
      [Array]: typeof value === "string"
        ? value.trim().replace(/\s\s+/g, " ").split(" ")
        : [value].flat(),
      [Boolean]: !["false", "0", 0, null, undefined].includes(value),
      [Number]: Number(value),
      [String]: Array.isArray(value)
        ? value.join(" ")
        : String(value),
    }[type];
  }

  #typeChecker(value, type) {
    return {
      [Array]: Array.isArray(value),
      [Boolean]: typeof value === "boolean",
      [Number]: typeof value === "number",
      [String]: typeof value === "string",
    }[type];
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

export default WebComponent;
