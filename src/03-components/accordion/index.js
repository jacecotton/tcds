import {declarative, importSharedStyles, refreshProperties} from "../utilities/index.js";
import styles from "./style.css";

class Accordion extends declarative(HTMLElement) {
  static observedAttributes = ["multiple", "heading-level"];

  get multiple() {
    return this.hasAttribute("multiple");
  }

  set multiple(value) {
    this.toggleAttribute("multiple", Boolean(value));
  }

  get headingLevel() {
    return this.getAttribute("heading-level") || 3;
  }

  set headingLevel(value) {
    this.setAttribute("heading-level", value);
  }

  /**
   * Sections can either be marked up with the `tcds-accordion-section` custom
   * element, or this component can construct those out of `article` or
   * `section` descendants with headings.
   */
  get sections() {
    // Given `tcds-accordion-section` children...
    const slottedSections = this.querySelectorAll(":scope > tcds-accordion-section");
    // Given `article` or `section` children...
    const constructedSections = this.shadowRoot.querySelectorAll("tcds-accordion-section");

    // Prefer slotted sections.
    return Array.from(slottedSections.length > 1 ? slottedSections : constructedSections);
  }

  get template() {
    // Determine A) whether to construct sections out of `article` and `section`
    // children, and B) if so, which element to use between the two (pick
    // whichever appears first).
    const constructedSelector = this.querySelector(":scope > :is(article, section)")?.localName;
    const constructedSections = Array.from(this.querySelectorAll(`:scope > ${constructedSelector}`));
    const constructedHeading = constructedSections?.[0]?.querySelector("h2, h3, h4")?.localName.substring(1, 2);

    return importSharedStyles() + /* html */`
      ${this.multiple ? /* html */`
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
      ${constructedSections.length ? `
        ${constructedSections.map((section) => {
          // Derive `tcds-accordion-section` children from generic
          // `article`/`section` fallback markup. Extract section label from
          // first heading element, then copy over the content excluding that
          // heading.
          return `
            <tcds-accordion-section label="${section.querySelector("h2, h3, h4")?.textContent}" heading-level="${constructedHeading}">
              ${section.innerHTML.replace(new RegExp(`(<h${constructedHeading})(.*)(</h${constructedHeading}>)`, "i"), "")}
            </tcds-accordion-section>
          `;
        }).join("")}
      ` : `
        <slot></slot>
      `}
    `;
  }

  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  connectedCallback() {
    refreshProperties.apply(this, ["multiple", "heading-level"]);
    this.requestUpdate();
  }

  attributeChangedCallback(name, old) {
    this.requestUpdate({[name]: old});

    // Changes to [heading-level] requires downstream updates to sections.
    if(["heading-level"].includes(name)) {
      this.sections.forEach(section => section.requestUpdate({[name]: old}));
    }
  }

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

customElements.define("tcds-accordion", Accordion);
