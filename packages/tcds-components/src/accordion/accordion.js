import {declarative, baseStyles, refreshProperties, html} from "@shared";
import localStyles from "./accordion.css" with {type: "css"};

export default class TCDSAccordionElement extends declarative(HTMLElement) {
  // #region Setup
  static observedAttributes = ["multiple"];

  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.adoptedStyleSheets = [baseStyles, localStyles];
  }

  get template() {
    return html`
      ${this.multiple ? html`
        <div part="controls">
          <button part="open-all" onclick="this.getRootNode().host.showAll()">
            <tcds-icon icon="plus"></tcds-icon>
            <span class="visually-hidden">open</span> all
          </button>
          <button part="close-all" onclick="this.getRootNode().host.closeAll()">
            <tcds-icon icon="minus"></tcds-icon>
            <span class="visually-hidden">close</span> all
          </button>
        </div>
      ` : ``}
      <slot></slot>
    `;
  }
  // #endregion

  // #region Lifecycle
  connectedCallback() {
    refreshProperties.apply(this, ["multiple"]);
    this.requestUpdate();
  }

  attributeChangedCallback(name, old) {
    this.requestUpdate({[name]: old});
  }
  // #endregion

  // #region Props and state
  get multiple() {
    return this.hasAttribute("multiple");
  }

  set multiple(value) {
    this.toggleAttribute("multiple", Boolean(value));
  }

  get sections() {
    return Array.from(this.querySelectorAll(":scope > tcds-accordion-section"));
  }
  // #endregion

  // #region Public API
  /**
   * Open all sections belonging to this accordion.
   *
   * @param {Boolean} filter An optional filter to exclude sections from opening
   * given custom criteria.
   */
  showAll(filter = () => true) {
    this.sections.filter(section => !section.open)
      .filter(filter).forEach(section => section.show());
  }

  /**
   * Close all sections belonging to this accordion.
   *
   * @param {Boolean} filter An optional filter to exclude sections from closing
   * given custom criteria.
   */
  closeAll(filter = () => true) {
    this.sections.filter(section => section.open)
      .filter(filter).forEach(section => section.close());
  }
}

customElements.define("tcds-accordion", TCDSAccordionElement);
