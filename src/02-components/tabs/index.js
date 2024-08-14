import {declarative, importSharedStyles, refreshProperties} from "../utilities/index.js";
import styles from "./style.css";

class Tabs extends declarative(HTMLElement) {
  // #region Setup
  static observedAttributes = ["collapsed"];

  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  get template() {
    return importSharedStyles() + `
      <div role="tablist">
        ${this.tabs.map(tab => `
          <button
            role="tab"
            aria-selected="${tab.selected}"
            aria-disabled="${tab.selected}"
            tabindex="${tab.selected ? "0" : "-1"}"
            onclick="this.getRootNode().host.tabClick(event)"
            onkeydown="this.getRootNode().host.tabKeydown(event)"
          ><span>${tab.label}</span></button>
        `).join("")}
      </div>
      <slot></slot>
    `;
  }
  // #endregion

  // #region Lifecycle
  connectedCallback() {
    refreshProperties.apply(this, ["collapsed"]);
    this.requestUpdate();
  }

  mountedCallback() {
    this.tabButtons = Array.from(this.shadowRoot.querySelectorAll("[role=tab]"));

    if(!this.collapsed) {
      this.select(this.tabs.find(tab => tab.selected) || this.tabs[0]);
    }
  }
  // #endregion

  // #region Event listeners
  tabClick({currentTarget}) {
    this.select(this.tabs[this.tabButtons.indexOf(currentTarget)]);
  }

  tabKeydown({key}) {
    if(["ArrowRight", "ArrowLeft"].includes(key)) {
      const goto = key === "ArrowRight" ? this.nextIndex : this.previousIndex;
      this.tabButtons[goto].focus();
      this.select(this.tabs[goto]);
    }
  }
  // #endregion

  // #region Props and state
  get collapsed() {
    return this.hasAttribute("collapsed");
  }

  set collapsed(value) {
    this.toggleAttribute("collapsed", Boolean(value));
  }

  get tabs() {
    return Array.from(this.querySelectorAll("tcds-tab"));
  }

  get nextIndex() {
    const selectedIndex = this.tabs.indexOf(this.querySelector("[selected]"));
    return (selectedIndex + 1) % this.tabs.length;
  }

  get previousIndex() {
    const selectedIndex = this.tabs.indexOf(this.querySelector("[selected]"));
    return (selectedIndex - 1 + this.tabs.length) % this.tabs.length;
  }
  // #endregion

  // #region Public API
  select(tab) {
    this.tabs.forEach(_tab => _tab.selected = _tab === tab);
  }
  // #endregion
}

customElements.define("tcds-tabs", Tabs);
