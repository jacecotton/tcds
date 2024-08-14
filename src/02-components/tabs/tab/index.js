import {declarative, importSharedStyles, refreshProperties} from "../../utilities/index.js";
import styles from "./style.css";

class Tab extends declarative(HTMLElement) {
  // #region Setup
  static observedAttributes = ["selected", "label"];

  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  get template() {
    return importSharedStyles() + `
      <section role="tabpanel" ${this.selected ? "" : "hidden"}>
        <slot></slot>
      </section>
    `;
  }
  // #endregion

  // #region Lifecycle
  connectedCallback() {
    refreshProperties.apply(this, ["selected", "label"]);
    this.requestUpdate();
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

  get label() {
    return this.getAttribute("label");
  }

  set label(value) {
    this.setAttribute("label", value);
  }

  get tabs() {
    return this.closest("tcds-tabs");
  }
  // #endregion
}

customElements.define("tcds-tab", Tab);