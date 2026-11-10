import { a as i, n, t, u } from '../../dist/js/vendor.CyjMR3IY.js';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _Breadcrumb2, _templateObject;
var _initClass, _init_expanded, _init_extra_expanded, _init_noCollapse, _init_extra_noCollapse, _init_expandLabel, _init_extra_expandLabel;
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: true } : { done: false, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = true, u = false; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = true, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = true, o = false; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = true, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", { writable: false }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(t.prototype ), o, e); return "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: true, configurable: true } }), Object.defineProperty(t, "prototype", { writable: false }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
function _applyDecs(e, t, n, r, o, i) { var a, c, u, s, f, l, p, d = Symbol.metadata || Symbol["for"]("Symbol.metadata"), m = Object.defineProperty, h = Object.create, y = [h(null), h(null)], v = t.length; function g(t, n, r) { return function (o, i) { n && (i = o, o = e); for (var a = 0; a < t.length; a++) i = t[a].apply(o, r ? [i] : []); return r ? i : o; }; } function b(e, t, n, r) { if ("function" != typeof e && (r || void 0 !== e)) throw new TypeError(t + " must " + (n || "be") + " a function" + (r ? "" : " or undefined")); return e; } function applyDec(e, t, n, r, o, i, u, s, f, l, p) { function d(e) { if (!p(e)) throw new TypeError("Attempted to access private element on non-instance"); } var h = [].concat(t[0]), v = t[3], w = !u, D = 1 === o, S = 3 === o, j = 4 === o, E = 2 === o; function I(t, n, r) { return function (o, i) { return n && (i = o, o = e), r && r(o), P[t].call(o, i); }; } if (!w) { var P = {}, k = [], F = S ? "get" : j || D ? "set" : "value"; if (f ? (l || D ? P = { get: _setFunctionName(function () { return v(this); }, r, "get"), set: function set(e) { t[4](this, e); } } : P[F] = v, l || _setFunctionName(P[F], r, E ? "" : F)) : l || (P = Object.getOwnPropertyDescriptor(e, r)), !l && !f) { if ((c = y[+s][r]) && 7 !== (c ^ o)) throw Error("Decorating two elements with the same name (" + P[F].name + ") is not supported yet"); y[+s][r] = o < 3 ? 1 : o; } } for (var N = e, O = h.length - 1; O >= 0; O -= n ? 2 : 1) { var T = b(h[O], "A decorator", "be", true), z = n ? h[O - 1] : void 0, A = {}, H = { kind: ["field", "accessor", "method", "getter", "setter", "class"][o], name: r, metadata: a, addInitializer: function (e, t) { if (e.v) throw new TypeError("attempted to call addInitializer after decoration was finished"); b(t, "An initializer", "be", true), i.push(t); }.bind(null, A) }; if (w) c = T.call(z, N, H), A.v = 1, b(c, "class decorators", "return") && (N = c);else if (H["static"] = s, H["private"] = f, c = H.access = { has: f ? p.bind() : function (e) { return r in e; } }, j || (c.get = f ? E ? function (e) { return d(e), P.value; } : I("get", 0, d) : function (e) { return e[r]; }), E || S || (c.set = f ? I("set", 0, d) : function (e, t) { e[r] = t; }), N = T.call(z, D ? { get: P.get, set: P.set } : P[F], H), A.v = 1, D) { if ("object" == _typeof(N) && N) (c = b(N.get, "accessor.get")) && (P.get = c), (c = b(N.set, "accessor.set")) && (P.set = c), (c = b(N.init, "accessor.init")) && k.unshift(c);else if (void 0 !== N) throw new TypeError("accessor decorators must return an object with get, set, or init properties or undefined"); } else b(N, (l ? "field" : "method") + " decorators", "return") && (l ? k.unshift(N) : P[F] = N); } return o < 2 && u.push(g(k, s, 1), g(i, s, 0)), l || w || (f ? D ? u.splice(-1, 0, I("get", s), I("set", s)) : u.push(E ? P[F] : b.call.bind(P[F])) : m(e, r, P)), N; } function w(e) { return m(e, d, { configurable: true, enumerable: true, value: a }); } return void 0 !== i && (a = i[d]), a = h(null == a ? null : a), f = [], l = function l(e) { e && f.push(g(e)); }, p = function p(t, r) { for (var i = 0; i < n.length; i++) { var a = n[i], c = a[1], l = 7 & c; if ((8 & c) == t && !l == r) { var p = a[2], d = !!a[3], m = 16 & c; applyDec(t ? e : e.prototype, a, m, d ? "#" + p : _toPropertyKey(p), l, l < 2 ? [] : t ? s = s || [] : u = u || [], f, !!t, d, r, t && d ? function (t) { return _checkInRHS(t) === e; } : o); } } }, p(8, 0), p(0, 0), p(8, 1), p(0, 1), l(u), l(s), c = f, v || w(e), { e: c, get c() { var n = []; return v && [w(e = applyDec(e, [t], r, e.name, 5, n)), g(n, 1)]; } }; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _setFunctionName(e, t, n) { "symbol" == _typeof(t) && (t = (t = t.description) ? "[" + t + "]" : ""); try { Object.defineProperty(e, "name", { configurable: !0, value: n ? n + " " + t : t }); } catch (e) {} return e; }
function _checkInRHS(e) { if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (null !== e ? _typeof(e) : "null")); return e; }

/**
 * Progressively enhances a native breadcrumb list by contracting intermediate
 * ancestors when the full trail exceeds the available inline space. All links
 * remain in the light DOM; without JavaScript the complete trail wraps.
 *
 * @slot - A labelled nav containing an ol of breadcrumb list items.
 */
var _Breadcrumb;
var _A = /*#__PURE__*/new WeakMap();
var _B = /*#__PURE__*/new WeakMap();
var _C = /*#__PURE__*/new WeakMap();
var _toggleItem = /*#__PURE__*/new WeakMap();
var _toggle = /*#__PURE__*/new WeakMap();
var _hidden = /*#__PURE__*/new WeakMap();
var _frame = /*#__PURE__*/new WeakMap();
var _resizeObserver = /*#__PURE__*/new WeakMap();
var _mutationObserver = /*#__PURE__*/new WeakMap();
var _schedule = /*#__PURE__*/new WeakMap();
var _Breadcrumb_brand = /*#__PURE__*/new WeakSet();
var Breadcrumb = /*#__PURE__*/function (_LitElement) {
  // #endregion

  // #region Lifecycle
  function Breadcrumb() {
    var _this;
    _classCallCheck(this, Breadcrumb);
    _this = _callSuper(this, Breadcrumb);
    _classPrivateMethodInitSpec(_this, _Breadcrumb_brand);
    // #region Properties
    /**
     * Reveal the full trail even when it does not fit on one line. Remains set
     * across resizes. Expansion removes the button for this component instance.
     * @type {boolean}
     */
    _classPrivateFieldInitSpec(_this, _A, _init_expanded(_this, false));
    /**
     * Keep the entire trail visible at every width, with natural wrapping.
     * @type {boolean}
     */
    _classPrivateFieldInitSpec(_this, _B, (_init_extra_expanded(_this), _init_noCollapse(_this, false)));
    /** @type {string} Accessible name for the collapsed disclosure button. */
    _classPrivateFieldInitSpec(_this, _C, (_init_extra_noCollapse(_this), _init_expandLabel(_this)));
    // #endregion

    // #region Private variables
    /** @type {HTMLLIElement|null} */
    _classPrivateFieldInitSpec(_this, _toggleItem, (_init_extra_expandLabel(_this), null));
    /** @type {HTMLButtonElement|null} */
    _classPrivateFieldInitSpec(_this, _toggle, null);
    /** Items hidden by this component, restored before measuring or cleanup. @type {Set<HTMLLIElement>} */
    _classPrivateFieldInitSpec(_this, _hidden, new Set());
    /** @type {number|undefined} */
    _classPrivateFieldInitSpec(_this, _frame, void 0);
    _classPrivateFieldInitSpec(_this, _resizeObserver, new ResizeObserver(function () {
      return _classPrivateFieldGet(_schedule, _this).call(_this);
    }));
    _classPrivateFieldInitSpec(_this, _mutationObserver, new MutationObserver(function () {
      return _classPrivateFieldGet(_schedule, _this).call(_this);
    }));
    // #endregion

    // #region Utilities
    _classPrivateFieldInitSpec(_this, _schedule, function () {
      if (!_this.isConnected || _classPrivateFieldGet(_frame, _this) !== undefined) return;
      _classPrivateFieldSet(_frame, _this, requestAnimationFrame(function () {
        _classPrivateFieldSet(_frame, _this, undefined);
        _assertClassBrand(_Breadcrumb_brand, _this, _measure).call(_this);
      }));
    });
    _this.expandLabel = "Show all breadcrumbs";
    return _this;
  }
  _inherits(Breadcrumb, _LitElement);
  return _createClass(Breadcrumb, [{
    key: "expanded",
    get: function get() {
      return _classPrivateFieldGet(_A, this);
    },
    set: function set(v) {
      _classPrivateFieldSet(_A, this, v);
    }
  }, {
    key: "noCollapse",
    get: function get() {
      return _classPrivateFieldGet(_B, this);
    },
    set: function set(v) {
      _classPrivateFieldSet(_B, this, v);
    }
  }, {
    key: "expandLabel",
    get: function get() {
      return _classPrivateFieldGet(_C, this);
    },
    set: function set(v) {
      _classPrivateFieldSet(_C, this, v);
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      var _document$fonts;
      _superPropGet(Breadcrumb, "connectedCallback", this)([]);
      _classPrivateFieldGet(_resizeObserver, this).observe(this);
      _classPrivateFieldGet(_mutationObserver, this).observe(this, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true,
        attributeFilter: ["href", "class", "style", "dir"]
      });
      (_document$fonts = document.fonts) === null || _document$fonts === void 0 || _document$fonts.addEventListener("loadingdone", _classPrivateFieldGet(_schedule, this));
      _classPrivateFieldGet(_schedule, this).call(this);
    }
  }, {
    key: "render",
    value: function render() {
      return u(_templateObject || (_templateObject = _taggedTemplateLiteral(["<slot></slot>"])));
    }
  }, {
    key: "updated",
    value: function updated() {
      _classPrivateFieldGet(_schedule, this).call(this);
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      var _document$fonts2, _classPrivateFieldGet2;
      _superPropGet(Breadcrumb, "disconnectedCallback", this)([]);
      _classPrivateFieldGet(_resizeObserver, this).disconnect();
      _classPrivateFieldGet(_mutationObserver, this).disconnect();
      (_document$fonts2 = document.fonts) === null || _document$fonts2 === void 0 || _document$fonts2.removeEventListener("loadingdone", _classPrivateFieldGet(_schedule, this));
      if (_classPrivateFieldGet(_frame, this) !== undefined) cancelAnimationFrame(_classPrivateFieldGet(_frame, this));
      _classPrivateFieldSet(_frame, this, undefined);
      _assertClassBrand(_Breadcrumb_brand, this, _restore).call(this);
      (_classPrivateFieldGet2 = _classPrivateFieldGet(_toggleItem, this)) === null || _classPrivateFieldGet2 === void 0 || _classPrivateFieldGet2.remove();
      _classPrivateFieldSet(_toggleItem, this, null);
      _classPrivateFieldSet(_toggle, this, null);
    }
  }]);
}(i);
_Breadcrumb2 = Breadcrumb;
function _restore() {
  var _iterator = _createForOfIteratorHelper(_classPrivateFieldGet(_hidden, this)),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;
      item.hidden = false;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  _classPrivateFieldGet(_hidden, this).clear();
}
/** @param {HTMLOListElement} list */
function _ensureToggle(list) {
  var _this2 = this;
  if (!_classPrivateFieldGet(_toggleItem, this)) {
    _classPrivateFieldSet(_toggleItem, this, document.createElement("li"));
    _classPrivateFieldGet(_toggleItem, this).hidden = true;
    _classPrivateFieldSet(_toggle, this, document.createElement("button"));
    _classPrivateFieldGet(_toggle, this).type = "button";
    _classPrivateFieldGet(_toggle, this).setAttribute("data-tcds-breadcrumb", "toggle");
    var dots = document.createElement("span");
    dots.textContent = "...";
    dots.setAttribute("aria-hidden", "true");
    _classPrivateFieldGet(_toggle, this).append(dots);
    _classPrivateFieldGet(_toggle, this).addEventListener("click", function () {
      _this2.expanded = true;
    });
    _classPrivateFieldGet(_toggleItem, this).append(_classPrivateFieldGet(_toggle, this));
  }
  var first = list.firstElementChild;
  if (first && first.nextElementSibling !== _classPrivateFieldGet(_toggleItem, this)) first.after(_classPrivateFieldGet(_toggleItem, this));
}
/**
 * Remove the disclosure after revealing the trail, keeping keyboard focus
 * at the first revealed link when the button itself had focus.
 * @param {HTMLLIElement[]} items
 */
