/** @type {WeakMap<Element, () => void>} */
const cleanups = new WeakMap();

/**
 * Include the context itself when Drupal attaches or detaches a single card.
 * @param {ParentNode} context
 * @returns {Element[]}
 */
function getCards(context) {
  const cards = [...context.querySelectorAll(".tcds-resource-card")];
  if (context instanceof Element && context.matches(".tcds-resource-card")) cards.unshift(context);
  return cards;
}

/**
 * Keep each card's final link word and caret together when the label wraps.
 * Repeated calls are safe, including during Drupal AJAX behavior attachment.
 * Existing text and icon nodes are preserved, along with their event listeners.
 *
 * @param {ParentNode} [context=document] - Document, fragment, or element to initialize.
 * @returns {void}
 */
export function initCardResource(context = document) {
  for (const card of getCards(context)) {
    if (cleanups.has(card)) continue;
    const label = card.querySelector(":scope > a > span");
    if (!label) continue;
    const nodes = [...label.childNodes];
    const lastText = /** @type {Text|undefined} */ (nodes.findLast(
      (node) => node.nodeType === Node.TEXT_NODE && (node.textContent ?? "").trim() !== "",
    ));
    if (!lastText) continue;
    const match = lastText.data.match(/\S+\s*$/);
    if (!match) continue;

    const wrapper = document.createElement("span");
    wrapper.className = "white-space-nowrap";
    const word = lastText.splitText(lastText.data.length - match[0].length);
    word.before(wrapper);
    wrapper.append(word, ...nodes.slice(nodes.indexOf(lastText) + 1));

    cleanups.set(card, () => {
      // Do not overwrite a label replaced by a later render.
      if (wrapper.parentNode !== label) return;
      wrapper.replaceWith(...wrapper.childNodes);
      if (lastText.parentNode === label && lastText.nextSibling === word) {
        lastText.appendData(word.data);
        word.remove();
      }
    });
  }
}

/**
 * Undo the word/caret grouping before a card is removed, allowing reattachment.
 * @param {ParentNode} [context=document] - Document, fragment, or element to clean up.
 * @returns {void}
 */
export function destroyCardResource(context = document) {
  for (const card of getCards(context)) {
    cleanups.get(card)?.();
    cleanups.delete(card);
  }
}
