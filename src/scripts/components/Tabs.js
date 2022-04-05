import Component from "../Component.js";

/**
 * Tabs component.
 *
 * Vocabulary:
 * 1. "tabs" or "tab buttons": The labeled buttons clicked to activate a panel.
 *    These must have `[role=tab]` and `[aria-controls]` attributes.
 * 2. "tablist": The element containing all tabs in a row. This has a
 *    `[role=tablist]`.
 * 3. "panels" or "tabpanels": The content associated with each tab. These have
 *    a `[role=tabpanel]`.
 *
 * Accessibility and usability requirements:
 * 1. Source order is (all tabs) + (all tabpanels), but tabbing order needs to
 *    be (tab button) -> (associated tabpanel), with sibling tabs focusable via
 *    left and right arrow keys.
 * 2. State is indicated with the `[aria-expanded]` attribute on tabs, and the
 *    `[hidden]` attribute on panels.
 * 3. Association between tabs and panels is established via
 *    `[aria-controls=panel id]` on tabs, and `[aria-labelledby=tab id]` on
 *    panels.
 *
 * @property {object} props - Tabs settings.
 * @property {boolean} [props.hideAll=false] - Whether to hide all tabs
 * initially.
 * @property {boolean} [props.keepPanelVisibility=false] - Whether to add the
 * `[hidden]` attribute to panels when they are deselected. Only set this prop
 * to `true` if the panels are going to be hidden through some other mechanism
 * (e.g. scrolling out of view in the case of the Carousel, which extends this
 * component).
 */
export default class Tabs extends Component {
  constructor(element, props) {
    super(element, props);

    // Get relevant DOM elements, converting them to normal arrays from
    // NodeLists so that array methods (like `[].indexOf`) are available.
    this.tabs = Array.from(this.element.querySelectorAll("[role=tab]"));
    this.tablist = this.element.querySelector("[role=tablist]");
    this.panels = Array.from(this.element.querySelectorAll("[role=tabpanel]"));
    this.panelsContainer = this.element.querySelector("[data-component-part=tabpanels]");

    // Set the first tab to active (as long as the `hideAll` prop is not `true`;
    // otherwise, set active tab to `null` so that no tabs are active).
    this.state.activeTab = (this.props.hideAll !== true) ? this.tabs[0] : null;

    // Define a key map for what to do when certain keys are pressed while
    // keyboard focus is on a tab.
    const keymap = {
      // Go to (and focus on) next tab on right arrow key press.
      "ArrowRight": () => {
        this.state.activeTab = this.getNextTab();
        this.state.activeTab.focus();
      },

      // Go to (and focus on) previous tab on left arrow key press.
      "ArrowLeft": () => {
        this.state.activeTab = this.getPreviousTab();
        this.state.activeTab.focus();
      },
    };

    // Set up event listeners.
    this.tabs.forEach((tab) => {
      // Activate tab when clicked.
      tab.addEventListener("click", () => {
        this.state.activeTab = tab;
      });

      // Listen for navigation arrows when a tab button is focused.
      tab.addEventListener("keydown", (key) => {
        // If the key code for the triggered event has a match in the key map,
        // call its associated function.
        keymap[key.code] && keymap[key.code]();
      });
    });
  }

  // Update DOM after state change.
  sync() {
    return {
      // Handler for `activeTab` state change.
      activeTab: () => {
        this.tabs.forEach((tab) => {
          // Indicate ARIA "expanded" state according to whether the current tab
          // in the loop is the active tab.
          tab.setAttribute("aria-expanded", (tab === this.state.activeTab));

          // Because each tab is accessible via arrow key, we want all inactive
          // tabs to not be accessible via the Tab key, instead making the tab's
          // asssociated content next in the tabbing order. If the current tab is
          // the active tab (or if there is no active tab), then we'll keep
          // keyboard accessibility via the Tab key by setting its tabindex to 0.
          tab.setAttribute("tabindex", (tab === this.state.activeTab || !this.state.activeTab) ? "0" : "-1");
        });

        if(!this.props.keepPanelVisibility) {
          this.panels.forEach((panel) => {
            // Hide panel if it is not the active panel (and vice versa).
            panel.hidden = !(panel === this.getPanelByTab(this.state.activeTab));
          });
        }

        // Fire a noop scroll event to trigger lazy-loading (in case it exists).
        window.dispatchEvent(new Event("scroll"));
      },
    };
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
    return (tab instanceof HTMLElement && tab.getAttribute("role") === "tab")
      // If so, return the panel with an ID matching the `[aria-controls]`
      // attribute of the tab.
      ? this.panels.find(panel => tab.getAttribute("aria-controls") === panel.id)
      // Otherwise, return `null`.
      : null;
  }
}

// Attach component.
document.querySelectorAll("[data-component=Tabs]").forEach((instance) => {
  instance && Tabs(instance, {
    hideAll: instance.classList.contains("Tabs--hide-all"),
  });
});
