import WebComponent from "../../utilities/WebComponent/WebComponent.js";
import styles from "./style.css";

export default class Section extends WebComponent(HTMLElement) {
  #has(...slots) {
    return !!this.querySelector([...slots].map(slot => `[slot=${slot}]`).join(", "));
  }

  get template() {
    return /* html */`
      <section>
        <div part="background" class="${[...this.classList].filter(className => className.startsWith("bg-"))}" data-theme="${this.dataset.theme}">
          ${this.#has("background") ? `<slot name="background"></slot>` : ``}
        </div>

        <div part="primary" class="${!this.#has("tertiary") ? "fill-width" : ""} ${!this.#has("secondary") ? "fill-height" : ""}">
          ${this.#has("overline") || this.#has("heading") || this.#has("subheading") ? /* html */`
            <hgroup>
              <slot name="overline"></slot>
              <slot name="heading"></slot>
              <slot name="subheading"></slot>
            </hgroup>
          ` : ``}

          <slot name="primary"></slot>
          <slot></slot>

          ${this.#has("cta") ? /* html */`
            <slot name="cta"></slot>
          ` : ``}
        </div>

        ${this.#has("secondary") || (this.#has("image") && !this.#has("tertiary")) ? /* html */`
          <div part="secondary" ${!this.#has("tertiary") ? `class="fill-width"` : ""}>
            <slot name="secondary"></slot>
            ${this.#has("image") ? /* html */`
              <!-- LEGACY -->
              <slot name="image"></slot>
            ` : ``}
          </div>
        ` : ``}

        ${this.#has("tertiary", "image") ? /* html */`
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
      console.log(event);
      this.update({[event.target.name]: event.target.assignedNodes()});
    });
  }
}

customElements.define("tcds-section", Section);