function _removeToggle(items) {
  var _classPrivateFieldGet3, _classPrivateFieldGet4;
  if ((_classPrivateFieldGet3 = _classPrivateFieldGet(_toggle, this)) !== null && _classPrivateFieldGet3 !== void 0 && _classPrivateFieldGet3.contains(this.ownerDocument.activeElement)) {
    var _ref, _items$slice$map$find, _items$;
    var next = /** @type {HTMLAnchorElement|null} */(_ref = (_items$slice$map$find = items.slice(1).map(function (item) {
      return item.querySelector("a[href]");
    }).find(Boolean)) !== null && _items$slice$map$find !== void 0 ? _items$slice$map$find : (_items$ = items[0]) === null || _items$ === void 0 ? void 0 : _items$.querySelector("a[href]")) !== null && _ref !== void 0 ? _ref : null;
    next === null || next === void 0 || next.focus();
  }
  (_classPrivateFieldGet4 = _classPrivateFieldGet(_toggleItem, this)) === null || _classPrivateFieldGet4 === void 0 || _classPrivateFieldGet4.remove();
  _classPrivateFieldSet(_toggleItem, this, null);
  _classPrivateFieldSet(_toggle, this, null);
}
/**
 * Measure the uncontracted list, then hide only intermediate ancestors.
 * Expanded and exceptionally long trails wrap instead of clipping text.
 * @returns {void}
 */
