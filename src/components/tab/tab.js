import {customElement, property} from "lit/decorators.js";
import {Disclosure} from "@/components/_shared/base/Disclosure";

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

  // #region Public API
  get expanded() {
    return this.selected;
  }

  set expanded(value) {
    this.selected = value;
  }
  // #endregion
}
