import {LitElement} from "lit";
import {html} from "lit/static-html.js";
import {customElement, property} from "lit/decorators.js";

/**
 * Progressively enhances a native breadcrumb list by contracting intermediate
 * ancestors when the full trail exceeds the available inline space. All links
 * remain in the light DOM; without JavaScript the complete trail wraps.
 *
 * @slot - A labelled nav containing an ol of breadcrumb list items.
 */
@customElement("tcds-breadcrumb")
export class Breadcrumb extends LitElement {
  // #region Properties
  /**
   * Reveal the full trail even when it does not fit on one line. Remains set
   * across resizes. Expansion removes the button for this component instance.
   * @type {boolean}
   */
  @property({type: Boolean, reflect: true})
  accessor expanded = false;

  /**
   * Keep the entire trail visible at every width, with natural wrapping.
   * @type {boolean}
   */
  @property({type: Boolean, attribute: "no-collapse"})
  accessor noCollapse = false;

  /** @type {string} Accessible name for the collapsed disclosure button. */
  @property({type: String, attribute: "expand-label"})
  accessor expandLabel;

  // #endregion

  // #region Private variables
  /** @type {HTMLLIElement|null} */
  #toggleItem = null;
  /** @type {HTMLButtonElement|null} */
  #toggle = null;
  /** Items hidden by this component, restored before measuring or cleanup. @type {Set<HTMLLIElement>} */
  #hidden = new Set();
  /** @type {number|undefined} */
  #frame;
  #resizeObserver = new ResizeObserver(() => this.#schedule());
  #mutationObserver = new MutationObserver(() => this.#schedule());
  // #endregion

  // #region Lifecycle
  constructor() {
    super();
    this.expandLabel = "Show all breadcrumbs";
  }

  connectedCallback() {
    super.connectedCallback();

    this.#resizeObserver.observe(this);

    this.#mutationObserver.observe(this, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["href", "class", "style", "dir"],
    });

    document.fonts?.addEventListener("loadingdone", this.#schedule);

    this.#schedule();
  }

  render() {
    return html`<slot></slot>`;
  }

  updated() {
    this.#schedule();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.#resizeObserver.disconnect();
    this.#mutationObserver.disconnect();

    document.fonts?.removeEventListener("loadingdone", this.#schedule);

    if (this.#frame !== undefined) cancelAnimationFrame(this.#frame);

    this.#frame = undefined;
    this.#restore();
    this.#toggleItem?.remove();
    this.#toggleItem = null;
    this.#toggle = null;
  }
  // #endregion

  // #region Utilities
  #schedule = () => {
    if (!this.isConnected || this.#frame !== undefined) return;

    this.#frame = requestAnimationFrame(() => {
      this.#frame = undefined;
      this.#measure();
    });
  };

  #restore() {
    for (const item of this.#hidden) item.hidden = false;
    this.#hidden.clear();
  }

  /** @param {HTMLOListElement} list */
  #ensureToggle(list) {
    if (!this.#toggleItem) {
      this.#toggleItem = document.createElement("li");
      this.#toggleItem.hidden = true;

      this.#toggle = document.createElement("button");
      this.#toggle.type = "button";
      this.#toggle.setAttribute("data-tcds-breadcrumb", "toggle");

      const dots = document.createElement("span");
      dots.textContent = "...";
      dots.setAttribute("aria-hidden", "true");

      this.#toggle.append(dots);
      this.#toggle.addEventListener("click", () => { this.expanded = true; });
      this.#toggleItem.append(this.#toggle);
    }

    const first = list.firstElementChild;

    if (first && first.nextElementSibling !== this.#toggleItem) first.after(this.#toggleItem);
  }

  /**
   * Remove the disclosure after revealing the trail, keeping keyboard focus
   * at the first revealed link when the button itself had focus.
   * @param {HTMLLIElement[]} items
   */
  #removeToggle(items) {
    if (this.#toggle?.contains(this.ownerDocument.activeElement)) {
      const next = /** @type {HTMLAnchorElement|null} */ (
        items.slice(1).map((item) => item.querySelector("a[href]")).find(Boolean)
        ?? items[0]?.querySelector("a[href]") ?? null
      );

      next?.focus();
    }

    this.#toggleItem?.remove();
    this.#toggleItem = null;
    this.#toggle = null;
  }

  /**
   * Measure the uncontracted list, then hide only intermediate ancestors.
   * Expanded and exceptionally long trails wrap instead of clipping text.
   * @returns {void}
   */
  #measure() {
    this.#restore();

    const list = this.querySelector(":scope > nav > ol");

    if (!(list instanceof HTMLOListElement)) {
      this.#toggleItem?.remove();
      return;
    }

    const items = /** @type {HTMLLIElement[]} */ ([...list.children].filter(
      (item) => item instanceof HTMLLIElement && item !== this.#toggleItem && !item.hidden,
    ));

    if (this.expanded || this.noCollapse || items.length <= 3) {
      this.#removeToggle(items);
      return;
    }

    // Measuring while display:none returns zero; ResizeObserver retries on reveal.
    if (!list.clientWidth) return;

    this.#ensureToggle(list);

    this.#toggleItem.hidden = false;

    const gap = parseFloat(getComputedStyle(list).columnGap) || 0;
    const width = items.reduce((total, item) => total + item.getBoundingClientRect().width, 0)
      + gap * Math.max(items.length - 1, 0);
    const middle = items.slice(1, -2);
    const removedWidth = middle.reduce((total, item) => total + item.getBoundingClientRect().width, 0)
      + gap * Math.max(middle.length - 1, 0);
    // A short ancestor may occupy less space than the disclosure itself.
    // In that case wrapping is more useful than adding an extra interaction.
    const savesSpace = removedWidth > this.#toggleItem.getBoundingClientRect().width + 1;
    const contract = width > list.clientWidth + 1 && savesSpace;
    const focused = this.ownerDocument.activeElement;

    // Responsive changes must never hide the reader's focused link.
    if (contract && middle.some((item) => item.contains(focused))) {
      this.expanded = true;
      this.#removeToggle(items);
      return;
    }

    if (!contract && this.#toggle.contains(focused)) {
      const next = /** @type {HTMLAnchorElement|null} */ (items[1]?.querySelector("a[href]") ?? null);
      next?.focus();
    }

    this.#toggleItem.hidden = !contract;
    this.#toggle.setAttribute("aria-expanded", "false");
    this.#toggle.setAttribute("aria-label", this.expandLabel);

    if (contract) {
      for (const item of middle) {
        item.hidden = true;
        this.#hidden.add(item);
      }
    }
  }
  // #endregion
}
