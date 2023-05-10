import WebComponent from "../../utilities/WebComponent/WebComponent.js";
import styles from "./style.css";

export default class AlertBar extends WebComponent(HTMLElement) {
  get template() {
    return /* html */`
      <section>
        <h2><tcds-icon icon="bell"></tcds-icon> Updates</h2>
        <div part="alerts">
          <slot name="alert"></slot>
        </div>
        <button is="tcds-ui-button" part="close" variant="ui" onclick="this.getRootNode().host.close()" aria-label="Dismiss updates" title="Dismiss updates">
          <tcds-icon icon="x"></tcds-icon>
        </button>
      </section>
    `;
  }

  constructor() {
    super();
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  connectedCallback() {
    this.update();
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
