import WebComponent from "../WebComponent/WebComponent.js";
import slugify from "../utilities/slugify.js";

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

  static get styles() {
    return /* css */`
      [role="tabpanel"] {
        padding: var(--tcds-tab-padding-top, var(--tcds-space-normal)) 0 0;
      }
    `;
  }
}

customElements.define("tcds-tab", Tab);
