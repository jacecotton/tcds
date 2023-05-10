import WebComponent from "../../utilities/WebComponent/WebComponent.js";
import styles from "./style.css";

export default class Accordion extends WebComponent(HTMLElement) {
  static observedAttributes = ["multiple", "heading-level"];

  get multiple() {
    return this.hasAttribute("multiple");
  }

  set multiple(value) {
    this.toggleAttribute("multiple", Boolean(value));
  }

  get headingLevel() {
    return this.getAttribute("heading-level") || "3";
  }

  set headingLevel(value) {
    this.setAttribute("heading-level", value);
  }

  get sections() {
    return Array.from(this.querySelectorAll("tcds-accordion-section"));
  }

  get template() {
    return /* html */`
      ${this.multiple ? /* html */`
        <div part="controls">
          <button is="tcds-ui-button" part="open-all" variant="ghost" size="small" onclick="this.getRootNode().host.showAll()">
            <tcds-icon icon="plus"></tcds-icon>
            <span class="visually-hidden">open</span> all
          </button>
          <button is="tcds-ui-button" part="close-all" variant="ghost" size="small" onclick="this.getRootNode().host.closeAll()">
            <tcds-icon icon="minus"></tcds-icon>
            <span class="visually-hidden">close</span> all
          </button>
        </div>
      ` : ``}
      <slot></slot>
    `;
  }

  constructor() {
    super();
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  connectedCallback() {
    this.upgradeProperties("multiple", "headingLevel");
    this.update();

    if(!this.id) {
      const accordions = Array.from(this.getRootNode().querySelectorAll("tcds-accordion"));
      this.id = `accordion${accordions.length > 1 ? `-${accordions.indexOf(this) + 1}` : ""}`;
    }
  }

  attributeChangedCallback(name, oldValue) {
    this.update({[name]: name === "multiple" ? oldValue !== null : oldValue});
  }

  showAll() {
    this.sections.forEach(section => section.show());
  }

  closeAll() {
    this.sections.forEach(section => section.close());
  }
}

customElements.define("tcds-accordion", Accordion);
