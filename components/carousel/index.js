import WebComponent from "../../scripts/WebComponent/WebComponent.js";
import styles from "./style.css";

export default class Carousel extends WebComponent(HTMLElement) {
  static get observedAttributes() {
    return ["playing"];
  }

  static state = {
    playing: "boolean",
  };

  static props = {
    timing: "number",
  };

  connected() {
    this.shadowRoot.adoptedStyleSheets = [styles];

    const carousels = Array.from(document.querySelectorAll("tcds-carousel"));
    this.id = `carousel${carousels.length > 1 ? `-${carousels.indexOf(this) + 1}` : ""}`;

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
          label="${this.state.playing ? "Stop automatic slide show" : "Start automatic slide show"}"
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
          label="Next slide"
          icon="only chevron-right"
          variant="ghost"
          size="large"
          onclick="this.getRootNode().host.nextClick()"
        ></tcds-button>
      </div>
      <div part="viewport" aria-live="${this.state.playing ? "off" : "polite"}">
        <slot></slot>
      </div>
    `;
  }

  mounted() {
    this.state.playing =
      this.hasAttribute("playing")
      && this.hasAttribute("timing")
      && window.matchMedia("(prefers-reduced-motion: reduce), (hover: none)").matches === false;

    this.slides.forEach((slide) => {
      this.swipe.observe(slide);
    });

    this.parts["viewport"].addEventListener("focusin", this.pause.bind(this));
    this.parts["viewport"].addEventListener("mouseleave", this.resume.bind(this));
    this.parts["viewport"].addEventListener("focusout", this.resume.bind(this));

    this.parts["viewport"].addEventListener("mouseenter", () => {
      this.pause();
      this.suspendObserver = false;
    });

    this.parts["viewport"].addEventListener("touchstart", () => {
      this.stop();
      this.suspendObserver = false;
    });

    this.addEventListener("click", () => {
      this.suspendObserver = true;
    });

    this.parts["viewport"].addEventListener("click", (event) => {
      event.stopPropagation();
    });

    document.addEventListener("visibilitychange", () => {
      if(document.hidden) {
        this.pause();
      } else if(this.isInView !== false) {
        this.resume();
      }
    });

    this.scrollOutOfView.observe(this);
  }

  updated() {
    return {
      state: {
        "playing": () => {
          if(this.state.playing) {
            this.startPlayer();
            this.suspendObserver = true;
          } else {
            this.cancelPlayer();
          }
        },
      },
    };
  }

  get swipe() {
    return new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting && this.suspendObserver !== true) {
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
          this.isInView = false;
        } else {
          this.resume();
          this.isInView = true;
        }
      });
    }, { threshold: .9 });
  }

  select(active) {
    this.slides.forEach((slide) => {
      slide.state.active = slide === active;
    });
  }

  scrollToSlide(slide) {
    const viewportOffset = this.parts["viewport"].getBoundingClientRect().left;
    const slideOffset = slide.getBoundingClientRect().left;

    this.parts["viewport"].scrollLeft += slideOffset - viewportOffset;
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
      });
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
