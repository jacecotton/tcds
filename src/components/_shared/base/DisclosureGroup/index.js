import {LitElement, nothing} from "lit";
import {html} from "lit/static-html.js";
import {property, state, queryAssignedElements} from "lit/decorators.js";

import {Disclosure} from "@/components/_shared/base/Disclosure";
import {MediaQueryController} from "@/components/_shared/controllers/MediaQueryController";
import {DeepLinkController} from "@/components/_shared/controllers/DeepLinkController";

import sharedStyles from "@/components/_shared/styles";
import groupStyles from "./styles.js";

export class DisclosureGroup extends LitElement {
  static styles = [sharedStyles, groupStyles];

  // #region Properties and state
  /**
   * A media query, e.g. `(max-width: 1000px)`. While it matches, the group
   * presents its default pattern, otherwise it presents the alternate.
   */
  @property({type: String})
  accessor media;

  /**
   * Accessible name for the group's own controls. Optional; omitted rather
   * than defaulted, since a generic name is worse than none.
   */
  @property({type: String})
  accessor label;

  /**
   * Bumped whenever the assigned children change. `items` reads live DOM, so
   * something reactive has to stand in for it.
   */
  @state()
  accessor #revision = 0;
  // #endregion

  // #region Private variables
  @queryAssignedElements({flatten: true})
  accessor #assigned;

  #mediaQuery;
  #deepLink;

  /**
   * The item whose state changed most recently. When an exclusive group finds
   * more than one item expanded, this is the one that wins.
   */
  #preferred = null;

  #signature = null;
  // #endregion

  // #region Lifecycle
  constructor() {
    super();

    this.#mediaQuery = new MediaQueryController(this);
    this.#deepLink = new DeepLinkController(this, this.#onDeepLink);

    this.addEventListener("tcds-disclosure-change", this.#onItemChange);
    this.addEventListener("tcds-disclosure-title-change", this.#onItemTitleChange);
  }

  willUpdate(changedProperties) {
    super.willUpdate();
    this.#mediaQuery.query = this.media ?? null;

    // Items live in the light DOM behind a slot, so there is nothing to read
    // until the first render has put that slot in place.
    if (!this.hasUpdated) return;

    this.#syncItems();
  }

  render() {
    return html`
      ${this.renderHeader()}
      <div part="items">
        <slot @slotchange=${this.#onSlotChange}></slot>
      </div>
    `;
  }

  updated() {
    this.#announceChange();
  }
  // #endregion

  // #region Subclass contract
  /**
   * The pattern presented when `media` is absent or not matching.
   */
  get defaultMode() {
    return "accordion";
  }

  /**
   * The pattern presented while `media` matches.
   */
  get mediaMode() {
    return "plain";
  }

  /**
   * Whether more than one item may be expanded at once.
   */
  get allowsMultiple() {
    return false;
  }

  /**
   * Whether exactly one item must always be expanded. True for tabs, where
   * there is no such thing as no tab being selected.
   */
  get requiresSelection() {
    return false;
  }

  /**
   * Chrome rendered above the items — a tablist, expand/collapse buttons.
   */
  renderHeader() {
    return nothing;
  }
  // #endregion

  // #region Public API
  get mode() {
    if (!this.#mediaQuery.query) return this.defaultMode;
    return this.#mediaQuery.matches ? this.defaultMode : this.mediaMode;
  }

  /**
   * Direct children that are disclosures. Filtering on the base class rather
   * than a tag name means a group never adopts a stray element, and the
   * subclass modules import their item modules, so upgrades have always
   * happened by the time this is read.
   */
  get items() {
    return this.#assigned?.filter((element) => element instanceof Disclosure) ?? [];
  }

  get expandedItems() {
    return this.items.filter((item) => item.expanded);
  }

  expand(item) {
    this.#setExpanded(item, true);
  }

  collapse(item) {
    this.#setExpanded(item, false);
  }

  toggle(item) {
    this.#setExpanded(item, !item?.expanded);
  }

  expandAll() {
    if (!this.allowsMultiple) return;

    for (const item of this.items) item.expanded = true;

    this.requestUpdate();
  }

  collapseAll() {
    for (const item of this.items) item.expanded = false;

    // `requiresSelection` groups get one item re-expanded on the way through.
    this.#preferred = null;
    this.requestUpdate();
  }
  // #endregion

  // #region Events
  #onSlotChange() {
    this.#revision++;

    // First moment the items are knowable, and therefore the first moment a
    // fragment in the URL can be acted on.
    this.#deepLink.resolve();
  }

  #onItemChange = (event) => {
    const item = event.target;

    if (!this.items.includes(item)) return;

    this.#setExpanded(item, event.detail.expanded);
  };

  #onItemTitleChange = (event) => {
    if (!this.items.includes(event.target)) return;

    this.requestUpdate();
  };

  #onDeepLink = (target) => {
    const item = this.items.find((item) => item === target || item.contains(target));

    if (!item) return;

    this.expand(item);

    // The browser already tried to scroll here and found nothing laid out,
    // because the panel was hidden at the time.
    this.updateComplete.then(() => {
      target.scrollIntoView({block: "start", behavior: "instant"});
    });
  };
  // #endregion

  // #region Utility methods
  #setExpanded(item, expanded) {
    if (!this.items.includes(item)) return;
    if (!expanded && this.requiresSelection && this.expandedItems.length <= 1) return;

    if (expanded && !this.allowsMultiple) {
      for (const other of this.expandedItems) {
        if (other !== item) other.expanded = false;
      }
    }

    this.#preferred = expanded ? item : null;
    item.expanded = expanded;

    this.requestUpdate();
  }

  #syncItems() {
    const items = this.items;

    items.forEach((item, position) => {
      item.mode = this.mode;
      item.position = position;
      item.total = items.length;
    });

    this.#enforce(items);
  }

  /**
   * Runs in `willUpdate`, so the group's own chrome renders against settled
   * state rather than trailing it by a frame.
   */
  #enforce(items) {
    if (items.length === 0) return;

    let expanded = items.filter((item) => item.expanded);

    if (!this.allowsMultiple && expanded.length > 1) {
      const keep = expanded.includes(this.#preferred) ? this.#preferred : expanded[0];

      for (const item of expanded) {
        if (item !== keep) item.expanded = false;
      }

      expanded = [keep];
    }

    if (this.requiresSelection && expanded.length === 0) {
      items[0].expanded = true;
    }
  }

  /**
   * Emits only when the expanded set genuinely changed. A signature of a
   * different length means items were added or removed, which is a change to
   * the group's contents rather than to its state.
   */
  #announceChange() {
    const items = this.items;
    const signature = items.map((item) => (item.expanded ? "1" : "0")).join("");
    const previous = this.#signature;

    this.#signature = signature;

    if (previous === null || previous.length !== signature.length) return;
    if (previous === signature) return;

    this.dispatchEvent(new CustomEvent(`${this.localName}-change`, {
      detail: {
        expandedItems: items.filter((item) => item.expanded),
        mode: this.mode,
      },
      bubbles: true,
      composed: true,
    }));
  }
  // #endregion
}
