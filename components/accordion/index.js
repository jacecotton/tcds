import WebComponent from "../../utilities/WebComponent/WebComponent.js";
import styles from "./style.css";
import "./section/index.js";

export default class Accordion extends WebComponent(HTMLElement) {
  static observedAttributes = ["multiple", "heading-level", "icon"];

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

  get icon() {
    return this.getAttribute("icon") || "plus-minus";
  }

  set icon(value) {
    this.setAttribute("icon", value);
  }

  get sections() {
    return Array.from(this.querySelectorAll(":scope > tcds-accordion-section"));
  }

  get template() {
    return /* html */`
      ${this.multiple ? /* html */`
        <div part="controls">
          <button is="tcds-ui-button" part="open-all" variant="ghost"
            size="small" onclick="this.getRootNode().host.showAll()">
            <tcds-icon icon="plus"></tcds-icon>
            <span class="visually-hidden">open</span> all
          </button>
          <button is="tcds-ui-button" part="close-all" variant="ghost"
            size="small" onclick="this.getRootNode().host.closeAll()">
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
  }

  attributeChangedCallback(name, oldValue) {
    this.update({[name]: name === "multiple" ? oldValue !== null : oldValue});

    if(["icon", "heading-level"].includes(name)) {
      this.sections.forEach(section => section.update({[name]: oldValue}));
    }
  }

  /**
   * Show all accordion sections.
   *
   * @param {function} filter - An optional `Array.filter` callback to run
   * against the array of accordion sections.
   */
  showAll(filter = () => true) {
    this.sections.filter(section => !section.open)
      .filter(filter).forEach(section => section.show());
  }

  /**
   * Close all accordion sections.
   *
   * @param {function} filter - An optional `Array.filter` callback to run
   * against the array of accordion sections.
   */
  closeAll(filter = () => true) {
    this.sections.filter(section => section.open)
      .filter(filter).forEach(section => section.close());
  }
}

customElements.define("tcds-accordion", Accordion);
