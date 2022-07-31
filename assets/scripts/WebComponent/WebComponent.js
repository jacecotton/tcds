import diffDOM from "@tcds/utilities/diffDOM.js";

/**
 * A utility class for creating web components. Designed to be familiar to users
 * of React, Vue, etc., but with a more targeted feature set, lighter weight,
 * and designed specifically for the native web component / custom element API.
 *
 * @property {object} this.state - Component's internal state. Reactive and
 * batched, will trigger re-render.
 * @property {object} this.props - A read-only object for accessing the
 * component's attributes (excluding the standard attributes, data-attributes,
 * and reflected state attributes). While the object is internally immutable,
 * changes to the component instance's attributes will update the object and
 * trigger a re-render.
 *
 * @extends HTMLElement
 *
 * @todo More dynamic way of loading stylesheet. Hardcoding the path doesn't
 * seem like the best option. Maybe designate a <link> in the head with a
 * [data-import] attribute and pull the [href] from there. Loop through all
 * <link> elements containing the attribute and apply the stylesheet.
 * @todo Look into working with built-in lifecycle methods more.
 * connectedCallback for mounting, disconnectedCallback for dismounting (remove
 * `update-schedule` event listener and so on), etc.
 * @todo Look into actually making `this.props` immutable. One way to do this
 * might be to derive this._props from attributes, update this._props in the
 * mutation observer, set up a proxy on this._props that simply sets this.props
 * to this._props when this._props is updated, then set up a proxy on this.props
 * that rejects setting any value other than this._props. Actually, may be able
 * to skip the proxy on this._props, can just do `this.props = this._props`
 * wherever this._props is updated. Will either need to make this._props a
 * static property, or in the future a private property, to ensure extending
 * component classes don't attempt to mutate this._props.
 */
export default class WebComponent extends HTMLElement {
  constructor() {
    super();

    // Use shadow DOM unless the renderRoot is redefined as `this`.
    if(this.renderRoot !== this) {
      this.attachShadow({mode: "open"});
    }

    // Set up a proxy to intercept changes to local `state` object. Fires an
    // `update-schedule` event.
    this.state = new Proxy({}, this.stateHandler());

    // Derive internal `props` object from component host attributes, excluding
    // standard attributes, data-attributes, and reflected state attributes.
    requestAnimationFrame(() => {
      this.props = this.getAttributeNames().reduce((attributes, attribute) => {
        if(
          // Exclude standard attributes.
          !["class", "id", "part", "name"].includes(attribute)
          // Exclude data-attributes.
          && !attribute.match(/data-/)
          // Exclude reflected state attributes.
          && !Object.keys(this.state).includes(attribute)
        ) {
          return {...attributes, [attribute]: this.getAttribute(attribute)};
        }

        return attributes;
      }, {});

      // Observe changes to component prop attributes and update the internal
      // `props` object accordingly. Fires an `update-schedule` event.
      const propsObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          // If the new attribute value is different from the stored prop value.
          if(this.props[mutation.attributeName] !== mutation.target.getAttribute(mutation.attributeName)) {
            // Update the stored prop.
            this.props[mutation.attributeName] = mutation.target.getAttribute(mutation.attributeName);

            // Schedule a re-render.
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

    // Initialize a collection of changed state and props to pass to the
    // `updated` callback all at once.
    this.batch = {
      state: {},
      props: {},
    };

    // Initialize a boolean to keep track of whether to debounce the `updated`
    // call (to wait for more changed state and props to go into the batch).
    this.debounce = null;

    // Listen for state and prop changes (a custom event emitted by the
    // `stateHandler` and mutation observer), then update the component.
    this.addEventListener("update-schedule", (event) => {
      // Update the collection of changed state and props with their new and
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
      // not `null` (as initialized), some state or props have been changed more
      // than once before the next available animation frame (i.e. back-to-back
      // changes have occured). So, cancel the existing request, and try again
      // on the next animation frame.
      if(this.debounce !== null) {
        cancelAnimationFrame(this.debounce);
      }

      // If this callback runs, the next animation frame is available, which
      // means all mutations have completed without the request being canceled.
      // So, update the component.
      this.debounce = requestAnimationFrame(this.update.bind(this));
    });

    // Wait for all child components to be defined, then declare the component
    // mounted.
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

        this.dispatchEvent(new CustomEvent("update-schedule", {
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

  update() {
    // Define template as result from `render` method as well as main
    // stylesheet.
    const template = `
      <link rel="stylesheet" href="/styles/main.css">
      ${this.render()}
    `;

    // Diff the `render` template against the existing component DOM and
    // apply permutations.
    diffDOM(template, this.renderRoot);

    // Call the `updated` callback and get its return object (with
    // properties corresponding to changed state and props keys, set to
    // callbacks to handle those specific changes).
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

    // Repeat for props.
    if(updateHandlers && updateHandlers.props) {
      for(let handler in updateHandlers.props) {
        if(this.batch.props.newProp && handler in this.batch.props.newProp) {
          updateHandlers.props[handler]();
        }
      }
    }

    // Reset state and prop batches (removes unchanged data on next run).
    this.batch.state = {};
    this.batch.props = {};
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

  get renderRoot() {
    return this.shadowRoot;
  }
}
