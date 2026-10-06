import {nothing} from "lit";
import {html} from "lit/static-html.js";
import {customElement, property} from "lit/decorators.js";

import {DisclosureGroup} from "@/components/_shared/base/DisclosureGroup";
import localStyles from "./accordion.styles.js";

import "@/components/accordion-section/accordion-section.js";

/** @import {DisclosureMode} from "@/components/_shared/base/Disclosure" */

/**
 * Groups accordion sections into an optionally exclusive accordion interface.
 *
 * @slot - Accordion sections.
 *
 * @csspart items    - Container for the accordion sections.
 * @csspart controls - Container for expand all/collapse all controls.
 * @csspart control  - Expand/collapse control buttons.
 * @csspart expand   - Expand control button.
 * @csspart collapse - Collapse control button.
 *
 * @fires {CustomEvent<{expandedItems: Disclosure[], mode: DisclosureMode}>} tcds-tabs:change
 */
@customElement("tcds-accordion")
export class Accordion extends DisclosureGroup {
  static styles = [DisclosureGroup.styles, localStyles];

  // #region Properties and state
  /**
   * Allows any number of sections to be open at once, and renders expand-all
   * and collapse-all controls. Without it, opening one section closes the rest.
   *
   * @see renderHeader
   */
  @property({type: Boolean, reflect: true})
  accessor multiple = false;
  // #endregion

  // #region Subclass contract
  /** @override @protected @internal */
  get defaultMode() {
    return "accordion";
  }

  /** @override @protected @internal */
  get mediaMode() {
    return "plain";
  }

  /** @override @protected @internal */
  get allowsMultiple() {
    return this.multiple;
  }

  /** @override @protected @internal */
  get requiresSelection() {
    return false;
  }

  /**
   * A UX affordance for accordions with `[multiple]` to provide toggle buttons
   * for opening and closing all sections at once.
   *
   * @override
   * @protected
   * @internal
   * @see multiple
   */
  renderHeader() {
    // Nothing to expand or collapse once the accordion has taken itself apart.
    if (this.mode !== "accordion" || !this.multiple) return nothing;

    const items = this.items;
    const expanded = this.expandedItems.length;

    return html`
      <div part="controls" role="group" aria-label=${this.label ?? nothing}>
        <button
          part="control expand"
          type="button"
          ?disabled=${items.length === 0 || expanded === items.length}
          @click=${this.#onExpandAllClick}
        >
          <tcds-icon icon="plus"></tcds-icon>
          Expand all
        </button>
        <button
          part="control collapse"
          type="button"
          ?disabled=${expanded === 0}
          @click=${this.#onCollapseAllClick}
        >
          <tcds-icon icon="minus"></tcds-icon>
          Collapse all
        </button>
      </div>
    `;
  }
  // #endregion

  // #region Event handlers
  #onExpandAllClick() {
    this.expandAll();
  }

  #onCollapseAllClick() {
    this.collapseAll();
  }
  // #endregion
}
