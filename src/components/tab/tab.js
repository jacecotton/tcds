import {LitElement} from "lit";
import {html, unsafeStatic} from "lit/static-html.js";
import {customElement, property, state, queryAssignedElements} from "lit/decorators.js";
import sharedStyles from "@/components/_shared/styles";
import tabStyles from "./tab.styles.js";

@customElement("tcds-tab")
export class Tab extends LitElement {
  static styles = [sharedStyles, tabStyles];

  @property({type: Boolean, reflect: true})
  accessor selected = false;

  @property({type: String, reflect: false})
  accessor title = "";

  get tabs() {
    return this.closest("tcds-tabs");
  }

  #observer = null;

  connectedCallback() {
    super.connectedCallback();

    this.setAttribute("role", "tabpanel");

    this.#syncTitle();

    this.#observer = new MutationObserver(() => {
      this.#syncTitle();
    });

    this.#observer.observe(this, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
    });
  }

  render() {
    return html`
      <div part="content">
        <slot></slot>
      </div>
    `;
  }

  updated() {
    this.hidden = !this.selected;
  }

  #syncTitle() {
    const slottedTitle = this.querySelector(":scope > [slot=title]");
    const newTitle = slottedTitle ? slottedTitle.innerHTML : "";

    if (this.title !== newTitle) {
      this.title = newTitle;

      this.dispatchEvent(new CustomEvent("tcds-tab:updated", {
        bubbles: true,
        composed: true,
      }));
    }
  }
}
