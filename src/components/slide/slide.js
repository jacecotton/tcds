import {LitElement} from "lit";
import {html} from "lit/static-html.js";
import {customElement, property} from "lit/decorators.js";
import {MediaController} from "@/components/_shared/controllers/MediaController";

import sharedStyles from "@/components/_shared/styles";
import localStyles from "./slide.styles.js";

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
  /** @type {MediaController} */
  #media;
  // #endregion

  // #region Lifecycle
  constructor() {
    super();

    this.position = 0;
    this.total = 1;

    this.#internals = this.attachInternals();
    this.#internals.role = "group";
    this.#internals.ariaRoleDescription = "slide";
    this.#media = new MediaController(this, () => this.selected && !this.suspended);
    this.addEventListener("beforematch", this.#onBeforeMatch);
  }

  firstUpdated() {
    // Reading a layout value forces the browser to resolve the component's own
    // styles while `transition` is still `none`, so the jump from the
    // pre-upgrade defaults lands instantly instead of animating. Transitions
    // are enabled only afterward, for real slide changes.
    this.offsetHeight;
    this.#internals.states.add("ready");
  }

  willUpdate() {
    this.#internals.ariaLabel = `${this.position + 1} of ${this.total}`;
    // Unlike visibility:hidden, until-found permits find-in-page to reveal
    // inactive slides. Keep an explicit author-supplied hidden state intact.
    if (!this.hasAttribute("hidden") || this.hidden === "until-found") {
      this.hidden = this.selected ? false : "until-found";
    }
  }

  render() {
    return html`<slot @slotchange=${this.#onSlotChange}></slot>`;
  }
  // #endregion

  // #region Media
  #onSlotChange() {
    this.#media.contentChanged();
  }

  #onBeforeMatch = () => {
    this.dispatchEvent(new CustomEvent("tcds-slide:reveal", {
      bubbles: true,
      composed: true,
    }));
  };
  // #endregion
}
