import WebComponent from "../../utilities/WebComponent/WebComponent.js";
import shadowStyles from "./style.css";
import lightStyles from "./style.light.css";

export default class Section extends WebComponent(HTMLElement) {
  constructor() {
    super();

    this.shadowRoot.adoptedStyleSheets = [shadowStyles];
    this.getRootNode().adoptedStyleSheets = [...this.getRootNode().adoptedStyleSheets, ...[lightStyles]];
  }

  connectedCallback() {
    super.connectedCallback();

    this.hasBackground = !!this.querySelector("[slot=background]");
    this.hasVideoBackground = !!this.querySelector("video[slot=background]");
    this.hasVideo = !!this.querySelector("[slot=video]");
    this.hasVideoDescription = !!this.querySelector("[slot=video-description]");
    this.hasHeading = !!this.querySelector("[slot=heading]");
    this.hasSubheading = !!this.querySelector("[slot=subheading]");
    this.hasOverline = !!this.querySelector("[slot=overline]");
    this.hasImage = !!this.querySelector("[slot=image]");
    this.hasCta = !!this.querySelector("[slot=cta]");

    if(this.hasBackground) {
      this.setAttribute("has-background", this.hasVideoBackground ? "video" : "");

      if(this.getAttribute("data-theme") !== "light") {
        this.setAttribute("data-theme", "dark");
      }
    }

    if(this.hasImage) {
      this.setAttribute("has-image", "");
    }

    if(this.hasVideo) {
      this.setAttribute("has-video", "");

      const sectionsWithVideo = Array.from(document.querySelectorAll("tcds-section")).filter(section => section.video);
      this.index = sectionsWithVideo.indexOf(this) + 1;

      this.insertAdjacentHTML("beforeend", /* html */`
        <tcds-button icon="only play" size="large" aria-controls="video-modal-${this.index}">Open video player</tcds-button>
      `);
    }
  }

  mountedCallback() {
    if(this.hasVideo) {
      const dialog = document.createElement("tcds-dialog");
      dialog.id = `video-modal-${this.index}`;
      dialog.style.setProperty("--tcds-dialog-padding", "0");

      const video = this.querySelector("[slot=video]");
      video.removeAttribute("slot");
      dialog.appendChild(video);

      document.body.appendChild(dialog);
    }
  }

  render() {
    return /* html */`
      <section>
        <slot name="background"></slot>
        <div class="max-width">
          ${this.hasHeading || this.hasSubheading || this.hasOverline || this.hasImage || this.hasCta ? /* html */`
            <div part="content">
              ${this.hasHeading || this.hasSubheading || this.hasOverline ? /* html */`
                <hgroup>
                  <slot name="overline"></slot>
                  <slot name="heading"></slot>
                  <slot name="subheading"></slot>
                </hgroup>
              ` : ``}
              ${this.hasImage ? /* html */`
                <figure>
                  <slot name="image"></slot>
                </figure>
              ` : ``}
              ${this.hasCta ? /* html */`
                <nav>
                  <slot name="cta"></slot>
                </nav>
              ` : ``}
            </div>
          ` : ``}
          <slot></slot>
        </div>
        <slot name="video-description"></slot>
      </section>
    `;
  }
}

customElements.define("tcds-section", Section);
