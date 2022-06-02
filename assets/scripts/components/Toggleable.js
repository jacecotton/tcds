import Component from "@tcds/utilities/Component.js";
import AnimateElement from "@tcds/animation/AnimateElement.js";

/**
 * A component primitive for toggleable content. Note this isn't a component per
 * se, but rather a base component that other components can extend. It takes
 * care of all the logic common to all components that toggle content: opening,
 * closing, persistent state, etc., and provides a consistent API for
 * controlling it. Components that make use of this primitive include
 * Notification, Dialog, Mega Menu, and Drawer.
 */
export default class Toggleable extends Component {
  constructor(element, props) {
    super(element, props);

    if(this.props.closeOnClickOutside === undefined) {
      this.props.closeOnClickOutside = true;
    }

    this.togglers = document.querySelectorAll(`[aria-controls=${this.element.id}]`);
    this.localStorageState = `toggleable_${this.element.id}_state`;

    // Initialize state.
    if(this.props.openOnload === true) {
      // this.state.open = localStorage.getItem(this.localStorageState) === "closed" ? false : true;
      this.state.open = true;
    } else {
      this.state.open = false;
    }

    if(this.props.closeOnClickOutside) {
      document.body.addEventListener("click", () => {
        if(this.state.open === true) {
          this.state.open = false;
        }
      });

      this.element.addEventListener("click", (event) => {
        event.stopPropagation();
      });
    }

    this.togglers.forEach((toggler) => {
      toggler.addEventListener("click", (event) => {
        event.stopPropagation();
        this.state.open = !this.state.open;
      });
    });

    document.addEventListener("keyup", (event) => {
      if(event.key === "Escape" && this.state.open === true) {
        this.state.open = false;
      }
    });
  }

  sync() {
    return {
      open: () => {
        // Set local storage state.
        localStorage.setItem(this.localStorageState, this.state.open ? "open" : "closed");

        // Indicate state on controlling buttons.
        this.togglers.forEach((toggler) => {
          toggler.setAttribute("aria-expanded", this.state.open);
        });

        if(!this.props.animation) {
          this.element.hidden = !this.state.open;
        } else {
          if(this.state.open === true) {
            this.element.hidden = false;
            AnimateElement(this.element, this.props.animation.open || this.props.animation, { lazyload: false });
          } else {
            AnimateElement(this.element, this.props.animation.close || this.props.animation, { lazyload: false}).then(() => {
              this.element.hidden = true;
            });
          }
        }
      },
    };
  }

  toggle() {
    this.state.open = !this.state.open;
  }

  open() {
    this.state.open = true;
  }

  close() {
    this.state.open = false;
  }
}
