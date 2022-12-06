import WebComponent from "../../scripts/WebComponent/WebComponent.js";
import shadowStyles from "./style.css";
import lightStyles from "./style.light.css";

/**
 * @todo Add deep linking.
 */

export default class Accordion extends WebComponent(HTMLElement) {
  static props = {
    "multiple": "boolean",
  };

  connected() {
    this.shadowRoot.adoptedStyleSheets = [shadowStyles];
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, ...[lightStyles]];

    this.sections = Array.from(this.querySelectorAll("tcds-accordion-section"));
  }

  render() {
    return /* html */`
      ${this.props.multiple ? /* html */`
        <div part="controls">
          <tcds-button part="expand-all" variant="ui" size="small" icon="plus" onclick="this.getRootNode().host.expandAll()"><span class="visually-hidden">expand</span> all</tcds-button>
          <tcds-button part="collapse-all" variant="ui" size="small" icon="minus" onclick="this.getRootNode().host.collapseAll()"><span class="visually-hidden">collapse</span> all</tcds-button>
        </div>
      ` : ``}
      <slot></slot>
    `;
  }

  expandAll() {
    this.sections.forEach(section => section.expand());
  }

  collapseAll() {
    this.sections.forEach(section => section.collapse());
  }
}

customElements.define("tcds-accordion", Accordion);

(function() {
  document.querySelectorAll("tcds-accordion")?.forEach((accordion, index, array) => {
    if(!accordion.id) {
      accordion.id = `accordion${array.length > 1 ? `-${index + 1}` : ""}`;
    }
  });
}());
