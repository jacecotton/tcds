import {declarative, html, baseStyles, refreshProperties, registerParts} from "../utilities/index.js";
import localStyles from "./styles.shadow.css";

class TCDSDialogElement extends declarative(HTMLElement) {
  // #region Setup
  static observedAttributes = ["open", "position"];

  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.adoptedStyleSheets = [baseStyles, localStyles];
  }

  get template() {
    const closeButton = () => html`
      <button part="close" onclick="this.getRootNode().host.close()">
        <tcds-icon icon="x"></tcds-icon>
      </button>
    `;

    return html`
      <dialog part="dialog" ${this.open ? "open" : ""}>
        ${this.#has("header") ? html`
          <header part="header">
            <slot name="header"></slot>
            ${closeButton()}
          </header>
        ` : `
          ${closeButton()}
        `}

        <div part="content">
          <slot></slot>
        </div>

        ${this.#has("footer") ? html`
          <footer part="footer">
            <slot name="footer"></slot>
          </footer>
        ` : ``}
        </dialog>
    `;
  }
  // #endregion

  // #region Lifecycle
  connectedCallback() {
    refreshProperties.apply(this, ["open", "position"]);
    this.requestUpdate();
  }

  mountedCallback() {
    registerParts.apply(this, ["dialog", "header", "close", "content", "footer"]);
  }

  attributeChangedCallback(attribute, value) {
    this.requestUpdate({[attribute]: value});
  }
  // #endregion

  // #region Props and state
  get open() {
    return this.hasAttribute("open");
  }

  set open(value) {
    this.toggleAttribute("open", value);
  }

  get returnValue() {
    return this.parts["dialog"].returnValue;
  }

  set returnValue(value) {
    this.parts["dialog"].returnValue = value;
  }
  // #endregion

  // #region Custom public API

  // #endregion

  // #region HTMLDialogElement API
  showModal() {
    this.parts["dialog"].showModal();
  }

  close(returnValue = "") {
    this.parts["dialog"].close(returnValue);
  }

  requestClose(returnValue = "") {
    this.parts["dialog"].requestClose(returnValue);
  }
  // #endregion

  // #region Utilities
  #has() {
    return !!this.querySelector([...arguments].map(slot => `[slot=${slot}]`).join(", "));
  }
  // #endregion
}

customElements.define("tcds-dialog", TCDSDialogElement);
