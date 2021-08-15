/**
 * Component superclass for state-driven DOM manipulation and prop management.
 */

class Component {
  /**
   * Set up state and props.
   *
   * @param {HTMLElement} element The root-most HTML element to which the
   * component script applies.
   * @param {object} props Static properties of the component instance.
   */
  constructor(element, props) {
    this.element = element;

    // Set up a proxy to intercept changes to `this.state`. Will check that the
    // new value is actually different, then fire a custom event to notify
    // listeners of the change, with details about that change.
    this.state = new Proxy({ }, {
      // store = the object that `this.state` becomes.
      // state = the property of the store object that was changed.
      // value = the new value that the property was set to.
      set: (store, state, value) => {
        // Before setting the state prop to the new value, store the previous
        // value for later reference.
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

          // Dispatch a custom event with details about the state change.
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

    // Merge the passed props argument part into `this.props`.
    this.props = new Proxy({...props}, {
      // `_props` references the new `this.props` object (rather than the
      // original `props` argument).
      set: (_props, prop, value) => {
        // If the prop already exists and is different from the attempted value.
        if(prop in _props && _props[prop] !== value) {
          // Reject attempt.
          console.warn("Attempt to mutate prop rejected. Try deriving state from prop, or mutate prop value at time of instantiation.", {
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

    // Call the local sync method on state change, passing relevant details.
    this.element.addEventListener("state-change", (event) => {
      this.sync(event.detail.newState, event.detail.prevState);
    });
  }

  /**
   * The sync method is called on every state change, so DOM manipulation should
   * happen there. Each extending component class should have its own sync
   * method, which will override this one. If one is not present then this
   * method will fire, so show a warning.
   *
   * @param {object} newState An object containing a copy of the changed state
   * and its value.
   * @param {object} prevState An object containing a copy of the previous state
   * and its value.
   */
  sync(_newState, _prevState) {
    throw new Error("No local sync method provided in component subclass.");
  }
}