import {LitElement} from "lit";
import {html} from "lit/static-html.js";
import {customElement, property} from "lit/decorators.js";
import {pauseMedia, restoreMedia, prepareMedia} from "@/components/_shared/utilities/pauseMedia.js";

import sharedStyles from "@/components/_shared/styles";
import localStyles from "./slide.styles.js";

/**
 * Distinguishes each slide's paused media from a nested carousel's, so an outer
 * slide reactivating doesn't restart embeds an inner slide deliberately stopped.
 */
let owners = 0;

@customElement("tcds-slide")
export class Slide extends LitElement {
  static styles = [sharedStyles, localStyles];

  // #region Properties and state
  /**
   * Set by the parent carousel. Drives visibility, which in turn removes
   * unselected slides from the tab order and the accessibility tree.
   */
  @property({type: Boolean, reflect: true})
  accessor selected = false;

  /**
   * Set by the parent carousel while its playback toggle is off. Holds this
   * slide's media paused even when the slide is selected, and is checked again
   * on reveal, so a slide surfaced during a suspension stays quiet.
   */
  @property({type: Boolean, reflect: true})
  accessor suspended = false;

  /**
   * Zero-based position among sibling slides, assigned by the parent carousel
   * as a property so the light DOM markup stays clean.
   */
  @property({type: Number})
  accessor position;

  /**
   * Total sibling slide count, assigned by the parent carousel.
   */
  @property({type: Number})
  accessor total;
  // #endregion

  // #region Private variables
  #internals;
  #owner = `tcds-slide-${++owners}`;
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
    await new Promise(requestAnimationFrame);
    this.#settled = true;
    this.#syncMedia();
  }

  willUpdate() {
    this.#internals.ariaLabel = `${this.position + 1} of ${this.total}`;
  }

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
