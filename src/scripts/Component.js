/**
 * A superclass for scripting components with state-driven DOM manipulation.
 *
 * Note that, unlike reactive SPA libraries, this utility has no "render"
 * functionality. Instead, it assumes existing markup, and simply provides a way
 * to manipulate DOM dynamically according to the current value of some state.
 *
 * This utility does, however, borrow some techniques of SPA components, such as
 * reactive state. It also helps safely manage "props" by making the passed
 * `props` object a property of the component instance, then ensuring it's
 * immutable.
 *
 * @param {HTMLElement} element - The root-most HTML element (fragment) to which
 * the component script applies.
 * @param {object} props - Properties of the component instance (settings,
 * options, etc.), set at time of instantiation.
 *
 * @property {HTMLElement} element - The `element` argument provided as a
 * property of the component instance (`this`).
 * @property {object} props - The `props` argument provided as an immutable
 * property of the component instance (made immutable via a proxy setter).
 * @property {object} state - An mutable object for keeping track of the
 * component's state. Changes to this object are intercepted by a proxy, which
 * then emits a `state-change` event, triggering the component's local `sync`
 * method, which is responsible for updating the DOM. It batches and passes the
 * changed state data to the method for reference. Effectively, this keeps the
 * state and the DOM in "sync".
 *
 * @listens Component#state-change
 */
