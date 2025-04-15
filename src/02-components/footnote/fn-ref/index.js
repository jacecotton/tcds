import {declarative, html, baseStyles} from "../../utilities/index.js";

class TCDSFnRefElement extends declarative(HTMLElement) {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.adoptedStyleSheets = [baseStyles];
  }

  connectedCallback() {
    // A tcds-fn-ref's corresponding "footnote" is an `li` element with an `id`
    // matching the tcds-fn-ref's `aria-details` attribute.
    if(!this.footnote) {
      return;
    }

    // Generate an id for this tcds-fn-ref based on the corresponding
    // footnote's.
    const id = `${this.footnote.id}-ref`;

    // Only add it if there isn't another ref with the same id (which can happen
    // if multiple refs point to the same footnote).
    if(!document.getElementById(id)) {
      this.id = id;
    }

    this.requestUpdate();
  }

  get template() {
    // https://www.w3.org/TR/dpub-aria-1.1/#doc-noteref
    return html`
      <slot></slot><sup part="super">&NoBreak;<a part="anchor" href="#${this.footnote.id}"><span class="visually-hidden">footnote </span>${this.refnum}</a></sup>
    `;
  }

  get footnote() {
    return this.hasAttribute("aria-details")
      // Get the element in the document with a unique ID matching this
      // element's `aria-details`.
      ? document.getElementById(this.getAttribute("aria-details"))
      : new Error(`${this.tagName} is missing required "aria-details" attribute pointing to valid unique ID on a list element as a descendant of TCDS-FN-LIST element.`);
  }

  get refnum() {
    return [...this.footnotes.querySelectorAll("ol li")].indexOf(this.footnote) + 1;
  }

  get footnotes() {
    const fnList = this.footnote.closest("tcds-fn-list");

    return this.footnote && fnList ? fnList
      : new Error(`${this.tagName} is not a descendant of required TCDS-FN-LIST containing element.`);
  }
}

customElements.define("tcds-fn-ref", TCDSFnRefElement);
