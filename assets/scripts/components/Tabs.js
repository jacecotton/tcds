import WebComponent from "@tcds/WebComponent/WebComponent.js";
import slugify from "@tcds/utilities/slugify.js";

class Tab extends WebComponent {
  constructor() {
    super();
  }
}

export default class Tabs extends WebComponent {
  constructor() {
    super();

    this.tabs = Array.from(this.querySelectorAll("tcds-tab"));

    this.state.activeTab = 0;

    this.tabs.forEach((tab, index) => {
      if(tab.hasAttribute("active")) {
        this.state.activeTab = index;
      }
    });
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
    this.tabButtons = Array.from(this.shadowRoot.querySelectorAll("[role=tab]"));

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
            if(index === this.state.activeTab) {
              tab.setAttribute("active", "");
            } else {
              tab.removeAttribute("active");
            }
          });
        },
      },
    };
  }
}

customElements.define("tcds-tab", Tab);
customElements.define("tcds-tabs", Tabs);
