import WebComponent from "../../utilities/WebComponent/WebComponent.js";
import styles from "./style.css";
import "./slide/index.js";

export default class Carousel extends WebComponent(HTMLElement) {
  static observedAttributes = ["playing", "timing", "multiple", "variant"];

  get playing() {
    return this.hasAttribute("playing");
  }

  set playing(value) {
    value = Boolean(value);
    this.toggleAttribute("playing", value);
    this.update({timing: value});
  }

  get timing() {
    return Number(this.getAttribute("timing"));
  }

  set timing(value) {
    this.setAttribute("timing", value.toString());
    this.update({timing: Number(value)});
  }

  get multiple() {
    return this.hasAttribute("multiple");
  }

  set multiple(value) {
    value = Boolean(value);
    this.toggleAttribute("multiple");
    this.update({multiple: value});
  }

  get variant() {
    return this.getAttribute("variant");
  }

  set variant(value) {
    this.setAttribute("variant", value);
    this.update({variant: value});
  }

  constructor() {
    super();
    this.shadowRoot.adoptedStyles = [styles];
  }

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
  }

  playClick() {
    this.playing = !this.playing;
  }

  indicatorClick(event) {
    this.slides[this.indicators.indexOf(event.target)].select();
    this.playing = false;
    this.observeSwipe = false;
  }
}

customElements.define("tcds-carousel", Carousel);
