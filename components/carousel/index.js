import WebComponent from "../../utilities/WebComponent/WebComponent.js";
import styles from "./style.css";
import "./slide/index.js";

export default class Carousel extends WebComponent(HTMLElement) {
  static observedAttributes = ["playing", "timing", "multiple"];

  get playing() {
    return this.hasAttribute("playing") && this.hasAttribute("timing");
  }

  set playing(value) {
    // Do not allow `playing` to be set to true without `timing`. A decision was
    // made to not provide a default `timing` value, as we want to force case-
    // by-case determination of the most appropriate timing value based on
    // individual carousel content.
    if(this.hasAttribute("timing") || value === false) {
      this.toggleAttribute("playing", Boolean(value));
    }
  }

  get timing() {
    return Number(this.getAttribute("timing"));
  }

  set timing(value) {
    this.setAttribute("timing", value.toString());
  }

  get multiple() {
    return this.hasAttribute("multiple");
  }

  set multiple(value) {
    this.toggleAttribute("multiple", Boolean(value));
  }

  get slides() {
    return Array.from(this.querySelectorAll("tcds-slide"));
  }

  get nextIndex() {
    const activeIndex = this.slides.indexOf(this.querySelector("[active]"));
    return (activeIndex + 1) % this.slides.length;
  }

  get previousIndex() {
    const activeIndex = this.slides.indexOf(this.querySelector("[active]"));
    return (activeIndex - 1 + this.slides.length) % this.slides.length;
  }

  /**
   * Internal flags (non-reactive switches).
   *
   * @property {boolean} observingSwipe - Whether scrolling within the viewport
   *   should be observed. While the carousel is automatically advancing, it
   *   should not be observed.
   * @property {boolean} isInView - Whether the carousel is visible in the
   *   window's scrollport (does not apply to window visibility).
   * @property {boolean} isPaused - Whether the carousel is specifically
   *   temporarily stopped (i.e. paused, not just "not playing").
   */
  #flags = {};

  get template() {
    const playPause = `${this.playing ? "Stop" : "Start"} automatic slide show`;

    return /* html */`
      <section aria-roledescription="carousel">
        ${this.timing ? /* html */`
          <button is="tcds-ui-button"
            part="play-pause"
            title="${playPause}"
            aria-label="${playPause}"
            size="small"
            variant="ghost"
            onclick="this.getRootNode().host.toggle()"
          >
            <tcds-icon icon="${this.playing ? "pause" : "play"}"></tcds-icon>
          </button>
        ` : ``}
        <div part="navigation">
          <button is="tcds-ui-button"
            part="previous"
            variant="secondary"
            size="large"
            aria-label="Go to previous slide"
            title="Go to previous slide"
            onclick="this.getRootNode().host.previousClick()"
          >
            <tcds-icon icon="chevron-left"></tcds-icon>
          </button>
          <button is="tcds-ui-button"
            part="next"
            variant="secondary"
            size="large"
            aria-label="Go to next slide"
            title="Go to next slide"
            onclick="this.getRootNode().host.nextClick()"
          >
            <tcds-icon icon="chevron-right"></tcds-icon>
          </button>
          <div role="tablist" aria-label="Pick slide">
            ${this.slides.map((slide, index) => /* html */`
              <button
                role="tab"
                aria-selected="${slide.active}"
                aria-label="Slide ${index + 1} of ${this.slides.length}"
                title="Slide ${index + 1} of ${this.slides.length}"
                tabindex="${slide.active ? "0" : "-1"}"
                onclick="this.getRootNode().host.indicatorClick(event)"
                onkeydown="this.getRootNode().host.indicatorKeydown(event)"
              ></button>
            `).join("")}
          </div>
        </div>
        <div
          part="viewport"
          ${this.timing ? /* html */`
            aria-live="${this.playing ? "off" : "polite"}"
            onmouseleave="this.getRootNode().host.resume()"
            onfocus="this.getRootNode().host.pause()"
            onblur="this.getRootNode().host.resume()"
          ` : ``}
          onmouseover="this.getRootNode().host.viewportHover()"
          ontouchstart="this.getRootNode().host.viewportSwipe()"
        >
          <slot></slot>
        </div>
      </section>
    `;
  }

