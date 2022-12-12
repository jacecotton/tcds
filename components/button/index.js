import WebComponent from "../../scripts/WebComponent/WebComponent.js";
import shadowStyles from "./style.css";
import lightStyles from "./style.light.css";

export default class Button extends WebComponent(HTMLElement, { delegatesFocus: true }) {
  static props = {
    "icon": "array",
    "new-tab": "boolean",
  };

  connected() {
    this.shadowRoot.adoptedStyleSheets = [shadowStyles];
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, ...[lightStyles]];
  }

  render() {
    return /* html */`
      <${this.props.link ? "a" : "button"}
        part="button"
        ${this.props.link ? /* html */`
          href="${this.props.link}"
          ${this.props["new-tab"] ? `target="_blank" rel="noopener noreferrer"` : ""}
        ` : /* html */`
          ${this.props.type ? `type="${this.props.type}"` : ""}
          ${this.props.controls ? `aria-controls="${this.props.controls}"` : ""}
          ${this.props.expanded ? `aria-expanded="${this.props.expanded}"` : ""}
        `}
        ${this.props.icon?.includes("only") ? /* html */`
          aria-label="${this.textContent || this.props.label}"
          title="${this.textContent || this.props.label}"
        ` : ``}
      >
        ${this.props.icon ? /* html */`
          <tcds-icon part="icon" icon="${this.props.icon.filter(modifier => !["only", "inline", "right"].includes(modifier)).join(" ")}"></tcds-icon>
        ` : ``}
        ${!this.props.icon?.includes("only") ? /* html */`
          <slot>${this.props.label || ""}</slot>
        ` : ``}
      </${this.props.link ? "a" : "button"}>
    `;
  }
}

customElements.define("tcds-button", Button);
