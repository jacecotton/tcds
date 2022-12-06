import WebComponent from "../../scripts/WebComponent/WebComponent.js";
import styles from "./style.css";

import getFocusableChildren from "../../scripts/utilities/getFocusableChildren.js";

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

  connected() {
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

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
}

customElements.define("tcds-dialog", Dialog);
