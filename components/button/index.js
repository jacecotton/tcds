/**
 * We're setting up the button component like a customized built-in, even though
 * this script (as of v1) does not actually add any features to either the
 * `button` or `a` elements.
 *
 * This is primarily for future-proofness (extra features may be added in future
 * releases, and component instances should be set up to automatically take
 * advantage of them when they become available), as well as for consistency
 * with other components and scoping/identification purposes (`is` attribute
 * instead of a `class`, etc.)
 */

const Button = BaseElement => class extends BaseElement {
  /* Hypothetical features shared between UI and link buttons could go here. */
};

class UIButton extends Button(HTMLButtonElement) {
  /* Features unique to UI buttons would go here. */
}

class LinkButton extends Button(HTMLAnchorElement) {
  /* Features unique to link buttons would go here. */
}

customElements.define("tcds-ui-button", UIButton, {extends: "button"});
customElements.define("tcds-link-button", LinkButton, {extends: "a"});

export {UIButton, LinkButton};
