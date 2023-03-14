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
    this._upgradeProperty.bind("open", this);
  }

  static get template() {
    return /* html */`
      <div part="dialog">
        <button onclick="this.getRootNode().host.close()">close</button>
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

  close() {
    this.open = false;
  }

  show() {
    this.open = true;
  }
}

customElements.define("tcds-dialog", Dialog);
