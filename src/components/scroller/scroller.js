import {LitElement, nothing} from "lit";
import {html} from "lit/static-html.js";
import {customElement, property, state, query, queryAssignedElements} from "lit/decorators.js";

import sharedStyles from "@/components/_shared/styles";
import localStyles from "./scroller.styles.js";

/**
 * Scroll offsets are subpixel while `scrollWidth` and `clientWidth` are
 * rounded. A pixel of slack keeps that rounding from reading as "there's more
 * to scroll" when the children exactly fill the container.
 */
const TOLERANCE = 1;

@customElement("tcds-scroller")
export class Scroller extends LitElement {
  static styles = [sharedStyles, localStyles];

  // #region Properties and state
  @property({type: String})
  accessor label;

  @state()
  accessor #overflowing = false;

  @state()
  accessor #atStart = true;

  @state()
  accessor #atEnd = false;
  // #endregion

  // #region Private variables
  @queryAssignedElements({flatten: true})
  accessor #children;

  @query("[part=scroller]")
  accessor #scroller;

  #resizeObserver;

  #onResize = () => {
    this.#syncPosition();
  };
  // #endregion

  // #region Lifecycle
  constructor() {
    super();
    this.label = "Scroller";
  }

  connectedCallback() {
    super.connectedCallback();

    // Observation is torn down on disconnect, so restore it if the element was
    // moved rather than created, when `firstUpdated` won't run again.
    if (this.hasUpdated) {
      this.#observe();
      this.#syncPosition();
    }
  }

  render() {
    return html`
      <div
        part="scroller"
        role="group"
        aria-label=${this.label}
        tabindex=${this.#overflowing ? "0" : nothing}
        @scroll=${this.#onScroll}
      >
        <slot @slotchange=${this.#onSlotChange}></slot>
      </div>
      <div part="controls">
        <slot name="controls"></slot>
        ${this.#overflowing ? html`
          <button
            part="control previous"
            type="button"
            title="Previous"
            aria-disabled=${this.#atStart ? "true" : "false"}
            @click=${this.#onPreviousClick}
          >
            <span class="visually-hidden">Previous</span>
            <tcds-icon icon="caret-left"></tcds-icon>
          </button>
          <button
            part="control next"
            type="button"
            title="Next"
            aria-disabled=${this.#atEnd ? "true" : "false"}
            @click=${this.#onNextClick}
          >
            <span class="visually-hidden">Next</span>
            <tcds-icon icon="caret-right"></tcds-icon>
          </button>
        ` : nothing}
      </div>
    `;
  }

  firstUpdated() {
    this.#resizeObserver = new ResizeObserver(this.#onResize);

    this.#observe();
    this.#syncPosition();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#resizeObserver?.disconnect();
  }
  // #endregion

  // #region Public methods
  /**
   * Scroll the child at `position` flush with the leading edge. Out-of-range
   * positions are ignored rather than clamped: unlike a carousel, there's no
   * wrapping here, so a missing child means there's nowhere to go.
   */
  select(position) {
    this.#scrollBy(this.#offsets()[position]);
  }

  /**
   * Scroll by exactly one child, in either direction. "Next" is the first child
   * that starts past the leading edge; "previous" is the last one that starts
   * before it, so a partially scrolled child counts as the current one both
   * ways rather than being skipped.
   */
  next() {
    this.#scrollBy(this.#offsets().find((offset) => offset > TOLERANCE));
  }

  previous() {
    this.#scrollBy(this.#offsets().findLast((offset) => offset < -TOLERANCE));
  }
  // #endregion

  // #region Events
  #onSlotChange() {
    this.#observe();
    this.#syncPosition();
  }

  #onScroll() {
    this.#syncPosition();
  }

  #onPreviousClick() {
    // The end buttons are `aria-disabled` rather than `disabled` so that
    // reaching an end doesn't drop keyboard focus to the document, which means
    // the click still arrives and has to be ignored here.
    if (!this.#atStart) this.previous();
  }

  #onNextClick() {
    if (!this.#atEnd) this.next();
  }
  // #endregion

  // #region Utility methods
  /**
   * The scroller covers viewport resizes; the children cover content that
   * resizes inside a container that doesn't, such as an image loading. Children
   * change rarely, so rebuilding the whole set is cheaper than diffing it.
   */
  #observe() {
    if (!this.#resizeObserver || !this.#scroller) return;

    this.#resizeObserver.disconnect();
    this.#resizeObserver.observe(this.#scroller);
    this.#children.forEach((child) => this.#resizeObserver.observe(child));
  }

  /**
   * Whether there's anything to scroll, and how much of it is left in either
   * direction. `scrollLeft` is negative in right-to-left writing modes, where
   * the leading edge is still position zero.
   */
  #syncPosition() {
    if (!this.#scroller) return;

    const overflow = this.#scroller.scrollWidth - this.#scroller.clientWidth;
    const position = Math.abs(this.#scroller.scrollLeft);

    this.#overflowing = overflow > TOLERANCE;
    this.#atStart = position <= TOLERANCE;
    this.#atEnd = position >= overflow - TOLERANCE;
  }

  /**
   * Each child's distance from the scroller's leading edge, which is also the
   * distance to scroll by to bring that child flush with it. Measured on demand
   * rather than cached, since children can move or resize between clicks.
   */
  #offsets() {
    if (!this.#scroller) return [];
    const origin = this.#scroller.getBoundingClientRect().left;
    return this.#children.map((child) => child.getBoundingClientRect().left - origin);
  }

  #scrollBy(offset) {
    // Omitting `behavior` defers to the `scroll-behavior` declared in CSS,
    // which is where reduced motion is handled.
    if (offset !== undefined) this.#scroller.scrollBy({left: offset});
  }
  // #endregion
}
