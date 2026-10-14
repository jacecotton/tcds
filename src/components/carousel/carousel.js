import {LitElement, nothing} from "lit";
import {html} from "lit/static-html.js";
import {customElement, property, state, queryAssignedElements} from "lit/decorators.js";

import sharedStyles from "@/components/_shared/styles";
import localStyles from "./carousel.styles.js";
import {DeepLinkController} from "@/components/_shared/controllers/DeepLinkController";
import "@/components/slide/slide.js";

/** @import {PropertyValues} from "lit" */
/** @import {Slide} from "@/components/slide/slide.js" */

/**
 * A rotating set of slides with previous/next, slide picker, and autoplay
 * controls. Autoplay pauses on hover, focus, when the document is hidden, and
 * when scrolled off screen, and stops entirely on manual navigation or when the
 * reader prefers reduced motion.
 *
 * @tag tcds-carousel
 *
 * @slot - Slides (`<tcds-slide>` elements).
 *
 * @csspart slides   - The container for the slides.
 * @csspart controls - The container for all controls (rendered only with more than one slide).
 * @csspart control  - Every control button.
 * @csspart previous - The previous slide button.
 * @csspart next     - The next slide button.
 * @csspart dots     - The container for the slide picker buttons.
 * @csspart dot      - A slide picker button.
 * @csspart toggle   - The autoplay play/pause button.
 *
 * @cssprop [--tcds-carousel-transition-duration=500ms] - Duration of the
 *   cross-fade between slides.
 *
 * @fires {CustomEvent<{index: number, previousIndex: number, slide: Slide|null}>} tcds-carousel:change - Fired when the selected slide changes.
 * @fires {CustomEvent<null>} tcds-carousel:play - Fired when autoplay starts.
 * @fires {CustomEvent<null>} tcds-carousel:pause - Fired when autoplay stops.
 */
@customElement("tcds-carousel")
export class Carousel extends LitElement {
  static styles = [sharedStyles, localStyles];

  // #region Properties and state
  /**
   * Whether slides rotate automatically. Authoring `<tcds-carousel playing>`
   * starts autoplay; manual navigation turns it off.
   *
   * @type {boolean}
   */
  @property({type: Boolean, reflect: true})
  accessor playing = false;

  /**
   * Keeps autoplay running while the pointer is over the carousel. Focus
   * within the carousel still pauses it.
   *
   * @type {boolean}
   */
  @property({type: Boolean, attribute: "no-pause-on-hover"})
  accessor noPauseOnHover = false;

  /**
   * Seconds each slide is shown during autoplay. Values below 1 are treated
   * as 1.
   *
   * @type {number}
   */
  @property({type: Number})
  accessor interval;

  /**
   * Zero-based index of the selected slide. Out of range values wrap around.
   * On initialization, the first slide with a `selected` attribute takes
   * precedence; otherwise the initial index is used (zero by default).
   *
   * @type {number}
   */
  @property({type: Number})
  accessor index;

  /**
   * Accessible name for the carousel.
   *
   * @type {string}
   */
  @property({type: String})
  accessor label;

  /**
   * Control placement. `inset` overlays the controls on the slides at wider
   * viewports; otherwise they sit below the slides.
   *
   * @type {"outside"|"inset"|undefined}
   */
  @property({type: String, reflect: true})
  accessor controls;

  /** @type {number} */
  @state()
  accessor #count = 0;

  /** @type {boolean} */
  @state()
  accessor #hovered = false;

  /** @type {boolean} */
  @state()
  accessor #focused = false;

  /** @type {boolean} */
  @state()
  accessor #documentHidden = false;

  /** @type {boolean} */
  @state()
  accessor #offscreen = false;

  /**
   * Whether the reader has asked for motion to stop. Distinct from `playing`,
   * which also goes false when navigation surrenders autoplay — that is not a
   * request to stop video.
   *
   * @type {boolean}
   */
  @state()
  accessor #mediaSuspended = false;
  // #endregion

  // #region Private variables
  /** @type {Slide[]} */
  @queryAssignedElements({flatten: true, selector: "tcds-slide"})
  accessor #slides;

