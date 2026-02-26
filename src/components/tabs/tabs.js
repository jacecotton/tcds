import {LitElement} from "lit";
import {html} from "lit/static-html.js";
import {customElement, property, queryAssignedElements, queryAll} from "lit/decorators.js";
import {SelectionController} from "../_shared/controllers/SelectionController";
import sharedStyles from "@/components/_shared/styles";
import tabsStyles from "./tabs.styles.js";

@customElement("tcds-tabs")
export class Tabs extends LitElement {
  static styles = [sharedStyles, tabsStyles];

  _selectionController = new SelectionController(this);

  // #region Properties
  @queryAssignedElements({selector: "tcds-tab"})
  accessor tabs;

  @queryAll("[part=button]")
  accessor #buttons;
  // #endregion

  // #region Lifecycle
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("hashchange", this.#deepLinkHandler.bind(this));
    this.addEventListener("tcds-tab:updated", this.#handleTabUpdate.bind(this));
  }

  render() {
    return html`
      <div role="tablist">
        ${(this.tabs || []).map((tab, index) => {
          const panelId = tab.id || `tcds-tabpanel-${index}`;
          const buttonId = `tcds-tab-${index}`;

          tab.id = panelId;
          tab.setAttribute("aria-labelledby", buttonId);

          return html`
            <button
              id="${buttonId}"
              role="tab"
              part="button"
              aria-controls="${panelId}"
              aria-selected=${tab.selected ? "true" : "false"}
              tabindex=${tab.selected ? "0" : "-1"}
              @click=${() => this.select(tab)}
              @keydown=${this.#handleKeydown}
              class="tcds-button"
            >
              <span>${tab.title}</span>
            </button>
          `;
        })}
      </div>
      <slot @slotchange=${this.#handleSlotChange}></slot>
    `;
  }

  firstUpdated() {
    this.#deepLinkHandler();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("hashchange", this.#deepLinkHandler.bind(this));
    this.removeEventListener("tcds-tab:updated", this.#handleTabUpdate.bind(this));
  }
  // #endregion

  // #region Public API methods
  async select(tab) {
    this._selectionController.select(tab);

    this.dispatchEvent(new CustomEvent("tcds-tabs:select", {
      bubbles: true,
      detail: {tab},
    }));
  }
  // #endregion

  // #region Utilities
  #handleSlotChange() {
    this._selectionController.sync(this.tabs);
    this.requestUpdate();
  }

  #handleTabUpdate() {
    this.requestUpdate();
  }

  #handleKeydown(event) {
    const handler = {
      "ArrowRight": () => this._selectionController.selectNext(),
      "ArrowLeft": () => this._selectionController.selectPrevious(),
      "Home": () => this._selectionController.selectFirst(),
      "End": () => this._selectionController.selectLast(),
    }[event.key];

    if (!handler) return;

    event.preventDefault();
    handler();

    this.updateComplete.then(() => {
      const index = this._selectionController.items.indexOf(this._selectionController.selected);
      this.#buttons[index]?.focus();
    });
  }

  async #deepLinkHandler() {
    await this.updateComplete;

    // Get hash from URL. Exit early if no hash.
    const hash = window.location.hash.substring(1);
    if (!hash) return;

    const target = document.getElementById(hash);
    if (!target || (!this.contains(target) && this.id !== hash)) return;

    const targetTab = target.closest("tcds-tab");

    if (targetTab && this._selectionController.items.includes(targetTab)) {
      this.select(targetTab);
    }

    requestAnimationFrame(() => {
      target.scrollIntoView();
    });
  }
  // #endregion
}
