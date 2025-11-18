import {declarative, html, refreshProperties, slugify, baseStyles} from "@shared/index.js";
import styles from "./icon.css" with {type: "css"};

export default class TCDSIconElement extends declarative(HTMLElement) {
  static observedAttributes = ["icon", "category"];

  get icon() {
    return this.getAttribute("icon") || slugify(this.textContent);
  }

  set icon(value) {
    this.setAttribute("icon", value);
  }

  get category() {
    return this.getAttribute("category");
  }

  set category(value) {
    this.setAttribute("category", value);
  }

  get template() {
    return html`
      <span part="icon" class="
        tcds-icon--${this.icon}
        ${this.category ? `tcds-icon--${category}` : ``}
      ">
        <span class="visually-hidden">
          ${this.textContent?.trim().length
            ? this.textContent
            : `${this.icon} icon`
          }
        </span>
      </span>
    `;
  }

  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.adoptedStyleSheets = [baseStyles, styles];
  }

  connectedCallback() {
    refreshProperties.apply(this, ["icon", "category"]);
    this.requestUpdate();

    if(!this.getAttribute("icon") && this.icon) {
      this.icon = this.icon;
    }
  }

  attributeChangedCallback(_name, _value) {
    this.requestUpdate();
  }
}

customElements.define("tcds-icon", TCDSIconElement);
