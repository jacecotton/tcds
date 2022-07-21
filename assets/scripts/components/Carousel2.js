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
    this.setAttribute("aria-roledescription", "carousel");
    this.indicators = null;
    this.slides = null;
    this.viewport = null;

    this.props = {
      playable: this.hasAttribute("timing"),
      timing: this.hasAttribute("timing") && this.getAttribute("timing"),
    };

    this.state = store({
      activeSlide: 0,
      playing: this.hasAttribute("paused") ? false : window.matchMedia("(prefers-reduced-motion: reduce), (hover: none)").matches === false && this.hasAttribute("timing"),
    });
  }

  render() {
    const slides = Array.from(this.querySelectorAll("tcds-slide"));

    return `
      ${this.props.header !== false ? `
        <header part="header">
          <slot name="header"></slot>
          <tcds-button>expand</tcds-button>
        </header>
      ` : ""}
      <div part="indicators" role="tablist">
        ${slides.map((slide, index) => {
          const isActive = this.state.activeSlide === index;
          const label = `Slide ${index + 1} of ${slides.length}`;

          return `
            <button
              part="indicator ${isActive ? "active" : ""}"
              role="tab"
              id="${this.id}-indicator-${index + 1}"
              aria-controls="${this.id}-slide-${index + 1}"
              aria-expanded="${isActive}"
              tabindex="${isActive ? "0" : "-1"}"
              title="${label}"
            >
              ${label}
            </button>
          `;
        }).join("")}
      </div>
      <div part="viewport">
        ${slides.map((slide, index) => {
          const isActive = this.state.activeSlide === index;

          return `
            <section
              part="slide ${isActive ? "active" : ""}"
              role="tabpanel"
              id="${this.id}-slide-${index + 1}"
              aria-labelledby="${this.id}-indicator-${index + 1}"
              ${isActive ? "" : `aria-hidden="true" tabindex="-1"`}
            >
              ${slide.innerHTML}
            </section>
          `;
        }).join("")}
      </div>
      ${this.props.playable ? `
        <tcds-button part="playpause">${this.state.playing ? "pause" : "play"}</tcds-button>
      ` : ""}
      <tcds-button part="previous" icon="chevron-left" modifiers="icon-only round ghost">Previous</tcds-button>
      <tcds-button part="next" icon="chevron-right" modifiers="icon-only round ghost">next</tcds-button>
    `;
  }

  mounted() {
    this.indicators = Array.from(this.shadowRoot.querySelectorAll("[role=tab]"));
    this.slides = Array.from(this.shadowRoot.querySelectorAll("[role=tabpanel]"));
    this.viewport = this.shadowRoot.querySelector("[part=viewport]");
    this.next = this.shadowRoot.querySelector("[part=next]");
    this.previous = this.shadowRoot.querySelector("[part=previous]");

    if(this.props.playable) {
      this.playpause = this.shadowRoot.querySelector("[part=playpause]");
      this.setAttribute(this.state.playing ? "playing" : "paused", "");
    }

    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        this.state.activeSlide = index;
      });

      indicator.addEventListener("keydown", (event) => {
        if(event.key === "ArrowRight") {
          this.state.activeSlide = this.state.activeSlide === this.indicators.length - 1 ? 0 : this.state.activeSlide + 1;
          this.indicators[this.state.activeSlide].focus();
        } else if(event.key === "ArrowLeft") {
          this.state.activeSlide = this.state.activeSlide === 0 ? this.indicators.length - 1 : this.state.activeSlide - 1;
          this.indicators[this.state.activeSlide].focus();
        }
      });
    });

    const swipe = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting) {
          this.state.activeSlide = this.indicators.indexOf(this.shadowRoot.querySelector(`[role=tab][aria-controls=${entry.target.id}]`));
        }
      });
    }, {
      root: this.viewport,
      threshold: 1.0,
      rootMargin: "1px",
    });

    this.viewport.addEventListener("mouseenter", () => {
      this.slides.forEach((slide) => {
        swipe.observe(slide);
      });
    });

    this.viewport.addEventListener("mouseleave", () => {
      this.slides.forEach((slide) => {
        swipe.unobserve(slide);
      });
    });

    this.next.addEventListener("click", () => {
      this.state.activeSlide = this.state.activeSlide === this.indicators.length - 1 ? 0 : this.state.activeSlide + 1;
    });

    this.previous.addEventListener("click", () => {
      this.state.activeSlide = this.state.activeSlide === 0 ? this.indicators.length - 1 : this.state.activeSlide - 1;
    });
  }

  updated() {
    if(this.viewport) {
      const viewportOffset = this.viewport.getBoundingClientRect().left;
      const slideOffset = this.slides[this.state.activeSlide].getBoundingClientRect().left;
      this.viewport.scrollLeft += slideOffset - viewportOffset;
    }
  }
}

customElements.define("tcds-carousel", Carousel);
customElements.define("tcds-slide", Slide);
