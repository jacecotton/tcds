import WebComponent from "../../scripts/WebComponent/WebComponent.js";
import slugify from "../../scripts/utilities/slugify.js";
import styles from "./style.css";

export default class Tab extends WebComponent(HTMLElement) {
  static state = {
    active: {
      type: Boolean,
      reflected: true,
    },
  };

  static props = {
    label: {type: String},
  };

  connectedCallback() {
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
