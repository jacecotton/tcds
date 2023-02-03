import WebComponent from "../../scripts/WebComponent/WebComponent.js";
import shadowStyles from "./style.css";
import lightStyles from "./style.light.css";

/**
 * Discussion:
 * - On ARIA spec, see discussion note in ../tabs/index.js
 */

export default class Carousel extends WebComponent(HTMLElement) {
  static state = {
    playing: {
      type: Boolean,
      reflected: true,
    },
  };

  static props = {
    timing: {type: Number},
    multiple: {type: Boolean},
  };

  constructor() {
    super();
    this.shadowRoot.adoptedStyleSheets = [shadowStyles];
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, ...[lightStyles]];
  }

  connectedCallback() {
    this.ariaRoleDescription = "carousel";

    this.slides = Array.from(this.querySelectorAll("tcds-slide"));

    // Add auto-incrementing unique IDs to each carousel instance.
    const carousels = Array.from(document.querySelectorAll("tcds-carousel"));
    this.id = `carousel${carousels.length > 1 ? `-${carousels.indexOf(this) + 1}` : ""}`;

    this.activeSlides = [...this.slides].filter(slide => slide.hasAttribute("active"));
  }

  render() {
    return /* html */`
      ${this.props.timing ? /* html */`
        <tcds-button
          part="play-pause"
          icon="only ${this.state.playing ? "pause" : "play"}"
          size="small"
          variant="ui"
          label="${this.state.playing ? "Stop automatic slide show" : "Start automatic slide show"}"
          onclick="this.getRootNode().host.playClick()"
        ></tcds-button>
      ` : ``}
      <div part="navigation">
        <tcds-button
          part="previous"
          icon="only chevron-left"
          variant="ghost"
          size="large"
          label="Go to previous slide"
          onclick="this.getRootNode().host.previousClick()"
        ></tcds-button>
        <div role="tablist" part="indicators" aria-label="Pick slide">
          ${this.slides.map((slide, index) => /* html */`
            <button
              role="tab"
              part="indicator"
              aria-selected="${slide.state.active}"
              aria-disabled="${!slide.state.active}"
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
          label="Go to next slide"
          icon="only chevron-right"
          variant="ghost"
          size="large"
          onclick="this.getRootNode().host.nextClick()"
        ></tcds-button>
      </div>
      <div
        part="viewport"
        aria-live="${this.state.playing ? "off" : "polite"}"
        ontouchstart="this.getRootNode().host.viewportSwipe()"
        onmouseover="this.getRootNode().host.viewportHover()"
        onmouseleave="this.getRootNode().host.resume()"
        onfocus="this.getRootNode().host.pause()"
        onblur="this.getRootNode().host.resume()"
      >
        <slot></slot>
      </div>
    `;
  }

  mountedCallback() {
    this.state.playing =
      this.hasAttribute("playing")
      && this.hasAttribute("timing")
      && !window.matchMedia("(prefers-reduced-motion: reduce), (hover: none)").matches;

    this.slides.forEach((slide) => {
      this.swipe.observe(slide);
    });

    setTimeout(() => {
      // Select the first slide or the first slide marked active.
      this.select(this.activeSlides.length < 1 ? this.slides[0] : this.activeSlides[0]);
    }, 400);

    this.scrollOutOfView.observe(this);

    document.addEventListener("visibilitychange", () => {
      if(document.hidden) {
        this.pause();
      } else if(this.isInView !== false) {
        this.resume();
      }
    });
  }

  updatedCallback(state) {
    if(state.newState) {
      if("playing" in state.newState) {
        if(this.state.playing) {
          this.startPlayer();
          this.observeSwipe = false;
        } else {
          this.cancelPlayer();
        }
      }
    }
  }

  #swipeDebounce;

  get swipe() {
    return new IntersectionObserver((entries) => {
      if(this.props.multiple) {
        const { left: viewportLeft, right: viewportRight } = this.parts["viewport"].getBoundingClientRect();
        const viewportCenterpoint = Math.floor((viewportLeft + viewportRight) / 2);

        clearTimeout(this.#swipeDebounce);

        this.#swipeDebounce = setTimeout(() => {
          const proximitiesToCenter = this.slides.map((slide) => {
            const { left: slideLeft, right: slideRight } = slide.getBoundingClientRect();
            const slideCenterpoint = Math.floor((slideLeft + slideRight) / 2);

            return Math.abs(slideCenterpoint - viewportCenterpoint);
          });

          const closestToCenter = proximitiesToCenter.indexOf(Math.min(...proximitiesToCenter));
          this.select(this.slides[closestToCenter]);
        }, 200);
      } else {
        entries.forEach((entry) => {
          if(entry.isIntersecting && this.observeSwipe !== false) {
            this.select(entry.target);
          }
        });
      }
    }, {
      root: this.parts["viewport"],
      threshold: !this.props.multiple ? 1
        : [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      rootMargin: "1px",
    });
  }

  get scrollOutOfView() {
    return new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(!entry.isIntersecting) {
          this.pause();
          this.isInView = false;
        } else {
          this.resume();
          this.isInView = true;
        }
      });
    }, { threshold: .9 });
  }

  select(active) {
    this.dispatchEvent(new Event("update"));

    this.slides.forEach((slide) => {
      slide.state.active = slide === active;
    });
  }

  viewportSwipe() {
    this.stop();
    this.observeSwipe = true;
  }

  viewportHover() {
    this.pause();
    this.observeSwipe = true;
  }

  indicatorClick(event) {
    this.select(this.slides[this.parts["indicator"].indexOf(event.currentTarget)]);
    this.state.playing = false;
    this.observeSwipe = false;
  }

  indicatorKeydown(event) {
    if(event.key === "ArrowRight") {
      event.preventDefault();
      this.next().then((next) => {
        this.parts["indicator"][next].focus();
      });
    } else if(event.key === "ArrowLeft") {
      event.preventDefault();
      this.previous().then((previous) => {
        this.parts["indicator"][previous].focus();
      });
    }

    this.state.playing = false;
    this.observeSwipe = false;
  }

  nextClick() {
    this.next();
    this.state.playing = false;
    this.observeSwipe = false;
  }

  previousClick() {
    this.previous();
    this.state.playing = false;
    this.observeSwipe = false;
  }

  playClick() {
    this.state.playing = !this.state.playing;
  }

  pause() {
    if(this.state.playing === true) {
      this.state.playing = false;
      this.isPaused = true;
    }
  }

  resume() {
    if(this.isPaused === true) {
      // This requestAnimationFrame is to prevent setTimeout weirdness if the
      // play state is toggled too rapidly.
      requestAnimationFrame(() => {
        this.state.playing = true;
        this.isPaused = null;
      });
    }
  }

  startPlayer() {
    if(this.state.playing === true) {
      this.player = setTimeout(() => {
        this.next();
        this.startPlayer();
      }, this.props.timing * 1000);
    }
  }

  cancelPlayer() {
    clearTimeout(this.player);
  }

  /**
   * Public API.
   */
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

  play() {
    this.state.playing = true;
  }

  stop() {
    this.state.playing = false;
  }
}

customElements.define("tcds-carousel", Carousel);
