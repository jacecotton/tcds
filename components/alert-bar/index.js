import WebComponent from "../../utilities/WebComponent/WebComponent.js";
import styles from "./style.css";

export default class AlertBar extends WebComponent(HTMLElement) {
  constructor() {
    super();
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  get template() {
    return /* html */`
      <div part="bar">
        <h2><tcds-icon icon="bell"></tcds-icon> Updates</h2>
        <div part="alerts">
          <slot name="alert"></slot>
        </div>
        <tcds-button part="close" variant="ui" onclick="this.getRootNode().host.close()" aria-label="Dismiss updates" title="Dismiss updates">
          <tcds-icon icon="x"></tcds-icon>
        </tcds-button>
      </div>
    `;
  }

  connectedCallback() {
    this.update();
  }

  mountedCallback() {
    const details = Array.from(this.querySelectorAll("details"));

    details.forEach((detail) => {
      detail.addEventListener("toggle", () => {
        if(detail.open) {
          details.forEach(_detail => _detail.open = _detail === detail);
        }
      });
    });
  }

  close() {
    this.shadowRoot.querySelector("[part~=bar]").hidden = true;
  }
}

customElements.define("tcds-alert-bar", AlertBar);
