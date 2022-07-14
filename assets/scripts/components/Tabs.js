import Component from "@tcds/utilities/Component.js";
import slugify from "@tcds/utilities/slugify.js";

export default class Tabs extends Component {
  constructor(element, props) {
    super(element, props);

    this.preprocessDOM();

    this.tabs = Array.from(element.querySelectorAll("[role=tab]"));
    this.panels = Array.from(this.element.querySelectorAll("[role=tabpanel]"));

    this.state.activeTab = this.props.hideAll !== true ? this.tabs[0] : null;

    this.tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        this.state.activeTab = tab;
      });

      tab.addEventListener("keydown", (event) => {
        if(event.key === "ArrowRight") {
          this.state.activeTab = this.getNextTab();
          this.state.activeTab.focus();
        } else if(event.key === "ArrowLeft") {
          this.state.activeTab = this.getPreviousTab();
          this.state.activeTab.focus();
        }
      });
    });
  }

  preprocessDOM() {
    const sections = Array.from(this.element.querySelectorAll("section"));

    this.tablist = `<div role="tablist" class="Tabs__tablist">${sections.map((section) => {
      const heading = section.querySelector("h2, h3, h4, h5, h6");

      return `<button role="tab" id="${slugify(heading.innerText)}-tab" aria-controls="${slugify(heading.innerText)}-panel" class="Tabs__tab">${heading.innerText}</button>`;
    }).join("")}</div>`;

    this.viewport = `<div class="Tabs__viewport">${sections.map((section) => {
      const heading = section.querySelector("h2, h3, h4, h5, h6");
      heading.remove();

      return `<section role="tabpanel" id="${slugify(heading.innerText)}-panel" aria-labelledby="${slugify(heading.innerText)}-tab" class="Tabs__panel">${section.innerHTML}</section>`;
    }).join("")}</div>`;

    sections.forEach((section) => {
      section.remove();
    });

    this.element.innerHTML = this.tablist + this.viewport;
  }

  sync() {
    return {
      activeTab: () => {
        this.tabs.forEach((tab) => {
          tab.setAttribute("aria-expanded", tab === this.state.activeTab);
          tab.setAttribute("tabindex", (tab === this.state.activeTab || !this.state.activeTab) ? "0" : "-1");
        });

        this.panels.forEach((panel) => {
          if(this.props.keepPanelVisibility !== true) {
            panel.hidden = panel !== this.getPanelByTab(this.state.activeTab);
          }
        });

        window.dispatchEvent(new Event("scroll"));
      },
    };
  }

  getNextTab(relativeTab = this.state.activeTab) {
    return this.tabs.at((this.tabs.indexOf(relativeTab) + 1) % this.tabs.length);
  }

  getPreviousTab(relativeTab = this.state.activeTab) {
    return this.tabs.at((this.tabs.indexOf(relativeTab) - 1) % this.tabs.length);
  }

  getPanelByTab(tab) {
    return tab !== null && document.getElementById(tab.getAttribute("aria-controls"));
  }
}

document.querySelectorAll(".Tabs").forEach((instance) => {
  instance && new Tabs(instance, {
    hideAll: /hide-all/.test(instance.className),
  });
});
