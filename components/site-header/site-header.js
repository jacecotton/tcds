import { a as i, n, t, E } from '../../dist/js/vendor.js';
import { M as MediaQueryController, b as SizeBreakpointLg } from '../../dist/js/shared.js';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _SiteHeader2;
var _initClass, _init_docked, _init_extra_docked, _init_compact, _init_extra_compact, _init_open, _init_extra_open;
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
function _classPrivateGetter(s, r, a) { return a(_assertClassBrand(s, r)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
function _applyDecs(e, t, n, r, o, i) { var a, c, u, s, f, l, p, d = Symbol.metadata || Symbol["for"]("Symbol.metadata"), m = Object.defineProperty, h = Object.create, y = [h(null), h(null)], v = t.length; function g(t, n, r) { return function (o, i) { n && (i = o, o = e); for (var a = 0; a < t.length; a++) i = t[a].apply(o, r ? [i] : []); return r ? i : o; }; } function b(e, t, n, r) { if ("function" != typeof e && (r || void 0 !== e)) throw new TypeError(t + " must " + (n || "be") + " a function" + (r ? "" : " or undefined")); return e; } function applyDec(e, t, n, r, o, i, u, s, f, l, p) { function d(e) { if (!p(e)) throw new TypeError("Attempted to access private element on non-instance"); } var h = [].concat(t[0]), v = t[3], w = !u, D = 1 === o, S = 3 === o, j = 4 === o, E = 2 === o; function I(t, n, r) { return function (o, i) { return n && (i = o, o = e), r && r(o), P[t].call(o, i); }; } if (!w) { var P = {}, k = [], F = S ? "get" : j || D ? "set" : "value"; if (f ? (l || D ? P = { get: _setFunctionName(function () { return v(this); }, r, "get"), set: function set(e) { t[4](this, e); } } : P[F] = v, l || _setFunctionName(P[F], r, E ? "" : F)) : l || (P = Object.getOwnPropertyDescriptor(e, r)), !l && !f) { if ((c = y[+s][r]) && 7 !== (c ^ o)) throw Error("Decorating two elements with the same name (" + P[F].name + ") is not supported yet"); y[+s][r] = o < 3 ? 1 : o; } } for (var N = e, O = h.length - 1; O >= 0; O -= n ? 2 : 1) { var T = b(h[O], "A decorator", "be", true), z = n ? h[O - 1] : void 0, A = {}, H = { kind: ["field", "accessor", "method", "getter", "setter", "class"][o], name: r, metadata: a, addInitializer: function (e, t) { if (e.v) throw new TypeError("attempted to call addInitializer after decoration was finished"); b(t, "An initializer", "be", true), i.push(t); }.bind(null, A) }; if (w) c = T.call(z, N, H), A.v = 1, b(c, "class decorators", "return") && (N = c);else if (H["static"] = s, H["private"] = f, c = H.access = { has: f ? p.bind() : function (e) { return r in e; } }, j || (c.get = f ? E ? function (e) { return d(e), P.value; } : I("get", 0, d) : function (e) { return e[r]; }), E || S || (c.set = f ? I("set", 0, d) : function (e, t) { e[r] = t; }), N = T.call(z, D ? { get: P.get, set: P.set } : P[F], H), A.v = 1, D) { if ("object" == _typeof(N) && N) (c = b(N.get, "accessor.get")) && (P.get = c), (c = b(N.set, "accessor.set")) && (P.set = c), (c = b(N.init, "accessor.init")) && k.unshift(c);else if (void 0 !== N) throw new TypeError("accessor decorators must return an object with get, set, or init properties or undefined"); } else b(N, (l ? "field" : "method") + " decorators", "return") && (l ? k.unshift(N) : P[F] = N); } return o < 2 && u.push(g(k, s, 1), g(i, s, 0)), l || w || (f ? D ? u.splice(-1, 0, I("get", s), I("set", s)) : u.push(E ? P[F] : b.call.bind(P[F])) : m(e, r, P)), N; } function w(e) { return m(e, d, { configurable: true, enumerable: true, value: a }); } return void 0 !== i && (a = i[d]), a = h(null == a ? null : a), f = [], l = function l(e) { e && f.push(g(e)); }, p = function p(t, r) { for (var i = 0; i < n.length; i++) { var a = n[i], c = a[1], l = 7 & c; if ((8 & c) == t && !l == r) { var p = a[2], d = !!a[3], m = 16 & c; applyDec(t ? e : e.prototype, a, m, d ? "#" + p : _toPropertyKey(p), l, l < 2 ? [] : t ? s = s || [] : u = u || [], f, !!t, d, r, t && d ? function (t) { return _checkInRHS(t) === e; } : o); } } }, p(8, 0), p(0, 0), p(8, 1), p(0, 1), l(u), l(s), c = f, v || w(e), { e: c, get c() { var n = []; return v && [w(e = applyDec(e, [t], r, e.name, 5, n)), g(n, 1)]; } }; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _setFunctionName(e, t, n) { "symbol" == _typeof(t) && (t = (t = t.description) ? "[" + t + "]" : ""); try { Object.defineProperty(e, "name", { configurable: !0, value: n ? n + " " + t : t }); } catch (e) {} return e; }
function _checkInRHS(e) { if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (null !== e ? _typeof(e) : "null")); return e; }

/**
 * Upward distance, in pixels, before the header docks. Small and fixed — only
 * enough to keep trackpad jitter from pulling it into view. Downward movement
 * has no threshold at all: the header is never pinned while scrolling down.
 */
var REVEAL_THRESHOLD = 8;
var _SiteHeader;
var _A = /*#__PURE__*/new WeakMap();
var _B = /*#__PURE__*/new WeakMap();
var _C = /*#__PURE__*/new WeakMap();
var _internals = /*#__PURE__*/new WeakMap();
var _mobile = /*#__PURE__*/new WeakMap();
var _placeholder = /*#__PURE__*/new WeakMap();
var _resizeObserver = /*#__PURE__*/new WeakMap();
var _offset = /*#__PURE__*/new WeakMap();
var _previousScrollY = /*#__PURE__*/new WeakMap();
var _momentum = /*#__PURE__*/new WeakMap();
var _frame = /*#__PURE__*/new WeakMap();
var _wasMobile = /*#__PURE__*/new WeakMap();
var _onScroll = /*#__PURE__*/new WeakMap();
var _measureScroll = /*#__PURE__*/new WeakMap();
var _onHeaderResize = /*#__PURE__*/new WeakMap();
var _onDetailsToggle = /*#__PURE__*/new WeakMap();
var _onDocumentClick = /*#__PURE__*/new WeakMap();
var _onFocusIn = /*#__PURE__*/new WeakMap();
var _onKeydown = /*#__PURE__*/new WeakMap();
var _SiteHeader_brand = /*#__PURE__*/new WeakSet();
var SiteHeader = /*#__PURE__*/function (_LitElement) {
  // #endregion

  // #region Lifecycle
  function SiteHeader() {
    var _this3;
    _classCallCheck(this, SiteHeader);
    _this3 = _callSuper(this, SiteHeader);
    // #endregion
    // #region Utility methods
    /**
     * Queried live rather than cached, so a menu re-rendered by the CMS is picked
     * up without reconnecting the component.
     */
    _classPrivateMethodInitSpec(_this3, _SiteHeader_brand);
    // #region Properties and state
    /**
     * The header is pinned to the top of the viewport, which is also its compact
     * form — the two are the same condition. Undocked it sits at its place in the
     * document, full size, and scrolls away like anything else. This is what
     * makes the behaviour asymmetric for free: scrolling down releases it, so it
     * leaves expanded; scrolling up docks it, so it returns compact.
     */
    _classPrivateFieldInitSpec(_this3, _A, _init_docked(_this3, false));
    /**
     * The compact form. Latched: it turns on when the header first docks and stays
     * on until the page is back at the very top, so a header released mid-page
     * scrolls away compact rather than expanding on its way out.
     */
    _classPrivateFieldInitSpec(_this3, _B, (_init_extra_docked(_this3), _init_compact(_this3, false)));
    /**
     * A mega menu panel is open. Styling hook for scrims and backdrops.
     */
    _classPrivateFieldInitSpec(_this3, _C, (_init_extra_compact(_this3), _init_open(_this3, false)));
    // #endregion

    // #region Private variables
    _classPrivateFieldInitSpec(_this3, _internals, void _init_extra_open(_this3));
    _classPrivateFieldInitSpec(_this3, _mobile, void 0);
    _classPrivateFieldInitSpec(_this3, _placeholder, null);
    _classPrivateFieldInitSpec(_this3, _resizeObserver, null);
    /**
     * The header's natural height, and therefore both the height of the
     * placeholder and the depth of the zone at the top of the page where docking
     * is refused.
     */
    _classPrivateFieldInitSpec(_this3, _offset, 0);
    _classPrivateFieldInitSpec(_this3, _previousScrollY, 0);
    _classPrivateFieldInitSpec(_this3, _momentum, 0);
    _classPrivateFieldInitSpec(_this3, _frame, 0);
    _classPrivateFieldInitSpec(_this3, _wasMobile, null);
    // #endregion

    // #region Events
    _classPrivateFieldInitSpec(_this3, _onScroll, function () {
      if (_classPrivateFieldGet(_frame, _this3)) return;
      _classPrivateFieldSet(_frame, _this3, requestAnimationFrame(_classPrivateFieldGet(_measureScroll, _this3)));
    });
    _classPrivateFieldInitSpec(_this3, _measureScroll, function () {
      _classPrivateFieldSet(_frame, _this3, 0);

      // Read before writing anything: layout is clean at this point in the frame,
      // and the property writes below would invalidate it.
      var scrollY = window.scrollY;
      var viewport = window.innerHeight;
      var documentHeight = document.documentElement.scrollHeight;
      var delta = scrollY - _classPrivateFieldGet(_previousScrollY, _this3);
      _classPrivateFieldSet(_previousScrollY, _this3, scrollY);
      if (delta === 0) return;
      if (scrollY <= 0) {
        _this3.style.removeProperty("--tcds-site-header-release");
        _this3.compact = false;
        _this3.docked = false;
        _classPrivateFieldSet(_momentum, _this3, 0);
        return;
      }

      // The end of the document is a resting place rather than a gesture.
      if (scrollY + viewport >= documentHeight - 1) {
        _assertClassBrand(_SiteHeader_brand, _this3, _dock).call(_this3, scrollY);
        return;
      }

      // Momentum resets whenever the direction reverses, so the threshold
      // measures committed movement one way rather than total distance traveled.
      _classPrivateFieldSet(_momentum, _this3, Math.sign(delta) === Math.sign(_classPrivateFieldGet(_momentum, _this3)) ? _classPrivateFieldGet(_momentum, _this3) + delta : delta);
      if (_classPrivateFieldGet(_momentum, _this3) > 0) {
        // Downward the header is never pinned. Released at the position it
        // currently occupies on screen, it scrolls off with the page rather than
        // being animated away.
        _assertClassBrand(_SiteHeader_brand, _this3, _release).call(_this3, scrollY);
        _classPrivateFieldSet(_momentum, _this3, 0);
        return;
      }
      if (Math.abs(_classPrivateFieldGet(_momentum, _this3)) < REVEAL_THRESHOLD) return;
      _assertClassBrand(_SiteHeader_brand, _this3, _dock).call(_this3, scrollY);
      _classPrivateFieldSet(_momentum, _this3, 0);
    });
    _classPrivateFieldInitSpec(_this3, _onHeaderResize, function (_ref) {
      var _entry$borderBoxSize$, _entry$borderBoxSize;
      var _ref2 = _slicedToArray(_ref, 1),
        entry = _ref2[0];
      if (_this3.compact) return;
      var height = (_entry$borderBoxSize$ = (_entry$borderBoxSize = entry.borderBoxSize) === null || _entry$borderBoxSize === void 0 || (_entry$borderBoxSize = _entry$borderBoxSize[0]) === null || _entry$borderBoxSize === void 0 ? void 0 : _entry$borderBoxSize.blockSize) !== null && _entry$borderBoxSize$ !== void 0 ? _entry$borderBoxSize$ : entry.contentRect.height;
      if (!height || height === _classPrivateFieldGet(_offset, _this3)) return;
      _classPrivateFieldSet(_offset, _this3, height);
      _classPrivateFieldGet(_placeholder, _this3).style.height = "".concat(height, "px");
    });
    _classPrivateFieldInitSpec(_this3, _onDetailsToggle, function () {
      _this3.open = _classPrivateGetter(_SiteHeader_brand, _this3, _get_details).some(function (details) {
        return details.getAttribute("name") === "primary-menu" && details.open;
      });

      // A panel opening while the header is off screen would open into nothing.
      if (_this3.open) _this3.reveal();
    });
    _classPrivateFieldInitSpec(_this3, _onDocumentClick, function (event) {
      if (!_this3.contains(event.target)) {
        _this3.close();
        return;
      }
      var details = event.target;
      if (_classPrivateGetter(_SiteHeader_brand, _this3, _get_details).includes(details) && details.open && _assertClassBrand(_SiteHeader_brand, _this3, _isDisclosure).call(_this3, details)) {
        details.open = false;
      }
    });
    _classPrivateFieldInitSpec(_this3, _onFocusIn, function () {
      // An off-screen header still holds focusable links. Docking on focus keeps
      // keyboard users from tabbing into something they cannot see.
      _this3.reveal();
    });
    _classPrivateFieldInitSpec(_this3, _onKeydown, function (event) {
      var _open$findLast, _target$querySelector;
      if (event.key !== "Escape") return;
      var open = _classPrivateGetter(_SiteHeader_brand, _this3, _get_details).filter(function (details) {
        return details.open && _assertClassBrand(_SiteHeader_brand, _this3, _isDisclosure).call(_this3, details);
      });
      if (open.length === 0) return;
      event.preventDefault();

      // Innermost first, so Escape inside a mobile mega menu closes that section
      // before it closes the hamburger. `#details` is in document order, which
      // puts nested elements after their ancestors.
      var target = (_open$findLast = open.findLast(function (details) {
        return details.contains(event.target);
      })) !== null && _open$findLast !== void 0 ? _open$findLast : open.at(-1);
      target.open = false;
      (_target$querySelector = target.querySelector("summary")) === null || _target$querySelector === void 0 || _target$querySelector.focus();
    });
    _classPrivateFieldSet(_internals, _this3, _this3.attachInternals());
    _classPrivateFieldGet(_internals, _this3).role = "banner";
    _classPrivateFieldSet(_mobile, _this3, new MediaQueryController(_this3, "(max-width: ".concat(SizeBreakpointLg, ")")));
    return _this3;
  }
  _inherits(SiteHeader, _LitElement);
  return _createClass(SiteHeader, [{
    key: "docked",
    get: function get() {
      return _classPrivateFieldGet(_A, this);
    },
    set: function set(v) {
      _classPrivateFieldSet(_A, this, v);
    }
  }, {
    key: "compact",
    get: function get() {
      return _classPrivateFieldGet(_B, this);
    },
    set: function set(v) {
      _classPrivateFieldSet(_B, this, v);
    }
  }, {
    key: "open",
    get: function get() {
      return _classPrivateFieldGet(_C, this);
    },
    set: function set(v) {
      _classPrivateFieldSet(_C, this, v);
    }
  }, {
    key: "createRenderRoot",
    value: function createRenderRoot() {
      return this;
    }
  }, {
    key: "render",
    value: function render() {
      return E;
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      _superPropGet(SiteHeader, "connectedCallback", this)([]);
      window.addEventListener("scroll", _classPrivateFieldGet(_onScroll, this), {
        passive: true
      });
      document.addEventListener("click", _classPrivateFieldGet(_onDocumentClick, this));
      this.addEventListener("keydown", _classPrivateFieldGet(_onKeydown, this));
      this.addEventListener("focusin", _classPrivateFieldGet(_onFocusIn, this));
      this.addEventListener("toggle", _classPrivateFieldGet(_onDetailsToggle, this), {
        capture: true
      });
      _classPrivateFieldSet(_previousScrollY, this, window.scrollY);
      _assertClassBrand(_SiteHeader_brand, this, _attachPlaceholder).call(this);
    }
  }, {
    key: "updated",
    value: function updated() {
      var mobile = _classPrivateFieldGet(_mobile, this).matches;
      if (mobile === _classPrivateFieldGet(_wasMobile, this)) return;
      _classPrivateFieldSet(_wasMobile, this, mobile);

      // Above the breakpoint the menus wrapper is held open and gets
      // `display: contents`.
      if (_classPrivateGetter(_SiteHeader_brand, this, _get_menus)) _classPrivateGetter(_SiteHeader_brand, this, _get_menus).open = !mobile;
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      var _classPrivateFieldGet2, _classPrivateFieldGet3;
      _superPropGet(SiteHeader, "disconnectedCallback", this)([]);
      window.removeEventListener("scroll", _classPrivateFieldGet(_onScroll, this));
      document.removeEventListener("click", _classPrivateFieldGet(_onDocumentClick, this));
      this.removeEventListener("keydown", _classPrivateFieldGet(_onKeydown, this));
      this.removeEventListener("focusin", _classPrivateFieldGet(_onFocusIn, this));
      this.removeEventListener("toggle", _classPrivateFieldGet(_onDetailsToggle, this), {
        capture: true
      });
      (_classPrivateFieldGet2 = _classPrivateFieldGet(_resizeObserver, this)) === null || _classPrivateFieldGet2 === void 0 || _classPrivateFieldGet2.disconnect();
      (_classPrivateFieldGet3 = _classPrivateFieldGet(_placeholder, this)) === null || _classPrivateFieldGet3 === void 0 || _classPrivateFieldGet3.remove();
      _classPrivateFieldSet(_placeholder, this, null);
      cancelAnimationFrame(_classPrivateFieldGet(_frame, this));
      _classPrivateFieldSet(_frame, this, 0);
    }
    // #endregion

    // #region Public API
    /**
     * Closes every open disclosure in the header. The desktop menus wrapper is
     * exempt, since closing it would remove the nav bar.
     */
  }, {
    key: "close",
    value: function close() {
      var _iterator = _createForOfIteratorHelper(_classPrivateGetter(_SiteHeader_brand, this, _get_details)),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var details = _step.value;
          if (details.open && _assertClassBrand(_SiteHeader_brand, this, _isDisclosure).call(this, details)) details.open = false;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }

    /**
     * Brings the header on screen. A no-op near the top of the page, where it is
     * already partly visible in the flow.
     */
  }, {
    key: "reveal",
    value: function reveal() {
      _classPrivateFieldSet(_momentum, this, 0);
      _assertClassBrand(_SiteHeader_brand, this, _dock).call(this, window.scrollY);
    }
  }]);
}(i);
_SiteHeader2 = SiteHeader;
function _get_details(_this) {
  return _toConsumableArray(_this.querySelectorAll("details"));
}
function _get_menus(_this2) {
  return _this2.querySelector("[data-tcds-site-header=menus]");
}
/**
 * Above the breakpoint the menus wrapper is forced open and acts as the nav
 * bar, so it is exempt from anything that closes or counts open disclosures.
 */
function _isDisclosure(details) {
  return !(details === _classPrivateGetter(_SiteHeader_brand, this, _get_menus) && !_classPrivateFieldGet(_mobile, this).matches);
}
function _dock(scrollY) {
  if (this.docked || this.open || scrollY <= _classPrivateFieldGet(_offset, this)) return;
  this.style.removeProperty("--tcds-site-header-release");
  this.compact = true;
  this.docked = true;
}
/**
 * Hands the header back to the document at `top`, in document coordinates.
 * Only meaningful while docked — once released it is an ordinary absolutely
 * positioned element and must be left alone, or rewriting its offset every
 * frame would make it track the scroll.
 */
function _release(top) {
  if (!this.docked) return;
  this.style.setProperty("--tcds-site-header-release", "".concat(top, "px"));
  this.docked = false;
}
/**
 * A block in normal flow standing in for the header, which is positioned out
 * of flow so it can both scroll away and pin without ever shifting the page.
 */
function _attachPlaceholder() {
  _classPrivateFieldSet(_placeholder, this, document.createElement("div"));
  _classPrivateFieldGet(_placeholder, this).setAttribute("data-tcds-site-header", "placeholder");
  _classPrivateFieldGet(_placeholder, this).setAttribute("aria-hidden", "true");
  _classPrivateFieldGet(_placeholder, this).style.cssText = "display: block; height: 0; pointer-events: none;";
  this.before(_classPrivateFieldGet(_placeholder, this));
  _classPrivateFieldSet(_resizeObserver, this, new ResizeObserver(_classPrivateFieldGet(_onHeaderResize, this)));
  _classPrivateFieldGet(_resizeObserver, this).observe(this);
}
var _applyDecs2 = _applyDecs(_SiteHeader2, [t("tcds-site-header")], [[n({
  type: Boolean,
  reflect: true
}), 1, "docked"], [n({
  type: Boolean,
  reflect: true
}), 1, "compact"], [n({
  type: Boolean,
  reflect: true
}), 1, "open"]], 0, void 0, i);
var _applyDecs2$e = _slicedToArray(_applyDecs2.e, 6);
_init_docked = _applyDecs2$e[0];
_init_extra_docked = _applyDecs2$e[1];
_init_compact = _applyDecs2$e[2];
_init_extra_compact = _applyDecs2$e[3];
_init_open = _applyDecs2$e[4];
_init_extra_open = _applyDecs2$e[5];
var _applyDecs2$c = _slicedToArray(_applyDecs2.c, 2);
_SiteHeader = _applyDecs2$c[0];
_initClass = _applyDecs2$c[1];
_initClass();

export { _SiteHeader as SiteHeader };
