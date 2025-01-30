import {declarative, html, importSharedStyles} from "../../utilities/index.js";

class FnList extends declarative(HTMLElement) {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
  }

  connectedCallback() {
    // Loop through all the footnotes (`li` elements inside of this
    // `tcds-fn-list`).
    this.querySelectorAll("li").forEach((footnote) => {
      // Find the first associated reference in the document.
      const ref = document.querySelector(`[aria-describedby=${footnote.id}`);

      // Remove the footnote if a corresponding reference doesn't exist.
      if(!ref) {
        footnote.remove();

        // Re-index all of the references based on the above removal (@todo:
        // inefficient).
        document.querySelectorAll("tcds-fn-ref").forEach((ref) => {
          ref.requestUpdate();
        });

        return;
      }

      // Otherwise, augment the footnote based on ref data.
      // https://www.w3.org/TR/dpub-aria-1.1/#doc-footnote
      footnote.role = "doc-footnote";
      // https://www.w3.org/TR/dpub-aria-1.1/#doc-backlink
      footnote.innerHTML += html`&nbsp;<small><a href="#${footnote.id}-ref" role="doc-backlink" aria-label="Return to associated passage">↵</a></small>`;
    });

    // Make first shadow DOM render.
    this.requestUpdate();
  }

  get template() {
    // https://www.w3.org/TR/dpub-aria-1.1/#doc-endnotes
    return importSharedStyles() + html`
      <aside role="doc-endnotes" aria-labelledby="footnotes-${this.fnListIndex}">
        <${this.headingLevel} class="visually-hidden" id="footnotes-${this.fnListIndex}">Footnotes</${this.headingLevel}>
        <slot></slot>
      </aside>
    `;
  }

  get fnListIndex() {
    return [...document.querySelectorAll("tcds-fn-list")].indexOf(this);
  }

  get headingLevel() {
    // Get previous heading element (sibling or sibling of ancestor, not
    // ancestor).
    const prevHeading = this.findPrevHeading();
    // Get the level associated with the previous heading element.
    const prevHeadingLevel = prevHeading ? parseInt(prevHeading.tagName.slice(1), 10) : null;
    // Increment the level, max out at 6, default to 2 if no previous heading.
    const nextHeadingLevel = prevHeadingLevel ? Math.min(prevHeadingLevel + 1, 6) : 2;

    return `h${nextHeadingLevel}`;
  }

  findPrevHeading() {
    // Start with the current `tcds-fns` instance.
    let element = this;

    while(element) {
      if(element.matches("h1, h2, h3, h4, h5, h6")) {
        return element;
      }

      // If element is not currently a heading element (see selector test
      // above), swap element for its immediately previous sibling. If no
      // previous sibling, move up to the parent element.
      element = element.previousElementSibling || element.parentElement;
    }

    return null;
  }
}

customElements.define("tcds-fn-list", FnList);
