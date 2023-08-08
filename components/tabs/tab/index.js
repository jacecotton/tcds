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
    // This is technically a hacky use of [slot], but because the shadow root of
    // the tab item is distinct from that of the tab container, this is the only
    // way to allow directly surfacing the label in the tab item markup while
    // placing it inside the tablist of the tab container.
    return this.getAttribute("label") || this.querySelector("[slot=label]").innerHTML;
  }

  get template() {
    return /* html */`
      <section role="tabpanel" ${this.active ? "" : "hidden"}>
        <slot></slot>
      </section>
    `;
  }

  constructor() {
    super();
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  connectedCallback() {
    this.upgradeProperties("active");
    this.update();
  }

  attributeChangedCallback(name, oldValue) {
    this.update({[name]: oldValue});
  }

  updatedCallback(old) {
    if("active" in old) {
      this.closest("tcds-tabs").update();
    }
  }
}

customElements.define("tcds-tab", Tab);
