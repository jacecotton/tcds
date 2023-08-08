import WebComponent from "../../utilities/WebComponent/WebComponent.js";
import styles from "./style.css";
import "./tab/index.js";

export default class Tabs extends WebComponent(HTMLElement) {
  get inactive() {
    return this.hasAttribute("inactive");
  }

  get tabs() {
    return Array.from(this.querySelectorAll("tcds-tab"));
  }

  get nextIndex() {
    return (this.tabs.indexOf(this.querySelector("[active]")) + 1) % this.tabs.length;
  }

  get previousIndex() {
    return (this.tabs.indexOf(this.querySelector("[active]")) - 1 + this.tabs.length) % this.tabs.length;
  }

  get template() {
    return /* html */`
      <div role="tablist">
        ${this.tabs.map(tab => /* html */`
          <button
            role="tab"
            aria-selected="${tab.active}"
            tabindex="${tab.active ? "0" : "-1"}"
            onclick="this.getRootNode().host.tabClick(event)"
            onkeydown="this.getRootNode().host.tabKeyDown(event)"
          ><span>${tab.label}</span></button>
        `).join("")}
      </div>
      <slot></slot>
    `;
  }

  constructor() {
    super();
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  connectedCallback() {
    this.upgradeProperties("inactive");
    this.update();

    if(!this.inactive) {
      this.select(this.tabs.find(tab => tab.active) || this.tabs[0]);
    }
  }

  mountedCallback() {
    this.tabButtons = Array.from(this.shadowRoot.querySelectorAll("[role=tab]"));
  }

  tabClick(event) {
    this.select(this.tabs[this.tabButtons.indexOf(event.currentTarget)]);
  }

  tabKeyDown(event) {
    if(event.key === "ArrowRight") {
      event.preventDefault();
      this.tabButtons[this.nextIndex].focus();
      this.select(this.tabs[this.nextIndex]);
    } else if(event.key === "ArrowLeft") {
      event.preventDefault();
      this.tabButtons[this.previousIndex].focus();
      this.select(this.tabs[this.previousIndex]);
    }
  }

  select(tab) {
    this.tabs.forEach(thisTab => thisTab.active = thisTab === tab);
  }
}

customElements.define("tcds-tabs", Tabs);
