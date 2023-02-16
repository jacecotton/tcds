/**
 * This isn't necessarily comprehensive, rather just a blacklist of attributes
 * we don't want being registered as props.
 */

const globalAttributesFull = [
  "accesskey", "autocapitalize", "autofocus", "class", "contenteditable",
  "dir", "disabled", "draggable", "hidden", "href", "id", "inert", "is", "lang",
  "name", "onblur", "onfocus", "onclick", "onchange", "ondrop", "onerror",
  "onload", "onscroll", "onselect", "onsubmit", "onwheel", "part", "role",
  "slot", "spellcheck", "src", "style", "tabindex", "title", "translate",
];

const globalAttributesPartial = [
  "aria-", "data-", "onmouse", "onpointer", "ondrag", "onkey"
];

export { globalAttributesFull, globalAttributesPartial };
