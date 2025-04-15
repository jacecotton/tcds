import layout from "../../01-layout/layout.json";

class TCDSSiteHeaderElement extends HTMLElement {
  constructor() {
    super();
  }

  #mobile = matchMedia(`(max-width: ${layout.breakpoints.m}px)`);

  get scrolled() {
    return this.hasAttribute("scrolled");
  }

  set scrolled(value) {
    this.toggleAttribute("scrolled", Boolean(value));
  }

  connectedCallback() {
    this.details = [...this.querySelectorAll("details")];
    this.nav = this.querySelector("#site-header-nav");

    this.#upgrade();
    this.#handleResponsive();
    this.#handleScroll();
    this.#handleMegaMenuOpen();
    this.#handleClickToClose();
  }

  #upgrade() {
    this.role = "banner";
  }

  #handleResponsive() {
    this.nav.open = !this.#mobile.matches;
    this.#mobile.addEventListener("change", () => this.nav.open = !this.#mobile.matches);
  }

  #handleScroll() {
    window.addEventListener("scroll", () => {
      if(window.scrollY > this.offsetHeight && !this.scrolled) {
        this.scrolled = true;
      } else if(window.scrollY < this.offsetHeight / 1.5 && this.scrolled) {
        this.scrolled = false;
      }
    });
  }

  #handleMegaMenuOpen() {
    const relevantDetails = Array.from(this.querySelectorAll("details[name=primary-menu]"));

    relevantDetails.forEach((details) => {
      details.addEventListener("toggle", () => {
        this.toggleAttribute("open", Boolean(relevantDetails.find(details => details.open)));
      });
    });
  }

  #handleClickToClose() {
    document.body.addEventListener("click", () => {
      this.#closeDetails(detail => !(detail === this.nav && !this.#mobile.matches));
    });

    this.details.forEach((detail) => {
      detail.addEventListener("click", (event) => {
        event.stopPropagation();

        if(event.offsetY > this.offsetHeight + detail.offsetTop) {
          detail.open = false;
        }
      });

      detail.querySelector("summary").addEventListener("click", () => {
        this.#closeDetails((_detail) => {
          return !(_detail === this.nav && !this.#mobile.matches)
            && !_detail.contains(detail);
        });
      });
    });
  }

  #closeDetails(filter = () => true) {
    this.details.filter(detail => detail.open)
      .filter(filter).forEach(detail => detail.open = false);
  }
}

customElements.define("tcds-site-header", TCDSSiteHeaderElement);
