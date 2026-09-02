import {LitElement, nothing} from "lit";
import {html} from "lit/static-html.js";
import {customElement, property, state, queryAssignedElements} from "lit/decorators.js";

import sharedStyles from "@/components/_shared/styles";
import localStyles from "./carousel.styles.js";

@customElement("tcds-carousel")
export class Carousel extends LitElement {
  static styles = [sharedStyles, localStyles];

  // #region Properties and state
  @property({type: Boolean, reflect: true})
  accessor playing = false;

  @property({type: Number})
  accessor interval;

  @property({type: Number})
  accessor index;

  @property({type: String})
  accessor label;

  @state()
  accessor #count = 0;

  @state()
  accessor #interacting = false;

  @state()
  accessor #documentHidden = false;

  @state()
  accessor #offscreen = false;

  /**
   * Whether the reader has asked for motion to stop. Distinct from `playing`,
   * which also goes false when navigation surrenders autoplay — that is not a
   * request to stop video.
   */
  @state()
  accessor #mediaSuspended = false;
  // #endregion

  // #region Private variables
  @queryAssignedElements({flatten: true, selector: "tcds-slide"})
  accessor #slides;

  #internals;
  #reducedMotion;
  #intersectionObserver;
  #progress = null;

  #onDocumentVisibilityChange = () => {
    this.#documentHidden = document.visibilityState === "hidden";
  };

  #onReducedMotionChange = () => {
    if (this.#reducedMotion.matches) this.pause();
  };

  #onIntersectionChange = (entries) => {
    this.#offscreen = !entries[entries.length - 1].isIntersecting;
  };
  // #endregion

  // #region Lifecycle
  constructor() {
    super();

    this.interval = 6;
    this.index = 0;
    this.label = "Carousel";

    this.#internals = this.attachInternals();
    this.#internals.role = "group";
    this.#internals.ariaRoleDescription = "carousel";

    this.#reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  }

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener("pointerenter", this.#onInteractionChange);
    this.addEventListener("pointerleave", this.#onInteractionChange);

    document.addEventListener("visibilitychange", this.#onDocumentVisibilityChange);
    this.#reducedMotion.addEventListener("change", this.#onReducedMotionChange);

    this.#onDocumentVisibilityChange();
  }

  willUpdate() {
    this.#internals.ariaLabel = this.label;

    // Keep `index` inside the slide range no matter how it was set, including
    // when slides are added or removed underneath it.
    if (this.#count > 0) {
      this.index = this.#clamp(this.index);
    }
  }

  render() {
    const positions = Array.from({length: this.#count}, (_, position) => position);

    return html`
      <div
        part="slides"
        aria-atomic="false"
        aria-live=${this.playing ? "off" : "polite"}
        @focusin=${this.#onInteractionChange}
        @focusout=${this.#onInteractionChange}
      >
        <slot @slotchange=${this.#onSlotChange}></slot>
      </div>
      ${this.#count > 1 ? html`
        <div part="controls">
          <button
            part="control previous"
            type="button"
            title="Previous slide"
            @click=${this.#onPreviousClick}
          >
            <span class="visually-hidden">Previous slide</span>
            <tcds-icon icon="caret-left-small"></tcds-icon>
          </button>
          <button
            part="control next"
            type="button"
            title="Next slide"
            @click=${this.#onNextClick}
          >
            <span class="visually-hidden">Next slide</span>
            <tcds-icon icon="caret-right-small"></tcds-icon>
          </button>
          <div
            part="dots"
            role="group"
            aria-label="Choose a slide to display"
            @keydown=${this.#onDotsKeydown}
          >
            ${positions.map((position) => html`
              <button
                part="control dot"
                type="button"
                value=${position}
                title="Slide ${position + 1} of ${this.#count}"
                aria-current=${position === this.index ? "true" : "false"}
                tabindex=${position === this.index ? 0 : -1}
                @click=${this.#onDotClick}
              >
                <span class="visually-hidden">Slide ${position + 1} of ${this.#count}</span>
              </button>
            `)}
          </div>
          <button
            part="control toggle"
            type="button"
            class="tcds-button tcds-button--media"
            title="${this.playing ? "Pause" : "Start"} autoplay"
            @click=${this.#onToggleClick}
          >
            <span class="visually-hidden">
              ${this.playing ? "Pause" : "Start"} autoplay
            </span>
            <tcds-icon icon=${this.playing ? "pause" : "play"}></tcds-icon>
          </button>
        </div>
      ` : nothing}
    `;
  }

  firstUpdated() {
    this.#onReducedMotionChange();

    this.#intersectionObserver = new IntersectionObserver(this.#onIntersectionChange);
    this.#intersectionObserver.observe(this);
  }

  updated(changedProperties) {
    this.#syncSlides();
    this.#syncProgress();

    if (changedProperties.has("index") && changedProperties.get("index") !== undefined) {
      this.#emit("change", {
        index: this.index,
        previousIndex: changedProperties.get("index"),
        slide: this.#slides[this.index] ?? null,
      });
    }

    if (changedProperties.has("playing") && changedProperties.get("playing") !== undefined) {
      this.#emit(this.playing ? "play" : "pause");
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener("pointerenter", this.#onInteractionChange);
    this.removeEventListener("pointerleave", this.#onInteractionChange);
    this.removeEventListener("focusin", this.#onInteractionChange);
    this.removeEventListener("focusout", this.#onInteractionChange);

    document.removeEventListener("visibilitychange", this.#onDocumentVisibilityChange);
    this.#reducedMotion.removeEventListener("change", this.#onReducedMotionChange);
    this.#intersectionObserver?.disconnect();
    this.#progress?.cancel();
  }
  // #endregion

  // #region Public methods
  /**
   * Show the slide at `position`, wrapping around either end. Does not affect
   * the playing state; use `pause()` alongside it for user-driven navigation.
   */
  select(position) {
    if (this.#count === 0) return;
    this.index = this.#clamp(position);
  }

  next() {
    this.select(this.index + 1);
  }

  previous() {
    this.select(this.index - 1);
  }

  /**
   * Starts everything the carousel moves on its own: slide rotation, and any
   * background video in the selected slide that this component stopped.
   */
  play() {
    this.playing = true;
    this.#mediaSuspended = false;
  }

  /**
   * Stops everything the carousel moves on its own. Slides that aren't selected
   * keep their media paused when this is lifted, until they're revealed.
   */
  pause() {
    this.playing = false;
    this.#mediaSuspended = true;
  }
  // #endregion

  // #region Events
  #onSlotChange() {
    this.#count = this.#slides.length;
    this.#syncSlides();
  }

  #onInteractionChange(event) {
    // Scoped to the slides region rather than the host, so focusing the play
    // button doesn't count as interaction and leave it unable to resume.
    this.#interacting = event.type === "pointerenter" || event.type === "focusin";
  }

  #onPreviousClick() {
    this.#navigate(this.index - 1);
  }

  #onNextClick() {
    this.#navigate(this.index + 1);
  }

  #onDotClick(event) {
    this.#navigate(Number(event.currentTarget.value));
  }

  #onToggleClick() {
    this.playing ? this.pause() : this.play();
  }

  async #onDotsKeydown(event) {
    const positions = {
      ArrowLeft: this.index - 1,
      ArrowRight: this.index + 1,
      Home: 0,
      End: this.#count - 1,
    };

    if (!(event.key in positions)) return;

    event.preventDefault();
    this.#navigate(positions[event.key]);

    // `aria-current` is the focus target, so wait for it to settle. lit-html
    // reuses the same button elements across renders, so this moves focus
    // between existing nodes rather than chasing replaced ones.
    await this.updateComplete;
    this.renderRoot.querySelector("[part~=dot][aria-current=true]")?.focus();
  }
  // #endregion

  // #region Utility methods
  /**
   * Whether the timer should currently be running. `playing` is the user's
   * standing intent; the rest are transient conditions that suspend rotation
   * without discarding that intent.
   */
  get #advancing() {
    return this.playing
      && this.#count > 1
      && !this.#interacting
      && !this.#documentHidden
      && !this.#offscreen;
  }

  /**
   * Wrap `position` into the slide range. Shared by `willUpdate`, `select` and
   * `#syncSlides` so all three agree on which slide is current, including
   * during a slot change, before `index` itself has been clamped.
   */
  #clamp(position) {
    if (this.#count === 0) return 0;

    const requested = Number.isFinite(position) ? Math.trunc(position) : 0;
    return ((requested % this.#count) + this.#count) % this.#count;
  }

  get #interval() {
    return Math.max(Number.isFinite(this.interval) ? this.interval * 1000 : 0, 1000);
  }

  /**
   * Manual navigation surrenders autoplay, per the ARIA authoring practices for
   * carousels: once the reader takes the wheel, the carousel stops moving out
   * from under them. It sets `playing` rather than calling `pause()`, because
   * asking for the next slide is not a request to stop that slide's video.
   */
  #navigate(position) {
    this.playing = false;
    this.select(position);
  }

  #syncProgress() {
    const target = this.renderRoot.querySelector("[part~=dot][aria-current=true]");

    const stale = this.#progress?.effect.target !== target
      || this.#progress?.effect.getTiming().duration !== this.#interval;

    if (stale) {
      this.#progress?.cancel();
      this.#progress = null;
    }

    if (!this.#advancing || !target) {
      this.#progress?.pause();
      return;
    }

    if (this.#progress) {
      this.#progress.play();
      return;
    }

    this.#progress = target.animate(
      [{width: "0%"}, {width: "100%"}],
      {duration: this.#interval, easing: "linear", fill: "forwards", pseudoElement: "::after"},
    );

    this.#progress.onfinish = () => this.next();
  }

  #syncSlides() {
    const slides = this.#slides;
    const index = this.#clamp(this.index);

    slides.forEach((slide, position) => {
      slide.position = position;
      slide.total = slides.length;
      slide.toggleAttribute("selected", position === index);
      slide.toggleAttribute("suspended", this.#mediaSuspended);
    });
  }

  #emit(name, detail) {
    this.dispatchEvent(new CustomEvent(`tcds-carousel-${name}`, {
      detail,
      bubbles: true,
      composed: true,
    }));
  }
  // #endregion
}
