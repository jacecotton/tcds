// Even though we're not currently adding any special features here, we're
// setting up the buttons as custom elements for future-proofness and convention
// consistency.

const Button = BaseElement => class extends BaseElement {
  // Features common across button types.
};

class UIButton extends Button(HTMLButtonElement) {
  // Features unique to true buttons.
}

class LinkButton extends Button(HTMLAnchorElement) {
  // Features unique to link buttons.
}

customElements.define("tcds-ui-button", UIButton, {extends: "button"});
customElements.define("tcds-link-button", LinkButton, {extends: "a"});