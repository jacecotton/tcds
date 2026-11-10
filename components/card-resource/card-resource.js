function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: true } : { done: false, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = true, u = false; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = true, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
/** @type {WeakMap<Element, () => void>} */
var cleanups = new WeakMap();

/**
 * Include the context itself when Drupal attaches or detaches a single card.
 * @param {ParentNode} context
 * @returns {Element[]}
 */
function getCards(context) {
  var cards = _toConsumableArray(context.querySelectorAll(".tcds-resource-card"));
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
function initCardResource() {
  var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  var _iterator = _createForOfIteratorHelper(getCards(context)),
    _step;
  try {
    var _loop = function _loop() {
        var card = _step.value;
        if (cleanups.has(card)) return 0; // continue
        var label = card.querySelector(":scope > a > span");
        if (!label) return 0; // continue
        var nodes = _toConsumableArray(label.childNodes);
        var lastText = /** @type {Text|undefined} */nodes.findLast(function (node) {
          var _node$textContent;
          return node.nodeType === Node.TEXT_NODE && ((_node$textContent = node.textContent) !== null && _node$textContent !== void 0 ? _node$textContent : "").trim() !== "";
        });
        if (!lastText) return 0; // continue
        var match = lastText.data.match(/\S+\s*$/);
        if (!match) return 0; // continue
        var wrapper = document.createElement("span");
        wrapper.className = "white-space-nowrap";
        var word = lastText.splitText(lastText.data.length - match[0].length);
        word.before(wrapper);
        wrapper.append.apply(wrapper, [word].concat(_toConsumableArray(nodes.slice(nodes.indexOf(lastText) + 1))));
        cleanups.set(card, function () {
          // Do not overwrite a label replaced by a later render.
          if (wrapper.parentNode !== label) return;
          wrapper.replaceWith.apply(wrapper, _toConsumableArray(wrapper.childNodes));
          if (lastText.parentNode === label && lastText.nextSibling === word) {
            lastText.appendData(word.data);
            word.remove();
          }
        });
      },
      _ret;
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _ret = _loop();
      if (_ret === 0) continue;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

/**
 * Undo the word/caret grouping before a card is removed, allowing reattachment.
 * @param {ParentNode} [context=document] - Document, fragment, or element to clean up.
 * @returns {void}
 */
function destroyCardResource() {
  var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  var _iterator2 = _createForOfIteratorHelper(getCards(context)),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _cleanups$get;
      var card = _step2.value;
      (_cleanups$get = cleanups.get(card)) === null || _cleanups$get === void 0 || _cleanups$get();
      cleanups["delete"](card);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}

export { destroyCardResource, initCardResource };
