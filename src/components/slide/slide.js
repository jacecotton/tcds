import {LitElement} from "lit";
import {html} from "lit/static-html.js";
import {customElement, property} from "lit/decorators.js";

import sharedStyles from "@/components/_shared/styles";
import localStyles from "./slide.styles.js";

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
  }

  render() {
    return html`<slot></slot>`;
  }
  // #endregion
}
