import Toggleable from "@tcds/components/Toggleable.js";
import getFocusableChildren from "@tcds/utilities/getFocusableChildren.js";

/**
 * Dialog component script.
 *
 * Note this script extends the Toggleable primitive, sharing base functionality
 * with other components that toggle (open and close) content.
 *
 * The functionality added by this script is:
 * - Traps focus within the dialog when the dialog is open.
 * - Returns focus to the last focused element when the dialog is closed.
 * - Disables scrolling while Dialog is open.
 */
export default class Dialog extends Toggleable {
  constructor(element, props) {
    super(element, props);

    this.content = this.element.querySelector(".Dialog__content");

    this.element.addEventListener("mousedown", () => {
      document.body.click();
    });

    this.content.addEventListener("mousedown", (event) => {
      event.stopPropagation();
    });

    this.element.addEventListener("keydown", (event) => {
      if(event.key === "Tab") {
        const focusableChildren = getFocusableChildren(this.element);
        const focusedItemIndex = focusableChildren.indexOf(document.activeElement);
        const lastIndex = focusableChildren.length - 1;

        if(event.shiftKey && focusedItemIndex === 0) {
          focusableChildren[lastIndex].focus();
          event.preventDefault();
        } else if(!event.shiftKey && focusedItemIndex === lastIndex) {
          focusableChildren[0].focus();
          event.preventDefault();
        }
      }
    });
  }

  sync() {
    super.sync();

    return {
      open: () => {
        super.sync().open();

        document.body.style.overflowY = this.state.open === true ? "hidden" : null;

        if(this.state.open === true) {
          const target = this.element.querySelector("[autofocus]") || getFocusableChildren(this.element)[0];
          this.previouslyFocused = document.activeElement;
          target && target.focus();
        } else {
          if(this.previouslyFocused && this.previouslyFocused.focus) {
            this.previouslyFocused.focus();
          }
        }
      },
    };
  }
}

window.addEventListener("load", () => {
  document.querySelectorAll("[data-component=Dialog]").forEach((instance) => {
    instance && new Dialog(instance, {
      openOnload: instance.getAttribute("data-open-onload") === "true",
      animation: { open: "fade-in", close: "fade-out" },
    });
  });
});
