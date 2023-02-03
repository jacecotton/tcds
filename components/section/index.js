import WebComponent from "../../scripts/WebComponent/WebComponent.js";
import shadowStyles from "./style.css";
import lightStyles from "./style.light.css";

export default class Section extends WebComponent(HTMLElement) {
  connectedCallback() {
    this.shadowRoot.adoptedStyleSheets = [shadowStyles];
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, ...[lightStyles]];

    this.background = !!this.querySelector("[slot=background]");
    this.videoBackground = !!this.querySelector("video[slot=background]");
    this.video = !!this.querySelector("[slot=video]");
    this.videoDescription = !!this.querySelector("[slot=video-description]");
    this.heading = !!this.querySelector("[slot=heading]");
    this.subheading = !!this.querySelector("[slot=subheading]");
    this.overline = !!this.querySelector("[slot=overline]");
    this.image = !!this.querySelector("[slot=image]");
    this.cta = !!this.querySelector("[slot=cta]");

    if(this.background) {
      this.setAttribute("has-background", this.videoBackground ? "video" : "");

      if(this.getAttribute("data-theme") !== "light") {
        this.setAttribute("data-theme", "dark");
      }
    }

    if(this.image) {
      this.setAttribute("has-image", "");
    }

    if(this.video) {
      this.setAttribute("has-video", "");

      const sectionsWithVideo = Array.from(document.querySelectorAll("tcds-section")).filter(section => section.video);
      this.index = sectionsWithVideo.indexOf(this) + 1;

      this.insertAdjacentHTML("beforeend", /* html */`
        <tcds-button icon="only play" size="large" aria-controls="video-modal-${this.index}">Open video player</tcds-button>
      `);
    }
  }

  mountedCallback() {
    if(this.video) {
      const dialog = document.createElement("tcds-dialog");
      dialog.id = `video-modal-${this.index}`;
      dialog.style.setProperty("--tcds-dialog-padding", "0");

      const video = this.querySelector("[slot=video]");
      video.removeAttribute("slot");
      dialog.appendChild(video);

      document.body.appendChild(dialog);

      const button = this.querySelector(`[aria-controls=video-modal-${this.index}]`);

      button.addEventListener("click", () => {
        dialog.open();
      });
    }
  }

  render() {
    return /* html */`
      <section>
        <slot name="background"></slot>
        <div class="max-width">
          ${this.heading || this.subheading || this.overline || this.image || this.cta ? /* html */`
            <div part="content">
              ${this.heading || this.subheading || this.overline ? /* html */`
                <hgroup>
                  <slot name="overline"></slot>
                  <slot name="heading"></slot>
                  <slot name="subheading"></slot>
                </hgroup>
              ` : ``}
              ${this.image ? /* html */`
                <figure>
                  <slot name="image"></slot>
                </figure>
              ` : ``}
              ${this.cta ? /* html */`
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
