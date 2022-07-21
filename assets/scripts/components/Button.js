import WebComponent from "./WebComponent/WebComponent.js";
// import store from "./WebComponent/store.js";

export default class Button extends WebComponent {
  constructor() {
    super();

    this.props = {
      modifiers: this.hasAttribute("modifiers") ? this.getAttribute("modifiers").split(" ") : [],
      icon: this.hasAttribute("icon") && this.getAttribute("icon"),
      link: this.hasAttribute("link") && this.getAttribute("link"),
      type: this.hasAttribute("type") && this.getAttribute("type"),
      controls: this.hasAttribute("controls") && this.getAttribute("controls"),
    };

    const stylesheet = document.createElement("link");
    stylesheet.setAttribute("rel", "stylesheet");
    stylesheet.setAttribute("href", "/styles/main.css");
    this.append(stylesheet);
  }

  render() {
    return `
      <${this.props.link ? `a` : "button"}
        part="button"
        ${this.props.link ? `
          href="${this.props.link}"
        ` : `
          type="${this.props.type ? this.props.type : "button"}"
          ${this.props.controls ? `
            aria-controls="${this.props.controls}"
          ` : ""}
        `}
        ${this.props.modifiers.includes("icon-only") ? `
          aria-label="${this.textContent}"
          title="${this.textContent}"
        ` : ""}
      >
        ${this.props.icon ? `<tcds-icon icon="${this.props.icon}"></tcds-icon>` : ""}
        ${this.props.modifiers.includes("icon-only") ? "" : "<slot></slot>"}
      </${this.props.link ? "a" : "button"}>
    `;
  }

  mounted() {
  }

  updated() {

  }
}

customElements.define("tcds-button", Button);
