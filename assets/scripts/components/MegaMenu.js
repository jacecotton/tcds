import Toggleable from "@tcds/components/Toggleable.js";

/**
 * MegaMenu component script.
 *
 * Note this script extends the Toggleable primitive, sharing base functionality
 * with other components that toggle (open and close) content.
 *
 * The functionality added by this script is:
 * - Closes other Mega Menu instances when an instance is opened.
 */
export default class MegaMenu extends Toggleable {
  constructor(element, props) {
    super(element, {
      ...props,
      ...{
        animation: {
          open: ["slide-in-down", "fade-in"],
          close: "fade-out",
        },
      },
    });
  }

  sync() {
    super.sync();

    return {
      open: () => {
        super.sync().open();

        if(this.state.open === true) {
          // If opening a mega menu, close other mega menus first.
          document.querySelectorAll("[data-component=MegaMenu]").forEach((otherMegaMenu) => {
            if(otherMegaMenu !== this.element) {
              otherMegaMenu.hidden = true;

              document.querySelectorAll(`[aria-controls=${otherMegaMenu.id}]`).forEach((otherToggle) => {
                otherToggle.setAttribute("aria-expanded", "false");
              });
            }
          });
        }
      },
    };
  }
}

document.querySelectorAll("[data-component=MegaMenu]").forEach((instance) => {
  instance && new MegaMenu(instance, {});
});
