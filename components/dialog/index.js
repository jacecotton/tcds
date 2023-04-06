import WebComponent from "../../utilities/WebComponent/WebComponent.js";
import styles from "./style.css";

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

  get anchored() {
    return window.location.hash.split(/[#?&]+/).includes(this.id);
  }

  constructor() {
    super();
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  connectedCallback() {
    this.update();
    this._upgradeProperties(["open"]);

    this.open = this.anchored
      || (this.open && localStorage.getItem(`tcds_dialog_${this.id}_open`) !== "false");

    this.anchor = () => {
      this.anchored && this.show();
    };

    window.addEventListener("hashchange", this.anchor);
  }

  disconnectedCallback() {
    window.removeEventListener("hashchange", this.anchor);
  }

  attributeChangedCallback(name, oldValue) {
    this.update({[name]: oldValue});
  }

  get template() {
    this.hasHeader = !!this.querySelector("[slot=header]");
    this.hasFooter = !!this.querySelector("[slot=footer]");
    this.hasVideo = !!this.querySelector("iframe[src*='youtube'], video, slot[name=video]");

    return /* html */`
      <div part="dialog" ${this.hasVideo ? `data-has-video` : ""}>
        <focus-boundary static></focus-boundary>

        <button is="tcds-ui-button"
          part="close"
          onclick="this.getRootNode().host.close()"
          variant="${this.getAttribute("position") === "right" || this.hasHeader ? "ui" : "secondary"}"
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

        <main>
          <slot></slot>
        </main>

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
    this.setAttribute("role", "dialog");
    this.setAttribute("aria-modal", "true");

    this.shadowRoot.querySelector("[part=dialog]").addEventListener("click", (event) => {
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
        this.update({[slot.name]: slot.assignedNodes()});
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

        (
          this.querySelector("[autofocus]")
          || this.shadowRoot.querySelectorAll("focus-boundary")[1]
        ).focus();

        if(this.autoclose) {
          this.#autocloseTimer = setTimeout(() => {
            this.close();
            clearTimeout(this.#autocloseTimer);
          }, this.autoclose * 1000);
        }
      } else {
        this.#autocloseTimer && clearTimeout(this.#autocloseTimer);
        this.#previouslyFocused?.focus?.();

        if(this.anchored) {
          window.history.replaceState(null, null, " ");
        }
      }
    }
  }

  #pausedCarousels = [];

  #handleOtherComponents() {
    if(this.open) {
      // Responsively orient cards. Note this is only necessary while responsive
      // container queries are not used. Can remove when we move to that.
      this.querySelectorAll("tcds-card")?.forEach(card => card.orient());

      // Pause all external carousels on the page.
      this.getRootNode().querySelectorAll("tcds-carousel")?.forEach((carousel) => {
        if(carousel.playing) {
          carousel.pause();
          this.#pausedCarousels.push(carousel);
        }
      });
    } else {
      // Resume paused external carousels.
      this.#pausedCarousels.forEach(pausedCarousel => pausedCarousel.resume());
      this.#pausedCarousels = [];

      // Pause internal videos.
      this.querySelectorAll("video")?.forEach(video => video.pause());

      this.querySelectorAll("iframe[src*=youtube]")?.forEach((video) => {
        // For YouTube embeds, rather than worry about keeping up with current
        // APIs and ensuring JS APIs are enabled in the embed URL, we can trick
        // the embed into pausing by "refreshing" the `src` attribute.
        const src = video.src;
        video.src = src;
      });
    }
  }

  close(value) {
    this.open = false;

    if(value) {
      this.value = value;
    } else {
      this.dispatchEvent(new Event("cancel"));
    }

    this.dispatchEvent(new CustomEvent("close", {detail: {value: value}}));
  }

  show() {
    this.open = true;
  }
}

customElements.define("tcds-dialog", Dialog);
