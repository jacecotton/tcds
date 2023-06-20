import WebComponent from "../../utilities/WebComponent/WebComponent.js";
import styles from "./style.css";

export default class Section extends WebComponent(HTMLElement) {
  static observedAttributes = ["data-theme", "class"];

  #has() {
    return !!this.querySelector([...arguments].map(slot => `[slot=${slot}]`).join(", "));
  }

  get template() {
    const hasBackgroundImage = this.querySelector("[slot=background]:is(picture, video, img)");
    const shouldRenderHgroup = this.#has("overline", "heading", "subheading");
    const shouldRenderCTA = this.#has("cta");
    const shouldRenderPrimary = shouldRenderHgroup || shouldRenderCTA || this.#has("primary");
    const shouldRenderSecondary = this.#has("secondary") || (this.#has("image") && !this.#has("tertiary"));
    const shouldRenderTertiary = this.#has("tertiary", "image");

    return /* html */`
      <section>
        <div
          part="background"
          class="
            ${[...this.classList].filter(className => className.startsWith("bg-"))}
            ${hasBackgroundImage ? "has-background" : ""}
          "
          data-theme="${this.dataset.theme}"
        >
          <slot name="background"></slot>
        </div>

        ${!shouldRenderPrimary ? /* html */`
          <div part="default">
            <slot></slot>
          </div>
        ` : ``}

        ${shouldRenderPrimary ? /* html */`
          <div part="primary" ${!shouldRenderSecondary ? `class="fill-height"` : ``}>
            ${shouldRenderHgroup ? /* html */`
              <hgroup>
                <slot name="overline"></slot>
                <slot name="heading"></slot>
                <slot name="subheading"></slot>
              </hgroup>
            ` : ``}

            <slot name="primary"></slot>
            <slot></slot>

            ${shouldRenderCTA ? /* html */`
              <nav aria-label="Intro links">
                <slot name="cta"></slot>
              </nav>
            ` : ``}
          </div>
        ` : ``}

        ${shouldRenderSecondary ? /* html */`
          <div part="secondary">
            <slot name="secondary"></slot>
            <!-- LEGACY -->
            <slot name="image"></slot>
          </div>
        ` : ``}

        ${shouldRenderTertiary ? /* html */`
          <div part="tertiary">
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

  attributeChangedCallback() {
    this.update();
  }
}

customElements.define("tcds-section", Section);
