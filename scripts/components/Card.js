import WebComponent from "../WebComponent/WebComponent.js";

export default class Card extends WebComponent(HTMLElement) {
  static get observedAttributes() {
    return ["no-image"];
  }

  static state = {
    "no-image": "boolean",
  }

  connected() {
    if(!this.querySelector("[slot=image]")) {
      this.state["no-image"] = true;
    }

    if(!this.props.orientation && this.state["no-image"] !== true) {
      const resize = new ResizeObserver(() => {
        if(this.parentElement.getBoundingClientRect().width > 600) {
          this.setAttribute("orientation", "horizontal");
        } else {
          this.setAttribute("orientation", "vertical");
        }
      });

      resize.observe(document.body);
    }
  }

  render() {
    return /* html */`
      <article part="card">
        <slot name="tag"></slot>
        ${this.state["no-image"] !== true ? /* html */`
          <figure>
            <slot name="image"></slot>
          </figure>
        ` : ``}
        <div part="content">
          <slot name="title"></slot>
          <slot name="description"></slot>
          <slot name="footer">
            ${this.props["action-label"] !== "" ? /* html */`
              <footer part="footer">
                <tcds-button variant="ghost" ${this.props.size !== "large" ? `size="small"` : ""} icon="right chevron-right">${this.props["action-label"] || "Read more"}</tcds-button>
              </footer>
            ` : ``}
          </slot>
        </div>
      </article>
    `;
  }

  static get styles() {
    return {
      shadow: () => /* css */`
        :host {
          display: block;
          width: 100%;
          height: 100%;
        }

        [part="card"] {
          display: grid;
          grid-template-areas: "content";
          position: relative;
          background-color: #fff;
          width: 100%;
          height: 100%;
          box-shadow: 0 0 0.625rem 0 rgb(82, 82, 82, .16);
          border-radius: 10px;
          overflow: hidden;
        }

        :host([orientation="vertical"]:not([no-image])) [part="card"] {
          grid-template-areas:
            "image"
            "content";
          grid-template-rows: auto 1fr;
        }

        :host([orientation="horizontal"]:not([no-image])) [part="card"] {
          grid-template-columns: var(--tcds-card-image-width, minmax(220px, 1fr)) 3fr;
          grid-template-rows: 1fr;
          grid-template-areas: "image content";
        }

        :host([size*="small"]) {
          --tcds-card-image-width: minmax(auto, 220px);
          --tcds-card-content-padding: var(--tcds-space-loose);
          --tcds-card-title-font-size: var(--tcds-font-size-medium-plus);
          --tcds-card-description-font-size: var(--tcds-font-size-small);
        }

        :host([size*="large"]) {
          --tcds-card-title-font-size: var(--tcds-font-size-x-large);
          --tcds-card-description-font-size: var(--tcds-font-size-medium-plus);
        }

        :host([divider]:not([orientation*="horizontal"])) {
          --tcds-card-content-divider: var(--tcds-space-tight) solid var(--tcds-color-primary);
        }

        :host([image*="contain"]) {
          --tcds-card-image-fit: contain;
        }

        :host([image*="half"]) {
          --tcds-card-image-width: 3fr;
        }

        figure {
          grid-area: image;
          overflow: hidden;
        }

        [part="content"] {
          grid-area: content;
          display: flex;
          flex-direction: column;
          color: var(--tcds-color-gray);
          border-top: var(--tcds-card-content-divider, none);
          padding:
            var(--tcds-card-content-padding-y, var(--tcds-card-content-padding, var(--tcds-space-x-loose)))
            var(--tcds-card-content-padding-x, var(--tcds-card-content-padding, var(--tcds-space-x-loose)));
        }

        ::slotted(img) {
          transition: transform var(--tcds-animation-expressive-duration) var(--tcds-animation-expressive-easing);
        }

        :host(:hover) ::slotted(img) {
          transform: scale(1.05);
        }
      `,

      light: () => /* css */`
        tcds-card [slot="tag"] {
          position: absolute;
          top: 0;
          right: var(--tcds-space-loose);
          background-color: #f3f3f3;
          text-transform: uppercase;
          font-family: var(--tcds-font-ui);
          font-size: var(--tcds-font-size-small);
          color: var(--tcds-color-gray);
          border-bottom-right-radius: 8px;
          border-bottom-left-radius: 8px;
          padding: var(--tcds-space-x-tight) var(--tcds-space-normal);
        }

        tcds-card [slot="image"] {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: var(--tcds-card-image-fit, cover);
          object-position: center;
        }

        tcds-card [slot="title"] {
          font-family: var(--tcds-font-copy);
          font-weight: var(--tcds-font-weight-semibold);
          font-size: var(--tcds-card-title-font-size, var(--tcds-font-size-large));
          line-height: var(--tcds-line-height-tight);
          color: var(--tcds-color-secondary);
          margin-bottom: var(--tcds-space-tight);
          text-decoration: none;
        }

        tcds-card [slot="title"]:focus {
          outline: none;
        }

        tcds-card [slot="title"][href]::before {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }

        tcds-card [slot="description"],
        tcds-card [slot="description"] p {
          font-size: var(--tcds-card-description-font-size, var(--tcds-font-size-medium));
          line-height: 1.5;
          color: var(--tcds-color-gray-dark);
          margin-bottom: var(--tcds-space-normal);
        }

        tcds-card [slot="footer"],
        tcds-card::part(footer) {
          display: flex;
          gap: var(--tcds-space-normal);
          margin-top: auto;
        }

        tcds-card [slot="footer"] a,
        tcds-card::part(footer) a {
          text-decoration: none;
        }

        tcds-card [slot="description"] a,
        tcds-card [slot="footer"] a {
          position: relative;
          margin: -0.5em;
          padding: 0.5em;
        }
      `,
    };
  }
}

customElements.define("tcds-card", Card);