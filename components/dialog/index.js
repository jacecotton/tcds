import WebComponent from "../../utilities/WebComponent/WebComponent.js";
import styles from "./style.css";

export default class Dialog extends WebComponent(HTMLElement) {
  static get observedAttributes() {
    return ["open"];
  }

  constructor() {
    super();
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  connectedCallback() {
    super.connectedCallback();
    this._upgradeProperties(["open"]);
  }

  get template() {
    return /* html */`
      <div part="dialog">
        <button onclick="this.getRootNode().host.close()" aria-expanded="${this.open}">close</button>
        <slot></slot>
      </div>
    `;
  }

  attributeChangedCallback(attribute) {
    this._requestUpdate(attribute);
  }

  get open() {
    return this.hasAttribute("open");
  }

  set open(value) {
    this.toggleAttribute("open", Boolean(value));
  }

  close(value) {
    this.open = false;

    if(value) {
      this.value = value;
    } else {
      this.dispatchEvent(new Event("cancel"));
    }

    this.dispatchEvent(new CustomEvent("close", {
      detail: {
        value: value,
      },
    }));
  }

  show() {
    this.open = true;
  }
}

customElements.define("tcds-dialog", Dialog);
