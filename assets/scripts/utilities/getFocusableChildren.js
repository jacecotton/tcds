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
  `[tabindex]:not([tabindex^="-"]`,
];

export default function getFocusableChildren(root) {
  const elements = [...root.querySelectorAll(focusableSelectors.join(","))];
  return elements.filter((element) => {
    return element.offsetWidth || element.offsetHeight || element.getClientRects().length;
  });
}
