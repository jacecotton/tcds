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
  #stateSettings;
  #propSettings;

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

    // Manually schedule an update if the component has been connected but
    // doesn't have any state or props (which would trigger an update).
    this.isConnected
      && Object.keys(this.state).length === 0
      && Object.keys(this.props).length === 0
      && this.dispatchEvent(new CustomEvent("update"));
  }

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
      const { name, value } = attribute;
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
        const isValidType = !type || typeChecker(value, type);

        if(store[state] === value || !isValidType) {
          return true;
        }

        const oldValue = store[state];
        store[state] = value;

        this.dispatchEvent(new CustomEvent("update", {
          bubbles: true,
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
        const type = this.#propSettings[prop]?.["type"];
        let attribute = this.getAttribute(prop);

        if(type !== Boolean && attribute === null) {
          return true;
        }

        if(type) {
          attribute = typeConverter(attribute, type);
          value = typeConverter(value, type);
        }

        const outOfSync = type !== Array
          ? (attribute !== value)
          : (attribute.slice().sort().join() !== value.slice().sort().join());

        if(!outOfSync) {
          const oldValue = props[prop];
          props[prop] = value;

          this.dispatchEvent(new CustomEvent("update", {
            bubbles: true,
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
    Object.keys(this.#stateSettings).filter((state) => {
      return "default" in this.#stateSettings[state];
    }).forEach((state) => {
      if(this.state[state] === undefined) {
        this.state[state] = this.#stateSettings[state]["default"];
      }
    });

    Object.keys(this.#propSettings).forEach((prop) => {
      const { type, default: defaultValue } = this.#propSettings[prop];

      if(this.getAttribute(prop) !== null) {
        return;
      }

      if(type === Boolean) {
        this.toggleAttribute(prop, defaultValue === true);
        this.props[prop] = defaultValue === true;
      } else if(defaultValue) {
        this.setAttribute(prop, defaultValue);
      }
    });
  }

  #renderPasses = 0;
  #batch = {state: {}, props: {}};
  #debounce = null;

  #batchUpdates(event) {
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

    // animationFrame-based heuristic to batch back-to-back `update` calls.
    if(this.#debounce !== null) {
      cancelAnimationFrame(this.#debounce);
    }

    this.#debounce = requestAnimationFrame(this.#update.bind(this));
  }

  #update() {
    this.#debounce = null;
    const batch = Object.assign({}, this.#batch);

    if(batch.state && batch.state.newState) {
      const reflectedState = Object.keys(batch.state.newState)
        .filter(state => this.#stateSettings?.[state]?.["reflected"]);
      reflectedState.length > 0 && this.#reflectState(reflectedState);
    }

    this.#render();

    if(this.#renderPasses < 1) {
      const childComponentsAreDefined = [...this.shadowRoot.querySelectorAll(":not(:defined)")]
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
    stateKeys.forEach((state) => {
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

function typeConverter(value, type) {
  return typeChecker(value, type) ? value : {
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

function typeChecker(value, type) {
  return {
    [Array]: Array.isArray(value),
    [Boolean]: typeof value === "boolean",
    [Number]: typeof value === "number",
    [String]: typeof value === "string",
  }[type];
}

export default WebComponent;
