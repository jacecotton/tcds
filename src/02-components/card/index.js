import {declarative, html, baseStyles, refreshProperties} from "../utilities/index.js";
import localStyles from "./styles.css";

class Card extends declarative(HTMLElement) {
  // #region Setup
  static observedAttributes = ["variant", "cta"];

  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.adoptedStyleSheets = [baseStyles, localStyles];
  }

  get template() {
    return html`
      <article ${this.variant.includes("lite") ? "" : `data-theme="light"`}>
        <figure part="image">
          <slot name="image"></slot>
        </figure>

        <div part="content">
          <slot name="title"></slot>
          <div part="description">
            <slot name="description"></slot>
            <slot></slot>
          </div>
          ${this.#has("footer") || this.cta ? html`
            <footer part="footer">
              <slot name="footer">
                ${this.cta ? html`
                  <span part="cta" aria-hidden="true">
                    ${this.cta}
                    <tcds-icon icon="caret-right"></tcds-icon>
                  </span>
                ` : ``}
              </slot>
            </footer>
          ` : ``}
          </slot>
        </div>
      </article>
    `;
  }
  // #endregion

  // #region Lifecycle
  connectedCallback() {
    refreshProperties.apply(this, ["orientation", "variant"]);
    this.requestUpdate();

    // If an orientation is not user-specified, orient it according to
    // responsive criteria.
    if(!this.orientation) {
      this.orient();
      new ResizeObserver(this.orient.bind(this)).observe(this.getRootNode().body);
    }
  }

  attributeChangedCallback(name, oldValue) {
    this.requestUpdate({[name]: oldValue});
  }
  // #endregion

  // #region Observers
  orient() {
    // By default, we want the cards vertical (image above text). However, if
    // the device is smaller (than 640px), we want them horizontal (image left
    // of text) by default. Think what cards (should) do in the map picker
    // component, when they shift beneath the map. However, cards never work
    // horizontal if the card is too small, so we'll use 300px as a sanity
    // check (below which it goes back to vertical).
    this.orientation = (this.getBoundingClientRect?.().width < 300 || window.innerWidth > 640)
      ? "vertical" : "horizontal";
  }
  // #endregion

  // #region Props and state
  get orientation() {
    return this.getAttribute("orientation")?.trim();
  }

  set orientation(value) {
    this.setAttribute("orientation", value.trim());
  }

  get cta() {
    let value = this.hasAttribute("cta") && this.getAttribute("cta").trim();

    // Provide a default label if the [cta] attribute is absent.
    if(value === false) {
      value = "Learn more";
    } else if(value === "") {
      // Do not use an action label if attribute is set specifically to empty.
      value = false;
    }

    return value;
  }

  set cta(value) {
    this.setAttribute("cta", value.trim());
  }

  get variant() {
    return (this.getAttribute("variant") || "").trim().replace(/\s\s+/g, " ").split(" ");
  }

  set variant(value) {
    if(Array.isArray(value)) {
      value = value.join(" ");
    }

    this.setAttribute("variant", value);
  }
  // #endregion

  // #region Utilities
  #has() {
    return !!this.querySelector([...arguments].map(slot => `[slot=${slot}]`).join(", "));
  }
  // #endregion
}

customElements.define("tcds-card", Card);
