/**
 * We're setting up the button component like a customized built-in, even though
 * this script (as of v1) does not actually add any features to either the
 * `HTMLButtonElement` or `HTMLAnchorElement`.
 *
 * This is primarily for future-proofness (extra features may be added in future
 * releases, and component instances should be set up to automatically take
 * advantage of them when they become available), as well as for consistency
 * with other components and scoping/identification purposes (`is` attribute
 * instead of a `class`, etc.)
 */

const Button = BaseElement => class extends BaseElement {};
class UIButton extends Button(HTMLButtonElement) {}
class LinkButton extends Button(HTMLAnchorElement) {}

customElements.define("tcds-ui-button", UIButton, {extends: "button"});
customElements.define("tcds-link-button", LinkButton, {extends: "a"});

export {UIButton, LinkButton};
