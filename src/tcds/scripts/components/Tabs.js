class Tabs extends Component {
  constructor(element, props) {
    super(element, props);

    this.tabs = Array.from(this.element.querySelectorAll("[role=tab]"));
    this.panels = Array.from(this.element.querySelectorAll("[role=tabpanel]"));
    
    (this.props.hideAll === true) ? this.state.activeTab = null : this.state.activeTab = this.tabs[0];

    this.tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        this.state.activeTab = tab;
      });

      tab.addEventListener("keydown", (event) => {
        if(event.key === "ArrowRight") {
          this.state.activeTab = this.getNextTab();
        } else if(event.key === "ArrowLeft") {
          this.state.activeTab = this.getPrevTab();
        }

        this.state.activeTab.focus();
      });
    });
  }

  sync(newState, _prevState) {
    if("activeTab" in newState) {
      this.tabs.forEach((tab) => {
        tab.setAttribute("aria-selected", (tab === this.state.activeTab ? "true" : "false"));

        tab.setAttribute("tabindex", (tab === this.state.activeTab ? "0" : "-1"));
      });

      this.panels.forEach((panel) => {
        // Get the panel with an ID matching the [aria-controls] attribute of
        // the active tab.
        const activePanel = (this.state.activeTab === null) ? null : this.panels.find((panel) => {
          return this.state.activeTab.getAttribute("aria-controls") === panel.id;
        });

        panel.hidden = (panel === activePanel ? false : true);
      });
    }
  }

  getNextTab() {
    return (this.state.activeTab === this.tabs[this.tabs.length - 1])
      ? this.tabs[0]
      : this.tabs[this.tabs.indexOf(this.state.activeTab) + 1];
  }

  getPrevTab() {
    return (this.state.activeTab === this.tabs[0])
      ? this.tabs[this.tabs.length - 1]
      : this.tabs[this.tabs.indexOf(this.state.activeTab) - 1];
  }
}

document.querySelectorAll("[data-component=Tabs]").forEach((instance) => {
  new Tabs(instance, {
    hideAll: instance.classList.contains("Tabs--hide-all"),
  });
});