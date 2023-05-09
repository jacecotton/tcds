import WebComponent from "../../utilities/WebComponent/WebComponent.js";
import styles from "./style.css";

export default class Spotlight extends WebComponent(HTMLElement) {
  #has() {
    return !!this.querySelector([...arguments].map(slot => `[slot=${slot}]`).join(", "));
  }

  get template() {
    let poster = false;

    if(!this.#has("background")) {
      const video = this.querySelector("iframe[slot=video][src*=youtu]");
      const viPos = video?.src.indexOf("embed/") + "embed/".length;
      const vi = video?.src.slice(viPos, viPos + 11);
      poster = vi && `https://img.youtube.com/vi/${vi}/maxresdefault.jpg`;
    }

    return /* html */`
      <section class="bg-secondary" data-theme="dark">
        <slot name="background">
          ${poster ? /* html */`
            <img part="background" src="${poster}" alt="">
          ` : ``}
        </slot>

        <slot name="heading"></slot>

        <button is="tcds-ui-button"
          part="button"
          title="Open video popup"
          aria-label="Open video popup"
          onclick="event.stopPropagation(); this.getRootNode().getElementById('dialog').show()"
        ><tcds-icon icon="play"></tcds-icon></button>

        <slot name="subheading"></slot>
      </section>

      <tcds-dialog id="dialog" variant="lightbox">
        <slot name="video"></slot>
      </tcds-dialog>
    `;
  }

  constructor() {
    super();
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  connectedCallback() {
    this.update();
  }
}

customElements.define("tcds-spotlight", Spotlight);
