import {declarative, importSharedStyles, refreshProperties} from "../utilities/index.js";
import styles from "./style.css";

class Carousel extends declarative(HTMLElement) {
  static observedAttributes = ["playing", "timing", "multiple"];

  get playing() {
    return this.hasAttribute("playing") && this.hasAttribute("timing");
  }

  set playing(value) {
    if(this.hasAttribute("timing") || Boolean(value) === false) {
      this.toggleAttribute("playing", Boolean(value));
    }
  }

  get timing() {
    return Number(this.getAttribute("timing"));
  }

  set timing(value) {
    this.setAttribute("timing", parseInt(value).toString());
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
   * Internal flags (non-reactive state).
   * 
   * @property {boolean} observingSwipe - Whether scrolling within the viewport
   *   should be observed. While the carousel is automatically advancing, it
   *   should not be.
   * @property {boolean} isInView - Whether the carousel is visible in the
   *   window's scrollport (does not apply to window visibility).
   * @property {boolean} isPaused - Whether the carousel is specifically
   *   temporarily stopped (i.e. paused, not just "not playing").
   */
  #flags = {};

  get template() {
    const playPause = `${this.playing ? "Stop" : "Start"} automatic slide show`;

    return importSharedStyles() + `
      <section aria-roledescription="carousel">
        ${this.timing ? `
          <button
            part="play-pause"
            title="${playPause}"
            aria-label="${playPause}"
            onclick="this.getRootNode().host.toggle()"
          >
            <tcds-icon icon="${this.playing ? "pause" : "play"}"></tcds-icon>
          </button>
        ` : ``}
        <div part="navigation">
          <button
            part="previous"
            aria-label="Go to previous slide"
            title="Go to previous slide"
            onclick="this.getRootNode().host.previousClick()"
          >
            <tcds-icon icon="caret-left"></tcds-icon>
          </button>
          <button
            part="next"
            aria-label="Go to next slide"
            title="Go to next slide"
            onclick="this.getRootNode().host.nextClick()"
          >
            <tcds-icon icon="caret-right"></tcds-icon>
          </button>
          <div role="tablist" aria-label="Pick slide">
            ${this.slides.map((slide, index) => `
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
          ${this.timing ? `
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
    this.attachShadow({mode: "open"});
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  #initialActive;

  connectedCallback() {
    refreshProperties.apply(this, ["playing", "timing", "multiple"]);
    this.requestUpdate();

    this.#initialActive = this.slides.find(slide => slide.active) || this.slides[0];
  }

  attributeChangedCallback(name, oldValue) {
    this.requestUpdate({[name]: oldValue});
  }

  mountedCallback() {
    this.viewport = this.shadowRoot.querySelector("[part=viewport]");
    this.indicators = Array.from(this.shadowRoot.querySelectorAll("[role=tab]"));

    const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const noHover = matchMedia("(hover: none)").matches;
    this.playing = this.playing && !prefersReducedMotion && !noHover;

    this.slides.forEach(slide => this.swipe.observe(slide));
    this.scrollOutOfView.observe(this);

    document.addEventListener("visibilitychange", () => {
      if(document.hidden) {
        this.pause();
      } else if(this.#flags.isInView !== false) {
        this.resume();
      }
    });

    requestAnimationFrame(() => this.select(this.#initialActive));
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
        // If [multiple] is enabled, we want to select the slide that's closest
        // to the viewport's center.
        const {left: viewportLeft, right: viewportRight} = this.viewport.getBoundingClientRect();
        const viewportCenter = Math.floor((viewportLeft + viewportRight) / 2);
    
        // Debounce the check for which slide is closest to the center by 500ms.
        clearTimeout(this.#swipeDebounce);
    
        this.#swipeDebounce = setTimeout(() => {
          // Find which slide is the closest to the center.
          const closestSlide = this.slides.reduce((closest, slide) => {
            // Get the center of the current slide.
            const {left: slideLeft, right: slideRight} = slide.getBoundingClientRect();
            const slideCenter = Math.floor((slideLeft + slideRight) / 2);
            // Get the current slide's distance from the viewport's center.
            const distance = Math.abs(slideCenter - viewportCenter);
    
            // Return the current slide only if it's its distance is the
            // smallest so far.
            return distance < closest.distance ? {slide, distance} : closest;
          }, {slide: null, distance: Infinity}).slide;
    
          // Select the closest slide. Disabling scrolling here because CSS
          // takes care of the scroll-snapping using its own similar algorithm.
          // If CSS scroll snapping gets a suitable JavaScript API then the
          // above can be replaced.
          if(closestSlide) {
            this.select(closestSlide, {scroll: false});
          }
        }, 500);
      } else {
        // If not [multiple], just select the slide if it's intersecting the
        // viewport according to the observer's configuration (see below).
        entries.forEach((entry) => {
          if(entry.isIntersecting) {
            this.select(entry.target);
          }
        });
      }
    }, {
      // Observer configuration...
      root: this.viewport,
      threshold: this.multiple
        // If [multiple], observe intersection from 0 to 1 in increments of 0.1.
        ? Array.from({length: 11}, (_, i) => i / 10) : 1,
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
      // rapid back-and-forth state changes (e.g. by hovering over-and-out too
      // quickly).
      requestAnimationFrame(() => {
        this.play();
        this.#flags.isPaused = null;
      });
    }
  }

  select(slide, {scroll = true} = {}) {
    // Set [active] on passed slide to true, and false on the others.
    this.slides.forEach(_slide => _slide.active = _slide === slide);

    // Scroll the viewport either to the left boundary of the selected slide,
    // or if [multiple], to the slide's centerpoint.
    if(scroll) {
      requestAnimationFrame(() => {
        const {offsetLeft: slideLeft, offsetWidth: slideWidth} = slide;
        const {offsetLeft: viewportLeft, offsetWidth: viewportWidth} = this.viewport;

        const slideCenter = slideLeft + slideWidth / 2;
        const viewportCenter = viewportLeft + viewportWidth / 2;

        this.viewport.scrollLeft = this.multiple
          ? slideCenter - viewportCenter
          : slideLeft - viewportLeft;
      });
    }
  }
}

customElements.define("tcds-carousel", Carousel);
