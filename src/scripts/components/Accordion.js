import Component from "../Component.js";

export default class Accordion extends Component {
  constructor(element, props) {
    super(element, props);

    this.props.multiselectable = this.props.multiselectable || false;

    // Get relevant elements.
    this.panels = Array.from(this.element.querySelectorAll("[data-component-part=panel]"));
    this.buttons = Array.from(this.element.querySelectorAll("[data-component-part=panel-toggle]"));
    this.expandAllButton = this.element.querySelector("[data-component-part=expand-all]");
    this.collapseAllButton = this.element.querySelector("[data-component-part=collapse-all]");

    // Track which buttons should be active via an array. Start with an empty
    // array to collapse all sections.
    this.state.activeButtons = [];

    this.buttons.forEach((button) => {
      button.addEventListener("click", () => {
        // We're going to add each clicked button to an array (`activeButtons`),
        // then remove that button when clicked again. First we need to check
        // whether the clicked button is already in the array.
        const buttonIndex = this.state.activeButtons.indexOf(button);
        const isActive = buttonIndex > -1;

        // If it isn't...
        if(!isActive) {
          // If not multiselectable, make the clicked button the only active one
          // in state.
          if(this.props.multiselectable === false) {
            this.state.activeButtons = [button];
          } else {
            // Otherwise, add the clicked button to the active state with the
            // others.
            this.state.activeButtons.push(button);
          }
        } else {
          // If the button is currently active and it's clicked again, remove it
          // from the array.
          this.state.activeButtons.splice(buttonIndex, 1);
        }
      });
    });

    if(this.props.multiselectable === true) {
      // Add every button to the active sections state on "expand all" click.
      this.expandAllButton.addEventListener("click", () => {
        this.state.activeButtons = [...this.buttons];
      });

      // Empty active sections state on "collapse all" click.
      this.collapseAllButton.addEventListener("click", () => {
        this.state.activeButtons = [];
      });
    }
  }

  // Update DOM after state change.
  sync() {
    this.buttons.forEach((button) => {
      // Determine whether the current button is in the active state.
      const isActive = this.state.activeButtons.indexOf(button) > -1;

      // Get the panel associated with the button.
      const panel = this.getPanelByButton(button);
      // Get the section containing the panel and button.
      const section = button.closest("section");

      // Set ARIA state on button.
      button.setAttribute("aria-expanded", isActive);
      section.setAttribute("data-open", isActive);

      if(isActive) {
        // Remove leftover event listener from collapse transition.
        panel.ontransitionend = null;
        // Unhide the panel (still collapsed).
        panel.hidden = false;
        // When ready...
        requestAnimationFrame(() => {
          // Uncollapse the panel (causes transition).
          panel.style.height = `${panel.scrollHeight}px`;
        });
      } else {
        // Collapse the panel (causes transition).
        panel.style.height = "0px";
        // After that transition ends...
        panel.ontransitionend = () => {
          // Fully hide the panel for proper correspondence with ARIA state.
          panel.hidden = true;
        };
      }
    });
  }

  /** Utilities */

  /**
   * Get the panel controlled by the given toggle button.
   *
   * @param {HTMLElement} button - The button for which you want to get the
   * associated panel.
   * @returns {HTMLElement} - A panel.
   */
  getPanelByButton(button) {
    // Return the panel with an ID matching the `[aria-controls]` attribute of
    // the button.
    return this.panels.find((panel) => {
      return button.getAttribute("aria-controls") === panel.id;
    });
  }
}

// Wait for the window to fully load to ensure height calculations of panels are
// accurate.
window.addEventListener("load", () => {
  document.querySelectorAll("[data-component=Accordion]").forEach((instance) => {
    instance && new Accordion(instance, {
      multiselectable: instance.classList.contains("Accordion--multiselectable"),
    });
  });
});