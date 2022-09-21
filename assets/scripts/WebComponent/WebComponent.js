import diff from "./diff.js";

/**
 * A class for creating web components in vanilla JavaScript. Extends
 * `HTMLElement` to create custom elements, while providing reactive state and
 * props, declarative rendering, and related lifecycle hooks.
 */

export default class WebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  nestedElements = {};
  parts = {};
  #renderPasses = 0;
  #batch = { state: {}, props: {} };
  #debounce = null;

  connectedCallback() {
    this.state = new Proxy({}, this.#stateHandler());
    this.props = new Proxy({}, this.#propsHandler());

    this.getAttributeNames().forEach((attribute) => {
      this.props[attribute] = this.getAttribute(attribute);
    });

    this.addEventListener("component:update", this.#updateHandler.bind(this));

    this.connected?.();

    this.#observeAttributes();

    requestAnimationFrame(() => {
      if(Object.keys(this.state).length === 0) {
        this.#update();
      }
    });
  }

  #stateHandler() {
    return {
      set: (store, state, value) => {
        if(store[state] === value) {
          return true;
        }

        const oldValue = store[state];

        store[state] = value;

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
    };
  }

  #propsHandler() {
    return {
      set: (props, prop, value) => {
        if(this.getAttribute(prop) === value && !(prop in this.state)) {
          const oldValue = props[prop];

          props[prop] = value;

          this.dispatchEvent(new CustomEvent("component:update", {
            bubbles: true,
            cancelable: true,
            detail: {
              props: {
                oldProps: {[prop]: oldValue},
                newProps: {[prop]: value},
              },
            },
          }));
        }

        return true;
      },
    };
  }

  #observeAttributes() {
    const attributeChange = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if(!(mutation.attributeName in this.state) && this.props[mutation.attributeName] !== mutation.target.getAttribute(mutation.attributeName)) {
          this.props[mutation.attributeName] = mutation.target.getAttribute(mutation.attributeName);
        }
      });
    });

    attributeChange.observe(this, { attributes: true });
  }

  #updateHandler(event) {
    if(event.detail.state) {
      this.#batch.state.newState = { ...this.#batch.state.newState, ...event.detail.state.newState };
      this.#batch.state.oldState = { ...this.#batch.state.oldState, ...event.detail.state.oldState };
    }

    if(event.detail.props) {
      this.#batch.props.newProps = { ...this.#batch.props.newProps, ...event.detail.props.newProps };
      this.#batch.props.oldProps = { ...this.#batch.props.oldProps, ...event.detail.props.oldProps };
    }

    if(this.#debounce !== null) {
      cancelAnimationFrame(this.#debounce);
    }

    this.#debounce = requestAnimationFrame(this.#update.bind(this));
  }

  #update() {
    if(this.constructor.observedAttributes) {
      for(let state in this.#batch.state.newState) {
        if(!this.constructor.observedAttributes.includes(state)) {
          return;
        }

        if(typeof this.state[state] === "boolean") {
          this.toggleAttribute(state, this.state[state]);
        } else if(this.getAttribute(state) !== this.state[state]) {
          this.setAttribute(state, this.state[state]);
        }
      }
    }

    const MAIN_CSS_LINK = document.head.querySelector(`link[href*="main.css"]`).getAttribute("href");

    const template = `
      <link rel="stylesheet" href="${MAIN_CSS_LINK}">
      ${this.constructor.styles ? `
        <style>
          ${this.constructor.styles}
        </style>
      ` : ""}
      ${this.render?.()}
    `;

    diff(template, this.shadowRoot);

    this.#renderPasses++;

    if(this.#renderPasses === 1) {
      const childComponentsAreDefined = Array.from(this.shadowRoot.querySelectorAll(":not(:defined)")).map((undefinedChild) => {
        return customElements.whenDefined(undefinedChild.localName);
      });

      Promise.all(childComponentsAreDefined).then(() => {
        this.mounted?.();
        this.#callUpdateCallbacks();
      });
    } else {
      this.#callUpdateCallbacks();
    }
  }

  #callUpdateCallbacks() {
    const updateCallbacks = this.updated?.(this.#batch.state, this.#batch.props) || {};

    if("state" in updateCallbacks) {
      for(let state in updateCallbacks.state) {
        if(this.#batch.state.newState && state in this.#batch.state.newState) {
          updateCallbacks.state[state]();
        }
      }
    }

    if("props" in updateCallbacks) {
      for(let prop in updateCallbacks.props) {
        if(this.#batch.props.newProps && prop in this.#batch.props.newProps) {
          updateCallbacks.props[prop]();
        }
      }
    }

    this.#batch = {
      state: {},
      props: {},
    };
  }

  attributeChangedCallback(attribute, _oldValue, newValue) {
    if(this.state && attribute in this.state) {
      if(
        this.state[attribute] === newValue
        || (this.state[attribute] === true && newValue === "")
        || (this.state[attribute] === false && newValue === null)
      ) {
        return;
      }

      if(newValue === null && this.state[attribute] !== false) {
        this.state[attribute] = false;
      } else if(newValue === "" && this.state[attribute] !== true) {
        this.state[attribute] = true;
      } else if(this.state[attribute] !== newValue) {
        this.state[attribute] = newValue;
      }
    }
  }
}
