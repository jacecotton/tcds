/**
 * Tabs component.
 */
class Tabs extends Component {
  constructor(element, props) {
    super(element, props);

    // Get relevant DOM elements, converting them to normal arrays from
    // NodeLists so that array methods (like `[].indexOf`) are available.
    this.tabs = Array.from(this.element.querySelectorAll("[role=tab]"));
    this.panels = Array.from(this.element.querySelectorAll("[role=tabpanel]"));
    
    // Set the first tab to active (as long as the `hideAll` prop is not `true`;
    // otherwise, set active tab to `null` so that no tabs are active).
    this.state.activeTab = (this.props.hideAll !== true) ? this.tabs[0] : null;

    this.tabs.forEach((tab) => {
      // Activate tab when clicked.
      tab.addEventListener("click", () => {
        this.state.activeTab = tab;
      });

      tab.addEventListener("keydown", (event) => {
        const keyMap = {
          // Go to next tab on right arrow key press (and focus).
          "ArrowRight": () => {
            this.state.activeTab = this.getNextTab();
            this.state.activeTab.focus();
          },

          // Go to previous tab on left arrow key press (and focus).
          "ArrowLeft": () => {
            this.state.activeTab = this.getPreviousTab();
            this.state.activeTab.focus();
          },
        };

        // If the key code for the triggered event has a match in the key map,
        // execute its associated function.
        keyMap[event.key] && keyMap[event.key]();
      });
    });
  }

  // Update DOM on state change.
  sync(newState) {
    if("activeTab" in newState) {
      this.tabs.forEach((tab) => {
        // Indicate ARIA "selected" state according to whether the current tab
        // in the loop is the active tab.
        tab.setAttribute("aria-selected", (tab === this.state.activeTab));

        // Toggle tab accessibility from Tab key. Because each tab is accessible
        // via arrow key, we want all inactive tabs to not be accessible to the
        // Tab key, instead making the tab's asssociated content next in the
        // tabbing order.
        tab.setAttribute("tabindex", (tab === this.state.activeTab) ? "0" : "-1");
      });

      this.panels.forEach((panel) => {
        // Hide panel if it is not the active panel (and vice versa).
        panel.hidden = (panel !== this.getPanelByTab(this.state.activeTab));
      });

      // Trigger a noop scroll event to force display of scroll-based animated
      // panels.
      window.dispatchEvent(new Event("scroll"));
    }
  }

  /** Utilities */

  /**
   * Get the next tab after the given one.
   *
   * @param {HTMLElement} [relativeTab=this.state.activeTab] - The tab relative
   * to which you want to get the next tab (defaults to the currently active
   * tab).
   * @returns {HTMLElement} - A tab.
   */
  getNextTab(relativeTab = this.state.activeTab) {
    // If the given tab is the last in the order...
    return (relativeTab === this.tabs[this.tabs.length - 1])
      // Return the first tab.
      ? this.tabs[0]
      // Otherwise, return the tab one index ahead of the given one.
      : this.tabs[this.tabs.indexOf(relativeTab) + 1];
  }

  /**
   * Get the previous tab before the given one.
   *
   * @param {HTMLElement} [relativeTab=this.state.activeTab] - The tab relative
   * to which you want to get the previous tab (defaults to the currently active
   * tab).
   * @returns {HTMLElement} - A tab.
   */
  getPreviousTab(relativeTab = this.state.activeTab) {
    // If the given tab is the first in the order...
    return (relativeTab === this.tabs[0])
      // Return the last tab.
      ? this.tabs[this.tabs.length - 1]
      // Otherwise, return the tab one index behind the given one.
      : this.tabs[this.tabs.indexOf(relativeTab) - 1];
  }

  /**
   * Get the panel controlled by the given tab.
   *
   * @param {HTMLElement} tab - The tab for which you want to get the associated
   * panel.
   * @returns {HTMLElement} - A panel.
   */
  getPanelByTab(tab) {
    // Check whether the passed `tab` argument is an actual tab (an HTML element
    // with a `[role=tab]`).
    const isTab = tab instanceof HTMLElement && tab.getAttribute("role") === "tab";

    // If so, return the panel with an ID matching the `[aria-controls]`
    // attribute of the tab. Otherwise, return `null`.
    return isTab ? this.panels.find((panel) => {
      return tab.getAttribute("aria-controls") === panel.id;
    }) : null;
  }
}