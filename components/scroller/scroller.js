import { i, b as r, n, r as r$1, o, e, t, u, A, a as i$1 } from '../../dist/js/vendor.js';
import { S as SizeBreakpointMd, s as styles } from '../../dist/js/shared.js';

var _templateObject$1;
function _taggedTemplateLiteral$1(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var localStyles = i(_templateObject$1 || (_templateObject$1 = _taggedTemplateLiteral$1(["\n  :host {\n    --tcds-scroller-gap: 1.5rem;\n    --tcds-scroller-control-color: var(--tcds-color-palette-gray-400);\n    --tcds-scroller-control-color-hover: var(--tcds-color-palette-gray-500);\n    --tcds-scroller-control-color-active: var(--tcds-color-palette-black);\n\n    flex-direction: column;\n    position: relative;\n  }\n\n  :host(:not([hidden])) {\n    display: flex;\n  }\n\n  [part=scroller] {\n    display: flex;\n    gap: var(--tcds-scroller-gap);\n    overflow-x: auto;\n    overscroll-behavior-x: contain;\n    scroll-snap-type: x mandatory;\n    scroll-behavior: smooth;\n    scrollbar-width: none;\n\n    &::-webkit-scrollbar {\n      display: none;\n    }\n\n    @media (prefers-reduced-motion: reduce) {\n      scroll-behavior: auto;\n    }\n  }\n\n  /**\n   * The slot generates no box of its own, so these are the flex items and the\n   * snap targets, despite sitting a level deeper in the markup.\n   */\n  ::slotted(*) {\n    /**\n     * Children keep their own width. Without this they'd shrink to fit the\n     * container and it would never overflow, so nothing would ever scroll.\n     */\n    flex: 0 0 auto;\n    scroll-snap-align: start;\n  }\n\n  [part=controls] {\n    display: flex;\n    flex-wrap: wrap;\n    gap: var(--tcds-space-component-md);\n    padding-right: var(--tcds-site-inner-gutter);\n    z-index: 2;\n\n    ::slotted(*) {\n      margin-top: var(--tcds-space-layout-md) !important;\n\n      @media (min-width: ", ") {\n        margin-top: var(--tcds-space-layout-lg) !important;\n      }\n    }\n  }\n\n  [part~=control] {\n    appearance: none;\n    border: 0;\n    background-color: transparent;\n    color: var(--tcds-scroller-control-color);\n    cursor: pointer;\n    margin-top: var(--tcds-space-layout-md);\n\n    &:hover {\n      color: var(--tcds-scroller-control-color-hover);\n    }\n\n    &:active {\n      color: var(--tcds-scroller-control-color-active);\n    }\n\n    &[aria-disabled=true] {\n      color: var(--tcds-scroller-control-color);\n      opacity: .4;\n      cursor: default;\n    }\n  }\n\n  [part~=previous] {\n    margin-left: auto;\n  }\n\n  [part~=next] {\n  }\n"])), r(SizeBreakpointMd));

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _Class, _Scroller3, _A, _B, _Scroller3_brand, _C, _D, _E, _F, _resizeObserver, _onResize, _templateObject, _templateObject2, _applyDecs2, _applyDecs2$e, _applyDecs2$c;
var _initClass, _init_label, _init_extra_label, _init_overflowing, _get_overflowing, _set_overflowing, _init_extra_overflowing, _init_atStart, _get_atStart, _set_atStart, _init_extra_atStart, _init_atEnd, _get_atEnd, _set_atEnd, _init_extra_atEnd, _init_children, _get_children, _init_extra_children, _init_scroller, _get_scroller, _init_extra_scroller, _Scroller2;
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
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
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
function _classPrivateSetter(s, r, a, t) { return r(_assertClassBrand(s, a), t), t; }
function _classPrivateGetter(s, r, a) { return a(_assertClassBrand(s, r)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e; }
function _applyDecs(e, t, n, r, o, i) { var a, c, u, s, f, l, p, d = Symbol.metadata || Symbol["for"]("Symbol.metadata"), m = Object.defineProperty, h = Object.create, y = [h(null), h(null)], v = t.length; function g(t, n, r) { return function (o, i) { n && (i = o, o = e); for (var a = 0; a < t.length; a++) i = t[a].apply(o, r ? [i] : []); return r ? i : o; }; } function b(e, t, n, r) { if ("function" != typeof e && (r || void 0 !== e)) throw new TypeError(t + " must " + (n || "be") + " a function" + (r ? "" : " or undefined")); return e; } function applyDec(e, t, n, r, o, i, u, s, f, l, p) { function d(e) { if (!p(e)) throw new TypeError("Attempted to access private element on non-instance"); } var h = [].concat(t[0]), v = t[3], w = !u, D = 1 === o, S = 3 === o, j = 4 === o, E = 2 === o; function I(t, n, r) { return function (o, i) { return n && (i = o, o = e), r && r(o), P[t].call(o, i); }; } if (!w) { var P = {}, k = [], F = S ? "get" : j || D ? "set" : "value"; if (f ? (l || D ? P = { get: _setFunctionName(function () { return v(this); }, r, "get"), set: function set(e) { t[4](this, e); } } : P[F] = v, l || _setFunctionName(P[F], r, E ? "" : F)) : l || (P = Object.getOwnPropertyDescriptor(e, r)), !l && !f) { if ((c = y[+s][r]) && 7 !== (c ^ o)) throw Error("Decorating two elements with the same name (" + P[F].name + ") is not supported yet"); y[+s][r] = o < 3 ? 1 : o; } } for (var N = e, O = h.length - 1; O >= 0; O -= n ? 2 : 1) { var T = b(h[O], "A decorator", "be", true), z = n ? h[O - 1] : void 0, A = {}, H = { kind: ["field", "accessor", "method", "getter", "setter", "class"][o], name: r, metadata: a, addInitializer: function (e, t) { if (e.v) throw new TypeError("attempted to call addInitializer after decoration was finished"); b(t, "An initializer", "be", true), i.push(t); }.bind(null, A) }; if (w) c = T.call(z, N, H), A.v = 1, b(c, "class decorators", "return") && (N = c);else if (H["static"] = s, H["private"] = f, c = H.access = { has: f ? p.bind() : function (e) { return r in e; } }, j || (c.get = f ? E ? function (e) { return d(e), P.value; } : I("get", 0, d) : function (e) { return e[r]; }), E || S || (c.set = f ? I("set", 0, d) : function (e, t) { e[r] = t; }), N = T.call(z, D ? { get: P.get, set: P.set } : P[F], H), A.v = 1, D) { if ("object" == _typeof(N) && N) (c = b(N.get, "accessor.get")) && (P.get = c), (c = b(N.set, "accessor.set")) && (P.set = c), (c = b(N.init, "accessor.init")) && k.unshift(c);else if (void 0 !== N) throw new TypeError("accessor decorators must return an object with get, set, or init properties or undefined"); } else b(N, (l ? "field" : "method") + " decorators", "return") && (l ? k.unshift(N) : P[F] = N); } return o < 2 && u.push(g(k, s, 1), g(i, s, 0)), l || w || (f ? D ? u.splice(-1, 0, I("get", s), I("set", s)) : u.push(E ? P[F] : b.call.bind(P[F])) : m(e, r, P)), N; } function w(e) { return m(e, d, { configurable: true, enumerable: true, value: a }); } return void 0 !== i && (a = i[d]), a = h(null == a ? null : a), f = [], l = function l(e) { e && f.push(g(e)); }, p = function p(t, r) { for (var i = 0; i < n.length; i++) { var a = n[i], c = a[1], l = 7 & c; if ((8 & c) == t && !l == r) { var p = a[2], d = !!a[3], m = 16 & c; applyDec(t ? e : e.prototype, a, m, d ? "#" + p : _toPropertyKey(p), l, l < 2 ? [] : t ? s = s || [] : u = u || [], f, !!t, d, r, t && d ? function (t) { return _checkInRHS(t) === e; } : o); } } }, p(8, 0), p(0, 0), p(8, 1), p(0, 1), l(u), l(s), c = f, v || w(e), { e: c, get c() { var n = []; return v && [w(e = applyDec(e, [t], r, e.name, 5, n)), g(n, 1)]; } }; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _setFunctionName(e, t, n) { "symbol" == _typeof(t) && (t = (t = t.description) ? "[" + t + "]" : ""); try { Object.defineProperty(e, "name", { configurable: !0, value: n ? n + " " + t : t }); } catch (e) {} return e; }
function _checkInRHS(e) { if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (null !== e ? _typeof(e) : "null")); return e; }
function _identity(t) { return t; }

/**
 * Scroll offsets are subpixel while `scrollWidth` and `clientWidth` are
 * rounded. A pixel of slack keeps that rounding from reading as "there's more
 * to scroll" when the children exactly fill the container.
 */
var TOLERANCE = 1;
var _Scroller;
new (_Scroller2 = (_A = /*#__PURE__*/new WeakMap(), _B = /*#__PURE__*/new WeakMap(), _Scroller3_brand = /*#__PURE__*/new WeakSet(), _C = /*#__PURE__*/new WeakMap(), _D = /*#__PURE__*/new WeakMap(), _E = /*#__PURE__*/new WeakMap(), _F = /*#__PURE__*/new WeakMap(), _resizeObserver = /*#__PURE__*/new WeakMap(), _onResize = /*#__PURE__*/new WeakMap(), _Scroller3 = /*#__PURE__*/function (_LitElement) {
  // #endregion

  // #region Lifecycle
  function Scroller() {
    var _this;
    _classCallCheck(this, Scroller);
    _this = _callSuper(this, Scroller);
    _classPrivateMethodInitSpec(_this, _Scroller3_brand);
    // #region Properties and state
    _classPrivateFieldInitSpec(_this, _A, _init_label(_this));
    _classPrivateFieldInitSpec(_this, _B, (_init_extra_label(_this), _init_overflowing(_this, false)));
    _classPrivateFieldInitSpec(_this, _C, (_init_extra_overflowing(_this), _init_atStart(_this, true)));
    _classPrivateFieldInitSpec(_this, _D, (_init_extra_atStart(_this), _init_atEnd(_this, false)));
    // #endregion
    // #region Private variables
    _classPrivateFieldInitSpec(_this, _E, (_init_extra_atEnd(_this), _init_children(_this)));
    _classPrivateFieldInitSpec(_this, _F, (_init_extra_children(_this), _init_scroller(_this)));
    _classPrivateFieldInitSpec(_this, _resizeObserver, void _init_extra_scroller(_this));
    _classPrivateFieldInitSpec(_this, _onResize, function () {
      _assertClassBrand(_Scroller3_brand, _this, _syncPosition).call(_this);
    });
    _this.label = "Scroller";
    return _this;
  }
  _inherits(Scroller, _LitElement);
  return _createClass(Scroller, [{
    key: "label",
    get: function get() {
      return _classPrivateFieldGet(_A, this);
    },
    set: function set(v) {
      _classPrivateFieldSet(_A, this, v);
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      _superPropGet(Scroller, "connectedCallback", this)([]);

      // Observation is torn down on disconnect, so restore it if the element was
      // moved rather than created, when `firstUpdated` won't run again.
      if (this.hasUpdated) {
        _assertClassBrand(_Scroller3_brand, this, _observe).call(this);
        _assertClassBrand(_Scroller3_brand, this, _syncPosition).call(this);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return u(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n      <div\n        part=\"scroller\"\n        role=\"group\"\n        aria-label=", "\n        tabindex=", "\n        @scroll=", "\n      >\n        <slot @slotchange=", "></slot>\n      </div>\n      <div part=\"controls\">\n        <slot name=\"controls\"></slot>\n        ", "\n      </div>\n    "])), this.label, _classPrivateGetter(_Scroller3_brand, this, _get_overflowing) ? "0" : A, _assertClassBrand(_Scroller3_brand, this, _onScroll), _assertClassBrand(_Scroller3_brand, this, _onSlotChange), _classPrivateGetter(_Scroller3_brand, this, _get_overflowing) ? u(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n          <button\n            part=\"control previous\"\n            type=\"button\"\n            title=\"Previous\"\n            aria-disabled=", "\n            @click=", "\n          >\n            <span class=\"visually-hidden\">Previous</span>\n            <tcds-icon icon=\"caret-left\"></tcds-icon>\n          </button>\n          <button\n            part=\"control next\"\n            type=\"button\"\n            title=\"Next\"\n            aria-disabled=", "\n            @click=", "\n          >\n            <span class=\"visually-hidden\">Next</span>\n            <tcds-icon icon=\"caret-right\"></tcds-icon>\n          </button>\n        "])), _classPrivateGetter(_Scroller3_brand, this, _get_atStart) ? "true" : "false", _assertClassBrand(_Scroller3_brand, this, _onPreviousClick), _classPrivateGetter(_Scroller3_brand, this, _get_atEnd) ? "true" : "false", _assertClassBrand(_Scroller3_brand, this, _onNextClick)) : A);
    }
  }, {
    key: "firstUpdated",
    value: function firstUpdated() {
      _classPrivateFieldSet(_resizeObserver, this, new ResizeObserver(_classPrivateFieldGet(_onResize, this)));
      _assertClassBrand(_Scroller3_brand, this, _observe).call(this);
      _assertClassBrand(_Scroller3_brand, this, _syncPosition).call(this);
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      var _classPrivateFieldGet2;
      _superPropGet(Scroller, "disconnectedCallback", this)([]);
      (_classPrivateFieldGet2 = _classPrivateFieldGet(_resizeObserver, this)) === null || _classPrivateFieldGet2 === void 0 || _classPrivateFieldGet2.disconnect();
    }
    // #endregion

    // #region Public methods
    /**
     * Scroll the child at `position` flush with the leading edge. Out-of-range
     * positions are ignored rather than clamped: unlike a carousel, there's no
     * wrapping here, so a missing child means there's nowhere to go.
     */
  }, {
    key: "select",
    value: function select(position) {
      _assertClassBrand(_Scroller3_brand, this, _scrollBy).call(this, _assertClassBrand(_Scroller3_brand, this, _offsets).call(this)[position]);
    }

    /**
     * Scroll by exactly one child, in either direction. "Next" is the first child
     * that starts past the leading edge; "previous" is the last one that starts
     * before it, so a partially scrolled child counts as the current one both
     * ways rather than being skipped.
     */
  }, {
    key: "next",
    value: function next() {
      _assertClassBrand(_Scroller3_brand, this, _scrollBy).call(this, _assertClassBrand(_Scroller3_brand, this, _offsets).call(this).find(function (offset) {
        return offset > TOLERANCE;
      }));
    }
  }, {
    key: "previous",
    value: function previous() {
      _assertClassBrand(_Scroller3_brand, this, _scrollBy).call(this, _assertClassBrand(_Scroller3_brand, this, _offsets).call(this).findLast(function (offset) {
        return offset < -TOLERANCE;
      }));
    }
    // #endregion

    // #region Events

    // #endregion
  }]);
}(i$1), _applyDecs2 = _applyDecs(_Scroller3, [t("tcds-scroller")], [[n({
  type: String
}), 1, "label"], [r$1(), 1, "overflowing", function (o) {
  return _classPrivateFieldGet(_B, o);
}, function (o, v) {
  return _classPrivateFieldSet(_B, o, v);
}], [r$1(), 1, "atStart", function (o) {
  return _classPrivateFieldGet(_C, o);
}, function (o, v) {
  return _classPrivateFieldSet(_C, o, v);
}], [r$1(), 1, "atEnd", function (o) {
  return _classPrivateFieldGet(_D, o);
}, function (o, v) {
  return _classPrivateFieldSet(_D, o, v);
}], [o({
  flatten: true
}), 1, "children", function (o) {
  return _classPrivateFieldGet(_E, o);
}, function (o, v) {
  return _classPrivateFieldSet(_E, o, v);
}], [e("[part=scroller]"), 1, "scroller", function (o) {
  return _classPrivateFieldGet(_F, o);
}, function (o, v) {
  return _classPrivateFieldSet(_F, o, v);
}]], 0, function (_) {
  return _onResize.has(_checkInRHS(_));
}, i$1), _applyDecs2$e = _slicedToArray(_applyDecs2.e, 22), _init_label = _applyDecs2$e[0], _init_extra_label = _applyDecs2$e[1], _init_overflowing = _applyDecs2$e[2], _get_overflowing = _applyDecs2$e[3], _set_overflowing = _applyDecs2$e[4], _init_extra_overflowing = _applyDecs2$e[5], _init_atStart = _applyDecs2$e[6], _get_atStart = _applyDecs2$e[7], _set_atStart = _applyDecs2$e[8], _init_extra_atStart = _applyDecs2$e[9], _init_atEnd = _applyDecs2$e[10], _get_atEnd = _applyDecs2$e[11], _set_atEnd = _applyDecs2$e[12], _init_extra_atEnd = _applyDecs2$e[13], _init_children = _applyDecs2$e[14], _get_children = _applyDecs2$e[15], _applyDecs2$e[16], _init_extra_children = _applyDecs2$e[17], _init_scroller = _applyDecs2$e[18], _get_scroller = _applyDecs2$e[19], _applyDecs2$e[20], _init_extra_scroller = _applyDecs2$e[21], _applyDecs2$c = _slicedToArray(_applyDecs2.c, 2), _Scroller = _applyDecs2$c[0], _initClass = _applyDecs2$c[1], _Scroller3), _Class = /*#__PURE__*/function (_identity2) {
  function _Class() {
    var _this2;
    _classCallCheck(this, _Class);
    _this2 = _callSuper(this, _Class, [_Scroller]), _defineProperty(_assertThisInitialized(_this2), "styles", [styles, localStyles]), _initClass();
    return _this2;
  }
  _inherits(_Class, _identity2);
  return _createClass(_Class);
}(_identity), _defineProperty(_Class, _Scroller2, void 0), _Class)();
function _onSlotChange() {
  _assertClassBrand(_Scroller3_brand, this, _observe).call(this);
  _assertClassBrand(_Scroller3_brand, this, _syncPosition).call(this);
}
function _onScroll() {
  _assertClassBrand(_Scroller3_brand, this, _syncPosition).call(this);
}
function _onPreviousClick() {
  // The end buttons are `aria-disabled` rather than `disabled` so that
  // reaching an end doesn't drop keyboard focus to the document, which means
  // the click still arrives and has to be ignored here.
  if (!_classPrivateGetter(_Scroller3_brand, this, _get_atStart)) this.previous();
}
function _onNextClick() {
  if (!_classPrivateGetter(_Scroller3_brand, this, _get_atEnd)) this.next();
}
// #endregion
// #region Utility methods
/**
 * The scroller covers viewport resizes; the children cover content that
 * resizes inside a container that doesn't, such as an image loading. Children
 * change rarely, so rebuilding the whole set is cheaper than diffing it.
 */
