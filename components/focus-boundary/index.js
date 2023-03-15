import lightStyles from "./style.light.css";

const focusableSelectors = [
  `a[href]:not([tabindex^="-"])`,
  `area[href]:not([tabindex^="-"])`,
  `input:not([type="hidden"]):not([type="radio"]):not([disabled]):not([tabindex^="-"])`,
  `input[type="radio"]:not([disabled]):not([tabindex^="-"]):checked`,
  `select:not([disabled]):not([tabindex^="-"])`,
  `textarea:not([disabled]):not([tabindex^="-"])`,
  `button:not([disabled]):not([tabindex^="-"])`,
  `iframe:not([tabindex^="-"])`,
  `audio[controls]:not([tabindex^="-"])`,
  `video[controls]:not([tabindex^="-"])`,
  `[contenteditable]:not([tabindex^="-"])`,
  `[tabindex]:not([tabindex^="-"]):not(focus-boundary)`,
];

function getFocusableChildren(root) {
  return [...root.querySelectorAll(focusableSelectors.join(","))];
}

export default class FocusBoundary extends HTMLElement {
  constructor() {
    super();
    this.getRootNode().adoptedStyleSheets = [...this.getRootNode().adoptedStyleSheets, ...[lightStyles]];
  }

  connectedCallback() {
    const boundaries = Array.from(this.parentElement.querySelectorAll("focus-boundary"));
    const focusableChildren = [
      ...getFocusableChildren(this.parentElement),
      ...getFocusableChildren(this.getRootNode().host),
    ];

    this.tabIndex = 0;

    this.onfocus = () => {
      if(boundaries.indexOf(this) === 0) {
        focusableChildren[focusableChildren.length - 1].focus();
      } else if(boundaries.indexOf(this) === boundaries.length - 1) {
        focusableChildren[0].focus();
      }
    };
  }
}

customElements.define("focus-boundary", FocusBoundary);
