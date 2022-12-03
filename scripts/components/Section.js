import WebComponent from "../WebComponent/WebComponent.js";

export default class Section extends WebComponent(HTMLElement) {
  connected() {
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

  static get styles() {
    return {
      shadow: () => /* css */`
        :host {
          --tcds-section-vertical-padding: 7rem;
          --tcds-section-watermark-size: min(768px, 110vw);
          --tcds-section-watermark-y-offset: 25%;
          --tcds-section-watermark-color: var(--tcds-color-shade-x-weak);
          --tcds-section-heading-color: var(--tcds-color-primary);
          --tcds-section-text-align: left;

          display: block;
          position: relative;
          overflow: hidden;
          z-index: 1;
        }

        :host([watermark*="large"]) {
          --tcds-section-watermark-size: 127vw;
          --tcds-section-watermark-y-offset: 50%;
        }

        :host([data-theme="dark"]) {
          --tcds-section-heading-color: #fff;
        }

        :host([data-theme="light"].bg-secondary) {
          --tcds-section-watermark-color: var(--tcds-color-blue-light);
        }

        :host([data-theme="light"].bg-primary) {
          --tcds-section-watermark-color: var(--tcds-color-red-light);
        }

        :host([has-background]) {
          --tcds-section-aspect-ratio: 4 / 3;
        }

        @media (min-width: 768px) {
          :host([has-background]) {
            --tcds-section-aspect-ratio: 16 / 9;
          }

          :host([has-background="video"]) {
            --tcds-section-aspect-ratio: 4 / 3;
          }
        }

        @media (min-width: 1200px) {
          :host([has-background]) {
            --tcds-section-aspect-ratio: 16 / 5;
          }

          :host([has-background="video"]) {
            --tcds-section-aspect-ratio: 16 / 9;
          }
        }

        @media (min-width: 1920px) {
          :host([has-background="video"]) {
            --tcds-section-aspect-ratio: 16 / 5;
          }
        }

        :host([class*="bg-"]:not([watermark="none"]))::before {
          display: block;
          content: "";
          width: var(--tcds-section-watermark-size);
          height: var(--tcds-section-watermark-size);
          position: absolute;
          bottom: 0;
          right: 0;
          transform: translate(25%, var(--tcds-section-watermark-y-offset));
          color: inherit;
          background: var(--tcds-section-watermark-color);
          -webkit-mask: var(--tcds-icon-texas-childrens);
          mask: var(--tcds-icon-texas-childrens);
          -webkit-mask-position: 50% 50%;
          mask-position: 50% 50%;
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-size: contain;
          mask-size: contain;
          z-index: -1;
        }

        section {
          display: flex;
          align-items: var(--tcds-section-vertical-align, center);
          aspect-ratio: var(--tcds-section-aspect-ratio);
          padding: var(--tcds-section-vertical-padding) 0;
        }

        section::before {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 0;
        }

        :host([overlay*="darken"]) section::before {
          background-color: rgba(30, 35, 40, var(--tcds-section-overlay-opacity, 60%));
        }

        :host([overlay*="desaturate"]) section::before {
          backdrop-filter: saturate(0);
        }

        :host([overlay*="bottom-gradient"]) section::after {
          content: "";
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 0;
          height: 50%;
          background-image: linear-gradient(to top, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, 0) 100%);
        }

        .max-width {
          z-index: 1;
        }

        [part="content"] {
          display: grid;
          align-items: center;
          gap: var(--tcds-space-normal) 3vw;
          grid-template-columns: 1fr;
          grid-template-areas:
            "image"
            "text"
            "cta";
        }

        @media (max-width: 768px) {
          :host {
            --tcds-section-text-align: center;
          }

          [part="content"] {
            gap: var(--tcds-space-normal);
          }
        }

        @media (min-width: 768px) {
          :host([has-image]) [part="content"] {
            grid-template-columns: repeat(2, 1fr);
            grid-template-areas:
              "text image"
              "cta  cta";
          }
        }

        hgroup {
          grid-area: text;
          display: flex;
          flex-direction: column;
          gap: var(--tcds-space-x-loose);
          text-align: var(--tcds-section-text-align);
        }

        figure {
          grid-area: image;
          position: relative;
        }

        @media (max-width: 768px) {
          figure {
            margin:
              calc(var(--tcds-section-vertical-padding) * -1)
              calc(var(--site-outer-gutter) * -1)
              3rem;
          }
        }

        nav {
          grid-area: cta;
          display: flex;
          gap: var(--tcds-space-x-loose);
        }

        @media (max-width: 768px) {
          nav {
            justify-content: center;
          }
        }

        ::slotted(h1),
        ::slotted(h2) {
          color: var(--tcds-section-heading-color);
          line-height: var(--tcds-line-height-x-tight) !important;
          margin: 0 !important;
        }
        
        ::slotted(h1) {
          font-size: var(--tcds-font-size-xxx-large) !important;
          font-weight: 400 !important;
        }

        ::slotted(h2) {
          font-size: calc(3.5rem * var(--tcds-font-size-scaler)) !important;
        }
      `,

      light: () => /* css */`
        tcds-section [slot="background"],
        tcds-section [slot="background"] img,
        tcds-section img[slot="background"],
        tcds-section video[slot="background"] {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
        }

        tcds-section [slot="background"] img,
        tcds-section img[slot="background"],
        tcds-section video[slot="background"] {
          object-fit: cover;
          object-position: center;
        }

        tcds-section [slot="heading"] span {
          display: block;
          font-family: var(--tcds-font-ui);
          font-size: var(--tcds-font-size-xx-large);
          font-weight: var(--tcds-font-weight-semibold);
        }

        tcds-section [slot="heading"] sup {
          font-size: 10%;
          letter-spacing: .05em;
          position: relative;
          left: 1em;
          top: -1em;
        }

        tcds-section [slot="subheading"] {
          font-size: var(--tcds-font-size-large) !important;
        }

        @media (min-width: 768px) {
          tcds-section [slot="image"] {
            width: 115%;
            max-width: none;
            position: absolute;
            transform: translateY(-50%);
          }
        }
      `,
    };
  }
}

customElements.define("tcds-section", Section);