export default class Component {
  constructor(element, props) {
    // Make the fragment element accessible as a property of the component
    // class.
    this.element = element;

    // Set up a proxy to intercept changes to `this.state`. Fires a
    // `state-change` event when a change is detected.
    this.state = new Proxy({}, this.#stateHandler());

    // Set up a proxy to intercept changes to `this.props`. Will first merge the
    // passed `props` argument to the object so they are accessible as a
    // property of the component class.
    this.props = new Proxy({...props}, this.#propsHandler());

    // Initialize a collection of changed state to pass to the sync method all
    // at once.
    this.#stateBatch = {};
    // Initialize a boolean to keep track of whether to debounce the sync call
    // (to wait for more changed state properties to go into the batch).
    this.#debouncedSync = null;

    // Listen for state changes (a custom event emitted by the `stateHandler`),
    // then call the `sync` method.
    this.element.addEventListener("state-change", (event) => {
      // Update the collection of changed state properties with their new and
      // previous values.
      this.#stateBatch.newState = { ...this.#stateBatch.newState, ...event.detail.newState };
      this.#stateBatch.prevState = { ...this.#stateBatch.prevState, ...event.detail.prevState };

      // `#debouncedSync` will be defined as a `requestAnimationFrame` (see
      // below) if the current listener has already been triggered. So if
      // `#debouncedSync` is not `null` (as initialized), some state has been
      // changed multiple times before the next available animation frame (i.e.
      // back-to-back changes). So, cancel the existing request and try again on
      // the next animation frame.
      if(this.#debouncedSync !== null) {
        cancelAnimationFrame(this.#debouncedSync);
      }

      // If this callback runs, the next animation frame is available, which
      // means all operations have completed without the request being
      // canceled. So, call the sync method.
      this.#debouncedSync = requestAnimationFrame(() => {
        // Call the sync method and get its return value (an object with keys
        // corresponding to changed state values, and values set to handler
        // functions to run when those state keys are mutated).
        const stateChangeHandlers = this.sync(this.#stateBatch.newState, this.#stateBatch.prevState);
        
        // Loop through the handlers of the returned object.
        for(let handler in stateChangeHandlers) {
          // If the key corresponding to the handler is in the newly changed
          // state batch...
          if(handler in this.#stateBatch.newState) {
            // Call the handler.
            stateChangeHandlers[handler]();
          }
        }

        // Reset state batch (removes unchanged state on next run).
        this.#stateBatch = {};
      });
    });
  }

  // Register private properties.
  #stateBatch;
  #debouncedSync;

  /**
   * A callback for a proxy on `this.state` to intercept changes. Will check
   * that the new value is actually different, then fires a custom event to
   * notify listeners of the change, with details about that change.
   * 
   * @fires Component#state-change
   */
  #stateHandler() {
    return {
      // store = the object that `this.state` becomes.
      // state = the property of the store object that is to change.
      // value = the new value that the property is to be set to.
      set: (store, state, value) => {
        // Before setting the state prop to the new value, store the current,
        // i.e. soon-to-be-previous, value for later reference.
        const prevState = {
          [state]: store[state],
        };

        // Also provide the state that was changed for later reference. Helpful
        // for determining which DOM elements to manipulate based on the state
        // that was actually changed.
        const newState = {
          [state]: value,
        };

        // Check that the new state value is different.
        if(store[state] !== value) {
          // Set the state property to the new value.
          store[state] = value;

          /**
           * Dispatch a listenable event that signals state has changed, with
           * details about the state change.
           *
           * @event Component#state-change
           * @type {object}
           * @property {object} detail - Details about the state change.
           * @property {HTMLElement} detail.context - The "context" of the
           * component, i.e. the passed `element` of the component instance.
           * @property {object} detail.newState - A batch of state properties
           * that were changed and their new values.
           * @property {object} detail.prevState - A batch of state properties
           * that were changed and their immediately previous values.
           */
          this.element.dispatchEvent(new CustomEvent("state-change", {
            detail: {
              context: this.element,
              newState: newState,
              prevState: prevState,
            },
          }));
        }

        return true;
      },

      // If a property of state is an array or object that is mutated (e.g.
      // pushed, popped, spliced, etc.), the property itself is actually only
      // "get"-ed. We still want the `set` callback to run, so we'll need to
      // register a new proxy on that specific property, and only then will a
      // `set` callback run. So first, we'll check if the property being read is
      // an object or an array, and if so, set this same handler to a new proxy
      // on the current property.
      get: (store, state) => {
        if(["[object Object]", "[object Array]"].indexOf(Object.prototype.toString.call(store[state])) > -1) {
          return new Proxy(store[state], this.#stateHandler());
        }

        return store[state];
      },
    };
  }

  /**
   * A callback for a proxy on `this.props` to intercept changes. Will check if
   * the prop attempting to be set already exists in the passed `props`, and if
   * so, reject it (making props passed to the component instance by the user,
   * at time of instantiation, immutable at runtime).
   */
  #propsHandler() {
    return {
      // `_props` references the new `this.props` object (rather than the
      // original `props` constructor parameter).
      set: (_props, prop, value) => {
        // If the prop already exists and is different from the attempted
        // value...
        if(prop in _props && _props[prop] !== value) {
          // Reject attempt (with info).
          console.warn("Attempt to mutate prop rejected; `this.props` is immutable. To use a mutable property, try initializing state or a new property from the `this.props` property value.", {
            "context": this.element,
            "property": prop,
            "attempted value": value,
            "persisting value": _props[prop],
          });
        } else {
          // Otherwise, proceed with setting the prop as normal.
          _props[prop] = value;
        }

        return true;
      },
    };
  }

  /**
   * Each extending component subclass should have its own `sync` method, which
   * will be responsible for all reaction to state (i.e. DOM changes). Since the
   * method is called on every state change, it keeps the UI and state in sync,
   * hence the name. As a result, it is best practice to always reference the
   * current state when manipulating the DOM.
   *
   * @param {object} newState - An object containing only a copy of the changed
   * state properties and their current (new) values.
   * @param {object} prevState - An object containing only a copy of the changed
   * state properties and their immediately previous values.
   *
   * @returns {object} Optionally, each sync method can return an object with
   * keys that correspond to changed state properties. If set to functions,
   * these will run as callbacks only when the corresponding state property is
   * changed.
   */
  sync(newState, prevState) {
    // The subclass's `sync` method will override this one. If one is not
    // present, this method will fire instead, so a warning should be logged.
    console.warn("No local sync method provided in component subclass.");

    return {};
  }
};