import {MotionDurationProductive} from "@/components/_shared/_gen/tokens.js";

document.querySelectorAll(".tcds-pullout-menu").forEach((pulloutMenu) => {
  calculateToggleWidth();

  pulloutMenu.addEventListener("toggle", () => {
    pulloutMenu.querySelector("ul").offsetHeight;
  });

  pulloutMenu.addEventListener("toggle", () => {
    setTimeout(calculateTotalHeight, 300);
  }, {once: true});

  function calculateToggleWidth() {
    const width = pulloutMenu.querySelector(":scope > summary").offsetWidth;
    pulloutMenu.style.setProperty("--tcds-pullout-menu-toggle-width", `${width}px`);

    setTimeout(() => {
      pulloutMenu.toggleAttribute("data-tcds-pullout-menu", true);
    }, 300);
  }

  function calculateTotalHeight() {
    const height = pulloutMenu.offsetHeight;
    pulloutMenu.style.setProperty("--tcds-pullout-menu-total-height", `${height}px`);
    pulloutMenu.removeEventListener("transitionend", calculateTotalHeight);
  }
});
