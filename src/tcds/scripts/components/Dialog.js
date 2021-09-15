/**
 * Dialog component.
 */
class Dialog extends Component {
  constructor(element, props) {
    super(element, props);

    this.toggles = document.querySelectorAll(`[data-dialog-toggle=${this.element.id}]`);
    this.hiders = this.element.querySelectorAll(`[data-dialog-close]`);

    // Initialize reference to last active (focused) element.
    this.activeElement = null;

    this.toggles.forEach((toggle) => {
      toggle.addEventListener("click", () => {
        this.state.open = !this.state.open;
      });
    });

    this.hiders.forEach((hider) => {
      hider.addEventListener("click", () => {
        this.state.open = false;
      });
    });

    this.element.addEventListener("keyup", (event) => {
      if(event.key === "Escape") {
        this.state.open = false;
      }
    });
  }

  sync(newState, prevState) {
    if("open" in newState) {
      this.element.hidden = !this.state.open;
      this.element.setAttribute("aria-modal", this.state.open);

      this.toggles.forEach((toggle) => {
        toggle.toggleAttribute("data-dialog-is-open", this.state.open); // placeholder
      });

      if(this.state.open === true) {
        // get current focused element and store it
        this.activeElement = document.activeElement;
        this.element.focus();
      } else if(this.state.open === false) {
        if(this.activeElement) {
          // move focus back to previously stored active element
          this.activeElement.focus();
        }
      }
    }
  }
}

document.querySelectorAll("[data-component=Dialog]").forEach((instance) => {
  const myDialog = new Dialog(instance, {});
});