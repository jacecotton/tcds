import {declarative, html, baseStyles} from "../utilities/index.js";
import localStyles from "./style.css";

class Section extends declarative(HTMLElement) {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.adoptedStyleSheets = [baseStyles, localStyles];
  }

  get template() {
    return html`
      <section class="max-width">
        <div part="primary">
          <slot name="primary"></slot>
          <slot></slot>
          ${this.#has("cta") ? html`
            <nav part="cta">
              <slot name="cta"></slot>
            </nav>
          ` : ``}
        </div>
        ${this.#has("secondary") ? html`
          <div part="secondary">
            <slot name="secondary"></slot>
          </div>
        ` : ``}
      </section>
    `;
  }

  connectedCallback() {
    this.requestUpdate();
  }

  // #region Utilities
  #has() {
    return !!this.querySelector([...arguments].map(slot => `[slot=${slot}]`).join(", "));
  }
  // #endregion
}

customElements.define("tcds-section", Section);
