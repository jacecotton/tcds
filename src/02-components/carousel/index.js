import {declarative, html, baseStyles, refreshProperties} from "../utilities/index.js";
import localStyles from "./style.css";

class Carousel extends declarative(HTMLElement) {
  // #region Setup
  static observedAttributes = ["playing", "timing", "multiple"];

  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.adoptedStyleSheets = [baseStyles, localStyles];
  }

  get template() {
    const playing = this.playing === "playing";
    const playPause = `${playing ? "Stop" : "Start"} automatic slide show`;

    return html`
      <section aria-roledescription="carousel">
        ${this.timing ? html`
          <button
            part="play-pause"
            title="${playPause}"
            aria-label="${playPause}"
            onclick="this.getRootNode().host.toggle()"
          >
            <tcds-icon icon="${playing ? "pause" : "play"}"></tcds-icon>
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
            ${this.slides.map((slide, index) => html`
              <button
                role="tab"
                aria-selected="${slide.selected}"
                aria-disabled="${slide.selected}"
                aria-label="Slide ${index + 1} of ${this.slides.length}"
                title="Slide ${index + 1} of ${this.slides.length}"
                tabindex="${slide.selected ? "0" : "-1"}"
                onclick="this.getRootNode().host.indicatorClick(event)"
                onkeydown="this.getRootNode().host.indicatorKeydown(event)"
              ></button>
            `)}
          </div>
        </div>
        <div
          part="viewport"
          aria-atomic="false"
          aria-live="${playing ? "off" : "polite"}"
          ${this.timing ? `
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

  /**
   * Internal flags.
   *
   * @property {boolean} observingSwipe - Whether scrolling within the viewport
   *   should be observed. While the carousel is automatically advancing, it
   *   should not be, because the scrollport observer detects the slide closest
   *   to the center and selects it. This creates issues if many slides are
   *   being skipped at once (as when selecting a slide from an indicator dot or
   *   by recycling the carousel); the scroll to the desired slide can be
   *   interrupted by the observer, unless the observer is temporarily disabled
   *   by this flag.
   * @property {boolean} isInView - Whether the carousel is visible in the
   *   window's scrollport (does not apply to window visibility).
   */
  #flags = {};
  // #endregion

  // #region Lifecycle
  connectedCallback() {
    refreshProperties.apply(this, ["playing", "timing", "multiple"]);
    this.requestUpdate();
  }

  attributeChangedCallback(name, oldValue) {
    this.requestUpdate({[name]: oldValue});
  }

  mountedCallback() {
    // Get elements from newly rendered shadow DOM.
    this.viewport = this.shadowRoot.querySelector("[part=viewport]");
    this.indicators = Array.from(this.shadowRoot.querySelectorAll("[role=tab]"));

    // Autoplay only if [playing] attribute, reduced motion preference is not
    // set, and device is not a touch screen.
    const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const noHover = matchMedia("(hover: none)").matches;

    if(this.playing === "playing" && !prefersReducedMotion && !noHover) {
      this.play();
    }

    // Swiping = horizontal scrolling. Need to update selected slide state
    // according to scroll progress - set up observer.
    this.slides.forEach(slide => this.swipe.observe(slide));

    // Carousel should pause when scrolled out of view - set up observer.
    this.scrollOutOfView.observe(this);

    // Should also pause when window itself is not visible.
    document.addEventListener("visibilitychange", () => {
      if(document.hidden) {
        this.pause();
      } else if(this.#flags.isInView !== false) {
        this.resume();
      }
    });

    // Select either first slide with a [selected] attribute, or the first
    // slide if no default attribute.
    const initial = this.slides.find(slide => slide.selected) || this.slides[0];
    requestAnimationFrame(() => this.select(initial));
  }

  updatedCallback(old) {
    if("playing" in old || "timing" in old) {
      clearTimeout(this.player);

      if(this.playing === "playing") {
        const play = () => {
          if(!this.timing) return;

          this.player = setTimeout(() => {
            this.select(this.slides[this.nextIndex]);
            play();
          }, this.timing * 1000);
        };

        play();
        this.#flags.observingSwipe = false;
      }
    }
  }
  // #endregion

  // #region Observers
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
          // Find which slide is the closest to the viewport's center by
          // comparing the distances between the centerpoints of the viewport
          // and each slide. This is for lack of a JS API for CSS `scroll-snap`.
          // See @argyleink/ScrollSnapExplainers/tree/main/js-snapChanged
          const closest = this.slides.reduce((closest, slide) => {
            const {left: slideLeft, right: slideRight} = slide.getBoundingClientRect();
            const slideCenter = Math.floor((slideLeft + slideRight) / 2);
            const distance = Math.abs(slideCenter - viewportCenter);
            return distance < closest.distance ? {slide, distance} : closest;
          }, {slide: null, distance: Infinity});

          if(closest.slide) {
            this.select(closest.slide, {scroll: false});
          }
        }, 500);
      } else {
        // If not [multiple], just select the slide if it's intersecting the
        // viewport according to the observer's configuration (see below).
        entries.forEach((entry) => {
          if(entry.isIntersecting) {
            this.select(entry.target, {scroll: false});
          }
        });
      }
    }, {
      // Observer configuration...
      root: this.viewport,
      threshold: !this.multiple ? 1
        // If [multiple], observe intersection from 0 to 1 in increments of 0.1.
        : Array.from({length: 11}, (_, i) => i / 10),
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
  // #endregion

  // #region Event handlers
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

  indicatorClick({target}) {
    this.select(this.slides[this.indicators.indexOf(target)]);
    this.stop();
    this.#flags.observingSwipe = false;
  }

  indicatorKeydown({key}) {
    if(["ArrowRight", "ArrowLeft"].includes(key)) {
      const goto = key === "ArrowRight" ? this.nextIndex : this.previousIndex;
      this.indicators[goto].focus();
      this.select(this.slides[goto]);
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
  // #endregion

  // #region Props and state
  #playing = null;

  get playing() {
    return this.hasAttribute("playing") && this.timing
      ? "playing" : this.#playing;
  }

  set playing(value) {
    this.#playing = value;
    this.toggleAttribute("playing", value === "playing");
  }

  get timing() {
    return Number(this.getAttribute("timing"));
  }

  set timing(value) {
    this.setAttribute("timing", Number(value).toString());
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
    const selectedIndex = this.slides.indexOf(this.querySelector("[selected]"));
    return (selectedIndex + 1) % this.slides.length;
  }

  get previousIndex() {
    const selectedIndex = this.slides.indexOf(this.querySelector("[selected]"));
    return (selectedIndex - 1 + this.slides.length) % this.slides.length;
  }
  // #endregion

  // #region Public API
  play() {
    if(this.timing) {
      this.playing = "playing";
    } else {
      console.error("TCDS-CAROUSEL cannot play without a timing property.", this);
    }
  }

  stop() {
    this.playing = "stopped";
  }

  toggle() {
    this.playing === "playing" ? this.stop() : this.play();
  }

  pause() {
    if(this.playing === "playing") {
      this.playing = "paused";
    }
  }

  resume() {
    if(this.playing === "paused") {
      // This `requestAnimationFrame` is to prevent `setTimeout` weirdness after
      // rapid back-and-forth state changes (e.g. by hovering over-and-out too
      // quickly).
      requestAnimationFrame(() => this.play());
    }
  }

  select(slide, {scroll = true} = {}) {
    // Set [selected] on passed slide to true, and false on the others.
    this.slides.forEach(_slide => _slide.selected = _slide === slide);

    // @todo Consider using the `observingSwipe` flag instead of passing a
    // `scroll` option. The only time `scroll` would be false is when just
    // updating internal state, which only happens inside the swipe observer,
    // during which and only during which the `observingSwipe` flag is false.
    if(!scroll) return;

    // Scroll the viewport either to the left boundary of the selected slide,
    // or if [multiple], to the slide's centerpoint.
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
  // #endregion
}

customElements.define("tcds-carousel", Carousel);
