import WebComponent from "../../utilities/WebComponent/WebComponent.js";
import styles from "./style.css";
import "./slide/index.js";

export default class Carousel extends WebComponent(HTMLElement) {
  static observedAttributes = ["playing", "timing", "multiple", "variant"];

  get playing() {
    return this.hasAttribute("playing") && this.hasAttribute("timing");
  }

  set playing(value) {
    this.toggleAttribute("playing", Boolean(value));
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

  get variant() {
    return this.getAttribute("variant");
  }

  set variant(value) {
    this.setAttribute("variant", value);
  }

  get nextIndex() {
    return (this.slides.indexOf(this.querySelector("[active]")) + 1) % this.slides.length;
  }

  get previousIndex() {
    return (this.slides.indexOf(this.querySelector("[active]")) - 1 + this.slides.length) % this.slides.length;
  }

  /**
   * @property {boolean} observeSwipe
   * @property {boolean} isInView
   * @property {boolean} isPaused
   */
  flags = {};

  get template() {
    const playPauseLabel = `${this.playing ? "Stop" : "Start"} automatic slide show`;

    return /* html */`
      <section aria-roledescription="carousel">
        ${this.timing ? /* html */`
          <button is="tcds-ui-button"
            part="play-pause"
            size="small"
            variant="ui"
            aria-label="${playPauseLabel}"
            title="${playPauseLabel}"
            onclick="this.getRootNode().host.playClick()"
          >
            <tcds-icon icon="${this.playing ? "pause" : "play"}"></tcds-icon>
          </button>
        ` : ``}
        <div part="navigation">
          <button is="tcds-ui-button"
            part="previous"
            variant="ghost"
            size="large"
            aria-label="Go to previous slide"
            title="Go to previous slide"
            onclick="this.getRootNode().host.previousClick()"
          >
            <tcds-icon icon="chevron-left"></tcds-icon>
          </button>
          <button is="tcds-ui-button"
            part="next"
            variant="ghost"
            size="large"
            aria-label="Go to next slide"
            title="Go to next slide"
            onclick="this.getRootNode().host.nextClick()"
          >
            <tcds-icon icon="chevron-right"></tcds-icon>
          </button>
          <div role="tablist" part="indicators" aria-label="Pick slide">
            ${this.slides.map((slide, index) => /* html */`
              <button
                role="tab"
                part="indicator"
                aria-selected="${slide.active}"
                aria-label="Slide ${index + 1} of ${this.slides.length}"
                title="Slide ${index + 1} of ${this.slides.length}"
                tabindex="${slide.active ? "0" : "-1"}"
                onclick="this.getRootNode().host.indicatorClick(event)"
                onkeydown="this.getRootNode().host.indicatorKeydown(event)"
              >
                ${this.variant === "gallery" ? /* html */`
                  <img src="${slide.querySelector("img")?.src}" alt="">
                ` : ``}
              </button>
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

  connectedCallback() {
    this.update();
    this.slides = Array.from(this.querySelectorAll("tcds-slide"));
  }

  attributeChangedCallback(name, oldValue) {
    this.update({[name]: oldValue});
  }

  mountedCallback() {
    this.viewport = this.shadowRoot.querySelector("[part~=viewport]");
    this.indicators = Array.from(this.shadowRoot.querySelectorAll("[part~=indicator]"));

    (this.slides.find(slide => slide.active) || this.slides[0]).select();

    this.playing = this.playing && !window.matchMedia("(prefers-reduced-motion: reduce), (hover: none)").matches;

    this.slides.forEach((slide) => {
      this.swipe.observe(slide);
    });

    this.scrollOutOfView.observe(this);

    document.addEventListener("visibilitychange", () => {
      if(document.hidden) {
        this.pause();
      } else if(this.flags.isInView !== false) {
        this.resume();
      }
    });
  }

  updatedCallback(old) {
    if("playing" in old) {
      if(this.playing) {
        const advance = () => {
          this.player = setTimeout(() => {
            this.slides[this.nextIndex].select();
            advance();
          }, this.timing * 1000);
        };

        advance();
        this.flags.observeSwipe = false;
      } else {
        clearTimeout(this.player);
      }
    }
  }

  /* Observers */

  #swipeDebounce;

  get swipe() {
    return new IntersectionObserver((entries) => {
      if(this.flags.observeSwipe !== true) {
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
          this.slides[closestToCenter].select();
        }, 500);
      } else {
        entries.forEach((entry) => {
          if(entry.isIntersecting) {
            entry.target.select();
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
          this.flags.isInView = false;
        } else {
          this.resume();
          this.flags.isInView = true;
        }
      });
    }, {threshold: .9});
  }

  /* Event handlers */

  playClick() {
    this.toggle();
  }

  nextClick() {
    this.slides[this.nextIndex].select();
    this.stop();
    this.flags.observeSwipe = false;

    if(this.variant === "gallery") {
      setTimeout(() => {
        this.indicators[this.nextIndex].scrollIntoView();
      }, 500);
    }
  }

  previousClick() {
    this.slides[this.previousIndex].select();
    this.stop();
    this.flags.observeSwipe = false;

    if(this.variant === "gallery") {
      setTimeout(() => {
        this.indicators[this.previousIndex].scrollIntoView();
      }, 500);
    }
  }

  indicatorClick(event) {
    this.slides[this.indicators.indexOf(event.target)].select();
    this.stop();
    this.flags.observeSwipe = false;
  }

  indicatorKeydown(event) {
    if(event.key === "ArrowRight") {
      event.preventDefault();
      this.indicators[this.nextIndex].focus();
      this.slides[this.nextIndex].select();
    } else if(event.key === "ArrowLeft") {
      event.preventDefault();
      this.indicators[this.previousIndex].focus();
      this.slides[this.previousIndex].select();
    }

    this.stop();
    this.flags.observeSwipe = false;
  }

  viewportSwipe() {
    this.stop();
    this.flags.observeSwipe = true;
  }

  viewportHover() {
    this.pause();
    this.flags.observeSwipe = true;
  }

  /* Public API */

  play() {
    this.playing = true;
  }

  stop() {
    this.playing = false;
  }

  toggle() {
    this.playing = !this.playing;
  }

  pause() {
    if(this.playing) {
      this.stop();
      this.flags.isPaused = true;
    }
  }

  resume() {
    if(this.flags.isPaused) {
      requestAnimationFrame(() => {
        this.play();
        this.flags.isPaused = null;
      });
    }
  }
}

customElements.define("tcds-carousel", Carousel);
