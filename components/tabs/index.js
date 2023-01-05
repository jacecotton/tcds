import WebComponent from "../../scripts/WebComponent/WebComponent.js";
import slugify from "../../scripts/utilities/slugify.js";
import shadowStyles from "./style.css";
import lightStyles from "./style.light.css";

export default class Tabs extends WebComponent(HTMLElement) {
  static props = {
    inactive: {type: Boolean},
  };

  connectedCallback() {
    this.shadowRoot.adoptedStyleSheets = [shadowStyles];
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, ...[lightStyles]];

    this.tabs = Array.from(this.querySelectorAll("tcds-tab"));

    const activeTabs = this.tabs.filter(tab => tab.hasAttribute("active"));

    if(activeTabs.length === 0 && this.props["inactive"] === false) {
      this.select(this.tabs[0]);
    } else if(activeTabs.length >= 1) {
      this.select(activeTabs[0]);
    }
  }

  render() {
    return /* html */`
      <div role="tablist">
        ${this.tabs.map(tab => /* html */`
          <button
            role="tab"
            part="tab"
            id="${slugify(tab.props.label)}-tab"
            aria-controls="${slugify(tab.props.label)}-panel"
            aria-selected="${tab.state.active}"
            tabindex="${tab.state.active ? "0" : "-1"}"
            onclick="this.getRootNode().host.tabClick(event)"
            onkeydown="this.getRootNode().host.tabKeydown(event)"
          >
            <span>${tab.props.label}</span>
          </button>
        `).join("")}
      </div>
      <div part="viewport">
        <slot></slot>
      </div>
    `;
  }

  select(activeTab) {
    this.tabs.forEach((tab) => {
      tab.state.active = tab === activeTab;
    });
  }

  tabClick(event) {
    this.select(this.tabs[this.parts["tab"].indexOf(event.currentTarget)]);
  }

  tabKeydown(event) {
    if(event.key === "ArrowRight") {
      event.preventDefault();
      this.next().then((next) => {
        this.parts["tab"][next].focus();
      });
    } else if(event.key === "ArrowLeft") {
      event.preventDefault();
      this.previous().then((previous) => {
        this.parts["tab"][previous].focus();
      });
    }
  }

  next() {
    return new Promise((resolve) => {
      const nextIndex = (this.tabs.indexOf(this.querySelector("[active]")) + 1) % this.tabs.length;
      this.select(this.tabs[nextIndex]);
      resolve(nextIndex);
    });
  }

  previous() {
    return new Promise((resolve) => {
      const previousIndex = (this.tabs.indexOf(this.querySelector("[active]")) - 1 + this.tabs.length) % this.tabs.length;
      this.select(this.tabs[previousIndex]);
      resolve(previousIndex);
    });
  }
}

customElements.define("tcds-tabs", Tabs);
