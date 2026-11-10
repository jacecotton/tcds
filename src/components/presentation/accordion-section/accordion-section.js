import {customElement, property} from "lit/decorators.js";
import {Disclosure} from "@/components/_shared/base/Disclosure";

/**
 * A section of content expandable and collapsible via a trigger.
 *
 * @slot - Content.
 * @slot title - The title of the section to use for the trigger label.
 *
 * @csspart heading - The heading element containing the trigger.
 * @csspart trigger - The button used to toggle the section.
 * @csspart marker  - The icon inside the trigger button.
 * @csspart panel   - A container for the content (to add padding, etc.)
 * @csspart content - The section content.
 *
 * @cssState expanded  - The section is expanded.
 * @cssState accordion - The section is presented as an accordion disclosure.
 * @cssState plain     - The section is presented as plain content.
 */
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

  // #region Subclass contract
  /** @override @protected @internal */
  get expanded() {
    return this.open;
  }

  /** @override @protected @internal */
  set expanded(value) {
    this.open = value;
  }
  // #endregion
}