function _measure() {
  var _this3 = this;
  _assertClassBrand(_Breadcrumb_brand, this, _restore).call(this);
  var list = this.querySelector(":scope > nav > ol");
  if (!(list instanceof HTMLOListElement)) {
    var _classPrivateFieldGet5;
    (_classPrivateFieldGet5 = _classPrivateFieldGet(_toggleItem, this)) === null || _classPrivateFieldGet5 === void 0 || _classPrivateFieldGet5.remove();
    return;
  }
  var items = /** @type {HTMLLIElement[]} */_toConsumableArray(list.children).filter(function (item) {
    return item instanceof HTMLLIElement && item !== _classPrivateFieldGet(_toggleItem, _this3) && !item.hidden;
  });
  if (this.expanded || this.noCollapse || items.length <= 3) {
    _assertClassBrand(_Breadcrumb_brand, this, _removeToggle).call(this, items);
    return;
  }

  // Measuring while display:none returns zero; ResizeObserver retries on reveal.
  if (!list.clientWidth) return;
  _assertClassBrand(_Breadcrumb_brand, this, _ensureToggle).call(this, list);
  _classPrivateFieldGet(_toggleItem, this).hidden = false;
  var gap = parseFloat(getComputedStyle(list).columnGap) || 0;
  var width = items.reduce(function (total, item) {
    return total + item.getBoundingClientRect().width;
  }, 0) + gap * Math.max(items.length - 1, 0);
  var middle = items.slice(1, -2);
  var removedWidth = middle.reduce(function (total, item) {
    return total + item.getBoundingClientRect().width;
  }, 0) + gap * Math.max(middle.length - 1, 0);
  // A short ancestor may occupy less space than the disclosure itself.
  // In that case wrapping is more useful than adding an extra interaction.
  var savesSpace = removedWidth > _classPrivateFieldGet(_toggleItem, this).getBoundingClientRect().width + 1;
  var contract = width > list.clientWidth + 1 && savesSpace;
  var focused = this.ownerDocument.activeElement;

  // Responsive changes must never hide the reader's focused link.
  if (contract && middle.some(function (item) {
    return item.contains(focused);
  })) {
    this.expanded = true;
    _assertClassBrand(_Breadcrumb_brand, this, _removeToggle).call(this, items);
    return;
  }
  if (!contract && _classPrivateFieldGet(_toggle, this).contains(focused)) {
    var _items$1$querySelecto, _items$2;
    var next = /** @type {HTMLAnchorElement|null} */(_items$1$querySelecto = (_items$2 = items[1]) === null || _items$2 === void 0 ? void 0 : _items$2.querySelector("a[href]")) !== null && _items$1$querySelecto !== void 0 ? _items$1$querySelecto : null;
    next === null || next === void 0 || next.focus();
  }
  _classPrivateFieldGet(_toggleItem, this).hidden = !contract;
  _classPrivateFieldGet(_toggle, this).setAttribute("aria-expanded", "false");
  _classPrivateFieldGet(_toggle, this).setAttribute("aria-label", this.expandLabel);
  if (contract) {
    var _iterator2 = _createForOfIteratorHelper(middle),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var item = _step2.value;
        item.hidden = true;
        _classPrivateFieldGet(_hidden, this).add(item);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }
}
var _applyDecs2 = _applyDecs(_Breadcrumb2, [t("tcds-breadcrumb")], [[n({
  type: Boolean,
  reflect: true
}), 1, "expanded"], [n({
  type: Boolean,
  attribute: "no-collapse"
}), 1, "noCollapse"], [n({
  type: String,
  attribute: "expand-label"
}), 1, "expandLabel"]], 0, void 0, i);
var _applyDecs2$e = _slicedToArray(_applyDecs2.e, 6);
_init_expanded = _applyDecs2$e[0];
_init_extra_expanded = _applyDecs2$e[1];
_init_noCollapse = _applyDecs2$e[2];
_init_extra_noCollapse = _applyDecs2$e[3];
_init_expandLabel = _applyDecs2$e[4];
_init_extra_expandLabel = _applyDecs2$e[5];
var _applyDecs2$c = _slicedToArray(_applyDecs2.c, 2);
_Breadcrumb = _applyDecs2$c[0];
_initClass = _applyDecs2$c[1];
_initClass();

export { _Breadcrumb as Breadcrumb };
