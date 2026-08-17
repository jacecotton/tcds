import {nothing} from "lit";
import {html} from "lit/static-html.js";
import {customElement} from "lit/decorators.js";

import {DisclosureGroup} from "@/components/_shared/base/DisclosureGroup";
import localStyles from "./tabs.styles.js";

// Importing the item guarantees it is defined before this element is, so the
// `instanceof` filter in `items` never runs against an un-upgraded child.
import "@/components/tab/tab.js";

@customElement("tcds-tabs")
export class Tabs extends DisclosureGroup {
  static styles = [DisclosureGroup.styles, localStyles];

  // #region Private variables
  /**
   * Cloned title content, one entry per tab. Cached because lit-html compares
   * node values by identity: re-cloning on every render would replace every
   * tab button's contents on every render.
   */
  #titles = new WeakMap();
  // #endregion

  // #region Subclass contract
  get defaultMode() {
    return "tabs";
  }

  get mediaMode() {
    return "accordion";
  }

  get allowsMultiple() {
    return false;
  }

  get requiresSelection() {
    return true;
  }

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
          >${this.#titleFor(item)}</button>
        `)}
      </div>
    `;
  }
  // #endregion

  // #region Public API
  select(position) {
    const item = this.items[position];
    if (item) this.expand(item);
  }
  // #endregion

  // #region Events
  #onTabClick(event) {
    this.select(Number(event.currentTarget.value));
  }

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

  // #region Utility methods
  /**
   * A tab button and its source heading live in different tree scopes, so the
   * heading cannot be slotted into the button and `aria-labelledby` cannot
   * reach across. The heading's children are copied instead of the heading
   * itself, because a button may only contain phrasing content.
   */
  #titleFor(item) {
    if (this.#titles.has(item)) return this.#titles.get(item);

    const title = item.titleElement;
    const nodes = title ? [...title.cloneNode(true).childNodes] : [];

    for (const node of nodes) {
      if (node.nodeType !== Node.ELEMENT_NODE) continue;

      node.removeAttribute("id");

      for (const descendant of node.querySelectorAll("[id]")) {
        descendant.removeAttribute("id");
      }
    }

    this.#titles.set(item, nodes);

    return nodes;
  }
  // #endregion
}
