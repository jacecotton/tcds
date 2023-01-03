import WebComponent from "../../scripts/WebComponent/WebComponent.js";
import shadowStyles from "./style.css";
import lightStyles from "./style.light.css";

export default class AlertBar extends WebComponent(HTMLElement) {
  connectedCallback() {
    this.shadowRoot.adoptedStyleSheets = [shadowStyles];
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, ...[lightStyles]];

    // Add auto-incrementing unique IDs to each carousel instance.
    const alertBars = Array.from(document.querySelectorAll("tcds-alert-bar"));
    this.id = `alert-bar${alertBars.length > 1 ? `-${alertBars.indexOf(this) + 1}` : ""}`;
  }

  render() {
    return /* html */`
      <div part="bar">
        <h2><tcds-icon icon="bell"></tcds-icon> Updates</h2>
        <div part="alerts">
          <slot name="alert"></slot>
        </div>
        <tcds-button part="close" controls="${this.id}" icon="only x" variant="ui" onclick="this.getRootNode().host.close()">Dismiss updates</tcds-button>
      </div>
    `;
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
    this.hidden = true;
  }
}

customElements.define("tcds-alert-bar", AlertBar);
