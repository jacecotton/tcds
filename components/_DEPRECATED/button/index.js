import WebComponent from "../../../utilities/WebComponent/WebComponent.js";
import shadowStyles from "./style.css";
import lightStyles from "./style.light.css";

export default class Button extends WebComponent(HTMLElement) {
  static observedAttributes = ["icon", "new-tab", "type", "expanded"];

  get icon() {
    return this.hasAttribute("icon") && this.getAttribute("icon").trim().replace(/\s\s+/g, " ").split(" ");
  }

  get link() {
    return this.getAttribute("link");
  }

  get type() {
    return this.getAttribute("type");
  }

  get expanded() {
    return this.getAttribute("aria-expanded");
  }

  set expanded(value) {
    this.setAttribute("aria-expanded", Boolean(value));
  }

  get label() {
    return this.getAttribute("label") || this.textContent;
  }

  constructor() {
    super();
    this.shadowRoot.adoptedStyleSheets = [shadowStyles];
  }

  connectedCallback() {
    console.warn("DEPRECATION WARNING: Autonomous custom element TCDS-BUTTON is DEPRECATED and will be removed in an upcoming release. Please migrate to customized button element TCDS-UI-BUTTON or customized anchor element TCDS-LINK-BUTTON.");

    this.getRootNode().adoptedStyleSheets = [...this.getRootNode().adoptedStyleSheets, ...[lightStyles]];

    this.update();
  }

  attributeChangedCallback() {
    this.update();
  }

  get template() {
    return /* html */`
      <${this.link ? "a" : "button"}
        part="button"
        ${this.link ? /* html */`
          href="${this.link}"
          ${this.hasAttribute("new-tab") ? `target="_blank" rel="noopener noreferrer"` : ""}
        ` : /* html */`
          ${this.type ? `type="${this.type}"` : ""}
          ${this.expanded ? `aria-expanded="${this.expanded}"` : ""}
        `}
        ${this.icon.length && this.icon.includes("only") ? /* html */`
          aria-label="${this.label}"
          title="${this.label}"
        ` : ``}
      >
        ${this.icon ? /* html */`
          <tcds-icon part="icon" icon="${this.icon.filter(modifier => !["only", "right"].includes(modifier)).join(" ")}"></tcds-icon>
        ` : ``}
        ${!(this.icon.length && this.icon.includes("only")) ? /* html */`
          <slot>${this.label}</slot>
        ` : ``}
      </${this.link ? "a" : "button"}>
    `;
  }
}

customElements.define("tcds-button", Button);
