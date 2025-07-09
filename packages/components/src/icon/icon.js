import {declarative, html, refreshProperties, slugify} from "../utilities/index.js";

export default class Icon extends declarative(HTMLElement) {
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

    `;
  }
}
