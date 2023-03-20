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
      if(this.icon.includes("only")) {
        this.setAttribute("aria-label", this.label);
        this.setAttribute("title", this.label);
        this.innerHTML = "";
      } else {
        this.innerHTML = `
          <tcds-icon icon="${this.icon.filter(modifier => !["only", "right"].includes(modifier)).join(" ")}"></tcds-icon>
          ${this.label}
        `;
      }
    }
  }

  get label() {
    return this.getAttribute("label") || this.textContent;
  }

  get icon() {
    return this.getAttribute("icon").trim().replace(/\s\s+/g, " ").split(" ");
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
