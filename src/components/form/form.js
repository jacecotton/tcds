import {LitElement} from "lit";
import {html} from "lit/static-html.js";
import {customElement, property} from "lit/decorators.js";

/**
 * @typedef {Object} RadioOther
 * @property {HTMLInputElement} radio
 * @property {HTMLInputElement} text
 */

/**
 * Enhances native forms with editable radio values. Each
 * `[data-tcds-form="radio-other"]` contains a radio and a text input.
 *
 * @tag tcds-form
 * @slot - Native form markup.
 */
@customElement("tcds-form")
export class Form extends LitElement {
  // #region Properties
  /**
   * Use `display` for large controls and radio choices styled as buttons.
   * @type {"display"|undefined}
   */
  @property({type: String, reflect: true})
  accessor variant;
  // #endregion

  // #region Private variables
  /** @type {Map<HTMLInputElement, boolean>} */
  #required = new Map();
  #observer = new MutationObserver(() => this.#syncRequired());
  // #endregion

  // #region Lifecycle
  connectedCallback() {
    super.connectedCallback();
    for (const name of ["click", "input", "change", "reset", "formdata"]) {
      this.addEventListener(name, this.#onEvent, true);
    }
    window.addEventListener("pageshow", this.#syncRequired);
    this.#observer.observe(this, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-tcds-form", "type", "form", "disabled", "checked"],
    });
    this.#syncRequired();
  }

  render() {
    return html`<slot></slot>`;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    for (const name of ["click", "input", "change", "reset", "formdata"]) {
      this.removeEventListener(name, this.#onEvent, true);
    }
    window.removeEventListener("pageshow", this.#syncRequired);
    this.#observer.disconnect();
    for (const [text, required] of this.#required) text.required = required;
    this.#required.clear();
  }
  // #endregion

  // #region Utilities
  /** @returns {RadioOther[]} */
  #pairs() {
    return [...this.querySelectorAll('[data-tcds-form="radio-other"]')].flatMap((group) => {
      const radio = group.querySelector('input[type="radio"]');
      const text = group.querySelector('input[type="text"]');
      if (!(radio instanceof HTMLInputElement) || !(text instanceof HTMLInputElement)
        || group.closest("tcds-form") !== this || !radio.form
        || !this.contains(radio.form) || text.form !== radio.form) return [];
      return [{radio, text}];
    });
  }

  #syncRequired = () => {
    const pairs = this.#pairs();
    const current = new Set(pairs.map(({text}) => text));
    for (const [text, required] of this.#required) {
      if (!current.has(text)) {
        text.required = required;
        this.#required.delete(text);
      }
    }
    for (const {radio, text} of pairs) {
      if (!this.#required.has(text)) this.#required.set(text, text.required);
      text.required = radio.checked && !radio.matches(":disabled");
    }
  };

  /** @param {HTMLInputElement} radio */
  #select(radio) {
    if (radio.checked || radio.matches(":disabled")) return;
    radio.checked = true;
    radio.dispatchEvent(new Event("input", {bubbles: true}));
    radio.dispatchEvent(new Event("change", {bubbles: true}));
  }
  // #endregion

  // #region Event handlers
  /** @param {Event} event */
  #onEvent = (event) => {
    if (event.type === "reset") {
      // The browser applies defaults after the reset event finishes dispatching.
      queueMicrotask(() => {
        if (this.isConnected && !event.defaultPrevented) this.#syncRequired();
      });
      return;
    }

    for (const {radio, text} of this.#pairs()) {
      if (event.type === "formdata") {
        if (event.target !== radio.form) continue;
        const {formData} = /** @type {FormDataEvent} */ (event);
        // Legacy named companion fields must have a unique, distinct name.
        if (text.name && text.name !== radio.name) formData.delete(text.name);
        if (radio.checked && radio.name && !radio.matches(":disabled") && !text.matches(":disabled")) {
          formData.set(radio.name, text.value);
        }
      } else if (event.target === text && !text.matches(":disabled") && !radio.matches(":disabled")) {
        if (event.type === "click" || (event.type === "input" && text.value !== "")) {
          this.#select(radio);
        }
      } else if (event.target === radio && event.type === "click"
        && /** @type {MouseEvent} */ (event).detail > 0 && !radio.matches(":disabled") && !text.matches(":disabled")) {
        text.focus();
      }
    }
    this.#syncRequired();
  };
  // #endregion
}
