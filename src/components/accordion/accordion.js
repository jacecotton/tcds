import {LitElement} from "lit";
import {html} from "lit/static-html.js";
import {customElement, property, state, queryAssignedElements} from "lit/decorators.js";
import sharedStyles from "@/components/_shared/styles";
import accordionStyles from "./accordion.styles.js";

@customElement("tcds-accordion")
export class Accordion extends LitElement {
  static styles = [sharedStyles, accordionStyles];

  // #region Properties
  @property({type: String})
  accessor media;

  @property({type: Boolean, reflect: true})
  accessor multiple = false;

  @queryAssignedElements({selector: "tcds-accordion-section"})
  accessor sections;

  @state()
  accessor _active = true;

  #mediaQueryList = null;
  #wasInactive = false;
  // #endregion

  // #region Lifecycle
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("tcds-accordion-section:toggle", this.#handleChildToggle);
  }

  render() {
    return html`
      ${this.multiple && this._active
        ? html`
            <div part="controls">
              <button part="open-all" @click="${() => this.showAll()}">
                <tcds-icon icon="plus"></tcds-icon>
                <span class="visually-hidden">open</span>
                all
              </button>
              <button part="close-all" @click="${() => this.closeAll()}">
                <tcds-icon icon="minus"></tcds-icon>
                <span class="visually-hidden">close</span>
                all
              </button>
            </div>
          `
        : ``
      }
      <slot @slotchange="${this.#handleSlotChange}"></slot>
    `;
  }

  updated(changedProperties) {
    if (changedProperties.has("media")) {
      this.#setupMediaQuery();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener("tcds-accordion-section:toggle", this.#handleChildToggle);

    if (this.#mediaQueryList) {
      this.#mediaQueryList.removeEventListener("change", this.#handleMediaChange);
    }
  }
  // #endregion

  // #region Public API methods
  /**
   * Open all sections belonging to this accordion.
   *
   * @param {Boolean} filter - An optional filter to exclude sections from
   * opening given custom criteria.
   */
  async showAll(filter = () => true) {
    const showToggles = this.sections
      .filter(section => !section.open && filter(section))
      .map(section => section.show());

    return Promise.all(showToggles);
  }

  /**
   * Close all sections belonging to this section.
   *
   * @param {Boolean} filter - An optional filter to exclude sections from
   * closing given custom criteria.
   */
  async closeAll(filter = () => true) {
    const closeToggles = this.sections
      .filter(section => section.open && filter(section))
      .map(section => section.close());

    return Promise.all(closeToggles);
  }
  // #endregion

  // #region Utilities
  #handleChildToggle = (event) => {
    if (this.multiple) return;

    const {target, detail} = event;

    if (detail.open) {
      this.sections.forEach((section) => {
        if (section !== target && section.open) {
          section.close();
        }
      });
    }
  }

  #setupMediaQuery() {
    if (this.#mediaQueryList) {
      this.#mediaQueryList.removeEventListener("change", this.#handleMediaChange);
    }

    if (this.media) {
      this.#mediaQueryList = window.matchMedia(this.media);
      this.#mediaQueryList.addEventListener("change", this.#handleMediaChange);
      this.#handleMediaChange(this.#mediaQueryList);
    } else {
      this._active = true;
    }
  }

  #handleMediaChange = (event) => {
    this._active = event.matches;

    this.sections.forEach((section) => {
      section.inactive = !this._active;

      if (!this._active) {
        section.open = true;
      } else if (this.#wasInactive) {
        section.open = false;
      }
    });

    this.#wasInactive = !this._active;
  }

  #handleSlotChange = () => {
    if (!this._active) {
      this.sections.forEach((section) => {
        section.inactive = true;
        section.open = true;
      });
    }
  }
  // #endregion
}
