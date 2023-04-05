import WebComponent from "../../utilities/WebComponent/WebComponent.js";
import styles from "./style.css";
import "./tab/index.js";

export default class Tabs extends WebComponent(HTMLElement) {
  get inactive() {
    return this.hasAttribute("inactive");
  }

  constructor() {
    super();
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  connectedCallback() {
    this.update();

    this.tabpanels = Array.from(this.querySelectorAll("tcds-tab"));

    if(!this.inactive) {
      (this.tabpanels.find(tab => tab.active) || this.tabpanels[0]).select();
    }
  }

  attributeChangedCallback() {
    this.update();
  }

  get template() {
    return /* html */`
      <div role="tablist">
        ${this.tabpanels.map(tab => /* html */`
          <button role="tab"
            aria-selected="${tab.active}"
            tabindex="${tab.active ? "0" : "-1"}"
            onclick="this.getRootNode().host.tabClick(event)"
            onkeydown="this.getRootNode().host.tabKeyDown(event)"
          >
            <span>${tab.label}</span>
          </button>
        `).join("")}
      </div>
      <slot></slot>
    `;
  }

  mountedCallback() {
    this.tabs = Array.from(this.shadowRoot.querySelectorAll("[role=tab]"));
  }

  tabClick(event) {
    this.tabpanels[this.tabs.indexOf(event.currentTarget)].select();
  }

  tabKeyDown(event) {
    if(event.key === "ArrowRight") {
      event.preventDefault();
      this.tabs[this.nextIndex].focus();
      this.tabpanels[this.nextIndex].select();
    } else if(event.key === "ArrowLeft") {
      event.preventDefault();
      this.tabs[this.previousIndex].focus();
      this.tabpanels[this.previousIndex].select();
    }
  }

  get nextIndex() {
    return (this.tabpanels.indexOf(this.querySelector("[active]")) + 1) % this.tabpanels.length;
  }

  get previousIndex() {
    return (this.tabpanels.indexOf(this.querySelector("[active]")) - 1 + this.tabpanels.length) % this.tabpanels.length;
  }
}

customElements.define("tcds-tabs", Tabs);
