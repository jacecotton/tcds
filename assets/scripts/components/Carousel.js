import WebComponent from "@tcds/WebComponent/WebComponent.js";

customElements.define("tcds-carousel", class Carousel extends WebComponent {
  static get observedAttributes() {
    return ["playing", "expanded"];
  }

  static get styles() {
    return `
      :host {
        display: grid;
        grid-template-areas:
          ". header header ."
          "previous slides slides next"
          ". play-pause indicators .";
        grid-template-columns: 32px 32px 1fr 32px;
        gap: 16px 24px;
      }

      @media (max-width: 1024px) {
        :host {
          --tcds-carousel-navigation-arrows: none;

          grid-template-areas:
            "header header"
            "slides slides"
            "play-pause indicators";
          grid-template-columns: 32px 1fr;
        }
      }

      @media (hover: none), (max-width: 1024px) {
        :host {
          --tcds-carousel-control-opacity: 1;
        }
      }

      :host(:hover),
      :host(:focus-within) {
        --tcds-carousel-control-opacity: 1;
      }

      :host([expanded]) {
        --tcds-carousel-slides-direction: column;
        --tcds-carousel-expand-collapse-rotate: 180deg;
      }

      [part="viewport"] {
        grid-area: slides;
        display: flex;
        flex-direction: var(--tcds-carousel-slides-direction, row);
      }

      :host(:not([expanded])) [part="viewport"] {
        align-items: center;
        overflow-x: scroll;
        scroll-snap-type: x mandatory;
        scrollbar-width: none;
      }

      @media (prefers-reduced-motion: no-preference) {
        :host(:not([expanded])) [part="viewport"] {
          scroll-behavior: smooth;
        }
      }

      :host(:not([expanded])) [part="viewport"]::-webkit-scrollbar {
        display: none;
      }

      :host(:not([expanded])) [part="slide"] {
        flex: 1 0 100%;
        scroll-snap-align: start;
        scroll-snap-stop: always;
      }

      :host([expanded]) [part="slide"] {
        margin-bottom: 16px;
        padding-bottom: 16px;
        border-bottom: 1px solid rgba(0, 0, 0, .03);
      }

      [part="indicators"] {
        grid-area: indicators;
        justify-self: center;
      }

      /**
       * 1. Required for Safari.
       */
      [part="indicator"] {
        display: inline-flex;
        overflow: hidden;
        height: 12px;
        width: 12px;
        padding: 0; /* 1 */
        border: 0; /* 1 */
        border-radius: 12px;
        margin: 0 6px;
        background-color: rgba(0, 0, 0, .2);
        opacity: var(--tcds-carousel-control-opacity, 0);
        transition:
          background-color .15s ease-in,
          opacity .15s ease-in;
      }

      [part="indicator"]:hover {
        background-color: rgba(0, 0, 0, .4);
      }

      [part="indicator"][aria-expanded="true"] {
        background-color: rgba(0, 0, 0, .6);
      }

      [part="previous"] {
        display: var(--tcds-carousel-navigation-arrows, inline-flex);
        grid-area: previous;
      }

      [part="next"] {
        display: var(--tcds-carousel-navigation-arrows, inline-flex);
        grid-area: next;
      }

      [part="play-pause"] {
        grid-area: play-pause;
        opacity: var(--tcds-carousel-control-opacity, 0);
        transition: opacity .15s ease-in;
      }

      [part="header"] {
        grid-area: header;
        display: flex;
        align-items: center;
        gap: 8px;
        border-bottom: 1px solid rgba(0, 0, 0, .1);
      }

      [part="expande-collapse"] {
        transform: rotateZ(var(--tcds-carousel-expand-collapse-roate, 0));
        transition: transform .15s ease-in;
      }
    `;
  }

  connected() {
    this.state.activeSlide = 0;
    this.state.expanded = false;
    this.state.playing =
      this.hasAttribute("playing")
      && this.hasAttribute("timing")
      && window.matchMedia("(prefers-reduced-motion: reduce), (hover: none)").matches === false;

    this.childComponents.slides = Array.from(this.querySelectorAll("tcds-slide"));
    this.slottedContent.header = this.querySelector("[slot=header]");
  }

  render() {
    return `
      ${this.slottedContent.header ? `
        <header part="header">
          <slot name="header"></slot>
          <tcds-button part="expand-collapse" controls="${this.id}" icon="only chevron-down" size="small" color="ghost" round label="${this.state.expanded ? "Collapse carousel" : "Expand carousel"}"></tcds-button>
        </header>
      ` : ""}
      <div role="tablist" part="indicators" ${this.state.expanded !== false ? "hidden" : ""}>
        ${this.childComponents.slides.map((slide, index) => `
          <button
            role="tab"
            part="indicator"
            id="${this.id}-indicator-${index + 1}"
            aria-controls="${this.id}-panel-${index + 1}"
            aria-expanded="${this.state.activeSlide === index}"
            title="Slide ${index + 1} of ${this.childComponents.slides.length}"
            aria-label="Slide ${index + 1} of ${this.childComponents.slides.length}"
          ></button>
        `).join("")}
      </div>
      <div part="viewport">
        ${this.childComponents.slides.map((slide, index) => `
          <section
            role="${this.state.expanded !== false ? "" : "tabpanel"}"
            part="slide"
            aria-roledescription="${this.state.expanded !== false ? "" : "slide"}"
            id="${this.id}-panel-${index + 1}"
            aria-labelledby="${this.id}-indicator-${index + 1}"
            ${this.state.activeSlide === index || this.state.expanded !== false ? "" : `aria-hidden="true" tabindex="-1"`}
          >
            ${slide.innerHTML}
          </section>
        `).join("")}
      </div>
      ${this.props.timing ? `
        <tcds-button part="play-pause" controls="${this.id}" icon="only ${this.state.playing ? "pause" : "play"}" size="small" round color="ghost" label="${this.state.playing ? "Pause carousel" : "Play carousel"}" ${this.state.expanded ? "hidden" : ""}></tcds-button>
      ` : ""}
      <tcds-button part="previous" controls="${this.id}" icon="only arrow-left" size="small" round color="ghost" ${this.state.expanded !== false ? "hidden" : ""} label="Previous slide"></tcds-button>
      <tcds-button part="next" controls="${this.id}" icon="only arrow-right" size="small" round color="ghost" ${this.state.expanded !== false ? "hidden" : ""} label="Next slide"></tcds-button>
    `;
  }

  mounted() {
    this.parts.viewport = this.shadowRoot.querySelector("[part=viewport]");
    this.parts.slides = Array.from(this.shadowRoot.querySelectorAll("[part=slide]"));
    this.parts.indicators = Array.from(this.shadowRoot.querySelectorAll("[part=indicator]"));
    this.parts.next = this.shadowRoot.querySelector("[part=next]");
    this.parts.previous = this.shadowRoot.querySelector("[part=previous]");
    this.parts.playPause = this.shadowRoot.querySelector("[part=play-pause]");
    this.parts.expandCollapse = this.shadowRoot.querySelector("[part=expand-collapse]");

    const keymap = {
      "ArrowRight": () => {
        this.state.activeSlide = this.getNextSlide();
        this.parts.indicators?.[this.state.activeSlide].focus();
      },

      "ArrowLeft": () => {
        this.state.activeSlide = this.getPreviousSlide();
        this.parts.indicators?.[this.state.activeSlide].focus();
      },

      "Home": () => {
        this.state.activeSlide = 0;
        this.parts.indicators?.[0].focus();
      },

      "End": () => {
        this.state.activeSlide = this.childComponents.slides.length - 1;
        this.parts.indicators?.[this.parts.indicators.length - 1].focus();
      },
    };

    this.parts.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        this.state.activeSlide = index;
        // Required for Safari.
        this.parts.indicators?.[index].focus();
        this.state.playing = false;
      });

      indicator.addEventListener("keydown", (event) => {
        keymap[event.key]?.();
        this.state.playing = false;
      });
    });

    this.parts.next.addEventListener("click", () => {
      this.state.activeSlide = this.getNextSlide();
      this.state.playing = false;
    });

    this.parts.previous.addEventListener("click", () => {
      this.state.activeSlide = this.getPreviousSlide();
      this.state.playing = false;
    });

    const swipe = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting) {
          this.state.activeSlide = this.parts.indicators.indexOf(this.shadowRoot.querySelector(`[role=tab][aria-controls=${entry.target.id}]`));
        }
      });
    }, {
      root: this.parts.viewport,
      threshold: 1.0,
      rootMargin: "16px",
    });

    this.parts.viewport.addEventListener("mouseenter", () => {
      this.pause();

      this.parts.slides.forEach((slide) => {
        swipe.observe(slide);
      });
    });

    this.parts.viewport.addEventListener("mouseleave", () => {
      this.resume();

      this.parts.slides.forEach((slide) => {
        swipe.unobserve(slide);
      });
    });

    this.parts.expandCollapse.addEventListener("click", () => {
      this.state.expanded = !this.state.expanded;
      this.state.playing = false;
    });

    this.parts.playPause?.addEventListener("click", () => {
      this.state.playing = !this.state.playing;
    });

    this.parts.viewport.addEventListener("touchstart", () => {
      this.state.playing = false;
    });

    this.parts.viewport.addEventListener("focusin", this.pause.bind(this));
    this.parts.viewport.addEventListener("focusout", this.resume.bind(this));

    document.addEventListener("visibilitychange", () => {
      if(document.hidden === true) {
        this.pause();
      } else if(document.hidden === false && this.paused === true && this.intersecting !== false) {
        this.resume();
      }
    }, false);

    const scrolledOutOfView = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(!entry.isIntersecting) {
          this.pause();
          this.intersecting = false;
        } else {
          this.resume();
          this.intersecting = true;
        }
      });
    }, {
      threshold: .9,
    });

    scrolledOutOfView.observe(this);
  }

  updated() {
    return {
      state: {
        "playing": () => {
          if(this.state.playing === true) {
            this.play();
          } else {
            this.stop();
          }
        },

        "activeSlide": () => {
          const viewportOffset = this.parts.viewport.getBoundingClientRect().left;
          const slideOffset = this.parts.slides[this.state.activeSlide].getBoundingClientRect().left;
          this.parts.viewport.scrollLeft += slideOffset - viewportOffset;
        },

        "expanded": () => {
          this.setAttribute("aria-roledescription", this.state.expanded ? "" : "carousel");
        },
      },
    };
  }

  getNextSlide(relativeSlide = this.state.activeSlide) {
    return relativeSlide !== this.childComponents.slides.length - 1 ? this.state.activeSlide + 1 : 0;
  }

  getPreviousSlide(relativeSlide = this.state.activeSlide) {
    return relativeSlide !== 0 ? this.state.activeSlide - 1 : this.childComponents.slides.length - 1;
  }

  // A recursive timeout for playing the Carousel on an interval.
  player;
  // A flag for a programmatic "soft stop" of the Carousel (as opposed to a
  // user-induced "hard stop").
  paused;

  play() {
    if(this.state.playing === true) {
      this.player = setTimeout(() => {
        this.state.activeSlide = this.getNextSlide();
        this.play();
      }, parseInt(this.props.timing));
    }
  }

  stop() {
    clearTimeout(this.player);
  }

  pause() {
    if(this.state.playing === true) {
      this.state.playing = false;
      this.paused = true;
    }
  }

  resume() {
    if(this.paused === true) {
      requestAnimationFrame(() => {
        this.state.playing = true;
        this.paused = false;
      });
    }
  }
});

(function() {
  document.querySelectorAll("tcds-carousel")?.forEach((carousel, index) => {
    carousel.id = `carousel-${index + 1}`;
  });
}());
