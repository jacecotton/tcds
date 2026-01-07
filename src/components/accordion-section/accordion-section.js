import {LitElement, html, customElement, property, state, unsafeStatic} from "@/js/lit";
import slugify from "@/js/utilities/slugify.js";
import sharedStyles from "@/js/utilities/shared.styles.js";
import {AccordionAnimationController} from "./accordion-section.controller.js";
import accordionSectionStyles from "./accordion-section.styles.js";

@customElement("tcds-accordion-section")
export class AccordionSection extends LitElement {
  static styles = [sharedStyles, accordionSectionStyles];

  // #region Controllers
  animations = new AccordionAnimationController(this, {
    isOpen: () => this.open,
    getPanel: () => this._parts.panel,
    getContent: () => this._parts.content,
  });
  // #endregion

  // #region Properties
  @property({type: Boolean, reflect: true})
  open = false;

  @property({type: String})
  get title() {
    return this.querySelector(":scope > [slot=title]")?.innerHTML || "";
  }

  get headingLevel() {
    return this.querySelector(":scope > [slot=title]")?.localName || "h3";
  }

  get accordion() {
    return this.closest("tcds-accordion");
  }

  // Internal reference to shadow DOM parts.
  @state() _parts = {};
  // #endregion

  // #region Lifecycle
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("hashchange", this.#deepLinkHandler.bind(this));
  }

  render() {
    return html`
      <section aria-labelledby="heading">
        <${unsafeStatic(this.headingLevel)} part="heading" id="heading">
          <button
            part="button"
            id="button"
            aria-controls="panel"
            aria-expanded="${this.open}"
            @click="${() => this.toggle()}"
          >
            ${this.title}
            <tcds-icon part="icon" icon="${this.open ? "minus" : "plus"}"></tcds-icon>
          </button>
        </${unsafeStatic(this.headingLevel)}>

        <div part="panel" id="panel">
          <div part="content">
            <slot></slot>
          </div>
        </div>
      </section>
    `;
  }

  firstUpdated() {
    this._parts = {
      heading: this.shadowRoot.querySelector("[part=heading]"),
      panel: this.shadowRoot.querySelector("[part=panel]"),
      content: this.shadowRoot.querySelector("[part=content]"),
    };

    this.#deepLinkHandler();
  }

  willUpdate(changedProperties) {
    if (changedProperties.has("open")) {
      this.dispatchEvent(
        new CustomEvent("tcds-accordion-section:toggle", {
          detail: {
            open: this.open,
            previous: changedProperties.get("open"),
          },
          bubbles: true,
          composed: true,
        }),
      );
    }
  }

  disconnectedCallback() {
    window.removeEventListener("hashchange", this.#deepLinkHandler);
  }
  // #endregion

  // #region Public API methods
  /**
   * @param {Boolean|Function} test - Optional forced state or evaluator.
   */
  async toggle(test) {
    const resolved = typeof test === "function" ? test() : test;
    const shouldOpen = typeof resolved === "boolean" ? resolved : !this.open;
    return await (shouldOpen ? this.show() : this.close());
  }

  async show() {
    // Prevent the event from dispatching unnecessarily.
    if (this.open) return true;
    this.open = true;
    await this.updateComplete;

    if (!this.accordion?.multiple) {
      const headingTop = this._parts.heading.getBoundingClientRect().top;
      const threshold = parseInt(
        getComputedStyle(document.documentElement)
          .getPropertyValue("--tcds-site-header-height")
        ) || 0;

      // Only scroll if the heading has been pushed off the top of the screen.
      if (headingTop < threshold) {
        this.scrollIntoView(true);
      }
    }

    // Return resolved value.
    return true;
  }

  async close() {
    // Prevent the event from dispatching unnecessarily.
    if (!this.open) return false;
    this.open = false;
    await this.updateComplete;
    // Return resolved value.
    return false;
  }
  // #endregion

  // #region Utilities
  /**
   * If the URL hash matches the ID of this section, or the ID of an element
   * within this section, open it. If an ID does not exist for this section,
   * generate one from the title.
   */
  async #deepLinkHandler() {
    // Get hash from URL. Exit early if no hash.
    const hash = window.location.hash.substring(1);
    if (!hash) return;

    // Derive an ID from section title if not already provided.
    if (!this.id && !document.getElementById(slugify(this.title))) {
      this.id = slugify(this.title);
    }

    if (hash === this.id || this.querySelector(`[id=${hash}], [name=${hash}]`)) {
      // Open section if hash matches ID.
      await this.show();
      // Scroll to whichever element whose ID matches the hash. It may not be
      // a section, but an element contained by one.
      document.getElementById(hash).scrollIntoView(true);
    }
  }
  // #endregion
}
