import WebComponent from "../WebComponent/WebComponent.js";
import getFocusableChildren from "../utilities/getFocusableChildren.js";

export default class Dialog extends WebComponent(HTMLElement) {
  static get observedAttributes() {
    return ["open"];
  }

  static state = {
    "open": "boolean",
  };

  static props = {
    "autoclose": "number",
  };
  
  render() {
    return /* html */`
      <div part="dialog">
        <tcds-button
          part="close"
          controls="${this.id}"
          expanded="${this.state.open}"
          label="Close dialog"
          icon="only x"
          variant="secondary"
          onclick="this.getRootNode().host.close()"
        ></tcds-button>
        <slot></slot>
      </div>
    `;
  }

  mounted() {
    this.state.open = this.hasAttribute("open")
      && localStorage.getItem(`tcds_dialog_${this.id}_state`) !== "closed";

    this.controllers = document.querySelectorAll(`[aria-controls=${this.id}], [controls=${this.id}]`);

    this.setAttribute("role", "dialog");
    this.setAttribute("aria-modal", "true");

    document.body.addEventListener("click", () => {
      this.state.open = false;
    });

    this.parts["dialog"].addEventListener("click", (event) => {
      event.stopPropagation();
    });

    const focusableChildren = getFocusableChildren(this);
    const lastIndex = focusableChildren.length - 1;

    this.addEventListener("keydown", (event) => {
      if(event.key === "Tab") {
        const focusedItemIndex = focusableChildren.indexOf(document.activeElement);
        const focusedOnCloseButton = document.activeElement === this;

        if(focusedOnCloseButton) {
          focusableChildren[event.shiftKey ? lastIndex : 0].focus();
          event.preventDefault();
        } else if(focusedItemIndex === (event.shiftKey ? 0 : lastIndex)) {
          this.parts["close"].focus();
          event.preventDefault();
        }
      }
    });

    this.addEventListener("keyup", (event) => {
      if(event.key === "Escape") {
        this.state.open = false;
      }
    });

    this.controllers?.forEach((controller) => {
      controller.addEventListener("click", (event) => {
        event.stopPropagation();
        this.state.open = !this.state.open;
      });
    });
  }

  updated() {
    return {
      state: {
        "open": () => {
          localStorage.setItem(`tcds_dialog_${this.id}_state`, this.state.open ? "open" : "closed");

          this.hidden = !this.state.open;
          document.body.style.overflowY = this.state.open ? "hidden" : null;

          this.controllers?.forEach((controller) => {
            controller.setAttribute(controller.hasAttribute("controls") ? "expanded" : "aria-expanded", this.state.open);
          });
          
          if(this.state.open) {
            const focusableChildren = getFocusableChildren(this);
            const firstFocusableElement = focusableChildren[0] || this.parts["close"];
            const target = this.querySelector("[autofocus]") || firstFocusableElement;
            
            this.previouslyFocused = document.activeElement;
            target.focus();

            if(this.props.autoclose) {
              setTimeout(() => {
                this.close();
              }, this.props.autoclose * 1000);
            }
          } else {
            this.previouslyFocused?.focus?.();
          }
        },
      },
    };
  }

  close() {
    this.state.open = false;
  }

  open() {
    this.state.open = true;
  }

  static get styles() {
    return /* css */`
      :host {
        --tcds-dialog-padding: var(--tcds-space-x-loose);
        
        display: none;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: var(--tcds-layer-dialog);
        background-color: var(--tcds-color-shade-strong);
        justify-content: center;
        align-items: center;
        overscroll-behavior: none;
        backdrop-filter: blur(0.5px);
      }

      :host([open]) {
        display: flex;
        animation: fade-in var(--tcds-animation-productive-duration) var(--tcds-animation-productive-easing) forwards;
      }

      :host([open]) [part="dialog"] {
        animation: slide-in-down var(--tcds-animation-expressive-duration) var(--tcds-animation-expressive-easing) forwards;
      }

      [part="dialog"] {
        background-color: var(--tcds-dialog-background, #fff);
        width: calc(100vw - var(--site-outer-gutter) * 2);
        overflow-wrap: break-word;
        padding: var(--tcds-dialog-padding);
        position: relative;
        z-index: 1;
        border-radius: 10px;
      }

      @media (min-width: 1024px) {
        [part="dialog"] {
          width: var(--tcds-dialog-base-width, fit-content);
          min-width: var(--tcds-dialog-min-width, 500px);
          max-width: var(--tcds-dialog-max-width, 30vw);
        }
      }

      [part="close"] {
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(50%, -50%);
        z-index: 1;
      }
    `;
  }
}

customElements.define("tcds-dialog", Dialog);
