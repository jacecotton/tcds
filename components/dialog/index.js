import WebComponent from "../../utilities/WebComponent/WebComponent.js";
import shadowStyles from "./style.css";
import lightStyles from "./style.light.css";

export default class Dialog extends WebComponent(HTMLElement) {
  static observedAttributes = ["open", "position"];

  get open() {
    return this.hasAttribute("open");
  }

  set open(value) {
    this.toggleAttribute("open", Boolean(value));
  }

  get autoclose() {
    return Number(this.getAttribute("autoclose")) || false;
  }

  get position() {
    return this.getAttribute("position");
  }

  constructor() {
    super();
    this.shadowRoot.adoptedStyleSheets = [shadowStyles];
  }

  connectedCallback() {
    super.connectedCallback();
    this.getRootNode().adoptedStyleSheets = [...this.getRootNode().adoptedStyleSheets, ...[lightStyles]];

    this._upgradeProperties(["open"]);

    this.open = this.open
      && localStorage.getItem(`tcds_dialog_${this.id}_open`) !== "false";
  }

  get template() {
    this.hasHeader = !!this.querySelector("[slot=header]");
    this.hasFooter = !!this.querySelector("[slot=footer]");

    return /* html */`
      <div part="dialog">
        <focus-boundary static></focus-boundary>

        <button is="tcds-ui-button"
          part="close"
          onclick="this.getRootNode().host.close()"
          variant="${this.position === "right" || this.hasHeader ? "ui" : "secondary"}"
          aria-label="Close dialog"
          title="Close dialog"
        >
          <tcds-icon icon="x"></tcds-icon>
        </button>

        ${this.hasHeader ? /* html */`
          <header>
            <slot name="header"></slot>
          </header>
        ` : ``}

        <div part="content">
          <slot></slot>
        </div>

        ${this.hasFooter ? /* html */`
          <footer>
            <slot name="footer"></slot>
          </footer>
        ` : ``}

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

    this.shadowRoot.querySelectorAll("slot").forEach((slot) => {
      slot.addEventListener("slotchange", () => {
        this._requestUpdate(slot.name);
      });
    });
  }

  #autocloseTimer = null;
  #previouslyFocused;

  updatedCallback(old) {
    if("open" in old) {
      localStorage.setItem(`tcds_dialog_${this.id}_open`, this.open.toString());
      document.body.style.overflowY = this.open ? "hidden" : null;

      this.#handleOtherComponents();

      if(this.open) {
        this.#previouslyFocused = document.activeElement;

        const target = this.querySelector("[autofocus]")
          || this.shadowRoot.querySelectorAll("focus-boundary")[1];
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
