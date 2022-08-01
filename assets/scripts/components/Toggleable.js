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

    if(this.props.target === undefined) {
      this.props.target = this.element;
    }

    this.togglers = document.querySelectorAll(`[aria-controls=${this.element.id}], tcds-button[controls=${this.element.id}]::part(button)`);
    this.localStorageState = `toggleable_${this.element.id}_state`;

    // Initialize state.
    if(this.props.openOnload === true) {
      this.state.open = localStorage.getItem(this.localStorageState) === "closed" ? false : true;
    } else {
      this.state.open = false;
    }

    if(this.props.closeOnClickOutside) {
      document.body.addEventListener("click", () => {
        if(this.state.open === true && this.state.destroyed !== true) {
          this.state.open = false;
        }
      });

      this.element.addEventListener("click", (event) => {
        if(this.state.destroyed !== true) {
          event.stopPropagation();
        }
      });
    }

    this.togglers.forEach((toggler) => {
      toggler.addEventListener("click", (event) => {
        if(this.state.destroyed !== true) {
          event.stopPropagation();
          this.state.open = !this.state.open;
        }
      });
    });

    document.addEventListener("keyup", (event) => {
      if(event.key === "Escape" && this.state.open === true && this.state.destroyed !== true) {
        this.state.open = false;
      }
    });
  }

  sync(newState, prevState) {
    return {
      open: () => {
        // Set local storage state.
        localStorage.setItem(this.localStorageState, this.state.open ? "open" : "closed");

        // Indicate state on controlling buttons.
        this.togglers.forEach((toggler) => {
          toggler.setAttribute("aria-expanded", this.state.open);
        });

        if(!this.props.animation || prevState && prevState.open === undefined) {
          this.props.target.hidden = !this.state.open;
        } else {
          if(this.state.open === true) {
            this.element.setAttribute("data-animation-state", "opening");
            this.props.target.hidden = false;

            AnimateElement(this.props.target, this.props.animation.open || this.props.animation, { lazyload: false }).then(() => {
              this.element.removeAttribute("data-animation-state");
              this.element.setAttribute("data-state", "open");
            });
          } else {
            this.element.setAttribute("data-animation-state", "closing");

            AnimateElement(this.props.target, this.props.animation.close || this.props.animation, { lazyload: false}).then(() => {
              this.props.target.hidden = true;
              this.element.removeAttribute("data-animation-state");
              this.element.setAttribute("data-state", "closed");
            });
          }
        }
      },
    };
  }

  toggle() {
    this.state.open = !this.state.open;
    this.state.destroyed = false;
  }

  open() {
    this.state.open = true;
    this.state.destroyed = false;
  }

  close() {
    this.state.open = false;
    this.state.destroyed = false;
  }

  destroy() {
    this.state.open = true;
    this.state.destroyed = true;
  }
}
