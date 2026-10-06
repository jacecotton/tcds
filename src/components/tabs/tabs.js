import {nothing} from "lit";
import {html} from "lit/static-html.js";
import {customElement} from "lit/decorators.js";

import {DisclosureGroup} from "@/components/_shared/base/DisclosureGroup";
import localStyles from "./tabs.styles.js";
import "@/components/tab/tab.js";

/** @import {DisclosureMode, Disclosure} from "@/components/_shared/base/Disclosure" */
/**
 * A collection of toggleable tab panels.
 *
 * @slot - Tab items.
 *
 * @csspart items - The container for all tab items.
 * @csspart tablist - The container for the tab buttons.
 * @csspart tab - The tab button for the corresponding tab.
 *
 * @fires {CustomEvent<{expandedItems: Disclosure[], mode: DisclosureMode}>} tcds-tabs:change
 */
@customElement("tcds-tabs")
export class Tabs extends DisclosureGroup {
  static styles = [DisclosureGroup.styles, localStyles];

  // #region Subclass contract
  /** @override @protected @internal */
  get defaultMode() {
    return "tabs";
  }

  /** @override @protected @internal */
  get mediaMode() {
    return "accordion";
  }

  /** @override @protected @internal */
  get allowsMultiple() {
    return false;
  }

  /** @override @protected @internal */
  get requiresSelection() {
    return true;
  }

  /** @override @protected @internal */
  renderHeader() {
    if (this.mode !== "tabs") return nothing;

    return html`
      <div
        part="tablist"
        role="tablist"
        aria-label=${this.label ?? nothing}
        @keydown=${this.#onTablistKeydown}
      >
        ${this.items.map((item, position) => html`
          <button
            part="tab"
            type="button"
            role="tab"
            value=${position}
            aria-selected=${item.expanded ? "true" : "false"}
            tabindex=${item.expanded ? 0 : -1}
            @click=${this.#onTabClick}
          >${item.titleContent}</button>
        `)}
      </div>
    `;
  }
  // #endregion

  // #region Public API
  /**
   * @param {number} position - The index of the item to select.
   */
  select(position) {
    const item = this.items[position];
    if (item) this.expand(item);
  }
  // #endregion

  // #region Event handlers
  /**
   * @param {MouseEvent} event
   */
  #onTabClick(event) {
    this.select(Number(event.currentTarget.value));
  }

  /**
   * @param {KeyboardEvent} event
   */
  async #onTablistKeydown(event) {
    const items = this.items;

    if (items.length === 0) return;

    const forward = getComputedStyle(this).direction === "rtl" ? -1 : 1;
    const current = items.findIndex((item) => item.expanded);

    const positions = {
      ArrowLeft: current - forward,
      ArrowRight: current + forward,
      Home: 0,
      End: items.length - 1,
    };

    if (!(event.key in positions)) return;

    event.preventDefault();

    this.select(((positions[event.key] % items.length) + items.length) % items.length);

    // Automatic activation: selection and focus move together, which is the
    // expected behaviour for tab panels that are cheap to reveal.
    await this.updateComplete;
    this.renderRoot.querySelector("[part~=tab][aria-selected=true]")?.focus();
  }
  // #endregion
}
