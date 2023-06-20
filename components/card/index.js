import WebComponent from "../../utilities/WebComponent/WebComponent.js";
import styles from "./style.css";

export default class Card extends WebComponent(HTMLElement) {
  static observedAttributes = ["orientation", "action-label", "size", "variant"];

  #has() {
    return !!this.querySelector([...arguments].map(slot => `[slot=${slot}]`).join(", "));
  }

  get orientation() {
    return this.getAttribute("orientation");
  }

  set orientation(value) {
    this.setAttribute("orientation", value);
  }

  get actionLabel() {
    let value = this.hasAttribute("action-label") && this.getAttribute("action-label").trim();

    if(value === false) {
      value = "Read more";
    } else if(value === "") {
      value = false;
    }

    return value;
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
    const link = this.querySelector("a[slot=title][href]")?.href;
    const title = this.querySelector("[slot=title]")?.textContent;

    return /* html */`
      <article part="card">
        ${this.#has("image") ? /* html */`
          <slot name="tag"></slot>
          <figure>
            <slot name="image"></slot>
          </figure>
        ` : ``}

        <div part="content">
          <slot name="pretitle"></slot>
          <slot name="title"></slot>
          <slot name="description"></slot>
          <slot></slot>

          <slot name="footer">
            ${this.actionLabel && link ? /* html */`
              <footer part="footer" ${this.variant && this.variant.includes("overlay") ? `data-theme="dark"` : ``}>
                <a is="tcds-link-button" href="${link}" variant="secondary" ${this.size !== "large" ? `size="small"` : ``}>
                  ${this.actionLabel} <span class="visually-hidden">about ${title}</span>
                  <tcds-icon icon="chevron-right"></tcds-icon>
                </a>
              </footer>
            ` : ``}
          </slot>
        </div>
      </article>
    `;
  }

  constructor() {
    super();
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  connectedCallback() {
    this.upgradeProperties("orientation", "actionLabel", "size", "variant");
    this.update();

    if(!this.#has("image")) {
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
    if(this.getBoundingClientRect?.().width > 600 && !this.variant?.includes("overlay")) {
      if(this.orientation !== "horizontal") {
        this.orientation = "horizontal";
      }
    } else if(this.orientation !== "vertical") {
      this.orientation = "vertical";
    }
  }
}

customElements.define("tcds-card", Card);
