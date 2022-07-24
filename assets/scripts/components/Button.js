import WebComponent from "@tcds/WebComponent/WebComponent.js";

window.__TCDS_ICON_CACHE = {};

export default class Button extends WebComponent {
  static get observedAttributes() {
    return ["icon", "label", "modifiers", "link", "type", "controls"];
  }

  constructor() {
    super();

    this.link = false;
    this.controls = false;
    this.modifiers = false;
    this.iconModifiers = false;
    this.state.icon = false;
    this.state.label = this.textContent;
  }

  render() {
    return `
      <${this.link ? "a" : "button"}
        part="button"
        ${this.link ? `
          href="${this.link}"
        ` : `
          type="${this.type ? this.type : "button"}"
          ${this.controls ? `
            aria-controls="${this.controls}"
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
      </${this.link ? "a" : "button"}>
    `;
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    switch(attribute) {
      case "icon":
        this.iconModifiers = newValue.split(" ").filter(modifier => ["only", "right", "inline"].includes(modifier));
        this.iconToken = newValue.replace(/only|(?<!-)right|inline/gi, "").trim();

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

        break;
      case "label":
        this.state.label = newValue;
        break;
      case "modifiers":
        this.modifiers = newValue.split(" ");
        break;
      case "link":
        this.link = newValue;
        break;
      case "type":
        this.type = newValue;
        break;
      case "controls":
        this.controls = newValue;
        break;
    }
  }
}

customElements.define("tcds-button", Button);
