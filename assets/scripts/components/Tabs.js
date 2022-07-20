import WebComponent from "./WebComponent/WebComponent.js";
import store from "./WebComponent/store.js";
import slugify from "@tcds/utilities/slugify.js";

class Tab extends HTMLElement {
  constructor() {
    super();
  }
}

export default class Tabs extends WebComponent {
  constructor() {
    super();

    this.state = store({
      activeTab: 0,
    });
  }

  render() {
    const tabs = Array.from(this.querySelectorAll("tcds-tab"));

    return `
      <div role="tablist" part="tablist">
        ${tabs.map((tab, index) => {
          const label = tab.getAttribute("label");
          return `<button role="tab" part="tab ${this.state.activeTab === index ? "active" : ""}" id="${slugify(label)}-tab" aria-controls="${slugify(label)}-panel" aria-expanded="${this.state.activeTab === index}" tabindex="${this.state.activeTab === index ? "0" : "-1"}">${label}</button>`;
        }).join("")}
      </div>
      <div part="viewport">
        ${tabs.map((tab, index) => {
          const label = tab.getAttribute("label");

          return `<section role="tabpanel" part="panel" id="${slugify(label)}-panel" aria-labelledby="${slugify(label)}-tab" ${this.state.activeTab === index ? "" : "hidden"}>${tab.innerHTML}</section>`;
        }).join("")}
      </div>
    `;
  }

  mounted() {
    const tabs = Array.from(this.shadowRoot.querySelectorAll("[role=tab]"));

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        this.state.activeTab = index;
      });

      tab.addEventListener("keydown", (event) => {
        if(event.key === "ArrowRight") {
          this.state.activeTab = this.state.activeTab === tabs.length - 1 ? 0 : this.state.activeTab + 1;
          tabs[this.state.activeTab].focus();
        } else if(event.key === "ArrowLeft") {
          this.state.activeTab = this.state.activeTab === 0 ? tabs.length - 1 : this.state.activeTab - 1;
          tabs[this.state.activeTab].focus();
        }
      });
    });
  }
}

customElements.define("tcds-tabs", Tabs);
customElements.define("tcds-tab", Tab);
