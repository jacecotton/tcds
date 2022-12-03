import WebComponent from "../WebComponent/WebComponent.js";

export default class Carousel extends WebComponent(HTMLElement) {
  static get observedAttributes() {
    return ["playing"];
  }

  static state = {
    playing: "boolean",
  }

  static props = {
    timing: "number",
  }

  connected() {
    const carousels = Array.from(document.querySelectorAll("tcds-carousel"));
    this.id = `carousel${carousels.length > 1 ? `-${carousels.indexOf(this) + 1}` : ""}`
    
    this.slides = Array.from(this.querySelectorAll("tcds-slide"));
    const activeSlides = this.slides.filter(slide => slide.hasAttribute("active"));

    if(activeSlides.length === 0) {
      this.select(this.slides[0]);
    } else if(activeSlides.length >= 1) {
      this.select(activeSlides[0]);
    }
  }

  render() {
    return /* html */`
      ${this.props.timing ? /* html */`
        <tcds-button
          part="play-pause"
          controls="${this.id}"
          icon="only ${this.state.playing ? "pause" : "play"}"
          size="small"
          variant="ui"
          label="${this.state.playing ? "Pause carousel" : "Play carousel"}"
          onclick="this.getRootNode().host.playClick()"
        ></tcds-button>
      ` : ``}
      <div part="navigation">
        <tcds-button
          part="previous"
          controls="${this.id}"
          icon="only chevron-left"
          variant="ghost"
          size="large"
          label="Previous slide"
          onclick="this.getRootNode().host.previousClick()"
        ></tcds-button>
        <div role="tablist" part="indicators">
          ${this.slides.map((slide, index) => /* html */`
            <button
              role="tab"
              part="indicator"
              id="indicator-${index + 1}"
              aria-controls="slide-${index + 1}"
              aria-expanded="${slide.state.active}"
              aria-label="Slide ${index + 1} of ${this.slides.length}"
              title="Slide ${index + 1} of ${this.slides.length}"
              tabindex="${slide.state.active ? "0" : "-1"}"
              onclick="this.getRootNode().host.indicatorClick(event)"
              onkeydown="this.getRootNode().host.indicatorKeydown(event)"
            ></button>
          `).join("")}
        </div>
        <tcds-button
          part="next"
          controls="${this.id}"
          icon="only chevron-right"
          variant="ghost"
          size="large"
          label="Next slide"
          onclick="this.getRootNode().host.nextClick()"
        ></tcds-button>
      </div>
      <div part="viewport">
        <slot></slot>
      </div>
    `;
  }

  mounted() {
    this.state.playing =
      this.hasAttribute("playing")
      && this.hasAttribute("timing")
      && window.matchMedia("(prefers-reduced-motion: reduce), (hover: none)").matches === false;

    this.parts["viewport"].addEventListener("mouseenter", () => {
      this.pause();
      this.state.hovering = true;
    });

    this.parts["viewport"].addEventListener("mouseleave", () => {
      this.resume();
      this.state.hovering = false;
    });

    this.parts["viewport"].addEventListener("touchstart", () => {
      this.state.playing = false;

      this.slides.forEach((slide) => {
        this.swipe.observe(slide);
      });
    });

    this.parts["viewport"].addEventListener("focusin", this.pause.bind(this));
    this.parts["viewport"].addEventListener("focusout", this.resume.bind(this));

    document.addEventListener("visibilitychange", () => {
      if(document.hidden) {
        this.pause();
      } else if(this.intersecting !== false) {
        this.resume();
      }
    });

    this.scrollOutOfView.observe(this);
  }

  updated() {
    return {
      state: {
        "playing": () => {
          requestAnimationFrame(() => {
            if(this.state.playing) {
              this.play();
            } else {
              this.stop();
            }
          });
        },

        "hovering": () => {
          if(this.state.hovering) {
            this.slides.forEach((slide) => {
              this.swipe.observe(slide);
            });
          } else {
            let scrolling;

            this.parts["viewport"].addEventListener("scroll", () => {
              clearTimeout(scrolling);

              scrolling = setTimeout(() => {
                this.slides.forEach((slide) => {
                  this.swipe.unobserve(slide);
                });
              }, 66);
            });
          }
        },
      },
    };
  }

