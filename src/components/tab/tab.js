import {customElement, property} from "lit/decorators.js";
import {Disclosure} from "@/components/_shared/base/Disclosure";

import styles from "./tab.styles.js";

/**
 * A tab panel of content selectable from a tabs group.
 *
 * @tag tcds-tab
 *
 * @slot - Content.
 * @slot title - The title of the tab to use for the tab button (or trigger)
 *   label. The heading level of the slotted element is preserved in accordion
 *   mode.
 *
 * @csspart heading - The heading element containing the trigger (accordion mode only).
 * @csspart trigger - The button used to toggle the tab (accordion mode only).
 * @csspart marker  - The icon inside the trigger button (accordion mode only).
 * @csspart panel   - A container for the content (to add padding, etc.)
 * @csspart content - The tab content.
 *
 * @cssState expanded  - The tab is selected.
 * @cssState accordion - The tab is presented as an accordion disclosure.
 * @cssState tabs      - The tab is presented as a tab panel.
 */
export class Tab extends Disclosure {
  static styles = [Disclosure.styles, styles];

  // #region Properties and state
  /**
   * Whether this is the active tab. Authoring `<tcds-tab selected>` picks the
   * initial one; a URL fragment pointing into this tab overrides it.
   *
   * @type {boolean}
   */
  @property({type: Boolean, reflect: true})
  accessor selected = false;
  // #endregion

  // #region Subclass contract
  /**
   * @type {boolean}
   * @override
   * @protected
   * @internal
   */
  get expanded() {
    return this.selected;
  }

  /**
   * @param {boolean} value
   * @override
   * @protected
   * @internal
   */
  set expanded(value) {
    this.selected = value;
  }
  // #endregion
}

if (!customElements.get("tcds-tab")) {
  customElements.define("tcds-tab", Tab);
}
