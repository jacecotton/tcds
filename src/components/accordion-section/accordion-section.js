import {LitElement} from "lit";
import {html, unsafeStatic} from "lit/static-html.js";
import {customElement, property, state} from "lit/decorators.js";
import slugify from "@/js/utilities/slugify.js";
import sharedStyles from "@/components/_shared/styles";
import {AccordionAnimationController} from "../_shared/controllers/AccordionAnimationController";
import {MotionDurationProductive} from "@/js/_gen/tokens.js";
import accordionSectionStyles from "./accordion-section.styles.js";

@customElement("tcds-accordion-section")
export class AccordionSection extends LitElement {
  static styles = [sharedStyles, accordionSectionStyles];

  // #region Controllers
  _animations = new AccordionAnimationController(this, {
    isOpen: () => this.open,
    getPanel: () => this._parts.panel,
    getContent: () => this._parts.content,
  });
  // #endregion

  // #region Properties
  @property({type: Boolean, reflect: true})
  accessor open = false;

  get accordion() {
    return this.closest("tcds-accordion");
  }

  @property({type: Boolean, reflect: true})
  accessor inactive = false;

  @state() accessor _headingLevel = "h3";
  @state() accessor _title = "";

  // Internal reference to shadow DOM parts.
  @state() accessor _parts = {};

  #observer = null;
  // #endregion

  // #region Lifecycle
  connectedCallback() {
    super.connectedCallback();

    this.#syncHeader();

    this.#observer = new MutationObserver(() => {
      this.#syncHeader();
    });

    this.#observer.observe(this, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
    });

    window.addEventListener("hashchange", this.#deepLinkHandler.bind(this));
  }

  render() {
    const hx = unsafeStatic(this._headingLevel);

    return html`
      <section aria-labelledby="heading">
        <${hx} part="heading" id="heading">
          ${this.inactive ? html`
            <span part="button" id="button">
              ${this._title}
            </span>
          ` : html`
            <button
              part="button"
              id="button"
              type="button"
              aria-controls="panel"
              aria-expanded="${this.open}"
              @click="${() => this.toggle()}"
            >
              ${this._title}
              <tcds-icon part="icon" icon="${this.open ? "minus" : "plus"}"></tcds-icon>
            </button>
          `}
        </${hx}>

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
    super.disconnectedCallback();
    this._observer?.disconnect();
    window.removeEventListener("hashchange", this.#deepLinkHandler.bind(this));
  }
  // #endregion

  // #region Public API methods
  /**
   * @param {Boolean|Function} test - Optional forced state or evaluator.
   */
  async toggle(test) {
    if (this.inactive) return false;
    const resolved = typeof test === "function" ? test() : test;
    const shouldOpen = typeof resolved === "boolean" ? resolved : !this.open;
    return await (shouldOpen ? this.show() : this.close());
  }

  async show() {
    // Prevent the event from dispatching unnecessarily.
    if (this.open) return true;
    this.open = true;
    await this.updateComplete;

    if (!this.accordion?.multiple && !this.inactive) {
      setTimeout(() => {
        const headingTop = this._parts.heading.getBoundingClientRect().top;
        const threshold = (parseInt(
          getComputedStyle(document.documentElement)
            .getPropertyValue("--tcds-site-header-height")
          ) || 0) + 25;

        // Only scroll if the heading has been pushed off the top of the screen.
        if (headingTop < threshold) {
          this.scrollIntoView(true);
        }
      }, MotionDurationProductive);
    }

    // Return resolved value.
    return true;
  }

  async close() {
    // Prevent the event from dispatching unnecessarily.
    if (this.inactive || !this.open) return false;
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
    if (!this.id && !document.getElementById(slugify(this._title))) {
      this.id = slugify(this._title);
    }

    if (hash === this.id || this.querySelector(`[id=${hash}], [name=${hash}]`)) {
      // Open section if hash matches ID.
      await this.show();
      // Scroll to whichever element whose ID matches the hash. It may not be
      // a section, but an element contained by one.
      document.getElementById(hash).scrollIntoView(true);
    }
  }

  #syncHeader() {
    const slottedTitle = this.querySelector(":scope > [slot=title]");

    if (slottedTitle) {
      this._headingLevel = slottedTitle.tagName.toLowerCase();
      this._title = slottedTitle.innerHTML;
    } else {
      this._headingLevel = "h3";
      this._title = "";
    }
  }
  // #endregion
}
