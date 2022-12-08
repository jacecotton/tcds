import WebComponent from "../../scripts/WebComponent/WebComponent.js";
import shadowStyles from "./style.css";
import lightStyles from "./style.light.css";

export default class AlertBar extends WebComponent(HTMLElement) {
  connected() {
    this.shadowRoot.adoptedStyleSheets = [shadowStyles];
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, ...[lightStyles]];
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

  mounted() {
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

(function() {
  document.querySelectorAll("tcds-alert-bar")?.forEach((alertBar, index, array) => {
    alertBar.id = `alert-bar${array.length > 1 ? `-${index + 1}` : ""}`;
  });
}());
