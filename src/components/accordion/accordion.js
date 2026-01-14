import {LitElement, html, customElement, property, queryAssignedElements} from "@/js/lit";
import sharedStyles from "@/js/utilities/shared.styles.js";
import accordionStyles from "./accordion.styles.js";

@customElement("tcds-accordion")
export class Accordion extends LitElement {
  static styles = [sharedStyles, accordionStyles];

  // #region Properties
  @property({type: Boolean, reflect: true})
  multiple = false;

  @queryAssignedElements({selector: "tcds-accordion-section"})
  sections;
  // #endregion

  // #region Lifecycle
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("tcds-accordion-section:toggle", this.#handleChildToggle);
  }

  render() {
    return html`
      ${this.multiple
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
      <slot></slot>
    `;
  }
  // #endregion

  // #region Public API methods
  /**
   * Open all sections belonging to this section.
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
  // #endregion
}
