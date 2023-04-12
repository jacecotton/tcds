import WebComponent from "../../utilities/WebComponent/WebComponent.js";
import styles from "./style.css";

export default class Card extends WebComponent(HTMLElement) {
  static observedAttributes = ["orientation", "action-label", "size", "variant"];

  get orientation() {
    return this.getAttribute("orientation");
  }

  set orientation(value) {
    this.setAttribute("orientation", value);
  }

  get actionLabel() {
    return this.getAttribute("action-label")?.trim() || "Read more";
  }

  set actionLabel(value) {
    this.setAttribute("action-label", value.trim());
  }

  get size() {
    return this.getAttribute("size")?.trim();
  }

  set size(value) {
    this.setAttribute("size", value.trim());
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
    const video = this.querySelector("iframe[slot=video]");
    const viPos = video?.src.indexOf("embed/") + "embed/".length;
    const vi = video?.src.slice(viPos, viPos + 11);
    const viLink = `#video-dialog-${vi}`;
    const link = this.querySelector("a[slot=title][href]")?.href;
    const title = this.querySelector("[slot=title]").textContent;
    const hasImage = !!this.querySelector("[slot=image]");
    const fullBleed = this.variant?.includes("full-bleed");

    return /* html */`
      <article part="card">
        <slot name="tag"></slot>

        ${hasImage || video ? /* html */`
          <figure>
            ${hasImage ? /* html */`
              <slot name="image"></slot>
            ` : ``}

            ${fullBleed || video ? /* html */`
              <div part="video-feature" data-theme="dark">
                ${this.variant?.includes("full-bleed") ? /* html */`
                  <slot name="title"></slot>
                ` : ``}

                ${video ? /* html */`
                  <a is="tcds-link-button" part="play-button" aria-label="Open video" title="Open video" href="${viLink}" size="x-large"><tcds-icon icon="play"></tcds-icon></a>
                ` : ``}
              </div>
            ` : ``}

            ${video && !hasImage ? /* html */`
              <img src="https://img.youtube.com/vi/${vi}/maxresdefault.jpg" alt="">
            ` : ``}
          </figure>
        ` : ``}

        <div part="content">
          <slot name="subtitle"></slot>

          ${!this.variant?.includes("full-bleed") ? /* html */`
            <slot name="title"></slot>
          ` : ``}

          <slot name="description"></slot>

          <slot name="footer">
            ${this.actionLabel !== "" && link ? /* html */`
              <footer part="footer" ${this.variant && this.variant.includes("overlay") ? `data-theme="dark"` : ""}>
                <a is="tcds-link-button" href="${link}" variant="ghost" ${this.size !== "large" ? `size="small"` : ""}>
                  ${this.actionLabel} <span class="visually-hidden">about ${title}</span>
                  <tcds-icon icon="chevron-right"></tcds-icon>
                </a>
              </footer>
            ` : ``}
          </slot>
        </div>
      </article>

      ${video ? /* html */`
        <tcds-dialog id="video-dialog-${vi}">
          <slot name="video"></slot>
        </tcds-dialog>
      ` : ``}
    `;
  }

  constructor() {
    super();
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  connectedCallback() {
    this.update();
    this._upgradeProperties(["orientation", "actionLabel", "size", "variant"]);

    if(!this.querySelector("[slot=image], [slot=video]")) {
      this.toggleAttribute("data-no-image", true);
    }

    if(!this.orientation) {
      this.orient();
      new ResizeObserver(this.orient.bind(this)).observe(document.body);
    }
  }

  attributeChangedCallback(name, oldValue) {
    this.update({[name]: oldValue});
  }

  orient() {
    const cardWidth = this.getBoundingClientRect?.().width;
    const standardBreakpoint = 600;
    const windowWidth = window.innerWidth;

    const variant = {
      overlay: this.variant && this.variant.includes("overlay"),
      fullBleed: this.variant && this.variant.includes("full-bleed"),
    };

    if(cardWidth > standardBreakpoint && !variant.overlay) {
      if(this.orientation !== "horizontal") {
        this.orientation = "horizontal";
      }
    } else if(this.orientation !== "vertical") {
      this.orientation = "vertical";
    }

    if(cardWidth === windowWidth && variant.overlay && !variant.fullBleed) {
      this.variant = [...this.variant, ...["full-bleed"]];
    }
  }
}

customElements.define("tcds-card", Card);
