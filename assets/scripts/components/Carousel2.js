import WebComponent from "./WebComponent/WebComponent.js";
import store from "./WebComponent/store.js";

class Slide extends HTMLElement {
  constructor() {
    super();
  }
}

export default class Carousel extends WebComponent {
  constructor() {
    super();

    this.id = `carousel-${crypto.randomUUID()}`;

    this.state = store({
      activeSlide: 0,
      playing: this.hasAttribute("playable"),
    });

    if(window.matchMedia("(prefers-reduced-motion: reduce), (hover: none)").matches) {
      this.state.playing = false;
    }
  }

  render() {
    const slides = Array.from(this.querySelectorAll("tcds-slide"));

    return `
      <div role="tablist" part="indicators">
        ${slides.map((slide, index) => {
          return `<button role="tab" part="indicator ${this.state.activeSlide === index ? "active" : ""}" id="${this.id}-indicator-${index + 1}" aria-controls="${this.id}-slide-${index + 1}" aria-expanded="${this.state.activeSlide === index}" tabindex="${this.state.activeSlide === index ? "0" : "-1"}" title="Slide ${index + 1} of ${slides.length}">Slide ${index + 1} of ${slides.length}</button>`;
        }).join("")}
      </div>
      <div part="viewport">
        ${slides.map((slide, index) => {
          return `<section role="tabpanel" part="slide ${this.state.activeSlide === index ? "active" : ""}" id="${this.id}-slide-${index + 1}" aria-labelledby="${this.id}-indicator-${index + 1}">${slide.innerHTML}</section>`;
        }).join("")}
      </div>
    `;
  }

  mounted() {
    const indicators = Array.from(this.shadowRoot.querySelectorAll("[role=tab]"));
    const slides = Array.from(this.shadowRoot.querySelectorAll("[role=tabpanel]"));
    const viewport = this.shadowRoot.querySelector("[part=viewport]");

    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        this.state.activeSlide = index;
      });

      indicator.addEventListener("keydown", (event) => {
        if(event.key === "ArrowRight") {
          this.state.activeSlide = this.state.activeSlide === indicators.length - 1 ? 0 : this.state.activeSlide + 1;
          indicators[this.state.activeSlide].focus();
        } else if(event.key === "ArrowLeft") {
          this.state.activeSlide = this.state.activeSlide === 0 ? indicators.length - 1 : this.state.activeSlide - 1;
          indicators[this.state.activeSlide].focus();
        }
      });
    });

    const swipe = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting) {
          this.state.activeSlide = indicators.indexOf(this.shadowRoot.querySelector(`[role=tab][aria-controls=${entry.target.id}]`));
        }
      }, {
        root: viewport,
        threshold: 1.0,
        rootMargin: "1px",
      });
    });

    viewport.addEventListener("mouseenter", () => {
      slides.forEach((slide) => {
        swipe.observe(slide);
      });
    });

    viewport.addEventListener("mouseleave", () => {
      slides.forEach((slide) => {
        swipe.unobserve(slide);
      });
    });
  }

  updated() {
    console.log(this.state.activeSlide);
  }
}

customElements.define("tcds-carousel", Carousel);
customElements.define("tcds-slide", Slide);
