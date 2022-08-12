import WebComponent from "@tcds/WebComponent/WebComponent.js";

/**
 * @todo Move icon cache to localStorage. The current "cache" isn't really a
 * cache because it's not persistent across different instances and page loads.
 * Moving to localStorage is better as it acts like a genuine cache, allowing
 * for icon reuse across different component instances, page loads, and renders.
 * It also prevents scope pollution better than the doublescored prefix.
 * @todo Figure out a better way to fetch icons. UNPKG isn't intended for
 * production. Preferably pull from local copy somehow. Also create <tcds-icon>
 * component to handle fetching, caching, etc.
 */
window.__TCDS_ICON_CACHE = {};

customElements.define("tcds-button", class Button extends WebComponent {
  static get styles() {
    return `
      :host {
        display: inline-flex;
      }

      /**
       * 1. Needed for Safari.
       */
      [part="button"] {
        --tcds-button-height: 40px;

        appearance: none;
        border: 0; /* 1 */
        margin: 0; /* 1 */
        background-color: #da2530;
        color: #fff6f6;
        display: inline-flex;
        align-items: center;
        font-size: 1rem;
        font-weight: 600;
        font-family: "Inter", system-ui, sans-serif;
        line-height: 1;
        white-space: nowrap;
        overflow: hidden;
        position: relative;
        text-decoration: none;
        cursor: pointer;
        transform: scale(var(--tcds-button-scale, 1)) translate(var(--button-translate, 0, 0));
        transition: transform .15s ease-in;
        user-select: none;
        z-index: 1;
        height: var(--tcds-button-height);
        padding: 0 1rem;
      }

      /** States */

      [part="button"]:hover {
        --tcds-button-overlay: rgba(0, 0, 0, .1);
      }

      [part="button"]:active {
        --tcds-button-overlay: rgba(0, 0, 0, .3);
        --tcds-button-scale: 0.99;
      }

      /** Modifiers */

      @media (pointer: fine) {
        :host([size*="small"]) [part="button"] {
          --tcds-button-height: 32px;

          font-size: .875rem;
        }
      }

      :host([size*="large"]) [part="button"] {
        --tcds-button-height: 48px;

        font-size: 1.25rem;
      }

      :host([size*="full-width"]),
      :host([size*="full-width"]) [part="button"] {
        display: flex;
        justify-content: center;
        width: 100%;
      }

      :host([round]) [part="button"] {
        border-radius: var(--tcds-button-height);
      }

      :host([color*="reverse"]) [part="button"] {
        background-color: #fff;
        color: #da2530;
      }

      :host([color*="secondary"]) [part="button"] {
        background-color: #2d73bc;
        color: #f5f8ff;
      }

      :host([color*="tertiary"]) [part="button"] {
        background-color: #707079;
        color: #f8f8f9;
      }

      :host([color*="ghost"]) [part="button"] {
        background-color: transparent;
        color: inherit;

        --tcds-button-icon-background: transparent;
      }

      :host([icon~="right"]) [part="button"] {
        flex-direction: row-reverse;

        --tcds-button-icon-margin: 0 -1rem 0 1rem;
      }

      :host([icon~="right"][color*="ghost"]) [part="button"] {
        --tcds-button-icon-margin: 0 -1rem 0 0;
      }

      :host(:not([icon~="right"]):not([icon~="only"])[color*="ghost"] [part="button"]) {
        --tcds-button-icon-margin: 0 0 0 -1rem;
      }

      :host([icon~="only"]) [part="button"] {
        padding: 0;

        --tcds-button-icon-background: transparent;
        --tcds-button-icon-margin: 0;
      }

      :host([icon~="inline"]:not([icon~="only"])) [part="button"] {
        --tcds-button-icon-background: transparent;
        --tcds-button-icon-height: 1em;
        --tcds-button-icon-padding: 0;
      }

      :host([icon~="inline"]:not([icon~="only"]):not([icon~="right"])) [part="button"] {
        --tcds-button-icon-margin: 0 0.5em 0 0;
      }

      :host([icon~="inline"][icon~="right"]:not([icon~="only"])) [part="button"] {
        --tcds-button-icon-margin: 0 0 0 0.5em;
      }

      /** Children */

      [part="button"]::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
        background-color: var(--tcds-button-overlay, transparent);
        transition: background-color .15s ease-in;
      }

      [part="icon"] {
        box-sizing: border-box;
        height: var(--tcds-button-icon-height, 100%);
        margin: var(--tcds-button-icon-margin, 0 1rem 0 -1rem);
        padding: var(--tcds-button-icon-padding, 0.5rem);
        background: var(--tcds-button-icon-background, rgba(0, 0, 0, .1));
      }
    `;
  }

  render() {
    return `
      <${this.props.link ? "a" : "button"}
        part="button"
        ${this.props.link ? `
          href="${this.props.link}"
        ` : `
          type="${this.props.type || "button"}"
          ${this.props.controls ? `aria-controls="${this.props.controls}"` : ""}
        `}
        ${this.state.iconOnly ? `
          aria-label="${this.textContent || this.props.label}"
          title="${this.textContent || this.props.label}"
        ` : ""}
      >
        ${this.state.iconSVG ? this.state.iconSVG : ""}
        ${!this.state.iconOnly ? this.textContent || this.props.label : ""}
      </${this.props.link ? "a" : "button"}>
    `;
  }

  mounted() {
    if(this.props.icon) {
      this.fetchIcon();
    }
  }

  updated() {
    return {
      props: {
        "icon": () => {
          this.fetchIcon();
        },
      },
    };
  }

  fetchIcon() {
    this.state.iconOnly = this.props.icon.trim().replace(/\s\s+/g, " ").split(" ").includes("only");

    const iconToken = this.props.icon.trim().replace(/\s\s+/g, " ").split(" ").filter(word => !["only", "inline", "right"].includes(word)).join(" ");

    if(!(iconToken in window.__TCDS_ICON_CACHE)) {
      fetch(`https://unpkg.com/@txch/tcds/dist/icons/${iconToken}.svg`)
        .then(response => response.text())
        .then(svg => {
          svg = svg.replace(/<svg/, `<svg part="icon"`);
          window.__TCDS_ICON_CACHE[iconToken] = svg;
          this.state.iconSVG = svg;
        });
    } else {
      this.state.iconSVG = window.__TCDS_ICON_CACHE[iconToken];
    }
  }
});
