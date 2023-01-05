import WebComponent from "../../scripts/WebComponent/WebComponent.js";
import slugify from "../../scripts/utilities/slugify.js";
import styles from "./style.css";

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
