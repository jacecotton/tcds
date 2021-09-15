/**
 * A superclass for scripting components with state-driven DOM manipulation.
 *
 * Note that this utility has no "render" functionality. Rather, it assumes pre-
 * existing markup, and simply provides a way to manipulate DOM dynamically
 * according to current state.
 *
 * @param {HTMLElement} element - The root-most HTML element to which the
 * component script applies.
 * @param {object} props - Static properties of the component instance.
 *
 * @property {object} state - An object for keeping track of the component's
 * state. Changes to this object are intercepted by a proxy, which then emits a
 * `state-change` event, triggering the component's local `sync` method, which
 * is responsible for updating the DOM, while batching and passing the changed
 * state data to the function for reference (thereby keeping the state and the
 * DOM in "sync").
 * @property {object} props - An object for referencing static properties passed
 * to the component at time of instantiation.
 */
class Component {
  constructor(element, props) {
    // Make the element accessible as a property of the extending class.
    this.element = element;

    /**
     * Set up a proxy to intercept changes to `this.state`. Will check that the
     * new value is actually different, then fires a custom event to notify
     * listeners of the change, with details about that change.
     */
    this.state = new Proxy({ }, {
      // store = the object that `this.state` becomes.
      // state = the property of the store object that was changed.
      // value = the new value that the property was set to.
      set: (store, state, value) => {
        // Before setting the state prop to the new value, store the current,
        // i.e. soon-to-be previous, value for later reference.
        const prevState = {};
        prevState[state] = store[state];

        // Also provide the state that was changed for later reference. Helpful
        // for determining which DOM elements to manipulate based on the state
        // that was actually changed.
        const newState = {};
        newState[state] = value;

        // Check that the new state is different.
        if(store[state] !== value) {
          // Set state prop to the new value.
          store[state] = value;

          // Dispatch a listenable event that signals state has changed, with
          // details about the state change.
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
    });

    /**
     * Set up a proxy to intercept changes to `this.props`. Will first merge the
     * passed `props` argument to the object so they are accessible as a
     * property of `this`. Then it will ensure these properties are immutable so
     * they cannot be changed at runtime.
     */
    this.props = new Proxy({...props}, {
      // `_props` references the new `this.props` object (rather than the
      // original `props` argument).
      set: (_props, prop, value) => {
        // If the prop already exists and is different from the attempted
        // value...
        if(prop in _props && _props[prop] !== value) {
          // Reject attempt.
          console.warn("Attempt to mutate prop rejected. This is a problem in component subclass. Try deriving state from prop, or mutate prop value at time of instantiation.", {
            context: this.element,
            prop: prop,
            "attempted value": value,
            "persisting value": _props[prop],
          });
        } else {
          // Otherwise proceed with setting the prop as normal.
          _props[prop] = value;
        }

        return true;
      },
    });

    /**
     * Listen for state changes and then call the `sync` method to update DOM.
     *
     * First, wait to update the DOM until all back-to-back state changes have
     * finished (debouncing), then pass all the changed state as one object to
     * the `sync` method (batching).
     */

    // Keep track of whether to debounce.
    let debouncedSync = null;
    // Init a collection of changed state to pass to the sync method all at
    // once.
    let stateBatch = {};

    // When state updates...
    this.element.addEventListener("state-change", (event) => {
      // Update the collection of changed state properties with their new and
      // previous values.
      stateBatch.newState = { ...stateBatch.newState, ...event.detail.newState };
      stateBatch.prevState = { ...stateBatch.prevState, ...event.detail.prevState };

      // `debouncedSync` will be defined as a `requestAnimationFrame` (see
      // below) if the current listener has already been triggered. So if
      // `debouncedSync` is not `null` (as initialized), state has been changed
      // multiple times before the next available animation frame (i.e. back-to-
      // back). So, cancel the existing request and try again on the next
      // animation frame.
      if(debouncedSync !== null) {
        window.cancelAnimationFrame(debouncedSync);
      }

      debouncedSync = window.requestAnimationFrame(() => {
        // The next animation frame is available, which means all operations
        // have completed without the request being canceled. So, call `sync`
        // and pass the batched data.
        this.sync(stateBatch.newState, stateBatch.prevState);

        // Reset state batch (removes unchanged state).
        stateBatch = {};
      });
    });
  }

  /**
   * Each extending component subclass should have its own `sync` method, which
   * will be responsible for all DOM manipulation. Since the method is called on
   * every state change, it keeps the UI and state in sync, hence the name. As a
   * result, it is best practice to always reference the current state when
   * manipulating the DOM.
   *
   * @param {object} newState An object containing only a copy of the changed
   * state properties and their current values.
   * @param {object} prevState An object containing only a copy of the changed
   * state properties and their previous values.
   */
  sync(newState, prevState) {
    // Note that the subclass's `sync` method will override this one. If one is
    // not present, this method will fire instead, so a warning should be
    // logged.
    console.warn("No local sync method provided in component subclass.");
  }
}