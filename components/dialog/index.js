import WebComponent from "../../utilities/WebComponent/WebComponent.js";
import styles from "./style.css";

export default class Dialog extends WebComponent(HTMLElement) {
  static observedAttributes = ["open", "position"];

  #has() {
    return !!this.querySelector([...arguments].map(slot => `[slot=${slot}]`).join(", "));
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

  get anchored() {
    return window.location.hash.split(/[#?&]+/).includes(this.id);
  }

  get variant() {
    return this.getAttribute("variant")?.trim().replace(/\s\s+/g, " ").split(" ");
  }

  set variant(value) {
    if(Array.isArray(value)) {
      value = value.join(" ");
    }

    this.setAttribute("variant", value);
  }

  get template() {
    const closeButton = /* html */`
      <button is="tcds-ui-button"
        part="close"
        onclick="this.getRootNode().host.close()"
        variant="${
          this.getAttribute("position") === "right" || this.#has("header")
          ? "ui"
          : this.variant?.includes("lightbox") ?
            "ghost"
            : "secondary"
        }"
        ${this.variant?.includes("lightbox") ? `
          data-theme="dark"
          size="large"
        ` : ``}
        aria-label="Close dialog"
        title="Close dialog"
      ><tcds-icon icon="x"></tcds-icon></button>
    `;

    return /* html */`
      <focus-boundary static></focus-boundary>

      ${this.variant?.includes("lightbox") ? closeButton : ``}

      <div part="dialog">
        ${!this.variant?.includes("lightbox") ? closeButton : ``}

        ${this.#has("header") ? /* html */`
          <header>
            <slot name="header"></slot>
          </header>
        ` : ``}

        <main>
          <slot></slot>
        </main>

        ${this.#has("footer") ? /* html */`
          <footer>
            <slot name="footer"></slot>
          </footer>
        ` : ``}
      </div>

      <focus-boundary static></focus-boundary>
    `;
  }

  constructor() {
    super();
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  connectedCallback() {
    this.upgradeProperties("open");
    this.update();

    if(!this.id) {
      const dialogs = Array.from(this.getRootNode().querySelectorAll("tcds-dialog"));
      this.id = `dialog${dialogs.length > 1 ? `-${dialogs.indexOf(this) + 1}` : ""}`;
    }

    this.open = this.anchored
      || (this.open && localStorage.getItem(`tcds_dialog_${this.id}_open`) !== "false");

    this.anchor = () => {
      this.anchored && this.show();
    };

    window.addEventListener("hashchange", this.anchor);

    // For lightboxes, the dialog should have a fixed aspect ratio of that of
    // its first media element (image, video, embed, etc.)
    if(this.variant?.includes("lightbox")) {
      const firstMedia = this.querySelector("img, video, embed, iframe, picture");

      if(firstMedia) {
        const width = firstMedia.width > 0 ? firstMedia.width : firstMedia.naturalWidth;
        const height = firstMedia.height > 0 ? firstMedia.height : firstMedia.naturalHeight;
        const gcd = (x, y) => y === 0 ? x : gcd(y, x % y);
        const aspectRatio = `${width / gcd(width, height)} / ${height / gcd(width, height)}`;
        const style = new CSSStyleSheet();

        style.replaceSync(`:host {--tcds-dialog-aspect-ratio: ${aspectRatio}}`);
        this.shadowRoot.adoptedStyleSheets = [...this.shadowRoot.adoptedStyleSheets, ...[style]];
      }
    }
  }

  disconnectedCallback() {
    window.removeEventListener("hashchange", this.anchor);
  }

  attributeChangedCallback(name, oldValue) {
    this.update({[name]: oldValue});
  }

  mountedCallback() {
    this.setAttribute("role", "dialog");
    this.setAttribute("aria-modal", "true");

    this.shadowRoot.querySelector("[part=dialog]").addEventListener("click", (event) => {
      event.stopPropagation();
    });

    this.getRootNode().body.addEventListener("click", () => {
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
        this.#previouslyFocused = this.getRootNode().activeElement;

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
