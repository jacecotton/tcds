import slugify from "../utilities/slugify.js";

class Icon extends HTMLElement {
  get icon() {
    return this.getAttribute("icon") || slugify(this.textContent);
  }

  set icon(value) {
    this.setAttribute("icon", value);
  }

  constructor() {
    super();
    this.attachShadow({mode: "open"});
  }

  connectedCallback() {
    if(!this.getAttribute("icon") && this.icon) {
      this.icon = this.icon;
    }
  }
}

customElements.define("tcds-icon", Icon);