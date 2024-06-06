import {declarative, refreshProperties, importSharedStyles, slugify} from "../utilities/index.js";

class Icon extends declarative(HTMLElement) {
  observedAttributes = ["icon"];

  get icon() {
    return this.getAttribute("icon") || slugify(this.textContent);
  }

  set icon(value) {
    this.setAttribute("icon", value);
  }

  get template() {
    console.log(this.textContent?.trim().length);
    
    return importSharedStyles() + `
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

customElements.define("tcds-icon", Icon);