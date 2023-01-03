import WebComponent from "../../scripts/WebComponent/WebComponent.js";
import styles from "./style.css";

import slugify from "../../scripts/utilities/slugify.js";

export default class Icon extends WebComponent(HTMLElement) {
  connectedCallback() {
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  render() {
    return /* html */`
      <div part="icon" style="--tcds-icon: var(--tcds-icon-${this.props.icon || slugify(this.innerHTML)})"></div>
    `;
  }
}

customElements.define("tcds-icon", Icon);
