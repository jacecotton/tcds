import Component from "@tcds/utilities/Component.js";
import AnimateElement from "@tcds/animation/AnimateElement.js";

/**
 * MegaMenu component script.
 *
 * Note this script extends the Toggleable primitive, sharing base functionality
 * with other components that toggle (open and close) content.
 *
 * The functionality added by this script is:
 * - Closes other Mega Menu instances when an instance is opened.
 */
export default class MegaMenu extends Component {
  constructor(element, props) {
    super(element, props);

    this.toggles = document.querySelectorAll(`[aria-controls=${this.element.id}]`);

    this.state.expanded = false;

    this.toggles.forEach((toggle) => {
      toggle.addEventListener("click", (event) => {
        event.stopPropagation();
        this.state.expanded = !this.state.expanded;
      });
    });

    document.body.addEventListener("click", () => {
      this.state.expanded = false;
    });

    this.element.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    this.element.addEventListener("keyup", (event) => {
      if(event.key === "Escape") {
        this.state.expanded = false;
      }
    });
  }

  sync() {
    return {
      expanded: () => {
        this.toggles.forEach((toggle) => {
          toggle.setAttribute("aria-expanded", this.state.expanded);
        });

        if(this.state.expanded === true) {
          // If opening a mega menu, close other mega menus first.
          document.querySelectorAll("[data-component=MegaMenu]").forEach((otherMegaMenu) => {
            if(otherMegaMenu !== this.element) {
              otherMegaMenu.hidden = true;
              document.querySelectorAll(`[aria-controls=${otherMegaMenu.id}]`).forEach((otherToggle) => {
                otherToggle.setAttribute("aria-expanded", "false");
              });
            }
          });

          // Now open the current mega menu.
          this.element.hidden = false;

          if(window.matchMedia("(min-width: 1280px)").matches) {
            AnimateElement(this.element, ["slide-in-down", "fade-in"], { lazyload: false });
          } else {
            AnimateElement(this.element, ["slide-in-left", "fade-in"], { lazyload: false });
          }
        } else if(!this.element.hidden) {
          AnimateElement(this.element, "fade-out", { lazyload: false }).then(() => {
            this.element.hidden = true;
          });
        }
      },
    };
  }
}

document.querySelectorAll("[data-component=MegaMenu]").forEach((instance) => {
  instance && new MegaMenu(instance, {});
});
