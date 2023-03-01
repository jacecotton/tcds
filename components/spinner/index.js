import WebComponent from "../../utilities/WebComponent/WebComponent.js";
import styles from "./style.css";

export default class Spinner extends WebComponent(HTMLElement) {
  constructor() {
    super();
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  render() {
    return /* html */`
      <tcds-icon part="icon" icon="spinner"></tcds-icon>
    `;
  }
}

customElements.define("tcds-spinner", Spinner);
