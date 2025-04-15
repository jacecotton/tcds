import {declarative, html, baseStyles, refreshProperties, slugify} from "../../utilities/index.js";
import localStyles from "./styles.shadow.css";

class TCDSTabElement extends declarative(HTMLElement) {
  // #region Setup
  static observedAttributes = ["selected"];

  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.adoptedStyleSheets = [baseStyles, localStyles];
  }

  get template() {
    return html`
      <section role="tabpanel" ${this.selected ? "" : "hidden"}>
        <slot></slot>
      </section>
    `;
  }
  // #endregion

  // #region Lifecycle
  connectedCallback() {
    refreshProperties.apply(this, ["selected"]);
    this.requestUpdate();

    if(!this.id && this.title && !document.getElementById(slugify(this.title))) {
      this.id = slugify(this.title);
    }
  }

  attributeChangedCallback(name, oldValue) {
    this.requestUpdate({[name]: oldValue});
  }

  updatedCallback(old) {
    if("selected" in old) {
      this.tabs.requestUpdate();
    }
  }
  // #endregion

  // #region Props and state
  get selected() {
    return this.hasAttribute("selected");
  }

  set selected(value) {
    this.toggleAttribute("selected", Boolean(value));
  }

  get title() {
    return this.querySelector(":scope > [slot=title]")?.innerHTML
      || console.error("No heading element with [slot=title] provided in tab.", this);
  }

  get tabs() {
    return this.closest("tcds-tabs");
  }
  // #endregion
}

customElements.define("tcds-tab", TCDSTabElement);
