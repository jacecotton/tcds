import Toggleable from "@tcds/components/Toggleable.js";
import slugify from "@tcds/utilities/slugify.js";

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

(function() {
  const headerMenu = document.getElementById("header-menu");
  const headerMenuLinks = headerMenu.querySelectorAll("li a");

  headerMenuLinks.forEach((link) => {
    const id = slugify(link.textContent);
    link.id = id;
  });

  document.querySelectorAll("[data-component=MegaMenu]").forEach((instance) => {
    const link = document.getElementById(instance.getAttribute("aria-labelledby"));

    if(!link) {
      return;
    }

    const button = document.createElement("button");
    button.id = link.id;
    button.setAttribute("aria-controls", instance.id);
    button.setAttribute("aria-expanded", "false");
    button.textContent = link.textContent;

    link.parentNode.replaceChild(button, link);

    instance && new MegaMenu(instance, {});
  });
}());
