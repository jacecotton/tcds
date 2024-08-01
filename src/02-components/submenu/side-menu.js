import layout from "../../01-layout/layout.json";

class SideMenu {
  #mobile = matchMedia(`(max-width: ${layout.breakpoints.m}px)`);

  constructor(element) {
    this.element = element;

    if(this.element) {
      this.details = this.element.querySelector("details");

      if(this.details) {
        this.#handleResponsive();
      }
    }
  }

  #handleResponsive() {
    this.details.open = !this.#mobile.matches;
    this.#mobile.addEventListener("change", () => this.details.open = !this.#mobile.matches);
  }
}

new SideMenu(document.querySelector(".tcds-side-menu"));
