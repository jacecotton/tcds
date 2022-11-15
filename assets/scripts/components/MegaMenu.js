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

  if(headerMenu) {
    const headerMenuLinks = headerMenu.querySelectorAll("li a");

    headerMenuLinks.forEach((link) => {
      const id = slugify(link.textContent);
      link.id = id;
    });

    document.querySelectorAll("[data-component=MegaMenu]").forEach((instance) => {
      const link = document.querySelector(`a#${instance.getAttribute("aria-labelledby")}`);
      const button = document.querySelector(`button#${instance.getAttribute("aria-labelledby")}`);

      if(!link) {
        if(button) {
          instance && new MegaMenu(instance, {});
        }

        return;
      }

      const newButton = document.createElement("button");
      newButton.id = link.id;
      newButton.setAttribute("aria-controls", instance.id);
      newButton.setAttribute("aria-expanded", "false");

      if(link.textContent === "Search") {
        newButton.innerHTML = `<span class="Icon" aria-hidden="true" role="presentation"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="arcs"><circle cx="11" cy="11" r="5.5"></circle><path d="m21 21-5-5"></path></svg></span>`;
        newButton.setAttribute("aria-label", "Search");
        newButton.setAttribute("title", "Search");
      } else {
        newButton.textContent = link.textContent;
      }

      link.parentNode.replaceChild(newButton, link);

      instance && new MegaMenu(instance, {});
    });
  }
}());
