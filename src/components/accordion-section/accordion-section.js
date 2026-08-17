import {customElement, property} from "lit/decorators.js";
import {Disclosure} from "@/components/_shared/base/Disclosure";

@customElement("tcds-accordion-section")
export class AccordionSection extends Disclosure {
  // #region Properties and state
  /**
   * Whether this section is expanded. Authoring
   * `<tcds-accordion-section open>` expands it initially; a URL fragment
   * pointing into the section overrides it.
   */
  @property({type: Boolean, reflect: true})
  accessor open = false;
  // #endregion

  // #region Public API
  get expanded() {
    return this.open;
  }

  set expanded(value) {
    this.open = value;
  }
  // #endregion
}
