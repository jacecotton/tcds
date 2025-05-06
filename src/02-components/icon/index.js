import {declarative, refreshProperties, slugify, baseStyles, html} from "../utilities/index.js";

class TCDSIconElement extends declarative(HTMLElement) {
  static observedAttributes = ["icon"];

  get icon() {
    return this.getAttribute("icon") || slugify(this.textContent);
  }

  set icon(value) {
    this.setAttribute("icon", value);
  }

  get template() {
    return html`
      <span class="visually-hidden">
        ${this.textContent?.trim().length
          ? this.textContent
          : `${this.icon} icon`
        }
      </span>
    `;
  }

  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.adoptedStyleSheets = [baseStyles];
  }

  connectedCallback() {
    refreshProperties.apply(this, ["icon"]);
    this.requestUpdate();

    if(!this.getAttribute("icon") && this.icon) {
      this.icon = this.icon;
    }
  }

  attributeChangedCallback(name, value) {
    if(name === "icon") {
      this.requestUpdate();
    }
  }
}

customElements.define("tcds-icon", TCDSIconElement);
