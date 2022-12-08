import WebComponent from "../../scripts/WebComponent/WebComponent.js";
import styles from "./style.css";

import slugify from "../../scripts/utilities/slugify.js";

export default class Icon extends WebComponent(HTMLElement) {
  connected() {
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  render() {
    this.icon = this.props.icon || slugify(this.innerHTML);

    return /* html */`
      <div part="icon" style="--tcds-icon: var(--tcds-icon-${this.icon})"></div>
    `;
  }
}

customElements.define("tcds-icon", Icon);
