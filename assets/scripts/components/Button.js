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

export default class Button extends WebComponent {
  constructor() {
    super();
    this.state.iconSVG = false;
  }

  render() {
    return `
      <${this.props.link ? "a" : "button"}
        part="button"
        ${this.props.link ? `
          href="${this.props.link}"
        ` : `
          type="${this.props.type ? this.props.type : "button"}"
          ${this.props.controls ? `
            aria-controls="${this.props.controls}"
          ` : ""}
        `}
        ${this.iconModifiers && this.iconModifiers.includes("only") ? `
          aria-label="${this.props.label}"
          title="${this.props.label}"
        ` : ""}
      >
        ${this.state.iconSVG ? this.state.iconSVG : ""}
        ${this.iconModifiers && this.iconModifiers.includes("only") ? "" : `
          <slot>${this.props.label}</slot>
        `}
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
        icon: () => {
          this.fetchIcon();
        },
      },
    };
  }

  fetchIcon() {
    this.iconModifiers = this.props.icon.split(" ").filter(modifier => ["only", "right", "inline"].includes(modifier));
    this.iconToken = this.props.icon.split(" ").filter(word => !this.iconModifiers.includes(word)).join(" ");

    console.log(`${this.props.label} button`, {
      iconModifiers: this.iconModifiers,
      iconToken: this.iconToken,
    });

    if(!(this.iconToken in window.__TCDS_ICON_CACHE)) {
      fetch(`https://unpkg.com/@txch/tcds/dist/icons/${this.iconToken}.svg`)
        .then(response => response.text())
        .then(svg => {
          svg = svg.replace(/<svg/, `<svg part="icon"`);
          window.__TCDS_ICON_CACHE[this.iconToken] = svg;
          this.state.iconSVG = svg;
        });
    } else {
      this.state.iconSVG = window.__TCDS_ICON_CACHE[this.iconToken];
    }
  }
}

customElements.define("tcds-button", Button);
