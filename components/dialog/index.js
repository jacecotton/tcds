import WebComponent from "../../scripts/WebComponent/WebComponent.js";
import getFocusableChildren from "./getFocusableChildren.js";
import styles from "./style.css";

export default class Dialog extends WebComponent(HTMLElement, { delegatesFocus: true }) {
  static state = {
    open: {
      type: Boolean,
      reflected: true,
    },
  };

  static props = {
    autoclose: {type: Number},
  };

  connectedCallback() {
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

  mountedCallback() {
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

    this.addEventListener("keyup", (event) => {
      if(event.key === "Escape") {
        this.state.open = false;
      }
    });

    this.addEventListener("keydown", (event) => {
      if(event.key === "Tab") {
        if(event.shiftKey) {
          if(document.activeElement === this) {
            this.lastFocusableChild.focus();
            event.preventDefault();
          } else if(document.activeElement === this.firstFocusableChild) {
            this.parts["close"].focus();
            event.preventDefault();
          }
        } else {
          if(document.activeElement === this) {
            this.firstFocusableChild.focus();
            event.preventDefault();
          } else if(document.activeElement === this.lastFocusableChild) {
            this.parts["close"].focus();
            event.preventDefault();
          }
        }
      }
    });

    this.controllers?.forEach((controller) => {
      controller.addEventListener("click", (event) => {
        event.stopPropagation();
        this.state.open = !this.state.open;
      });
    });
  }

  updatedCallback() {
    return {
      state: {
        open: () => {
          localStorage.setItem(`tcds_dialog_${this.id}_state`, this.state.open ? "open" : "closed");

          this.hidden = !this.state.open;
          document.body.style.overflowY = this.state.open ? "hidden" : null;

          this.controllers?.forEach((controller) => {
            controller.setAttribute(controller.hasAttribute("controls") ? "expanded" : "aria-expanded", this.state.open);
          });

          if(this.state.open) {
            this.focusableChildren = getFocusableChildren(this);
            this.firstFocusableChild = this.focusableChildren[0] || this.parts["close"];
            this.lastFocusableChild = this.focusableChildren[this.focusableChildren.length - 1] || this.parts["close"];
            this.previouslyFocused = document.activeElement;

            const target = this.querySelector("[autofocus]") || this.firstFocusableChild;

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