  constructor() {
    super();
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  #initialActive;

  connectedCallback() {
    this.upgradeProperties("playing", "timing", "multiple");
    this.update();

    this.#initialActive = this.slides.find(slide => slide.active) || this.slides[0];
  }

  attributeChangedCallback(name, oldValue) {
    this.update({[name]: oldValue});
  }

  mountedCallback() {
    this.viewport = this.shadowRoot.querySelector("[part=viewport]");
    this.indicators = Array.from(this.shadowRoot.querySelectorAll("[role=tab]"));

    // Only autoplay if no "reduce motion" system preference, and user can hover
    // with pointer device.
    this.playing = this.playing
      && !window.matchMedia("(prefers-reduced-motion: reduce), (hover: none)").matches;

    this.slides.forEach((slide) => {
      this.swipe.observe(slide);
    });

    this.scrollOutOfView.observe(this);

    document.addEventListener("visibilitychange", () => {
      if(document.hidden) {
        this.pause();
      } else if(this.#flags.isInView !== false) {
        this.resume();
      }
    });

    requestAnimationFrame(() => {
      this.select(this.#initialActive);
    });
  }

  updatedCallback(old) {
    if("playing" in old) {
      if(this.playing) {
        const advance = () => {
          this.player = setTimeout(() => {
            this.select(this.slides[this.nextIndex]);
            advance();
          }, this.timing * 1000);
        };

        advance();
        this.#flags.observingSwipe = false;
      } else {
        clearTimeout(this.player);
      }
    }
  }

  /* Observers */

  #swipeDebounce;

  get swipe() {
    return new IntersectionObserver((entries) => {
      if(this.#flags.observingSwipe !== true) {
        return;
      }

      if(this.multiple) {
        const {left: viewportLeft, right: viewportRight} = this.viewport.getBoundingClientRect();
        const viewportCenterpoint = Math.floor((viewportLeft + viewportRight) / 2);

        clearTimeout(this.#swipeDebounce);

        this.#swipeDebounce = setTimeout(() => {
          const proximitiesToCenter = this.slides.map((slide) => {
            const {left: slideLeft, right: slideRight} = slide.getBoundingClientRect();
            const slideCenterpoint = Math.floor((slideLeft + slideRight) / 2);
            return Math.abs(slideCenterpoint - viewportCenterpoint);
          });

          const closestToCenter = proximitiesToCenter.indexOf(Math.min(...proximitiesToCenter));
          // Disabling scroll here because CSS scroll-snapping takes care of
          // actually placing the slide. We're only doing a `select` call here
          // to update the internal state (which updates the indicator dots,
          // etc.) In the future, a proper JS API would be the better approach.
          // Keep an eye on https://github.com/argyleink/ScrollSnapExplainers
          this.select(this.slides[closestToCenter], {scroll: false});
        }, 500);
      } else {
        entries.forEach((entry) => {
          if(entry.isIntersecting) {
            this.select(entry.target);
          }
        });
      }
    }, {
      root: this.viewport,
      threshold: !this.multiple ? 1
        : [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      rootMargin: "1px",
    });
  }

  get scrollOutOfView() {
    return new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(!entry.isIntersecting) {
          this.pause();
          this.#flags.isInView = false;
        } else {
          this.resume();
          this.#flags.isInView = true;
        }
      });
    }, {threshold: .9});
  }

  /* Event handlers */

  nextClick() {
    this.select(this.slides[this.nextIndex]);
    this.stop();
    this.#flags.observingSwipe = false;
  }

  previousClick() {
    this.select(this.slides[this.previousIndex]);
    this.stop();
    this.#flags.observingSwipe = false;
  }

  indicatorClick(event) {
    this.select(this.slides[this.indicators.indexOf(event.target)]);
    this.stop();
    this.#flags.observingSwipe = false;
  }

  indicatorKeydown(event) {
    if(event.key === "ArrowRight") {
      event.preventDefault();
      this.indicators[this.nextIndex].focus();
      this.select(this.slides[this.nextIndex]);
    } else if(event.key === "ArrowLeft") {
      event.preventDefault();
      this.indicators[this.previousIndex].focus();
      this.select(this.slides[this.previousIndex]);
    }

    this.stop();
    this.#flags.observingSwipe = false;
  }

  viewportSwipe() {
    this.stop();
    this.#flags.observingSwipe = true;
  }

  viewportHover() {
    this.pause();
    this.#flags.observingSwipe = true;
  }

  /* Public API */

  play() {
    this.playing = true;
    this.#flags.isPaused = null;
  }

  stop() {
    this.playing = false;
    this.#flags.isPaused = false;
  }

  toggle() {
    this.playing ? this.stop() : this.play();
  }

  pause() {
    if(this.playing) {
      this.stop();
      this.#flags.isPaused = true;
    }
  }

  resume() {
    if(this.#flags.isPaused) {
      // This `requestAnimationFrame` is to prevent `setTimeout` weirdness after
      // rapid back-and-forth state changes (e.g. hovering over-and-out too
      // quickly).
      requestAnimationFrame(() => {
        this.play();
        this.#flags.isPaused = null;
      });
    }
  }

  select(slide, {scroll = true} = {}) {
    this.slides.forEach((thisSlide) => {
      thisSlide.active = thisSlide === slide;

      if(thisSlide === slide && scroll) {
        requestAnimationFrame(() => {
          const {offsetLeft: slideLeft, offsetWidth: slideWidth} = slide;
          const {offsetLeft: viewportLeft, offsetWidth: viewportWidth} = this.viewport;

          this.viewport.scrollLeft = this.multiple
            ? (slideLeft - viewportLeft) - (viewportWidth / 2) + (slideWidth / 2)
            : (slideLeft - viewportLeft);
        });
      }
    });
  }
}

customElements.define("tcds-carousel", Carousel);
