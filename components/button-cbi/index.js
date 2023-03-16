import styles from "./style.css";

const Button = BaseElement => class extends BaseElement {
  static get observedAttributes() {
    return ["icon"];
  }

  constructor() {
    super();
    this.getRootNode().adoptedStyleSheets = [...this.getRootNode().adoptedStyleSheets, ...[styles]];
  }

  attributeChangedCallback(name) {
    if(name === "icon" && this.icon) {
      const iconTemplate = `<tcds-icon part="icon" icon="${this.icon.filter(modifier => !["only", "right"].includes(modifier)).join(" ")}"></tcds-icon>`;

      if(!this.icon.includes("only")) {
        this.innerHTML = `${iconTemplate} ${this.label}`;
      } else {
        this.setAttribute("aria-label", this.label);
        this.setAttribute("title", this.label);
        this.innerHTML = iconTemplate;
      }
    }
  }

  get label() {
    return this.getAttribute("label") || this.textContent;
  }

  get icon() {
    return this.hasAttribute("icon")
      && this.getAttribute("icon").trim().replace(/\s\s+/g, " ").split(" ");
  }
};

class UIButton extends Button(HTMLButtonElement) {
  constructor() {
    super();
  }
}

class LinkButton extends Button(HTMLAnchorElement) {
  constructor() {
    super();
  }
}

customElements.define("tcds-ui-button", UIButton, {extends: "button"});
customElements.define("tcds-link-button", LinkButton, {extends: "a"});

export {UIButton, LinkButton};
