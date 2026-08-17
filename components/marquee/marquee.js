import { i, n, r, t, u, a as i$1 } from '../../dist/js/vendor.js';
import { s as styles } from '../../dist/js/shared.js';

var _templateObject$1;
function _taggedTemplateLiteral$1(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var localStyles = i(_templateObject$1 || (_templateObject$1 = _taggedTemplateLiteral$1(["\n  :host {\n    --tcds-marquee-gap: 0px;\n    --tcds-marquee-cycle: 0px;\n    --tcds-marquee-duration: 1s;\n\n    overflow: hidden;\n    gap: var(--tcds-marquee-gap);\n\n    @media (prefers-reduced-motion: reduce) {\n      overflow-x: auto;\n    }\n  }\n\n  :host(:not([hidden])) {\n    display: block;\n  }\n\n  :host([paused]) {\n    --tcds-marquee-play-state: paused;\n  }\n\n  [part=track] {\n    display: flex;\n    flex: 0 0 auto;\n    width: max-content;\n    background-color: var(--tcds-color-theme-background);\n    color: var(--tcds-color-theme-text-primary);\n    padding: var(--tcds-space-component-md) 0;\n    will-change: transform;\n    animation: tcds-marquee-scroll var(--tcds-marquee-duration) linear infinite;\n    animation-play-state: var(--tcds-marquee-play-state, running);\n\n    @media (prefers-reduced-motion: reduce) {\n      animation: none;\n    }\n\n    &:hover,\n    &:focus-within {\n      --tcds-marquee-play-state: paused;\n    }\n  }\n\n  .group {\n    display: flex;\n    flex: 0 0 auto;\n    align-items: center;\n    gap: var(--tcds-marquee-gap);\n    margin-inline-end: var(--tcds-marquee-gap);\n\n    @media (prefers-reduced-motion: reduce) {\n      &:not(:first-child) {\n        display: none;\n      }\n    }\n  }\n\n  [part=toggle] {\n    appearance: none;\n    display: block;\n    background: transparent;\n    color: var(--tcds-color-theme-default-accent);\n    border: 1.5px solid currentcolor;\n    width: 1.5rem;\n    height: 1.5rem;\n    border-radius: 1.5rem;\n    font-size: .7rem;\n    margin: var(--tcds-space-component-sm) auto;\n    padding: 0;\n    cursor: pointer;\n  }\n\n  @keyframes tcds-marquee-scroll {\n    from {\n      transform: translateX(0);\n    }\n\n    to {\n      transform: translateX(calc(-1 * var(--tcds-marquee-cycle)));\n    }\n  }\n"])));

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _Class, _Marquee3, _A, _B, _C, _Marquee3_brand, _customProperties, _contentVersion, _builtVersion, _builtCopies, _frame, _group, _slot, _resizeObserver, _templateObject, _templateObject2, _applyDecs2, _applyDecs2$e, _applyDecs2$c;
var _initClass, _init_paused, _init_extra_paused, _init_speed, _init_extra_speed, _init_copies, _get_copies, _set_copies, _init_extra_copies, _Marquee2;
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
var _Marquee;
new (_Marquee2 = (_A = /*#__PURE__*/new WeakMap(), _B = /*#__PURE__*/new WeakMap(), _C = /*#__PURE__*/new WeakMap(), _Marquee3_brand = /*#__PURE__*/new WeakSet(), _customProperties = /*#__PURE__*/new WeakMap(), _contentVersion = /*#__PURE__*/new WeakMap(), _builtVersion = /*#__PURE__*/new WeakMap(), _builtCopies = /*#__PURE__*/new WeakMap(), _frame = /*#__PURE__*/new WeakMap(), _group = /*#__PURE__*/new WeakMap(), _slot = /*#__PURE__*/new WeakMap(), _resizeObserver = /*#__PURE__*/new WeakMap(), _Marquee3 = /*#__PURE__*/function (_LitElement) {
  // #endregion

  // #region Lifecycle
  function Marquee() {
    var _this;
    _classCallCheck(this, Marquee);
    _this = _callSuper(this, Marquee);
    _classPrivateMethodInitSpec(_this, _Marquee3_brand);
    // #region Properties and state
    _classPrivateFieldInitSpec(_this, _A, _init_paused(_this, false));
    _classPrivateFieldInitSpec(_this, _B, (_init_extra_paused(_this), _init_speed(_this)));
    _classPrivateFieldInitSpec(_this, _C, (_init_extra_speed(_this), _init_copies(_this, 2)));
    // #endregion

    // #region Private variables
    _classPrivateFieldInitSpec(_this, _customProperties, (_init_extra_copies(_this), new Map()));
    _classPrivateFieldInitSpec(_this, _contentVersion, 0);
    _classPrivateFieldInitSpec(_this, _builtVersion, -1);
    _classPrivateFieldInitSpec(_this, _builtCopies, -1);
    _classPrivateFieldInitSpec(_this, _frame, 0);
    _classPrivateFieldInitSpec(_this, _group, void 0);
    _classPrivateFieldInitSpec(_this, _slot, void 0);
    _classPrivateFieldInitSpec(_this, _resizeObserver, void 0);
    _this.speed = 30;
    return _this;
  }
  _inherits(Marquee, _LitElement);
  return _createClass(Marquee, [{
    key: "paused",
    get: function get() {
      return _classPrivateFieldGet(_A, this);
    },
    set: function set(v) {
      _classPrivateFieldSet(_A, this, v);
    }
  }, {
    key: "speed",
    get: function get() {
      return _classPrivateFieldGet(_B, this);
    },
    set: function set(v) {
      _classPrivateFieldSet(_B, this, v);
    }
  }, {
    key: "render",
    value: function render() {
      var clones = Array.from({
        length: Math.max(_classPrivateGetter(_Marquee3_brand, this, _get_copies) - 1, 0)
      }, function (_, i) {
        return i;
      });
      return u(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n      <div part=\"track\">\n        <div class=\"group\">\n          <slot @slotchange=", "></slot>\n        </div>\n        ", "\n      </div>\n      <button\n        part=\"toggle\"\n        type=\"button\"\n        aria-pressed=", "\n        @click=", "\n      >\n        <span class=\"visually-hidden\">Toggle scrolling animation</span>\n        <tcds-icon icon=\"", "\"></tcds-icon>\n      </button>\n    "])), _assertClassBrand(_Marquee3_brand, this, _onSlotChange), clones.map(function (i) {
        return u(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n          <div class=\"group\" aria-hidden=\"true\">\n            <slot name=\"clone-slot-", "\"></slot>\n          </div>\n        "])), i);
      }), this.paused, _assertClassBrand(_Marquee3_brand, this, _togglePause), this.paused ? "play" : "pause");
    }
  }, {
    key: "firstUpdated",
    value: function firstUpdated() {
      var _this2 = this,
        _document$fonts;
      _classPrivateFieldSet(_group, this, this.renderRoot.querySelector(".group"));
      _classPrivateFieldSet(_slot, this, this.renderRoot.querySelector("slot:not([name])"));
      _classPrivateFieldSet(_resizeObserver, this, new ResizeObserver(function () {
        return _assertClassBrand(_Marquee3_brand, _this2, _schedule).call(_this2);
      }));
      _classPrivateFieldGet(_resizeObserver, this).observe(this);
      _classPrivateFieldGet(_resizeObserver, this).observe(_classPrivateFieldGet(_group, this));
      (_document$fonts = document.fonts) === null || _document$fonts === void 0 || _document$fonts.ready.then(function () {
        return _assertClassBrand(_Marquee3_brand, _this2, _schedule).call(_this2);
      });
      _assertClassBrand(_Marquee3_brand, this, _schedule).call(this);
    }
  }, {
    key: "updated",
    value: function updated(changedProperties) {
      _assertClassBrand(_Marquee3_brand, this, _syncClones).call(this);
      if (changedProperties.has("speed")) _assertClassBrand(_Marquee3_brand, this, _schedule).call(this);
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      var _classPrivateFieldGet2;
      _superPropGet(Marquee, "disconnectedCallback", this)([]);
      (_classPrivateFieldGet2 = _classPrivateFieldGet(_resizeObserver, this)) === null || _classPrivateFieldGet2 === void 0 || _classPrivateFieldGet2.disconnect();
      cancelAnimationFrame(_classPrivateFieldGet(_frame, this));
    }
    // #endregion

    // #region Events

    // #endregion
  }]);
}(i$1), _applyDecs2 = _applyDecs(_Marquee3, [t("tcds-marquee")], [[n({
  type: Boolean,
  reflect: true
}), 1, "paused"], [n({
  type: Number
}), 1, "speed"], [r(), 1, "copies", function (o) {
  return _classPrivateFieldGet(_C, o);
}, function (o, v) {
  return _classPrivateFieldSet(_C, o, v);
}]], 0, function (_) {
  return _resizeObserver.has(_checkInRHS(_));
}, i$1), _applyDecs2$e = _slicedToArray(_applyDecs2.e, 8), _init_paused = _applyDecs2$e[0], _init_extra_paused = _applyDecs2$e[1], _init_speed = _applyDecs2$e[2], _init_extra_speed = _applyDecs2$e[3], _init_copies = _applyDecs2$e[4], _get_copies = _applyDecs2$e[5], _set_copies = _applyDecs2$e[6], _init_extra_copies = _applyDecs2$e[7], _applyDecs2$c = _slicedToArray(_applyDecs2.c, 2), _Marquee = _applyDecs2$c[0], _initClass = _applyDecs2$c[1], _Marquee3), _Class = /*#__PURE__*/function (_identity2) {
  function _Class() {
    var _this3;
    _classCallCheck(this, _Class);
    _this3 = _callSuper(this, _Class, [_Marquee]), _defineProperty(_assertThisInitialized(_this3), "styles", [styles, localStyles]), _initClass();
    return _this3;
  }
  _inherits(_Class, _identity2);
  return _createClass(_Class);
}(_identity), _defineProperty(_Class, _Marquee2, void 0), _Class)();
function _onSlotChange() {
  var _this$contentVersion;
  _classPrivateFieldSet(_contentVersion, this, (_this$contentVersion = _classPrivateFieldGet(_contentVersion, this), _this$contentVersion++, _this$contentVersion));
  _assertClassBrand(_Marquee3_brand, this, _schedule).call(this);
  _assertClassBrand(_Marquee3_brand, this, _syncClones).call(this);
}
function _togglePause() {
  this.paused = !this.paused;
}
// #endregion
// #region Utility methods
function _schedule() {
  var _this4 = this;
  cancelAnimationFrame(_classPrivateFieldGet(_frame, this));
  _classPrivateFieldSet(_frame, this, requestAnimationFrame(function () {
    return _assertClassBrand(_Marquee3_brand, _this4, _measure).call(_this4);
  }));
}
function _measure() {
  if (!_classPrivateFieldGet(_group, this) || !this.isConnected) return;
  var gap = _assertClassBrand(_Marquee3_brand, this, _readGap).call(this);
  _assertClassBrand(_Marquee3_brand, this, _setCustomProperty).call(this, "--tcds-marquee-gap", "".concat(gap, "px"));
  var groupWidth = _classPrivateFieldGet(_group, this).getBoundingClientRect().width;
  var cycle = groupWidth + gap;
  if (cycle <= 0) return;
  var viewport = this.getBoundingClientRect().width;
  _classPrivateSetter(_Marquee3_brand, _set_copies, this, Math.max(2, Math.ceil(viewport / cycle) + 1));
  _assertClassBrand(_Marquee3_brand, this, _setCustomProperty).call(this, "--tcds-marquee-cycle", "".concat(cycle, "px"));
  _assertClassBrand(_Marquee3_brand, this, _setCustomProperty).call(this, "--tcds-marquee-duration", "".concat((cycle / Math.max(this.speed, 1)).toFixed(4), "s"));
}
function _readGap() {
  var value = parseFloat(getComputedStyle(this).columnGap);
  return Number.isFinite(value) ? value : 0;
}
function _setCustomProperty(name, value) {
  if (_classPrivateFieldGet(_customProperties, this).get(name) === value) return;
  _classPrivateFieldGet(_customProperties, this).set(name, value);
  this.style.setProperty(name, value);
}
function _syncClones() {
  if (!_classPrivateFieldGet(_slot, this)) return;
  var needed = Math.max(_classPrivateGetter(_Marquee3_brand, this, _get_copies) - 1, 0);
  if (_classPrivateFieldGet(_builtCopies, this) === needed && _classPrivateFieldGet(_builtVersion, this) === _classPrivateFieldGet(_contentVersion, this)) return;
  _classPrivateFieldSet(_builtCopies, this, needed);
  _classPrivateFieldSet(_builtVersion, this, _classPrivateFieldGet(_contentVersion, this));
  for (var _i = 0, _Array$from = Array.from(this.children); _i < _Array$from.length; _i++) {
    var child = _Array$from[_i];
    if (child.hasAttribute("data-tcds-marquee-clone")) child.remove();
  }
  var source = _classPrivateFieldGet(_slot, this).assignedElements();
  if (!source.length) return;
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < needed; i++) {
    var _iterator = _createForOfIteratorHelper(source),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var element = _step.value;
        fragment.append(_assertClassBrand(_Marquee3_brand, this, _makeClone).call(this, element, i));
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  this.append(fragment);
}
function _makeClone(element, index) {
  var clone = element.cloneNode(true);
  clone.toggleAttribute("data-tcds-marquee-clone", true);
  clone.setAttribute("slot", "clone-slot-".concat(index));
  clone.setAttribute("aria-hidden", "true");
  clone.inert = true;
  clone.removeAttribute("id");
  var _iterator2 = _createForOfIteratorHelper(clone.querySelectorAll("[id]")),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var node = _step2.value;
      node.removeAttribute("id");
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return clone;
}

export { _Marquee as Marquee };
