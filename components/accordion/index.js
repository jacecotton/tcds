import WebComponent from "../../scripts/WebComponent/WebComponent.js";
import shadowStyles from "./style.css";
import lightStyles from "./style.light.css";

/**
 * @todo Add deep linking.
 */

export default class Accordion extends WebComponent(HTMLElement) {
  static props = {
    multiple: {
      type: Boolean,
      default: false,
    },

    "heading-level": {
      type: String,
      default: "3",
    },
  };

  constructor() {
    super();

    this.shadowRoot.adoptedStyleSheets = [shadowStyles];
    this.getRootNode().adoptedStyleSheets = [...this.getRootNode().adoptedStyleSheets, ...[lightStyles]];
  }

  connectedCallback() {
    // Add auto-incrementing unique IDs to each accordion instance.
    const accordions = Array.from(document.querySelectorAll("tcds-accordion"));
    this.id = `accordion${accordions.length > 1 ? `-${accordions.indexOf(this) + 1}` : ""}`;

    this.sections = Array.from(this.querySelectorAll("tcds-accordion-section"));
  }

  render() {
    return /* html */`
      ${this.props.multiple ? /* html */`
        <div part="controls">
          <tcds-button part="open-all" variant="ui" size="small" icon="plus" onclick="this.getRootNode().host.openAll()"><span class="visually-hidden">open</span> all</tcds-button>
          <tcds-button part="close-all" variant="ui" size="small" icon="minus" onclick="this.getRootNode().host.closeAll()"><span class="visually-hidden">close</span> all</tcds-button>
        </div>
      ` : ``}
      <slot></slot>
    `;
  }

  openAll() {
    this.sections.forEach(section => section.open());
  }

  closeAll() {
    this.sections.forEach(section => section.close());
  }
}

customElements.define("tcds-accordion", Accordion);