function _observe() {
  var _this3 = this;
  if (!_classPrivateFieldGet(_resizeObserver, this) || !_classPrivateGetter(_Scroller3_brand, this, _get_scroller)) return;
  _classPrivateFieldGet(_resizeObserver, this).disconnect();
  _classPrivateFieldGet(_resizeObserver, this).observe(_classPrivateGetter(_Scroller3_brand, this, _get_scroller));
  _classPrivateGetter(_Scroller3_brand, this, _get_children).forEach(function (child) {
    return _classPrivateFieldGet(_resizeObserver, _this3).observe(child);
  });
}
/**
 * Whether there's anything to scroll, and how much of it is left in either
 * direction. `scrollLeft` is negative in right-to-left writing modes, where
 * the leading edge is still position zero.
 */
function _syncPosition() {
  if (!_classPrivateGetter(_Scroller3_brand, this, _get_scroller)) return;
  var overflow = _classPrivateGetter(_Scroller3_brand, this, _get_scroller).scrollWidth - _classPrivateGetter(_Scroller3_brand, this, _get_scroller).clientWidth;
  var position = Math.abs(_classPrivateGetter(_Scroller3_brand, this, _get_scroller).scrollLeft);
  _classPrivateSetter(_Scroller3_brand, _set_overflowing, this, overflow > TOLERANCE);
  _classPrivateSetter(_Scroller3_brand, _set_atStart, this, position <= TOLERANCE);
  _classPrivateSetter(_Scroller3_brand, _set_atEnd, this, position >= overflow - TOLERANCE);
}
/**
 * Each child's distance from the scroller's leading edge, which is also the
 * distance to scroll by to bring that child flush with it. Measured on demand
 * rather than cached, since children can move or resize between clicks.
 */
function _offsets() {
  if (!_classPrivateGetter(_Scroller3_brand, this, _get_scroller)) return [];
  var origin = _classPrivateGetter(_Scroller3_brand, this, _get_scroller).getBoundingClientRect().left;
  return _classPrivateGetter(_Scroller3_brand, this, _get_children).map(function (child) {
    return child.getBoundingClientRect().left - origin;
  });
}
function _scrollBy(offset) {
  // Omitting `behavior` defers to the `scroll-behavior` declared in CSS,
  // which is where reduced motion is handled.
  if (offset !== undefined) _classPrivateGetter(_Scroller3_brand, this, _get_scroller).scrollBy({
    left: offset
  });
}

export { _Scroller as Scroller };
