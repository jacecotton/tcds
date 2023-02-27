const focusableSelectors = [
  `a[href]:not([tabindex^="-"])`,
  `area[href]:not([tabindex^="-"])`,
  `input:not([type="hidden"]):not([type="radio"]):not([disabled]):not([tabindex^="-"])`,
  `input[type="radio"]:not([disabled]):not([tabindex^="-"]):checked`,
  `select:not([disabled]):not([tabindex^="-"])`,
  `textarea:not([disabled]):not([tabindex^="-"])`,
  `button:not([disabled]):not([tabindex^="-"])`,
  `tcds-button:not([tabindex^="-"])`,
  `iframe:not([tabindex^="-"])`,
  `audio[controls]:not([tabindex^="-"])`,
  `video[controls]:not([tabindex^="-"])`,
  `[contenteditable]:not([tabindex^="-"])`,
  `[tabindex]:not([tabindex^="-"]):not(tcds-focus-boundary)`,
];

function getFocusableChildren(root) {
  const elements = [...root.querySelectorAll(focusableSelectors.join(","))];
  return elements.filter(element => element.offsetWidth || element.offsetHeight || element.getClientRects().length);
}

export default class FocusBoundary extends HTMLElement {
  constructor() {
    super();

    this.sibling = Array.from(this.parentElement.querySelectorAll("tcds-focus-boundary"))
      .filter(boundary => boundary !== this)[0];
  }

  focusFirstOf(node) {
    const firstFocusableChild = getFocusableChildren(node)[0] || this.sibling;
    firstFocusableChild.focus();
  }

  focusLastOf(node) {
    const lastFocusableChild = getFocusableChildren(node)[getFocusableChildren(node).length - 1] || this.sibling;
    lastFocusableChild.focus();
  }
}

customElements.define("tcds-focus-boundary", FocusBoundary);
