import WebComponent from "../../utilities/WebComponent/WebComponent.js";
import styles from "./style.css";

export default class Gallery extends WebComponent(HTMLElement) {
  get template() {
    const images = this.querySelectorAll("img");

    return /* html */`
      <div class="grid" style="--above-large-grid-columns: 6">
        ${images.map((image) => /* html */`
          <a href="${image.src}" class="lightbox">
            <img src="${image.src}" alt="${image.alt}">
          </a>
        `).join("")}
      </div>
    `;
  }

  constructor() {
    super();
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  connectedCallback() {
    this._upgradeProperties([]);
    this.update();

    this.shadowRoot.addEventListener("slotchange", () => {
      this.update();
    });
  }
}

customElements.define("tcds-gallery", Gallery);
