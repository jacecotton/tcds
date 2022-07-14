import Component from "@tcds/utilities/Component.js";
import slugify from "@tcds/utilities/slugify.js";

export default class Tabs extends Component {
  constructor(element, props) {
    super(element, props);

    this.preprocessDOM();

    this.state.activeTab = this.props.hideAll !== true ? this.tabs[0] : null;

    this.tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        this.state.activeTab = tab;
      });

      tab.addEventListener("keydown", (key) => {
        if(key.code === "ArrowRight") {
          this.state.activeTab = this.getNextTab();
          this.state.activeTab.focus();
        } else if(key.code === "ArrowLeft") {
          this.state.activeTab = this.getPreviousTab();
          this.state.activeTab.focus();
        }
      });
    });
  }

  preprocessDOM() {
    this.panels = Array.from(this.element.querySelectorAll("section"));
    this.tabs = [];

    this.tablist = document.createElement("div");
    this.tablist.setAttribute("role", "tablist");
    this.tablist.classList.add("Tabs__tablist");

    this.viewport = document.createElement("div");
    this.viewport.classList.add("Tabs__viewport");

    this.panels.forEach((panel) => {
      const heading = panel.querySelector("h2, h3, h4, h5, h6");
      const id = slugify(heading.innerText);

      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("id", `${id}-panel`);
      panel.setAttribute("aria-labelledby", `${id}-tab`);
      panel.classList.add("Tabs__panel");
      this.viewport.appendChild(panel);

      const tab = document.createElement("button");
      tab.setAttribute("role", "tab");
      tab.setAttribute("id", `${id}-tab`);
      tab.setAttribute("aria-controls", `${id}-panel`);
      tab.classList.add("Tabs__tab");
      tab.textContent = heading.innerText;

      heading.remove();
      this.tablist.append(tab);
      this.tabs.push(tab);
    });

    this.element.prepend(this.tablist);
    this.element.append(this.viewport);
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
