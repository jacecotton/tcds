import WebComponent from "../../utilities/WebComponent/WebComponent.js";
import styles from "./style.css";

export default class Section extends WebComponent(HTMLElement) {
  #has() {
    return !!this.querySelector([...arguments].map(slot => `[slot=${slot}]`).join(", "));
  }

  get template() {
    const shouldRenderHgroup = this.#has("overline", "heading", "subheading");
    const shouldRenderCTA = this.#has("cta");
    const shouldRenderPrimary = shouldRenderHgroup || shouldRenderCTA || this.#has("primary");
    const shouldRenderSecondary = this.#has("secondary") || (this.#has("image") && !this.#has("tertiary"));
    const shouldRenderTertiary = this.#has("tertiary", "image");

    return /* html */`
      <section>
        <div part="background" class="${[...this.classList].filter(className => className.startsWith("bg-"))}" data-theme="${this.dataset.theme}">
          <slot name="background"></slot>
        </div>

        <div part="default">
          <slot></slot>
        </div>

        ${shouldRenderPrimary ? /* html */`
          <div part="primary">
            ${shouldRenderHgroup ? /* html */`
              <hgroup>
                <slot name="overline"></slot>
                <slot name="heading"></slot>
                <slot name="subheading"></slot>
              </hgroup>
            ` : ``}

            <slot name="primary"></slot>

            ${shouldRenderCTA ? /* html */`
              <nav aria-label="Intro links">
                <slot name="cta"></slot>
              </nav>
            ` : ``}
          </div>
        ` : ``}

        ${shouldRenderSecondary ? /* html */`
          <div part="secondary" ${!shouldRenderTertiary ? `class="fill-width"` : ""}>
            <slot name="secondary"></slot>
            <!-- LEGACY -->
            <slot name="image"></slot>
          </div>
        ` : ``}

        ${shouldRenderTertiary ? /* html */`
          <div part="tertiary" class="fill-height">
            <slot name="tertiary"></slot>
            <!-- LEGACY -->
            <slot name="image"></slot>
          </div>
        ` : ``}
      </section>
    `;
  }

  constructor() {
    super();
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  connectedCallback() {
    this.update();

    if(this.#has("background") && this.getAttribute("data-theme") !== "light") {
      this.setAttribute("data-theme", "dark");
    }
  }

  mountedCallback() {
    this.shadowRoot.addEventListener("slotchange", (event) => {
      this.update({[event.target.name]: event.target.assignedNodes()});
    });
  }
}

customElements.define("tcds-section", Section);
