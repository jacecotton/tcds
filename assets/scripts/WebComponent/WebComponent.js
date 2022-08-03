import diff from "@tcds/utilities/diff.js";

export default class WebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.state = new Proxy({}, this.stateHandler());
    this.props = new Proxy({}, this.propsHandler());

    this.getAttributeNames().forEach((attribute) => {
      this.props[attribute] = this.getAttribute(attribute);
    });

    this.observeAttributes();

    this.renderPasses = 0;

    this.batch = {
      state: {},
      props: {},
    };

    this.debounce = null;

    this.addEventListener("component:update", this.updateHandler.bind(this));

    this.connected();

    requestAnimationFrame(() => {
      if(Object.keys(this.state).length === 0) {
        this.update();
      }
    });
  }

  stateHandler() {
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

  propsHandler() {
    return {
      set: (props, prop, value) => {
        if(this.getAttribute(prop) === value) {
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

  observeAttributes() {
    const attributeChange = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if(this.props[mutation.attributeName] !== mutation.target.getAttribute(mutation.attributeName)) {
          this.props[mutation.attributeName] = mutation.target.getAttribute(mutation.attributeName);
        }
      });
    });

    attributeChange.observe(this, { attributes: true });
  }

  updateHandler(event) {
    if(event.detail.state) {
      this.batch.state.newState = { ...this.batch.state.newState, ...event.detail.state.newState };
      this.batch.state.oldState = { ...this.batch.state.oldState, ...event.detail.state.oldState };
    }

    if(event.detail.props) {
      this.batch.props.newProps = { ...this.batch.props.newProps, ...event.detail.props.newProps };
      this.batch.props.oldProps = { ...this.batch.props.oldProps, ...event.detail.props.oldProps };
    }

    if(this.debounce !== null) {
      cancelAnimationFrame(this.debounce);
    }

    this.debounce = requestAnimationFrame(this.update.bind(this));
  }

  update() {
    const template = `
      <link rel="stylesheet" href="${window.TCDS_STATIC_PATH || ""}/styles/main.css">
      <style>
        ${this.styles}
      </style>
      ${this.render()}
    `;

    diff(template, this.shadowRoot);

    this.renderPasses++;

    if(this.renderPasses === 1) {
      const childComponentsAreDefined = Array.from(this.shadowRoot.querySelectorAll(":not(:defined)")).map((undefinedChild) => {
        return customElements.whenDefined(undefinedChild.localName);
      });

      Promise.all(childComponentsAreDefined).then(() => {
        this.mounted();
        this.updateProceed();
      });
    } else {
      this.updateProceed();
    }
  }

  updateProceed() {
    const updateHandlers = this.updated(this.batch.state, this.batch.props);

    if(updateHandlers && updateHandlers.state) {
      for(let handler in updateHandlers.state) {
        if(this.batch.state.newState && handler in this.batch.state.newState) {
          updateHandlers.state[handler]();
        }
      }
    }

    if(updateHandlers && updateHandlers.props) {
      for(let handler in updateHandlers.props) {
        if(this.batch.props.newProps && handler in this.batch.props.newProps) {
          updateHandlers.props[handler]();
        }
      }
    }

    this.batch = {
      state: {},
      props: {},
    };
  }

  render() {
    return "";
  }

  connected() {
    return;
  }

  updated() {
    return {};
  }

  mounted() {
    return;
  }

  get styles() {
    return "";
  }
}
