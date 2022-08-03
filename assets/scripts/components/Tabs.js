import WebComponent from "@tcds/WebComponent/WebComponent.js";
import slugify from "@tcds/utilities/slugify.js";

export default class Tabs extends WebComponent {
  connected() {
    this.tabs = Array.from(this.querySelectorAll("tcds-tab"));

    const initialActive = this.tabs.indexOf(this.tabs.find(tab => tab.hasAttribute("active")));

    this.state.activeTab = initialActive > 0 ? initialActive : 0;
  }

  render() {
    return `
      <div role="tablist" part="tablist">
        ${this.tabs.map((tab, index) => {
          return `
            <button
              role="tab"
              part="tab ${this.state.activeTab === index ? "active" : ""}"
              aria-expanded="${this.state.activeTab === index}"
              tabindex="${this.state.activeTab === index ? "0" : "-1"}"
              id="${slugify(tab.props.label)}-tab"
              aria-controls="${slugify(tab.props.label)}-panel"
            >
              ${tab.props.label}
            </button>
          `;
        }).join("")}
      </div>
      <div part="viewport">
        ${this.tabs.map((tab, index) => {
          return `
            <section
              role="tabpanel"
              part="panel"
              id="${slugify(tab.props.label)}-panel"
              aria-labelledby="${slugify(tab.props.label)}-tab"
              ${this.state.activeTab === index ? "" : "hidden"}
            >
              ${tab.innerHTML}
            </section>
          `;
        }).join("")}
      </div>
    `;
  }

  mounted() {
    this.tabButtons = Array.from(this.shadowRoot.querySelectorAll("[part~=tab]"));

    this.tabButtons.forEach((tabButton, index) => {
      tabButton.addEventListener("click", () => {
        this.state.activeTab = index;
      });

      tabButton.addEventListener("keydown", (event) => {
        if(event.key === "ArrowRight") {
          this.state.activeTab = this.state.activeTab === this.tabButtons.length - 1 ? 0 : this.state.activeTab + 1;
          this.tabButtons[this.state.activeTab].focus();
        } else if(event.key === "ArrowLeft") {
          this.state.activeTab = this.state.activeTab === 0 ? this.tabButtons.length - 1 : this.state.activeTab - 1;
          this.tabButtons[this.state.activeTab].focus();
        }
      });
    });
  }

  updated() {
    return {
      state: {
        activeTab: () => {
          this.tabs.forEach((tab, index) => {
            tab.toggleAttribute("active", index === this.state.activeTab);
          });
        },
      },
    };
  }
}

customElements.define("tcds-tab", class Tab extends WebComponent {});
customElements.define("tcds-tabs", Tabs);
