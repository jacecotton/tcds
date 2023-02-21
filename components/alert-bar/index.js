import WebComponent from "../../utilities/WebComponent/WebComponent.js";
import shadowStyles from "./style.css";
import lightStyles from "./style.light.css";

export default class AlertBar extends WebComponent(HTMLElement) {
  constructor() {
    super();

    this.shadowRoot.adoptedStyleSheets = [shadowStyles];
    this.getRootNode().adoptedStyleSheets = [...this.getRootNode().adoptedStyleSheets, ...[lightStyles]];
  }

  render() {
    return /* html */`
      <div part="bar" id="alert-bar">
        <h2><tcds-icon icon="bell"></tcds-icon> Updates</h2>
        <div part="alerts">
          <slot name="alert"></slot>
        </div>
        <tcds-button part="close" aria-controls="alert-bar" icon="only x" variant="ui" onclick="this.getRootNode().host.close()">Dismiss updates</tcds-button>
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
    this.parts["bar"].hidden = true;
  }
}

customElements.define("tcds-alert-bar", AlertBar);
