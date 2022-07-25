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
  static get observedAttributes() {
    return ["icon", "label"];
  }

  constructor() {
    super();

    this.state.icon = false;
    this.state.label = this.textContent;
  }

  render() {
    return `
      <${this.hasAttribute("link") ? "a" : "button"}
        part="button"
        ${this.hasAttribute("link") ? `
          href="${this.getAttribute("link")}"
        ` : `
          type="${this.hasAttribute("type") ? this.getAttribute("type") : "button"}"
          ${this.hasAttribute("controls") ? `
            aria-controls="${this.getAttribute("controls")}"
          ` : ""}
        `}
        ${this.iconModifiers && this.iconModifiers.includes("only") ? `
          aria-label="${this.state.label}"
          title="${this.state.label}"
        ` : ""}
      >
        ${this.state.icon ? this.state.icon : ""}
        ${this.iconModifiers && this.iconModifiers.includes("only") ? "" : `
          <slot>${this.state.label}</slot>
        `}
      </${this.hasAttribute("link") ? "a" : "button"}>
    `;
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    switch(attribute) {
      case "icon":
        this.fetchIcon();
        break;

      case "label":
        this.state.label = newValue;
        break;
    }
  }

  fetchIcon() {
    this.iconModifiers = this.getAttribute("icon").split(" ").filter(modifier => ["only", "right", "inline"].includes(modifier));
    this.iconToken = this.getAttribute("icon").replace(/only|(?<!-)right|inline/gi, "").trim();

    if(!(this.iconToken in window.__TCDS_ICON_CACHE)) {
      fetch(`https://unpkg.com/@txch/tcds/dist/icons/${this.iconToken}.svg`)
        .then(response => response.text())
        .then(svg => {
          svg = svg.replace(/<svg/, `<svg part="icon"`);
          window.__TCDS_ICON_CACHE[this.iconToken] = svg;
          this.state.icon = svg;
        });
    } else {
      this.state.icon = window.__TCDS_ICON_CACHE[this.iconToken];
    }
  }
}

customElements.define("tcds-button", Button);
