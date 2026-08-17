import {nothing} from "lit";
import {html} from "lit/static-html.js";
import {customElement, property} from "lit/decorators.js";

import {DisclosureGroup} from "@/components/_shared/base/DisclosureGroup";
import localStyles from "./accordion.styles.js";

import "@/components/accordion-section/accordion-section.js";

@customElement("tcds-accordion")
export class Accordion extends DisclosureGroup {
  static styles = [DisclosureGroup.styles, localStyles];

  // #region Properties and state
  /**
   * Allows any number of sections to be open at once, and renders expand-all
   * and collapse-all controls. Without it, opening one section closes the rest.
   */
  @property({type: Boolean, reflect: true})
  accessor multiple = false;
  // #endregion

  // #region Subclass contract
  get defaultMode() {
    return "accordion";
  }

  get mediaMode() {
    return "plain";
  }

  get allowsMultiple() {
    return this.multiple;
  }

  get requiresSelection() {
    return false;
  }

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

  // #region Events
  #onExpandAllClick() {
    this.expandAll();
  }

  #onCollapseAllClick() {
    this.collapseAll();
  }
  // #endregion
}
