import {LitElement} from "lit";
import {html} from "lit/static-html.js";
import {customElement, property} from "lit/decorators.js";
import {pauseMedia, restoreMedia, prepareMedia} from "@/components/_shared/utilities/pauseMedia.js";

import sharedStyles from "@/components/_shared/styles";
import localStyles from "./slide.styles.js";

/** @import {PropertyValues} from "lit" */

/**
 * Distinguishes each slide's paused media from a nested carousel's, so an outer
 * slide reactivating doesn't restart embeds an inner slide deliberately stopped.
 */
let owners = 0;

/**
 * A single slide within a carousel. Media inside unselected slides is paused
 * automatically.
 *
 * @tag tcds-slide
 *
 * @slot - Slide content.
 *
 * @cssState ready - The slide has upgraded and resolved its initial styles;
 *   transitions between slides are enabled.
 *
 * @cssprop [--tcds-carousel-transition-duration=500ms] - Duration of the
 *   cross-fade between slides. Usually set on the parent carousel.
 */
@customElement("tcds-slide")
export class Slide extends LitElement {
  static styles = [sharedStyles, localStyles];

  // #region Properties and state
  /**
   * Whether this slide is selected. Author `selected` to choose the initial
   * slide; the first selected slide wins if several are marked. The parent
   * carousel manages this state after initialization. Drives visibility,
   * removing unselected slides from the tab order and accessibility tree.
   *
   * @type {boolean}
   */
  @property({type: Boolean, reflect: true})
  accessor selected = false;

  /**
   * Set by the parent carousel while its playback toggle is off. Holds this
   * slide's media paused even when the slide is selected, and is checked again
   * on reveal, so a slide surfaced during a suspension stays quiet.
   *
   * @type {boolean}
   */
  @property({type: Boolean, reflect: true})
  accessor suspended = false;

  /**
   * Zero-based position among sibling slides, assigned by the parent carousel
   * as a property so the light DOM markup stays clean.
   *
   * @type {number}
   * @internal
   */
  @property({type: Number})
  accessor position;

  /**
   * Total sibling slide count, assigned by the parent carousel.
   *
   * @type {number}
   * @internal
   */
  @property({type: Number})
  accessor total;
  // #endregion

  // #region Private variables
  /** @type {ElementInternals} */
  #internals;
  /** @type {string} */
  #owner = `tcds-slide-${++owners}`;
  /** @type {boolean} */
  #settled = false;
  // #endregion

  // #region Lifecycle
  constructor() {
    super();

    this.position = 0;
    this.total = 1;

    this.#internals = this.attachInternals();
    this.#internals.role = "group";
    this.#internals.ariaRoleDescription = "slide";
  }

  /** @returns {Promise<void>} */
  async firstUpdated() {
    // Reading a layout value forces the browser to resolve the component's own
    // styles while `transition` is still `none`, so the jump from the
    // pre-upgrade defaults lands instantly instead of animating. Transitions
    // are enabled only afterward, for real slide changes.
    this.offsetHeight;
    this.#internals.states.add("ready");

    // The initial state is not a transition, so `updated` won't catch it, and
    // it can't be read here either: the parent carousel assigns `selected`
    // from its own update, which may not have run yet. A frame is enough for
    // that to settle, and still lands before the first paint.
    await new Promise((resolve) => requestAnimationFrame(() => resolve()));
    this.#settled = true;
    this.#syncMedia();
  }

  willUpdate() {
    this.#internals.ariaLabel = `${this.position + 1} of ${this.total}`;
  }

  /**
   * @param {PropertyValues<this>} changedProperties
   */
  updated(changedProperties) {
    // The first update is not a transition; `firstUpdated` handles it once the
    // parent has had a chance to assign both of these.
    if (!this.#settled) return;
    if (!changedProperties.has("selected") && !changedProperties.has("suspended")) return;

    this.#syncMedia();
  }

  render() {
    return html`<slot @slotchange=${this.#onSlotChange}></slot>`;
  }
  // #endregion

  // #region Media
  #onSlotChange() {
    // Rewrites src, so it has to run before the embed loads rather than on a
    // later transition. Authoring enablejsapi=1 in the markup skips the rewrite.
    prepareMedia(this);

    // Content can arrive long after the slide settles.
    if (this.#settled) this.#syncMedia();
  }

  #syncMedia() {
    if (this.selected && !this.suspended) {
      // Background video restarts itself. Anything with a soundtrack stays
      // paused: a slide can become selected from autorotation, not a click.
      // Pass `resume: true` here to restart that too.
      restoreMedia(this, {owner: this.#owner});
    } else {
      // display:none does not stop playback, and detaching an embed that never
      // loaded defers the request until the slide is actually shown. Media
      // already paused by a nested scope keeps that scope's bookkeeping.
      pauseMedia(this, {owner: this.#owner});
    }
  }
  // #endregion
}
