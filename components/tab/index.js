import WebComponent from "../../scripts/WebComponent/WebComponent.js";
import styles from "./style.css";

export default class Tab extends WebComponent(HTMLElement) {
  static state = {
    active: {
      type: Boolean,
      reflected: true,
    },
  };

  static props = {
    label: {type: String},
  };

  constructor() {
    super();
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  connectedCallback() {
    super.connectedCallback();

    this.parent = this.closest("tcds-tabs");
  }

  render() {
    return /* html */`
      <section role="tabpanel" ${this.state.active ? "" : "hidden"}>
        <slot></slot>
      </section>
    `;
  }

  updatedCallback(state) {
    if(state.newState) {
      if("active" in state.newState) {
        this.parent.dispatchEvent(new Event("update"));
      }
    }
  }

  select() {
    this.parent.querySelectorAll("tcds-tab").forEach((tab) => {
      tab.state.active = tab === this;
    });
  }
}

customElements.define("tcds-tab", Tab);
