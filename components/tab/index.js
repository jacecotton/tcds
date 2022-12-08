import WebComponent from "../../scripts/WebComponent/WebComponent.js";
import styles from "./style.css";

import slugify from "../../scripts/utilities/slugify.js";

export default class Tab extends WebComponent(HTMLElement) {
  static get observedAttributes() {
    return ["active"];
  }

  static state = {
    active: "boolean",
  };

  static props = {
    label: "string",
  };

  connected() {
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  render() {
    return /* html */`
      <section
        role="tabpanel"
        id="${slugify(this.props.label)}-panel"
        aria-labelledby="${slugify(this.props.label)}-tab"
        ${this.state.active ? "" : "hidden"}
      >
        <slot></slot>
      </section>
    `;
  }
}

customElements.define("tcds-tab", Tab);
