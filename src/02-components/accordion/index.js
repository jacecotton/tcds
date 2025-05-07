import {LitElement, html} from "lit";

export class TCDSAccordionElement extends LitElement {
  static properties = {
    multiple: {type: Boolean},
  };

  constructor() {
    super();
    this.multiple = false;

  }

  render() {
    return html`
      <slot></slot>
    `;
  }
  // #endregion

  // #region Lifecycle
  // #endregion

  // #region Props and state
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
