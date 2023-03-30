import WebComponent from "../../../utilities/WebComponent/WebComponent.js";
import styles from "./style.css";

export default class Tab extends WebComponent(HTMLElement) {
  static observedAttributes = ["active", "label"];

  get active() {
    return this.hasAttribute("active");
  }

  set active(value) {
    this.toggleAttribute("active", Boolean(value));
  }

  get label() {
    return this.getAttribute("label");
  }

  constructor() {
    super();
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  connectedCallback() {
    this.update();
    this._upgradeProperties(["active"]);
  }

  attributeChangedCallback(name, oldValue) {
    this.update(name, oldValue);
  }

  get template() {
    return /* html */`
      <section role="tabpanel" ${this.active ? "" : "hidden"}>
        <slot></slot>
      </section>
    `;
  }

  updatedCallback(old) {
    if("active" in old) {
      this.closest("tcds-tabs").update();
    }
  }

  select() {
    this.closest("tcds-tabs").querySelectorAll("tcds-tab").forEach((tab) => {
      tab.active = tab === this;
    });
  }
}

customElements.define("tcds-tab", Tab);
