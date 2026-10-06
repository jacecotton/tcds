import {customElement, property} from "lit/decorators.js";
import {Disclosure} from "@/components/_shared/base/Disclosure";

/**
 * A tab panel of content selectable from a tabs group.
 *
 * @slot - Content.
 * @slot title - The title of the section to use for the trigger label.
 *
 * @csspart panel   - A container for the content (to add padding, etc.)
 * @csspart content - The section content.
 *
 * @cssState expanded  - The tab is selected.
 * @cssState accordion - The tab is presented as an accordion disclosure.
 * @cssState tabs      - The tab is presented as a tab panel.
 * @cssState plain     - The section is presented as plain content.
 */
@customElement("tcds-tab")
export class Tab extends Disclosure {
  // #region Properties and state
  /**
   * Whether this is the active tab. Authoring `<tcds-tab selected>` picks the
   * initial one; a URL fragment pointing into this tab overrides it.
   */
  @property({type: Boolean, reflect: true})
  accessor selected = false;
  // #endregion

  // #region Subclass contract
  /** @override @protected @internal */
  get expanded() {
    return this.selected;
  }

  /** @override @protected @internal */
  set expanded(value) {
    this.selected = value;
  }
  // #endregion
}
