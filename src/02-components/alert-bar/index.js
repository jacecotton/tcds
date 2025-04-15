import {declarative, html, baseStyles} from "../utilities/index.js";
import localStyles from "./styles.shadow.css";

class TCDSAlertBarElement extends declarative(HTMLElement) {
  // #region Setup
  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.adoptedStyleSheets = [baseStyles, localStyles];
  }

  get template() {
    return html`
      <section>
        <slot name="heading">
          <tcds-icon icon="updates"></tcds-icon>
          <h2>Updates</h2>
        </slot>

        <div part="alerts">
          <slot name="alert"></slot>
        </div>

        <button part="close" onclick="this.getRootNode().host.close()" title="Dismiss updates">
          <span class="visually-hidden">Dismiss updates</span>
          <tcds-icon icon="x"></tcds-icon>
        </button>
      </section>
    `;
  }
  // #endregion

  // #region Lifecycle
  connectedCallback() {
    this.requestUpdate();
  }
  // #endregion

  // #region Public API
  close() {
    this.hidden = true;
  }
  // #endregion
}

customElements.define("tcds-alert-bar", TCDSAlertBarElement);
