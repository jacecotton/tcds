import diff from "./diff.js";

/**
 * @todo More dynamic way of loading stylesheet. Hardcoding the path doesn't
 * seem like the best option. Maybe designate a <link> in the head with a
 * [data-import] attribute and pull the [href] from there. Loop through all
 * <link> elements containing the attribute and apply the stylesheet.
 * @todo Look into working with built-in lifecycle methods more.
 * connectedCallback for mounting, disconnectedCallback for dismounting (remove
 * `state-change` event listener and so on), etc.
 */
export default class WebComponent extends HTMLElement {
  constructor() {
    super();

    // Use shadow DOM unless the renderRoot is redefined as `this`.
    if(this.renderRoot !== this) {
      this.attachShadow({mode: "open"});
    }

    // Set up a proxy to intercept changes to local `state` object. Fires a
    // `state-change` event.
    this.state = new Proxy({}, this.stateHandler());

    requestAnimationFrame(() => {
      this.props = this.getAttributeNames().reduce((attributes, attribute) => {
        if(
          // Exclude standard attributes.
          !["class", "id", "part", "name"].includes(attribute)
          // Exclude data-attributes.
          && !attribute.match(/data-/)
          // Exclude state-reflection attributes.
          && !Object.keys(this.state).includes(attribute)
        ) {
          return {...attributes, [attribute]: this.getAttribute(attribute)};
        }

        return attributes;
      }, {});

      const propsObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if(this.props[mutation.attributeName] !== mutation.target.getAttribute(mutation.attributeName)) {
            this.props[mutation.attributeName] = mutation.target.getAttribute(mutation.attributeName);

            this.dispatchEvent(new CustomEvent("update-schedule", {
              cancelable: true,
              bubbles: true,
              detail: {
                props: {
                  oldProp: {
                    [mutation.attributeName]: mutation.oldValue,
                  },
                  newProp: {
                    [mutation.attributeName]: mutation.target.getAttribute(mutation.attributeName),
                  },
                }
              },
            }));
          }
        });
      });

      propsObserver.observe(this, {
        attributeFilter: Object.keys(this.props),
        attributeOldValue: true,
      });
    });


    // Set up this.props with a proxy to make it immutable
    // Set up a mutation observer to observe attribute changes and fire some
    // hook callback. Do not observe childList or subtree, and observe
    // attributes filtered by those that match the internal props object. Update
    // internal props object on mutation.

    // Initialize a collection of changed state to pass to the `updated`
    // callback all at once.
    this.batch = {
      state: {},
      props: {},
    };

    // Initialize a boolean to keep track of whether to debounce the `updated`
    // call (to wait for more changed state properties to go into the batch).
    this.debounce = null;

    // Listen for state changes (a custom event emitted by the `stateHandler`),
    // then call the `render` function and `updated` callback.
    this.addEventListener("update-schedule", (event) => {
      // Update the collection of changed state properties with their new and
      // old values.
      if(event.detail.state) {
        this.batch.state.newState = { ...this.batch.state.newState, ...event.detail.state.newState };
        this.batch.state.oldState = { ...this.batch.state.oldState, ...event.detail.state.oldState };
      }

      if(event.detail.props) {
        this.batch.props.newProp = { ...this.batch.props.newProp, ...event.detail.props.newProp };
        this.batch.props.oldProp = { ...this.batch.props.oldProp, ...event.detail.props.oldProp };
      }

      // `debounce` will be defined as a `requestAnimationFrame` (see below) if
      // the current listener has already been triggered. So if `debounce` is
      // not `null` (as initialized), some state has been changed more than once
      // before the next available animation frame (i.e. back-to-back changes
      // have occured). So, cancel the existing request, and try again on the
      // next animation frame.
      if(this.debounce !== null) {
        cancelAnimationFrame(this.debounce);
      }

      // If this callback runs, the next animation frame is available, which
      // means all mutations have completed without the request being canceled.
      // So, call the `render` function and `updated` callback.
      this.debounce = requestAnimationFrame(() => {
        const template = `
          <link rel="stylesheet" href="/styles/main.css">
          ${this.render()}
        `;

        // Diff the `render` template against the existing component DOM and
        // apply permutations.
        diff(template, this.renderRoot);

        // Call the `updated` callback and get its return object (with
        // properties corresponding to changed state properties, set to
        // callbacks to handle those specific state changes).
        const updateHandlers = this.updated(this.batch.state, this.batch.props);

        if(updateHandlers && updateHandlers.state) {
          // Loop through each handler in the returned object.
          for(let handler in updateHandlers.state) {
            // If the key corresponding to the handler is in the newly changed
            // state batch...
            if(this.batch.state.newState && handler in this.batch.state.newState) {
              // Call the handler.
              updateHandlers.state[handler]();
            }
          }
        }

        if(updateHandlers && updateHandlers.props) {
          for(let handler in updateHandlers.props) {
            if(this.batch.props.newProp && handler in this.batch.props.newProp) {
              updateHandlers.props[handler]();
            }
          }
        }

        // Reset state batch (removes unchanged state on next run).
        this.batch.state = {};
        this.batch.props = {};
      });
    });

    requestAnimationFrame(() => {
      const promises = Array.from(this.renderRoot.querySelectorAll(":not(:defined)")).map((undefinedChild) => {
        return customElements.whenDefined(undefinedChild.localName);
      });

      Promise.all(promises).then(() => {
        requestAnimationFrame(() => {
          this.mounted();
        });
      });
    });
  }

  // Register private properties.
  stateBatch;
  debounce;

  /**
   * A callback for a proxy on `this.state`. Will check that the new value is
   * different from the old value, then emits a custom event to notify listeners
   * of the change, with details about that change.
   */
  stateHandler() {
    return {
      /**
       * store - The object that `this.state` becomes.
       * state - The property of the store object that is to be mutated.
       * value - The value that the property is to be set to.
       */
      set: (store, state, value) => {
        // Exit if the new value is the same as the old value.
        if(store[state] === value) {
          return true;
        }

        // Before setting the state prop to the new value, store the current,
        // i.e. soon-to-be-old, value for later reference.
        const oldState = {
          [state]: store[state],
        };

        // Also provide the state that was changed for later reference.
        const newState = {
          [state]: value,
        };

        // Set the state property to the new value.
        store[state] = value;

        // Dispatch an event that signals the state has changed, with details
        // about the state change.
        this.dispatchEvent(new CustomEvent("update-schedule", {
          bubbles: true,
          cancelable: true,
          detail: {
            state: {
              oldState: oldState,
              newState: newState,
            },
          },
        }));

        return true;
      },


      /**
       * If a property of state is an array or object that is mutated (e.g.
       * pushed, popped, spliced, etc.), the property itself is actually only
       * `get`-ed. We still want the `set` callback to run, so we'll need to
       * register a new proxy on that specific property, and only then will a
       * `set` callback run. So first, we'll check if the property being read is
       * an object or an array, and if so, set this same handler to a new proxy
       * on the current property.
       */
      get: (store, state) => {
        // Abort if state prop is already a proxy.
        if(state === "_isProxy") {
          return true;
        }

        if(["[object Object]", "[object Array]"].includes(Object.prototype.toString.call(store[state]))) {
          return new Proxy(store[state], this.stateHandler());
        }

        return store[state];
      },

      deleteProperty: (store, state) => {
        const deletedState = {
          [state]: store[state],
        };

        delete store[state];

        this.dispatchEvent(new CustomEvent("state-change", {
          bubbles: true,
          cancelable: true,
          detail: {
            deletedState: deletedState,
          },
        }));

        return true;
      },
    };
  }

  get renderRoot() {
    return this.shadowRoot;
  }

  render() {
    return "";
  }

  mounted() {
    return;
  }

  updated() {
    return;
  }
}
