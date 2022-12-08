import WebComponent from "../../scripts/WebComponent/WebComponent.js";
import shadowStyles from "./style.css";
import lightStyles from "./style.light.css";

export default class Section extends WebComponent(HTMLElement) {
  connected() {
    this.shadowRoot.adoptedStyleSheets = [shadowStyles];
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, ...[lightStyles]];

    this.background = !!this.querySelector("[slot=background]");
    this.video = !!this.querySelector("video[slot=background]");
    this.heading = !!this.querySelector("[slot=heading]");
    this.subheading = !!this.querySelector("[slot=subheading]");
    this.image = !!this.querySelector("[slot=image]");
    this.cta = !!this.querySelector("[slot=cta]");

    if(this.background) {
      this.setAttribute("has-background", this.video ? "video" : "");

      if(this.getAttribute("data-theme") !== "light") {
        this.setAttribute("data-theme", "dark");
      }
    }

    if(this.image) {
      this.setAttribute("has-image", "");
    }
  }

  render() {
    return /* html */`
      <section>
        <slot name="background"></slot>
        <div class="max-width">
          ${this.heading || this.subheading || this.image || this.cta ? /* html */`
            <div part="content">
              ${this.heading || this.subheading ? /* html */`
                <hgroup>
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
      </section>
    `;
  }
}

customElements.define("tcds-section", Section);