  get swipe() {
    return new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting) {
          this.select(entry.target);
        }
      });
    }, {
      root: this.parts["viewport"],
      threshold: 1.0,
      rootMargin: "1px",
    });
  }

  get scrollOutOfView() {
    return new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(!entry.isIntersecting) {
          this.pause();
          this.intersecting = false;
        } else {
          this.resume();
          this.intersecting = true;
        }
      });
    }, { threshold: .9 });
  }

  select(activeSlide) {
    this.slides.forEach((slide) => {
      slide.state.active = slide === activeSlide;
    });
  }

  indicatorClick(event) {
    this.select(this.slides[this.parts["indicator"].indexOf(event.currentTarget)]);
    this.state.playing = false;
  }

  indicatorKeydown(event) {
    if(event.key === "ArrowRight") {
      event.preventDefault();
      this.next().then((next) => {
        this.parts["indicator"][next].focus();
      })
    } else if(event.key === "ArrowLeft") {
      event.preventDefault();
      this.previous().then((previous) => {
        this.parts["indicator"][previous].focus();
      });
    }

    this.state.playing = false;
  }

  nextClick() {
    this.next();
    this.state.playing = false;
  }

  previousClick() {
    this.previous();
    this.state.playing = false;
  }

  playClick() {
    this.state.playing = !this.state.playing;
  }

  next() {
    return new Promise((resolve) => {
      const nextIndex = (this.slides.indexOf(this.querySelector("[active]")) + 1) % this.slides.length;
      this.select(this.slides[nextIndex]);
      resolve(nextIndex);
    });
  }

  previous() {
    return new Promise((resolve) => {
      const previousIndex = (this.slides.indexOf(this.querySelector("[active]")) - 1 + this.slides.length) % this.slides.length;
      this.select(this.slides[previousIndex]);
      resolve(previousIndex);
    });
  }

  player;
  paused;

  play() {
    if(this.state.playing === true) {
      this.player = setTimeout(() => {
        this.next();
        this.play();
      }, this.props.timing * 1000);
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
      this.state.playing = true;
      this.paused = null;
    }
  }

  static get styles() {
    return {
      shadow: () => /* css */`
        :host {
          display: grid;
          grid-template-areas:
            "slides     slides"
            "play-pause navigation";
          grid-template-columns: min-content 1fr;
          align-items: center;
          gap: var(--tcds-space-loose) 0;
        }

        :host([navigation*="top"][navigation*="right"]) {
          --tcds-carousel-navigation-justify: end;

          grid-template-areas:
            ".          navigation"
            "slides     slides"
            "play-pause .";
          gap: var(--tcds-space-tight);
        }

        @media (hover: none), (max-width: 1024px) {
          :host {
            --tcds-carousel-play-pause-opacity: 1;
          }
        }
  
        :host(:hover),
        :host(:focus-within) {
          --tcds-carousel-play-pause-opacity: 1;
        }

        [part="viewport"] {
          grid-area: slides;
          display: flex;
          align-items: center;
          overflow-x: scroll;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          overscroll-behavior: none;
        }

        @media (prefers-reduced-motion: no-preference) {
          [part="viewport"] {
            scroll-behavior: smooth;
          }
        }

        [part="viewport"]::-webkit-scrollbar {
          display: none;
        }

        ::slotted(tcds-slide) {
          flex: 1 0 100%;
          scroll-snap-align: start;
          scroll-snap-stop: always;
        }

        [part="navigation"] {
          grid-area: navigation;
          display: flex;
          align-items: center;
          justify-content: var(--tcds-carousel-navigation-justify, center);
          gap: var(--tcds-space-loose);
        }

        [part="indicators"] {
          display: flex;
          gap: var(--tcds-space-x-loose);
        }

        [part="indicator"] {
          display: inline-flex;
          overflow: hidden;
          height: .85rem;
          width: .85rem;
          border-radius: .85rem;
          padding: 0;
          border: 0;
          cursor: pointer;
          background-color: #a8a8a8;
          transition: background-color var(--tcds-animation-productive-duration) var(--tcds-animation-productive-easing);
        }

        [part="indicator"]:hover,
        [part="indicator"][aria-expanded="true"] {
          background-color: var(--tcds-color-primary);
        }

        [part="play-pause"] {
          grid-area: play-pause;
          opacity: var(--tcds-carousel-play-pause-opacity, 0);
          transition: opacity var(--tcds-animation-productive-duration) var(--tcds-animation-productive-easing);
        }

        [part="next"]:not(:hover),
        [part="previous"]:not(:hover) {
          --tcds-button-text-color: #a8a8a8;
        }
      `,
    };
  }
}

customElements.define("tcds-carousel", Carousel);