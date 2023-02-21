import getFocusableChildren from "./getFocusableChildren.js";

export default class FocusBoundary extends HTMLElement {
  constructor() {
    super();
  }

  focusFirstOf(node) {
    getFocusableChildren(node)[0].focus();
  }

  focusLastOf(node) {
    getFocusableChildren(node)[getFocusableChildren(node).length - 1].focus();
  }
}

customElements.define("tcds-focus-boundary", FocusBoundary);
