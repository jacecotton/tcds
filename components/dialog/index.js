import WebComponent from "../../utilities/WebComponent/WebComponent.js";
import styles from "./style.css";

export default class Dialog extends WebComponent(HTMLElement) {
  static get observedAttributes() {
    return ["open"];
  }

  constructor() {
    super();
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  connectedCallback() {
    super.connectedCallback();
    this._upgradeProperties(["open"]);

    this.open = this.open
      && localStorage.getItem(`tcds_dialog_${this.id}_open`) !== "false";
  }

  get template() {
    return /* html */`
      <div part="dialog">
        <focus-boundary static></focus-boundary>

        <button data-is="tcds-ui-button"
          onclick="this.getRootNode().host.close()"
          variant="secondary"
          icon="only x"
        >Close dialog</button>
        <slot></slot>

        <focus-boundary static></focus-boundary>
      </div>
    `;
  }

  mountedCallback() {
    this.dialog = this.shadowRoot.querySelector("[part=dialog]");

    this.setAttribute("role", "dialog");
    this.setAttribute("aria-modal", "true");

    this.dialog.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    document.body.addEventListener("click", () => {
      this.close();
    });

    this.addEventListener("keyup", (event) => {
      if(event.key === "Escape") {
        this.close();
      }
    });
  }

  attributeChangedCallback(attribute) {
    this._requestUpdate(attribute);
  }

  #autocloseTimer = null;
  #previouslyFocused;

  updatedCallback() {
    localStorage.setItem(`tcds_dialog_${this.id}_open`, this.open.toString());
    document.body.style.overflowY = this.open ? "hidden" : null;

    this.#handleOtherComponents();

    if(this.open) {
      this.#previouslyFocused = document.activeElement;

      const target = this.querySelector("[autofocus]")
        || this.shadowRoot.querySelectorAll("focus-boundary")[1];

      console.log("focusing", target);
      target.focus();

      if(this.autoclose) {
        this.#autocloseTimer = setTimeout(() => {
          this.close();
          clearTimeout(this.#autocloseTimer);
        }, this.autoclose * 1000);
      }
    } else {
      this.#autocloseTimer && clearTimeout(this.#autocloseTimer);
      this.#previouslyFocused?.focus?.();
    }
  }

  #pausedCarousels = [];

  #handleOtherComponents() {
    const cards = this.querySelectorAll("tcds-card");
    const carousels = this.getRootNode().querySelectorAll("tcds-carousel");

    if(this.open) {
      cards?.forEach(card => card.orient());

      carousels?.forEach((carousel) => {
        if(carousel.playing) {
          carousel.pause();
          this.#pausedCarousels.push(carousel);
        }
      });
    } else {
      this.#pausedCarousels.forEach(pausedCarousel => pausedCarousel.resume());
      this.#pausedCarousels = [];
    }
  }

  get open() {
    return this.hasAttribute("open");
  }

  set open(value) {
    this.toggleAttribute("open", Boolean(value));
  }

  get autoclose() {
    return Number(this.getAttribute("autoclose")) || false;
  }

  close(value) {
    this.open = false;

    if(value) {
      this.value = value;
    } else {
      this.dispatchEvent(new Event("cancel"));
    }

    this.dispatchEvent(new CustomEvent("close", {
      detail: {
        value: value,
      },
    }));
  }

  show() {
    this.open = true;
  }
}

customElements.define("tcds-dialog", Dialog);
