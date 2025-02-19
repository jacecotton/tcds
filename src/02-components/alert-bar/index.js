import {declarative, baseStyles} from "../utilities/index.js";
import localStyles from "./style.css";

class AlertBar extends declarative(HTMLElement) {
  get template() {
    return `
      <section>
        <h2><tcds-icon icon="updates"></tcds-icon> Updates</h2>
        <div part="alerts">
          <slot name="alert"></slot>
        </div>
        <button part="close" onclick="this.getRootNode().host.close()" aria-label="Dismiss updates" title="Dismiss updates">
          <tcds-icon icon="x"></tcds-icon>
        </button>
      </section>
    `;
  }

  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.adoptedStyleSheets = [baseStyles, localStyles];
  }

  connectedCallback() {
    this.requestUpdate();
  }

  mountedCallback() {
    const alerts = Array.from(this.querySelectorAll("[slot~=alert]"));

    alerts.forEach((alert) => {
      alert.addEventListener("click", () => {
        alerts.filter(other => alert !== other).forEach(other => other.open = false);
      });
    });
  }

  close() {
    this.hidden = true;
  }
}

customElements.define("tcds-alert-bar", AlertBar);
