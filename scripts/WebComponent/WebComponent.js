import diff from "./utilities/diff.js";
import getAttributeValueOfType from "./utilities/getAttributeValueOfType.js";

const WebComponent = (ElementInterface = HTMLElement) => class extends ElementInterface {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  // Initialize internal properties.
  #stateTypes;
  #propTypes;
  #renderPasses = 0;
  #buffer = {state: {}, props: {}};
  #debounce = null;

  connectedCallback() {
    // Provide component name property.
    this.component = this.localName;

    // Add light DOM styles if exists.
    this.#mountLightStyles();

    // `state` and `props` objects can be author-initialized to indicate the
    // desired types. We'll store internal copies before redefining these
    // objects for actual state and props.
    this.#stateTypes = this.constructor.state || null;
    this.#propTypes = this.constructor.props || null;

    // Proxy `state` and `props` properties to intercept and handle changes.
    this.state = new Proxy({}, this.#stateHandler());
    this.props = new Proxy({}, this.#propsHandler());

    // Intercept `parts` reads to query select shadow DOM and return part nodes
    // automatically.
    this.parts = new Proxy({}, this.#getParts());

    // Listen for component updates.
    this.addEventListener("component:update", this.#updateHandler.bind(this));

    // Populate the `props` object from the component instance's element
    // attributes.
    this.#propsFromAttributes();

    // Declare the component connected (allows component authors to hook inside
    // `connectedCallback` after the above has been completed).
    this.isConnected && this.connected?.();

    // Wait for the next animation frame. If `state` has been populated by the
    // component author at this point, then an update will already be scheduled.
    // But if not, trigger the first update.
    if(Object.keys(this.state).length === 0) {
      this.#update();
    }
  }

  /**
   * Add light DOM styles to document head if present.
   */
  #mountLightStyles() {
    if(
      // If `styles` exists and a `light` stylesheet is given.
      Object.prototype.toString.call(this.constructor.styles) === "[object Object]" 
      && "light" in this.constructor.styles
      // Don't add redundant styles (in the event of multiple component
      // instances).
      && !document.head.querySelector(`style[data-component="${this.component}"]`)
    ) {
      const lightStyles = document.createElement("style");
      lightStyles.setAttribute("data-component", this.component);
      lightStyles.innerHTML = this.constructor.styles.light();
      document.head.append(lightStyles);
    }
  }

  /**
   * Intercept changes to internal `state` object.
   * 
   * store = the object that `this.state` will become.
   * state = the state key to update.
   * value = the desired value to set `state` to.
   */
  #stateHandler() {
    return {
      set: (store, state, value) => {
        if(store[state] === value) {
          return true;
        }

        if(this.#stateTypes) {
          const wantsArrayIsArray = this.#stateTypes[state] === "array" && Array.isArray(value);
          const notOfCorrectType = typeof value !== this.#stateTypes[state] && !wantsArrayIsArray;
          
          // Check new state value against declared type if it exists.
          if(state in this.#stateTypes && notOfCorrectType) {
            console.error(`Value of state property ${state} is not of type ${this.#stateTypes[state].toUpperCase()}.`, `${value} (${(typeof value).toUpperCase()})`);
            return true;
          }
        }

        // Store the old value for reference in `component:update` event, then
        // update the state prop to the new value.
        const oldValue = store[state];
        store[state] = value;

        // Notify subscribers/observers of component update.
        this.dispatchEvent(new CustomEvent("component:update", {
          bubbles: true,
          cancelable: true,
          detail: {
            state: {
              oldState: {[state]: oldValue},
              newState: {[state]: value},
            },
          },
        }));

        return true;
      },

      // Proxy child properties of each state property as well.
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

  /**
   * Intercept changes to internal `props` object.
   */
  #propsHandler() {
    return {
      set: (props, prop, value) => {
        // Get the current attribute value and the given internal value of the
        // prop as the type declared.
        const desiredType = this.#propTypes?.[prop];
        const normalizedAttributeValue = getAttributeValueOfType(this.getAttribute(prop), desiredType);
        const normalizedGivenValue = getAttributeValueOfType(value, desiredType);

        // Exit early if the property key is a reflected state attribute, or if
        // the attempted setting of the `props` property is different from its
        // corresponding DOM attribute. This allows `props` to be updated via
        // attribute changes on the component, but not internal mutations of the
        // object.
        if(
          this.constructor.observedAttributes?.includes(prop)
          || (desiredType !== "array" && normalizedAttributeValue !== normalizedGivenValue)
          // Special equality checking required for arrays.
          || (desiredType === "array" && normalizedAttributeValue.slice().sort().join() !== normalizedGivenValue.slice().sort().join())
        ) {
          return true;
        }

        // Store the old value for reference in the `component:update` event,
        // then update the prop to the new value.
        const oldValue = props[prop];
        props[prop] = normalizedGivenValue;

        // Notify subscribers/observers of component update.
        this.dispatchEvent(new CustomEvent("component:update", {
          bubbles: true,
          cancelable: true,
          detail: {
            props: {
              oldProps: {[prop]: oldValue},
              newProps: {[prop]: normalizedGivenValue},
            },
          },
        }));

        return true;
      },

      get: (props, prop) => {
        if(this.#propTypes && prop in this.#propTypes && props[prop] === undefined) {
          props[prop] = getAttributeValueOfType(this.getAttribute(prop), this.#propTypes[prop]);
        }

        return props[prop];
      },
    };
  }

  /**
   * Intercepts reads to internal `parts` object to give automatic access to all
   * component parts.
   */
  #getParts() {
    return {
      get: (parts, part) => {
        // If the part has not already been read...
        if(!parts[part]) {
          // Query select for the part.
          const $parts = this.shadowRoot.querySelectorAll(`[part~=${part}]`);

          if(!$parts || $parts.length < 1) {
            console.warn(`${this.component} does not contain shadow part(s) "${part}".`);
            return;
          }

          let value;

          if($parts.length > 1) {
            // Return an array of nodes if node list of more than 1 node.
            value = Array.from($parts);
          } else {
            // Just return the first node if only 1 node.
            value = $parts[0];
          }

          // Store the part(s) in the object to avoid redundant DOM querying
          // if accessed multiple times.
          parts[part] = value;
          return value;
        } else {
          // Return already-accessed node(s) if queried before.
          return parts[part];
        }
      },
    };
  }

  /**
   * Populate `this.props` from existing attributes, then attach a mutation
   * observer to update `this.props` when an attribute changes.
   */
  #propsFromAttributes() {
    function setPropToAttribute(attribute) {
      // Cancel if the prop is a reflected state attribute.
      if(this.constructor.observedAttributes && this.constructor.observedAttributes.includes(attribute)) {
        return;
      }

      // Convert attribute value to desired type (won't change value if the prop
      // type is null).
      let value = getAttributeValueOfType(this.getAttribute(attribute), this.#propTypes?.[attribute]);

      // Update prop key if value is actually different.
      if(this.props[attribute] !== value) {
        this.props[attribute] = value;
      }
    }

    // Populate `props` object from attributes.
    this.getAttributeNames().forEach((attribute) => {
      setPropToAttribute.call(this, attribute);
    });

    // Observe attribute mutations.
    const attributeChange = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // Update `props` object with new attribute value.
        setPropToAttribute.call(this, mutation.attributeName);
      });
    });

    attributeChange.observe(this, { attributes: true });
  }

  /**
   * Handle `component:update` events (schedule an update).
   */
  #updateHandler(event) {
    // If there are state changes in the update...
    if(event.detail.state) {
      // Batch the changes with the queued changes.
      this.#buffer.state.newState = { ...this.#buffer.state.newState, ...event.detail.state.newState };
      this.#buffer.state.oldState = { ...this.#buffer.state.oldState, ...event.detail.state.oldState };
    }

    // If there are prop changes in the update...
    if(event.detail.props) {
      // Batch the changes with the queued changes.
      this.#buffer.props.newProps = { ...this.#buffer.props.newProps, ...event.detail.props.newProps };
      this.#buffer.props.oldProps = { ...this.#buffer.props.oldProps, ...event.detail.props.oldProps };
    }

    // Debounce back-to-back state and prop updates to allow them to be batched
    // above. Wait until next animation frame before calling an update.
    // `#debounce` is initialized as `null`, but every time this
    // `#updateHandler` is called from a `component:update`, `#debounce` is set
    // to a new `requestAnimationFrame`. If `#debounce` is no longer `null`,
    // that means this event handler has been run, so we need to cancel the
    // previous animation frame request, and request a new one. On the last call
    // of this handler from a `component:update`, the previous animation frame
    // will be canceled (because `#debounce` is not `null`), but the new request
    // that `#debounce` is set to will be allowed to run, thus only calling
    // `#update` once there's a full batch of changes within the span of a
    // single animation frame. Note how each request is not in an `else` block,
    // allowing it to run on the last update round only.
    if(this.#debounce !== null) {
      cancelAnimationFrame(this.#debounce);
    }

    this.#debounce = requestAnimationFrame(this.#update.bind(this));
  }

  /**
   * Actually perform the component update.
   */
  #update() {
    this.#debounce = null;
    
    // Set attribute to state value if state prop is listed in
    // `observedAttributes`. We don't do this for props because the `props`
    // object is internally immutable. That is, state is bidirectionally synced
    // (DOM to object and vice versa), whereas props are only unidirectionally
    // synced (from DOM to object).
    if(this.constructor.observedAttributes) {
      for(let state in this.#buffer.state.newState) {
        if(!this.constructor.observedAttributes.includes(state)) {
          continue;
        }

        const desiredType = this.#stateTypes?.[state] || typeof this.state[state];
        const attributeValue = getAttributeValueOfType(this.getAttribute(state), desiredType);
        const normalizedValue = getAttributeValueOfType(this.state[state], desiredType);

        if(typeof normalizedValue === "boolean") {
          this.toggleAttribute(state, normalizedValue);
        } else if(desiredType === "array") {
          this.setAttribute(state, normalizedValue.join(" "));
        } else if(attributeValue !== normalizedValue) {
          this.setAttribute(state, normalizedValue);
        }
      }
    }

    let template = this.render?.();

    if(template) {
      const tcdsBaseStyles = document.head.querySelector(`link[href*="tcds.css"]`)?.getAttribute("href") || "https://unpkg.com/@txch/tcds/dist/styles/tcds.css";

      let stylesheets = `<style>@import url("${tcdsBaseStyles}");</style>`;

      // Add styles to shadow root by default. If shadow styles are specified, add
      // those as well.
      if(this.constructor.styles) {
        const styles = this.constructor.styles;
  
        stylesheets += `
          <style>
            ${typeof styles === "string" ? styles : ""}
            ${typeof styles === "object" && "shadow" in styles ? styles.shadow() : ""}
          </style>
        `;
      }

      template = stylesheets + template;

      // Diff template from existing DOM and apply differences.
      diff(template, this.shadowRoot);
    }


    const batch = Object.assign({}, this.#buffer);
    
    // Declare component mounted after the first render pass and after all child
    // components are defined. Then call update callbacks after mount and after
    // every update afterwards.
    if(this.#renderPasses < 1) {
      const childComponentsAreDefined = Array.from(this.shadowRoot.querySelectorAll(":not(:defined)")).map((childComponent) => {
        return customElements.whenDefined(childComponent.localName);
      });

      Promise.all(childComponentsAreDefined).then(() => {
        this.mounted?.();
        this.#callUpdateCallbacks(batch);
      });
    } else {
      this.#callUpdateCallbacks(batch);
    }

    this.#renderPasses++;
    this.#buffer = {state: {}, props: {}};
  }

  /**
   * Callback functions can be provided by component authors in the `updated`
   * hook. If the name of a callback matches a state or prop key in the current
   * update batch, call it, then empty out the update batch.
   */
  #callUpdateCallbacks(batch) {
    const updateCallbacks = this.updated?.(batch.state, batch.props) || {};

    if("state" in updateCallbacks) {
      for(let state in updateCallbacks.state) {
        if(batch.state.newState && state in batch.state.newState) {
          updateCallbacks.state[state]();
        }
      }
    }

    if("props" in updateCallbacks) {
      for(let prop in updateCallbacks.props) {
        if(batch.props.newProps && prop in batch.props.newProps) {
          updateCallbacks.props[prop]();
        }
      }
    }
  }

  /**
   * Sync reflected state attribute changes to internal `state` object.
   */
  attributeChangedCallback(attribute, _oldValue, newValue) {
    if(this.state) {
      const desiredType = this.#stateTypes?.[attribute] || typeof this.state[attribute];
      const normalizedValue = getAttributeValueOfType(newValue, desiredType);

      if(
        desiredType !== "array" && this.state[attribute] !== normalizedValue
        || desiredType === "array" && normalizedValue.slice().sort().join() !== this.state[attribute].slice().sort().join()
      ) {
        this.state[attribute] = normalizedValue;
      }
    }
  }
};

export default WebComponent;