  /** @type {ElementInternals} */
  #internals;
  /** @type {MediaQueryList} */
  #reducedMotion;
  /** @type {IntersectionObserver|undefined} */
  #intersectionObserver;
  /** @type {Animation|null} */
  #progress = null;
  /** @type {boolean} */
  #selectionInitialized = false;
  /** @type {DeepLinkController} */
  #deepLink;

  #onDocumentVisibilityChange = () => {
    this.#documentHidden = document.visibilityState === "hidden";
  };

  #onReducedMotionChange = () => {
    if (this.#reducedMotion.matches) this.pause();
  };

  /**
   * @param {IntersectionObserverEntry[]} entries
   */
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
    this.#deepLink = new DeepLinkController(this, this.#onDeepLink);
    this.addEventListener("tcds-slide:reveal", this.#onSlideReveal);
  }

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener("pointerenter", this.#onInteractionChange);
    this.addEventListener("pointerleave", this.#onInteractionChange);

    document.addEventListener("visibilitychange", this.#onDocumentVisibilityChange);
    this.#reducedMotion.addEventListener("change", this.#onReducedMotionChange);

    this.#onDocumentVisibilityChange();
    this.#onReducedMotionChange();
    this.addEventListener("focusin", this.#onInteractionChange);
    this.addEventListener("focusout", this.#onInteractionChange);
    this.#intersectionObserver ??= new IntersectionObserver(this.#onIntersectionChange);
    this.#intersectionObserver.observe(this);
    // Reconnecting does not call firstUpdated again.
    this.requestUpdate();
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

  /**
   * @param {PropertyValues<this>} changedProperties
   */
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
    this.#progress = null;
    this.#hovered = false;
    this.#focused = false;
  }
  // #endregion

  // #region Public methods
  /**
   * Show the slide at `position`, wrapping around either end. Does not affect
   * the playing state; use `pause()` alongside it for user-driven navigation.
   *
   * @param {number} position - The zero-based index of the slide to show.
   * @returns {void}
   */
  select(position) {
    if (this.#count === 0) return;
    this.index = this.#clamp(position);
  }

  /**
   * Show the next slide, wrapping to the first after the last.
   *
   * @returns {void}
   */
  next() {
    this.select(this.index + 1);
  }

  /**
   * Show the previous slide, wrapping to the last before the first.
   *
   * @returns {void}
   */
  previous() {
    this.select(this.index - 1);
  }

  /**
   * Starts everything the carousel moves on its own: slide rotation, and any
   * background video in the selected slide that this component stopped.
   *
   * @returns {void}
   */
  play() {
    this.playing = true;
    this.#mediaSuspended = false;
  }

  /**
   * Stops everything the carousel moves on its own. Slides that aren't selected
   * keep their media paused when this is lifted, until they're revealed.
   *
   * @returns {void}
   */
  pause() {
    this.playing = false;
    this.#mediaSuspended = true;
  }
  // #endregion

  // #region Events
  #onSlotChange() {
    const slides = this.#slides;
    this.#count = slides.length;

    // Read the authored selection once, before syncing attributes. Waiting
    // for a nonempty slot also supports slides supplied after connection.
    if (!this.#selectionInitialized && slides.length > 0) {
      const selected = slides.findIndex((slide) => slide.hasAttribute("selected"));
      this.index = this.#clamp(selected === -1 ? this.index : selected);
      this.#selectionInitialized = true;
    }

    this.#deepLink.resolve();
    this.#syncSlides();
    // Replacing slides can leave the count unchanged. Still refresh controls and media.
    this.requestUpdate();
  }

  /**
   * @param {PointerEvent|FocusEvent} event
   */
  #onInteractionChange(event) {
    const isPointer = event.type === "pointerenter" || event.type === "pointerleave";
    if (isPointer) {
      this.#hovered = event.type === "pointerenter";
    } else {
      const relatedTarget = /** @type {FocusEvent} */ (event).relatedTarget;
      this.#focused = event.type === "focusin"
        || (relatedTarget instanceof Node && this.contains(relatedTarget));
    }
  }

  /** @param {Event} event */
  #onSlideReveal = (event) => {
    const position = this.#slides.indexOf(/** @type {Slide} */ (event.target));
    if (position === -1) return;
    this.pause();
    this.select(position);
  };

  /** @param {HTMLElement} target */
  #onDeepLink = (target) => {
    if (!this.#selectionInitialized) return;
    const position = this.#slides.findIndex((slide) => slide === target || slide.contains(target));
    if (position === -1) return;
    this.pause();
    this.select(position);
    return true;
  };

  #onPreviousClick() {
    this.#navigate(this.index - 1);
  }

  #onNextClick() {
    this.#navigate(this.index + 1);
  }

  /**
   * @param {MouseEvent} event
   */
  #onDotClick(event) {
    const button = /** @type {HTMLButtonElement} */ (event.currentTarget);
    this.#navigate(Number(button.value));
  }

  #onToggleClick() {
    this.playing ? this.pause() : this.play();
  }

  /**
   * @param {KeyboardEvent} event
   * @returns {Promise<void>}
   */
  async #onDotsKeydown(event) {
    /** @type {Record<string, number>} */
    const positions = {
      ArrowLeft: this.index - 1,
      ArrowRight: this.index + 1,
      Home: 0,
      End: this.#count - 1,
    };

    if (!Object.hasOwn(positions, event.key)) return;

    event.preventDefault();
    this.#navigate(positions[event.key]);

    // `aria-current` is the focus target, so wait for it to settle. lit-html
    // reuses the same button elements across renders, so this moves focus
    // between existing nodes rather than chasing replaced ones.
    await this.updateComplete;

    /** @type {HTMLElement|null} */
    const current = this.renderRoot.querySelector("[part~=dot][aria-current=true]");
    current?.focus();
  }
  // #endregion

  // #region Utility methods
  /**
   * Whether the timer should currently be running. `playing` is the user's
   * standing intent; the rest are transient conditions that suspend rotation
   * without discarding that intent.
   *
   * @type {boolean}
   */
  get #advancing() {
    return this.playing
      && this.#count > 1
      && !(this.#hovered && !this.noPauseOnHover)
      && !this.#focused
      && !this.#documentHidden
      && !this.#offscreen;
  }

  /**
   * Wrap `position` into the slide range. Shared by `willUpdate`, `select` and
   * `#syncSlides` so all three agree on which slide is current, including
   * during a slot change, before `index` itself has been clamped.
   *
   * @param {number} position
   * @returns {number}
   */
  #clamp(position) {
    if (this.#count === 0) return 0;

    const requested = Number.isFinite(position) ? Math.trunc(position) : 0;
    return ((requested % this.#count) + this.#count) % this.#count;
  }

  /**
   * The autoplay interval in milliseconds, never less than one second.
   *
   * @type {number}
   */
  get #interval() {
    return Math.max(Number.isFinite(this.interval) ? this.interval * 1000 : 0, 1000);
  }

  /**
   * Manual navigation surrenders autoplay, per the ARIA authoring practices for
   * carousels: once the reader takes the wheel, the carousel stops moving out
   * from under them. It sets `playing` rather than calling `pause()`, because
   * asking for the next slide is not a request to stop that slide's video.
   *
   * @param {number} position
   */
  #navigate(position) {
    this.playing = false;
    this.select(position);
  }

  #syncProgress() {
    /** @type {HTMLElement|null} */
    const target = this.renderRoot.querySelector("[part~=dot][aria-current=true]");
    const effect = /** @type {KeyframeEffect|null|undefined} */ (this.#progress?.effect);

    const stale = effect?.target !== target
      || effect?.getTiming().duration !== this.#interval;

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
    // Lit's first update can precede slotchange. Preserve authored attributes
    // until the slot handler has read the initial selection.
    if (!this.#selectionInitialized) return;

    const slides = this.#slides;
    const index = this.#clamp(this.index);

    slides.forEach((slide, position) => {
      slide.position = position;
      slide.total = slides.length;
      slide.toggleAttribute("selected", position === index);
      slide.toggleAttribute("suspended", this.#mediaSuspended);
    });
  }

  /**
   * @param {"change"|"play"|"pause"} name
   * @param {{index: number, previousIndex: number, slide: Slide|null}} [detail]
   */
  #emit(name, detail) {
    this.dispatchEvent(new CustomEvent(`tcds-carousel:${name}`, {
      detail: detail ?? null,
      bubbles: true,
      composed: true,
    }));
  }
  // #endregion
}
