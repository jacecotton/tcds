import {nothing} from "lit";
import {html} from "lit/static-html.js";
import {customElement} from "lit/decorators.js";

import {DisclosureGroup} from "@/components/_shared/base/DisclosureGroup";
import localStyles from "./tabs.styles.js";

/** @import {TemplateResult} from "lit" */
/** @import {DisclosureMode, Disclosure} from "@/components/_shared/base/Disclosure" */

/**
 * A collection of toggleable tab panels. When `media` is set and does not
 * match, the tabs collapse into an accordion.
 *
 * @slot - Tab items (`<tcds-tab>` elements).
 *
 * @csspart items   - The container for all tab items.
 * @csspart tablist - The container for the tab buttons (tabs mode only).
 * @csspart tab     - The tab button for the corresponding tab (tabs mode only).
 *
 * @fires {CustomEvent<{expandedItems: Disclosure[], mode: DisclosureMode}>} tcds-tabs:change - Fired when the selected tab changes.
 */
@customElement("tcds-tabs")
export class Tabs extends DisclosureGroup {
  static styles = [DisclosureGroup.styles, localStyles];

  // #region Subclass contract
  /**
   * @type {DisclosureMode}
   * @override
   * @protected
   * @internal
   */
  get defaultMode() {
    return "tabs";
  }

  /**
   * @type {DisclosureMode}
   * @override
   * @protected
   * @internal
   */
  get mediaMode() {
    return "accordion";
  }

  /**
   * @type {boolean}
   * @override
   * @protected
   * @internal
   */
  get allowsMultiple() {
    return false;
  }

  /**
   * @type {boolean}
   * @override
   * @protected
   * @internal
   */
  get requiresSelection() {
    return true;
  }

  /**
   * Renders the tablist in tabs mode. In accordion mode each tab renders its
   * own trigger instead.
   *
   * @returns {TemplateResult|typeof nothing}
   * @override
   * @protected
   * @internal
   */
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
   * Selects the tab at the given position, deselecting the others. Out of
   * range positions are ignored.
   *
   * @param {number} position - The zero-based index of the tab to select.
   * @returns {void}
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
    const button = /** @type {HTMLButtonElement} */ (event.currentTarget);
    this.select(Number(button.value));
  }

  /**
   * Arrow keys, Home and End move the selection (and focus) along the tablist,
   * wrapping at either end. Arrow directions are mirrored in RTL.
   *
   * @param {KeyboardEvent} event
   */
  async #onTablistKeydown(event) {
    const items = this.items;

    if (items.length === 0) return;

    const forward = getComputedStyle(this).direction === "rtl" ? -1 : 1;
    const current = items.findIndex((item) => item.expanded);

    /** @type {Record<string, number>} */
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

    /** @type {HTMLElement|null} */
    const selected = this.renderRoot.querySelector("[part~=tab][aria-selected=true]");
    selected?.focus();
  }
  // #endregion
}
