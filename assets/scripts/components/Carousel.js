import WebComponent from "@tcds/WebComponent/WebComponent.js";

class Slide extends WebComponent {
  constructor() {
    super();
  }
}

export default class Carousel extends WebComponent {
  constructor() {
    super();

    this.id = "carousel";

    const instances = document.querySelectorAll("tcds-carousel");

    if(instances.length > 1) {
      instances.forEach((carousel, index) => {
        if(this === carousel) {
          this.id += `-${index + 1}`;
        }
      });
    }

    this.slides = Array.from(this.querySelectorAll("tcds-slide"));
    this.header = this.querySelector("[slot=header]") || false;

    this.state.activeSlide = 0;
    this.state.playing = this.hasAttribute("playing") && this.hasAttribute("timing") && window.matchMedia("(prefers-reduced-motion: reduce), (hover: none)").matches === false;
    this.state.expanded = false;
  }

  render() {
    return `
      <style>
        [part="viewport"]::-webkit-scrollbar {
          display: none;
        }
      </style>

      ${this.header !== false ? `
        <header part="header">
          <slot name="header"></slot>
          <tcds-button part="expand-collapse" controls="${this.id}" icon="only chevron-down" size="small" color="ghost" round label="${this.state.expanded ? "Collapse carousel" : "Expand carousel"}"></tcds-button>
        </header>
      ` : ""}
      <div role="tablist" part="indicators" ${this.state.expanded !== false ? "hidden" : ""}>
        ${this.slides.map((slide, index) => {
          const label = `Slide ${index + 1} of ${this.slides.length}`;

          return `
            <button
              role="tab"
              part="indicator ${this.state.activeSlide === index ? "active" : ""}"
              aria-expanded="${this.state.activeSlide === index}"
              tabindex="${this.state.activeSlide === index ? "0" : "-1"}"
              id="${this.id}-indicator-${index + 1}"
              aria-controls="${this.id}-slide-${index + 1}"
              title="${label}"
            >
              <span class="visually-hidden">${label}</span>
            </button>
          `;
        }).join("")}
      </div>
      <div part="viewport" aria-live="${this.state.playing ? "off" : "polite"}">
        ${this.slides.map((slide, index) => {
          return `
            <section
              role="${this.state.expanded ? "" : "tabpanel"}"
              part="slide ${this.state.activeSlide === index ? "active" : ""}"
              aria-roledescription="${this.state.expanded ? "" : "slide"}"
              id="${this.id}-slide-${index + 1}"
              aria-labelledby="${this.state.expanded ? "" : `${this.id}-indicator-${index + 1}`}"
              ${this.state.activeSlide === index || this.state.expanded ? "" : `aria-hidden="true" tabindex="-1"`}
            >
              ${slide.innerHTML}
            </section>
          `;
        }).join("")}
      </div>
      ${this.props.timing ? `
        <tcds-button part="play-pause" controls="${this.id}" icon="only ${this.state.playing ? "pause" : "play"}" size="small" round color="ghost" label="${this.state.playing ? "Pause carousel" : "Play carousel"}" ${this.state.expanded ? "hidden" : ""}></tcds-button>
      ` : ""}
      <tcds-button part="previous" controls="${this.id}" icon="only arrow-left" size="small" round color="ghost" ${this.state.expanded !== false ? "hidden" : ""}>Previous</tcds-button>
      <tcds-button part="next" controls="${this.id}" icon="only arrow-right" size="small" round color="ghost" ${this.state.expanded !== false ? "hidden" : ""}>Next</tcds-button>
    `;
  }

