class UIButton extends HTMLButtonElement {}
class LinkButton extends HTMLAnchorElement {}

customElements.define("tcds-ui-button", UIButton, {extends: "button"});
customElements.define("tcds-link-button", LinkButton, {extends: "a"});

export {UIButton, LinkButton};
