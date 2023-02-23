import WebComponent from "../../utilities/WebComponent/WebComponent.js";
import styles from "./style.css";

export default class Dialog extends WebComponent(HTMLElement, {delegatesFocus: true}) {
  static state = {
    open: {
      type: Boolean,
      reflected: true,
    },
  };

  static props = {
    autoclose: {type: Number},
  };

  constructor() {
    super();
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  render() {
    // Note on the focus boundaries: When the end boundary receives focus, we
    // want to shift focus to the close button, which is inside the shadow root,
    // therefore we `focusFirstOf` the root node (which will be the close
    // button). Conversely, when the start boundary receives focus, we want to
    // shift focus to the last focusable element of whatever is provided in the
    // default slot, so we `focusLastOf` the root node's *host* element,
    // `tcds-dialog`.
    return /* html */`
      <div part="dialog">
        <tcds-focus-boundary onfocus="this.focusLastOf(this.getRootNode().host)" tabindex="0"></tcds-focus-boundary>

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

        <tcds-focus-boundary onfocus="this.focusFirstOf(this.getRootNode())" tabindex="0"></tcds-focus-boundary>
      </div>
    `;
  }

  mountedCallback() {
    this.dialog = this.shadowRoot.querySelector("[part~=dialog]");

    this.state.open = this.hasAttribute("open")
      && localStorage.getItem(`tcds_dialog_${this.id}_state`) !== "closed";

    this.controllers = document.querySelectorAll(`[aria-controls=${this.id}], [controls=${this.id}]`);

    this.setAttribute("role", "dialog");
    this.setAttribute("aria-modal", "true");

    document.body.addEventListener("click", () => {
      this.state.open = false;
    });

    this.dialog.addEventListener("click", (event) => {
      event.stopPropagation();
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

  autcloseTimer = null;

  updatedCallback(state) {
    if(state.newState) {
      if("open" in state.newState) {
        localStorage.setItem(`tcds_dialog_${this.id}_state`, this.state.open ? "open" : "closed");

        this.hidden = !this.state.open;
        document.body.style.overflowY = this.state.open ? "hidden" : null;

        this.controllers?.forEach((controller) => {
          controller.setAttribute(controller.hasAttribute("controls") ? "expanded" : "aria-expanded", this.state.open);
        });

        this.handleOtherComponents(state.newState);

        if(this.state.open) {
          this.previouslyFocused = document.activeElement;

          const target = this.querySelector("[autofocus]") || this.shadowRoot.querySelectorAll("tcds-focus-boundary")[1];
          target.focus();

          if(this.props.autoclose) {
            this.autocloseTimer = setTimeout(() => {
              this.close();
              clearTimeout(this.autocloseTimer);
            }, this.props.autoclose * 1000);
          }
        } else {
          clearTimeout(this.autocloseTimer);
          this.previouslyFocused?.focus?.();
        }
      }
    }
  }

  pausedCarousels = [];

  handleOtherComponents(state) {
    const cards = this.querySelectorAll("tcds-card");
    const carousels = document.querySelectorAll("tcds-carousel");

    if(state.open) {
      cards?.forEach(card => card.orient());

      carousels?.forEach((carousel) => {
        if(carousel.state.playing) {
          carousel.pause();
          this.pausedCarousels.push(carousel);
        }
      });
    } else {
      this.pausedCarousels.forEach(pausedCarousel => pausedCarousel.resume());
      this.pausedCarousels = [];
    }
  }

  close() {
    this.state.open = false;
  }

  open() {
    this.state.open = true;
  }
}

customElements.define("tcds-dialog", Dialog);