  mounted() {
    this.indicators = Array.from(this.shadowRoot.querySelectorAll("[role=tab]"));
    this.slidePanels = Array.from(this.shadowRoot.querySelectorAll("[role=tabpanel]"));
    this.viewport = this.shadowRoot.querySelector("[part=viewport]");
    this.next = this.shadowRoot.querySelector("[part=next]");
    this.previous = this.shadowRoot.querySelector("[part=previous]");

    if(this.header) {
      this.shadowRoot.querySelector("[part=expand-collapse]").addEventListener("click", () => {
        this.state.playing = false;
        this.state.expanded = !this.state.expanded;
      });
    }

    if(this.props.timing) {
      this.shadowRoot.querySelector("[part=play-pause]").addEventListener("click", () => {
        this.state.playing = !this.state.playing;
      });
    }

    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        this.state.activeSlide = index;
        this.state.playing = false;
      });

      indicator.addEventListener("keydown", (event) => {
        if(event.key === "ArrowRight") {
          this.state.activeSlide = this.state.activeSlide === this.indicators.length - 1 ? 0 : this.state.activeSlide + 1;
          this.indicators[this.state.activeSlide].focus();
        } else if(event.key === "ArrowLeft") {
          this.state.activeSlide = this.state.activeSlide === 0 ? this.indicators.length - 1 : this.state.activeSlide - 1;
          this.indicators[this.state.activeSlide].focus();
        }

        this.state.playing = false;
      });
    });

    this.viewport.addEventListener("touchstart", () => {
      this.state.playing = false;
    });

    const scrolledOutOfView = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(!entry.isIntersecting) {
          this.pause();
          this.isIntersecting = false;
        } else {
          this.resume();
          this.isIntersecting = true;
        }
      });
    }, {
      threshold: .9,
    });

    scrolledOutOfView.observe(this);

    document.addEventListener("visibilitychange", () => {
      if(document.hidden === true) {
        this.pause();
      } else if(document.hidden === false && this.state.paused === true && this.isIntersecting !== false) {
        requestAnimationFrame(() => {
          this.resume();
        });
      }
    }, false);

    const swipe = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting && this.state.expanded !== true) {
          this.state.activeSlide = this.indicators.indexOf(this.shadowRoot.querySelector(`[role=tab][aria-controls=${entry.target.id}]`));
        }
      });
    }, {
      root: this.viewport,
      threshold: 1.0,
      rootMargin: "1px",
    });

    this.viewport.addEventListener("mouseenter", () => {
      this.slidePanels.forEach((slidePanel) => {
        swipe.observe(slidePanel);
      });
    });

    this.viewport.addEventListener("mouseleave", () => {
      this.slidePanels.forEach((slidePanel) => {
        swipe.unobserve(slidePanel);
      });
    });

    // Temporarily pause on "enter" (hover or focus).
    this.viewport.addEventListener("mouseenter", this.pause.bind(this));
    this.viewport.addEventListener("focusin", this.pause.bind(this));

    // Resume on "exit".
    this.viewport.addEventListener("mouseleave", this.resume.bind(this));
    this.viewport.addEventListener("focusout", this.resume.bind(this));

    this.next.addEventListener("click", () => {
      this.state.activeSlide = this.state.activeSlide === this.indicators.length - 1 ? 0 : this.state.activeSlide + 1;
      this.state.playing = false;
    });

    this.previous.addEventListener("click", () => {
      this.state.activeSlide = this.state.activeSlide === 0 ? this.indicators.length - 1 : this.state.activeSlide - 1;
      this.state.playing = false;
    });
  }

  updated() {
    return {
      state: {
        playing: () => {
          if(this.props.timing) {
            this.toggleAttribute("playing", this.state.playing);

            if(this.state.playing === true) {
              this.playTimer = setTimeout(this.play.bind(this), parseInt(this.props.timing));
            } else {
              clearTimeout(this.playTimer);
            }
          }
        },

        expanded: () => {
          if(this.header) {
            this.toggleAttribute("expanded", this.state.expanded);
            this.setAttribute("aria-roledescription", this.state.expanded ? "" : "carousel");
          }
        },

        activeSlide: () => {
          if(this.viewport) {
            const viewportOffset = this.viewport.getBoundingClientRect().left;
            const slideOffset = this.slidePanels[this.state.activeSlide].getBoundingClientRect().left;
            this.viewport.scrollLeft += slideOffset - viewportOffset;
          }

          this.slides.forEach((slide, index) => {
            slide.toggleAttribute("active", index === this.state.activeSlide);
          });
        },
      },
    };
  }

  play() {
    if(this.state.playing === true) {
      this.state.activeSlide = this.state.activeSlide === this.indicators.length - 1 ? 0 : this.state.activeSlide + 1;
      this.playTimer = setTimeout(this.play.bind(this), parseInt(this.props.timing));
    }
  }

  pause() {
    if(this.state.playing === true) {
      this.state.playing = false;
      this.state.paused = true;
    }
  }

  resume() {
    if(this.state.paused === true) {
      this.state.playing = true;
      this.state.paused = false;
    }
  }
}

customElements.define("tcds-slide", Slide);
customElements.define("tcds-carousel", Carousel);
