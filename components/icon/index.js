import slugify from "../../utilities/string-utils/slugify.js";

export default class Icon extends HTMLElement {
  get icon() {
    return this.getAttribute("icon") || slugify(this.textContent);
  }

  constructor() {
    super();
    // We're attaching a shadow root here so that content placed between
    // `tcds-icon` tags are not rendered (unless the component fails to define).
    this.attachShadow({mode: "open"});
  }

  connectedCallback() {
    if(!this.getAttribute("icon") && this.icon) {
      this.setAttribute("icon", this.icon);
    }
  }
}

customElements.define("tcds-icon", Icon);
