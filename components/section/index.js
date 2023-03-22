import WebComponent from "../../utilities/WebComponent/WebComponent.js";
import styles from "./style.css";

export default class Section extends WebComponent(HTMLElement) {
  constructor() {
    super();
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  get template() {
    // const hasPrimary = !!this.querySelector("[slot=primary]");
    const hasSecondary = !!this.querySelector("[slot=secondary]");
    const hasTertiary = !!this.querySelector("[slot=tertiary]");
    // const hasOverline = !!this.querySelector("[slot=overline]");
    // const hasHeading = !!this.querySelector("[slot=heading]");
    // const hasSubheading = !!this.querySelector("[slot=subheading]");

    return /* html */`
      <section>
        <div part="background" class="${[...this.classList].filter(className => className.startsWith("bg-"))}" data-theme="${this.dataset.theme}">
          <slot name="background"></slot>
        </div>

        <div part="primary" class="${!hasTertiary ? "fill-width" : ""} ${!hasSecondary ? "fill-height" : ""}">
          PRIMARY REGION<br>
          (heading, subhead, overline, CTA)
          <slot></slot>
        </div>

        ${hasSecondary ? /* html */`
          <div part="secondary" ${!hasTertiary ? `class="fill-width"` : ""}>
            <slot name="secondary"></slot>
          </div>
        ` : ``}

        ${hasTertiary ? /* html */`
          <div part="tertiary">
            <slot name="tertiary"></slot>
          </div>
        ` : ``}
      </section>
    `;
  }

  mountedCallback() {
    this.shadowRoot.querySelectorAll("slot").forEach((slot) => {
      slot.addEventListener("slotchange", () => {
        this._requestUpdate(slot.name);
      });
    });
  }
}

customElements.define("tcds-section", Section);
