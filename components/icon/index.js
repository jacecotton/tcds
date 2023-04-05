import slugify from "../../utilities/string-utils/slugify.js";

export default class Icon extends HTMLElement {
  constructor() {
    super();
    // We're attaching a shadow root here so that content placed between
    // `tcds-icon` tags are not rendered (unless the component fails to define).
    this.attachShadow({mode: "open"});
  }

  connectedCallback() {
    if(!this.getAttribute("icon")) {
      this.setAttribute("icon", slugify(this.textContent));
    }
  }
}

customElements.define("tcds-icon", Icon);
