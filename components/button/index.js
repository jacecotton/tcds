import styles from "./style.css";

const Button = BaseElement => class extends BaseElement {
  connectedCallback() {
    this.getRootNode().adoptedStyleSheets = [...this.getRootNode().adoptedStyleSheets, ...[styles]];
  }
};

class UIButton extends Button(HTMLButtonElement) {}
class LinkButton extends Button(HTMLAnchorElement) {}

customElements.define("tcds-ui-button", UIButton, {extends: "button"});
customElements.define("tcds-link-button", LinkButton, {extends: "a"});

export {UIButton, LinkButton};
