import { i, b as r, n, r as r$1, o, t, u, A, a as i$1 } from '../../dist/js/vendor.js';
import { S as SizeBreakpointMd, s as styles } from '../../dist/js/shared.js';

var _templateObject$1;
function _taggedTemplateLiteral$1(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var localStyles = i(_templateObject$1 || (_templateObject$1 = _taggedTemplateLiteral$1(["\n  :host {\n    --tcds-carousel-controls-position: relative;\n    --tcds-carousel-control-color: var(--tcds-color-palette-gray-400);\n    --tcds-carousel-control-color-hover: var(--tcds-color-palette-gray-500);\n    --tcds-carousel-control-color-active: var(--tcds-color-palette-black);\n    --tcds-carousel-dot-width: .625rem;\n    --tcds-carousel-dot-width-current: var(--tcds-carousel-dot-width);\n\n    flex-direction: column;\n    position: relative;\n\n    @media (prefers-reduced-motion: reduce) {\n      transition: none;\n    }\n  }\n\n  :host(:not([hidden])) {\n    display: flex;\n  }\n\n  :host([playing]) {\n    --tcds-carousel-control-color-active: var(--tcds-carousel-control-color);\n    --tcds-carousel-dot-progress-opacity: 1;\n    --tcds-carousel-dot-width-current: 2.625rem;\n  }\n\n  :host([controls=\"inset\"]) {\n    @media (min-width: ", ") {\n      --tcds-carousel-controls-position: absolute;\n      --tcds-carousel-controls-bottom: 3rem;\n      --tcds-carousel-controls-background: rgb(255 255 255 / 80%);\n      --tcds-carousel-controls-backdrop-filter: blur(15px);\n    }\n\n    @media (max-width: ", ") {\n      --tcds-carousel-controls-margin-top: var(--tcds-space-layout-xs);\n    }\n  }\n\n  :host(:not([controls=\"inset\"])) {\n    --tcds-carousel-controls-margin-top: var(--tcds-space-layout-xs);\n  }\n\n  [part=slides] {\n    display: grid;\n    position: relative;\n  }\n\n  [part=controls] {\n    display: inline-grid;\n    grid-template-areas: \"previous dots next toggle\";\n    align-items: center;\n    justify-content: center;\n    gap: var(--tcds-space-component-md);\n    position: var(--tcds-carousel-controls-position);\n    bottom: var(--tcds-carousel-controls-bottom);\n    left: 50%;\n    transform: translateX(-50%);\n    margin-top: var(--tcds-carousel-controls-margin-top);\n    padding: var(--tcds-space-component-xs);\n    width: fit-content;\n    background-color: var(--tcds-carousel-controls-background, transparent);\n    backdrop-filter: var(--tcds-carousel-controls-backdrop-filter, none);\n    border-radius: 3rem;\n    z-index: 2;\n  }\n\n  [part~=control] {\n    appearance: none;\n    border: 0;\n    background-color: transparent;\n    color: var(--tcds-carousel-control-color);\n    cursor: pointer;\n\n    &:hover {\n      color: var(--tcds-carousel-control-color-hover);\n    }\n\n    &:active {\n      color: var(--tcds-carousel-control-color-active);\n    }\n  }\n\n  [part~=next] {\n    grid-area: next;\n  }\n\n  [part~=previous] {\n    grid-area: previous;\n  }\n\n  [part~=toggle] {\n    --tcds-carousel-control-color: var(--tcds-color-theme-default-accent);\n    --tcds-carousel-control-color-hover: color-mix(in oklab, var(--tcds-carousel-control-color), rgb(0 0 0) 20%);\n\n    grid-area: toggle;\n    width: 1.5rem;\n    height: 1.5rem;\n    border-radius: 1.5rem;\n    border: 1.5px solid currentcolor;\n    font-size: .7rem;\n    padding: 0;\n  }\n\n  [part=dots] {\n    grid-area: dots;\n    display: flex;\n    gap: var(--tcds-space-component-md);\n  }\n\n  [part~=dot] {\n    position: relative;\n    overflow: hidden;\n    background-color: currentcolor;\n    width: var(--tcds-carousel-dot-width);\n    height: var(--tcds-carousel-dot-width);\n    border-radius: var(--tcds-carousel-dot-width);\n    padding: 0;\n    transition:\n      width var(--tcds-motion-duration-expressive) var(--tcds-motion-easing-enter);\n\n    @media (prefers-reduced-motion: reduce) {\n      transition: none;\n    }\n\n    &[aria-current=true] {\n      width: var(--tcds-carousel-dot-width-current);\n      background-color: var(--tcds-carousel-control-color-active);\n\n      &::after {\n        content: \"\";\n        opacity: var(--tcds-carousel-dot-progress-opacity, 0);\n        position: absolute;\n        inset: 0;\n        background-color: var(--tcds-color-palette-black);\n        border-radius: var(--tcds-carousel-dot-width);\n        width: 0%;\n      }\n    }\n  }\n"])), r(SizeBreakpointMd), r(SizeBreakpointMd));

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _Class, _Carousel3, _A, _B, _C, _D, _E, _Carousel3_brand, _F, _G, _H, _I, _J, _internals, _reducedMotion, _intersectionObserver, _progress, _onDocumentVisibilityChange, _onReducedMotionChange, _onIntersectionChange, _templateObject, _templateObject2, _templateObject3, _applyDecs2, _applyDecs2$e, _applyDecs2$c;
var _initClass, _init_playing, _init_extra_playing, _init_interval, _init_extra_interval, _init_index, _init_extra_index, _init_label, _init_extra_label, _init_count, _get_count, _set_count, _init_extra_count, _init_interacting, _get_interacting, _set_interacting, _init_extra_interacting, _init_documentHidden, _get_documentHidden, _set_documentHidden, _init_extra_documentHidden, _init_offscreen, _get_offscreen, _set_offscreen, _init_extra_offscreen, _init_mediaSuspended, _get_mediaSuspended, _set_mediaSuspended, _init_extra_mediaSuspended, _init_slides, _get_slides, _init_extra_slides, _Carousel2;
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = false, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = true, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), true), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
function _classPrivateGetter(s, r, a) { return a(_assertClassBrand(s, r)); }
function _classPrivateSetter(s, r, a, t) { return r(_assertClassBrand(s, a), t), t; }
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
var _Carousel;
new (_Carousel2 = (_A = /*#__PURE__*/new WeakMap(), _B = /*#__PURE__*/new WeakMap(), _C = /*#__PURE__*/new WeakMap(), _D = /*#__PURE__*/new WeakMap(), _E = /*#__PURE__*/new WeakMap(), _Carousel3_brand = /*#__PURE__*/new WeakSet(), _F = /*#__PURE__*/new WeakMap(), _G = /*#__PURE__*/new WeakMap(), _H = /*#__PURE__*/new WeakMap(), _I = /*#__PURE__*/new WeakMap(), _J = /*#__PURE__*/new WeakMap(), _internals = /*#__PURE__*/new WeakMap(), _reducedMotion = /*#__PURE__*/new WeakMap(), _intersectionObserver = /*#__PURE__*/new WeakMap(), _progress = /*#__PURE__*/new WeakMap(), _onDocumentVisibilityChange = /*#__PURE__*/new WeakMap(), _onReducedMotionChange = /*#__PURE__*/new WeakMap(), _onIntersectionChange = /*#__PURE__*/new WeakMap(), _Carousel3 = /*#__PURE__*/function (_LitElement) {
  // #endregion

  // #region Lifecycle
  function Carousel() {
    var _this3;
    _classCallCheck(this, Carousel);
    _this3 = _callSuper(this, Carousel);
    _classPrivateMethodInitSpec(_this3, _Carousel3_brand);
    // #region Properties and state
    _classPrivateFieldInitSpec(_this3, _A, _init_playing(_this3, false));
    _classPrivateFieldInitSpec(_this3, _B, (_init_extra_playing(_this3), _init_interval(_this3)));
    _classPrivateFieldInitSpec(_this3, _C, (_init_extra_interval(_this3), _init_index(_this3)));
    _classPrivateFieldInitSpec(_this3, _D, (_init_extra_index(_this3), _init_label(_this3)));
    _classPrivateFieldInitSpec(_this3, _E, (_init_extra_label(_this3), _init_count(_this3, 0)));
    _classPrivateFieldInitSpec(_this3, _F, (_init_extra_count(_this3), _init_interacting(_this3, false)));
    _classPrivateFieldInitSpec(_this3, _G, (_init_extra_interacting(_this3), _init_documentHidden(_this3, false)));
    _classPrivateFieldInitSpec(_this3, _H, (_init_extra_documentHidden(_this3), _init_offscreen(_this3, false)));
    /**
     * Whether the reader has asked for motion to stop. Distinct from `playing`,
     * which also goes false when navigation surrenders autoplay — that is not a
     * request to stop video.
     */
    _classPrivateFieldInitSpec(_this3, _I, (_init_extra_offscreen(_this3), _init_mediaSuspended(_this3, false)));
    // #endregion
    // #region Private variables
    _classPrivateFieldInitSpec(_this3, _J, (_init_extra_mediaSuspended(_this3), _init_slides(_this3)));
    _classPrivateFieldInitSpec(_this3, _internals, void _init_extra_slides(_this3));
    _classPrivateFieldInitSpec(_this3, _reducedMotion, void 0);
    _classPrivateFieldInitSpec(_this3, _intersectionObserver, void 0);
    _classPrivateFieldInitSpec(_this3, _progress, null);
    _classPrivateFieldInitSpec(_this3, _onDocumentVisibilityChange, function () {
      _classPrivateSetter(_Carousel3_brand, _set_documentHidden, _this3, document.visibilityState === "hidden");
    });
    _classPrivateFieldInitSpec(_this3, _onReducedMotionChange, function () {
      if (_classPrivateFieldGet(_reducedMotion, _this3).matches) _this3.pause();
    });
    _classPrivateFieldInitSpec(_this3, _onIntersectionChange, function (entries) {
      _classPrivateSetter(_Carousel3_brand, _set_offscreen, _this3, !entries[entries.length - 1].isIntersecting);
    });
    _this3.interval = 6;
    _this3.index = 0;
    _this3.label = "Carousel";
    _classPrivateFieldSet(_internals, _this3, _this3.attachInternals());
    _classPrivateFieldGet(_internals, _this3).role = "group";
    _classPrivateFieldGet(_internals, _this3).ariaRoleDescription = "carousel";
    _classPrivateFieldSet(_reducedMotion, _this3, matchMedia("(prefers-reduced-motion: reduce)"));
    return _this3;
  }
  _inherits(Carousel, _LitElement);
  return _createClass(Carousel, [{
    key: "playing",
    get: function get() {
      return _classPrivateFieldGet(_A, this);
    },
    set: function set(v) {
      _classPrivateFieldSet(_A, this, v);
    }
  }, {
    key: "interval",
    get: function get() {
      return _classPrivateFieldGet(_B, this);
    },
    set: function set(v) {
      _classPrivateFieldSet(_B, this, v);
    }
  }, {
    key: "index",
    get: function get() {
      return _classPrivateFieldGet(_C, this);
    },
    set: function set(v) {
      _classPrivateFieldSet(_C, this, v);
    }
  }, {
    key: "label",
    get: function get() {
      return _classPrivateFieldGet(_D, this);
    },
    set: function set(v) {
      _classPrivateFieldSet(_D, this, v);
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      _superPropGet(Carousel, "connectedCallback", this)([]);
      this.addEventListener("pointerenter", _assertClassBrand(_Carousel3_brand, this, _onInteractionChange));
      this.addEventListener("pointerleave", _assertClassBrand(_Carousel3_brand, this, _onInteractionChange));
      document.addEventListener("visibilitychange", _classPrivateFieldGet(_onDocumentVisibilityChange, this));
      _classPrivateFieldGet(_reducedMotion, this).addEventListener("change", _classPrivateFieldGet(_onReducedMotionChange, this));
      _classPrivateFieldGet(_onDocumentVisibilityChange, this).call(this);
    }
  }, {
    key: "willUpdate",
    value: function willUpdate() {
      _classPrivateFieldGet(_internals, this).ariaLabel = this.label;

      // Keep `index` inside the slide range no matter how it was set, including
      // when slides are added or removed underneath it.
      if (_classPrivateGetter(_Carousel3_brand, this, _get_count) > 0) {
        this.index = _assertClassBrand(_Carousel3_brand, this, _clamp).call(this, this.index);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;
      var positions = Array.from({
        length: _classPrivateGetter(_Carousel3_brand, this, _get_count)
      }, function (_, position) {
        return position;
      });
      return u(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n      <div\n        part=\"slides\"\n        aria-atomic=\"false\"\n        aria-live=", "\n        @focusin=", "\n        @focusout=", "\n      >\n        <slot @slotchange=", "></slot>\n      </div>\n      ", "\n    "])), this.playing ? "off" : "polite", _assertClassBrand(_Carousel3_brand, this, _onInteractionChange), _assertClassBrand(_Carousel3_brand, this, _onInteractionChange), _assertClassBrand(_Carousel3_brand, this, _onSlotChange), _classPrivateGetter(_Carousel3_brand, this, _get_count) > 1 ? u(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n        <div part=\"controls\">\n          <button\n            part=\"control previous\"\n            type=\"button\"\n            title=\"Previous slide\"\n            @click=", "\n          >\n            <span class=\"visually-hidden\">Previous slide</span>\n            <tcds-icon icon=\"caret-left\"></tcds-icon>\n          </button>\n          <button\n            part=\"control next\"\n            type=\"button\"\n            title=\"Next slide\"\n            @click=", "\n          >\n            <span class=\"visually-hidden\">Next slide</span>\n            <tcds-icon icon=\"caret-right\"></tcds-icon>\n          </button>\n          <div\n            part=\"dots\"\n            role=\"group\"\n            aria-label=\"Choose a slide to display\"\n            @keydown=", "\n          >\n            ", "\n          </div>\n          <button\n            part=\"control toggle\"\n            type=\"button\"\n            title=\"", " autoplay\"\n            @click=", "\n          >\n            <span class=\"visually-hidden\">\n              ", " autoplay\n            </span>\n            <tcds-icon icon=", "></tcds-icon>\n          </button>\n        </div>\n      "])), _assertClassBrand(_Carousel3_brand, this, _onPreviousClick), _assertClassBrand(_Carousel3_brand, this, _onNextClick), _assertClassBrand(_Carousel3_brand, this, _onDotsKeydown), positions.map(function (position) {
        return u(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n              <button\n                part=\"control dot\"\n                type=\"button\"\n                value=", "\n                title=\"Slide ", " of ", "\"\n                aria-current=", "\n                tabindex=", "\n                @click=", "\n              >\n                <span class=\"visually-hidden\">Slide ", " of ", "</span>\n              </button>\n            "])), position, position + 1, _classPrivateGetter(_Carousel3_brand, _this4, _get_count), position === _this4.index ? "true" : "false", position === _this4.index ? 0 : -1, _assertClassBrand(_Carousel3_brand, _this4, _onDotClick), position + 1, _classPrivateGetter(_Carousel3_brand, _this4, _get_count));
      }), this.playing ? "Pause" : "Play", _assertClassBrand(_Carousel3_brand, this, _onToggleClick), this.playing ? "Pause" : "Play", this.playing ? "pause" : "play") : A);
    }
  }, {
    key: "firstUpdated",
    value: function firstUpdated() {
      _classPrivateFieldGet(_onReducedMotionChange, this).call(this);
      _classPrivateFieldSet(_intersectionObserver, this, new IntersectionObserver(_classPrivateFieldGet(_onIntersectionChange, this)));
      _classPrivateFieldGet(_intersectionObserver, this).observe(this);
    }
  }, {
    key: "updated",
    value: function updated(changedProperties) {
      _assertClassBrand(_Carousel3_brand, this, _syncSlides).call(this);
      _assertClassBrand(_Carousel3_brand, this, _syncProgress).call(this);
      if (changedProperties.has("index") && changedProperties.get("index") !== undefined) {
        var _classPrivateGetter$t;
        _assertClassBrand(_Carousel3_brand, this, _emit).call(this, "change", {
          index: this.index,
          previousIndex: changedProperties.get("index"),
          slide: (_classPrivateGetter$t = _classPrivateGetter(_Carousel3_brand, this, _get_slides)[this.index]) !== null && _classPrivateGetter$t !== void 0 ? _classPrivateGetter$t : null
        });
      }
      if (changedProperties.has("playing") && changedProperties.get("playing") !== undefined) {
        _assertClassBrand(_Carousel3_brand, this, _emit).call(this, this.playing ? "play" : "pause");
      }
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      var _classPrivateFieldGet2, _classPrivateFieldGet3;
      _superPropGet(Carousel, "disconnectedCallback", this)([]);
      this.removeEventListener("pointerenter", _assertClassBrand(_Carousel3_brand, this, _onInteractionChange));
      this.removeEventListener("pointerleave", _assertClassBrand(_Carousel3_brand, this, _onInteractionChange));
      this.removeEventListener("focusin", _assertClassBrand(_Carousel3_brand, this, _onInteractionChange));
      this.removeEventListener("focusout", _assertClassBrand(_Carousel3_brand, this, _onInteractionChange));
      document.removeEventListener("visibilitychange", _classPrivateFieldGet(_onDocumentVisibilityChange, this));
      _classPrivateFieldGet(_reducedMotion, this).removeEventListener("change", _classPrivateFieldGet(_onReducedMotionChange, this));
      (_classPrivateFieldGet2 = _classPrivateFieldGet(_intersectionObserver, this)) === null || _classPrivateFieldGet2 === void 0 || _classPrivateFieldGet2.disconnect();
      (_classPrivateFieldGet3 = _classPrivateFieldGet(_progress, this)) === null || _classPrivateFieldGet3 === void 0 || _classPrivateFieldGet3.cancel();
    }
    // #endregion

    // #region Public methods
    /**
     * Show the slide at `position`, wrapping around either end. Does not affect
     * the playing state; use `pause()` alongside it for user-driven navigation.
     */
  }, {
    key: "select",
    value: function select(position) {
      if (_classPrivateGetter(_Carousel3_brand, this, _get_count) === 0) return;
      this.index = _assertClassBrand(_Carousel3_brand, this, _clamp).call(this, position);
    }
  }, {
    key: "next",
    value: function next() {
      this.select(this.index + 1);
    }
  }, {
    key: "previous",
    value: function previous() {
      this.select(this.index - 1);
    }

    /**
     * Starts everything the carousel moves on its own: slide rotation, and any
     * background video in the selected slide that this component stopped.
     */
  }, {
    key: "play",
    value: function play() {
      this.playing = true;
      _classPrivateSetter(_Carousel3_brand, _set_mediaSuspended, this, false);
    }

    /**
     * Stops everything the carousel moves on its own. Slides that aren't selected
     * keep their media paused when this is lifted, until they're revealed.
     */
  }, {
    key: "pause",
    value: function pause() {
      this.playing = false;
      _classPrivateSetter(_Carousel3_brand, _set_mediaSuspended, this, true);
    }
    // #endregion

    // #region Events

    // #endregion
  }]);
}(i$1), _applyDecs2 = _applyDecs(_Carousel3, [t("tcds-carousel")], [[n({
  type: Boolean,
  reflect: true
}), 1, "playing"], [n({
  type: Number
}), 1, "interval"], [n({
  type: Number
}), 1, "index"], [n({
  type: String
}), 1, "label"], [r$1(), 1, "count", function (o) {
  return _classPrivateFieldGet(_E, o);
}, function (o, v) {
  return _classPrivateFieldSet(_E, o, v);
}], [r$1(), 1, "interacting", function (o) {
  return _classPrivateFieldGet(_F, o);
}, function (o, v) {
  return _classPrivateFieldSet(_F, o, v);
}], [r$1(), 1, "documentHidden", function (o) {
  return _classPrivateFieldGet(_G, o);
}, function (o, v) {
  return _classPrivateFieldSet(_G, o, v);
}], [r$1(), 1, "offscreen", function (o) {
  return _classPrivateFieldGet(_H, o);
}, function (o, v) {
  return _classPrivateFieldSet(_H, o, v);
}], [r$1(), 1, "mediaSuspended", function (o) {
  return _classPrivateFieldGet(_I, o);
}, function (o, v) {
  return _classPrivateFieldSet(_I, o, v);
}], [o({
  flatten: true,
  selector: "tcds-slide"
}), 1, "slides", function (o) {
  return _classPrivateFieldGet(_J, o);
}, function (o, v) {
  return _classPrivateFieldSet(_J, o, v);
}]], 0, function (_) {
  return _onIntersectionChange.has(_checkInRHS(_));
}, i$1), _applyDecs2$e = _slicedToArray(_applyDecs2.e, 32), _init_playing = _applyDecs2$e[0], _init_extra_playing = _applyDecs2$e[1], _init_interval = _applyDecs2$e[2], _init_extra_interval = _applyDecs2$e[3], _init_index = _applyDecs2$e[4], _init_extra_index = _applyDecs2$e[5], _init_label = _applyDecs2$e[6], _init_extra_label = _applyDecs2$e[7], _init_count = _applyDecs2$e[8], _get_count = _applyDecs2$e[9], _set_count = _applyDecs2$e[10], _init_extra_count = _applyDecs2$e[11], _init_interacting = _applyDecs2$e[12], _get_interacting = _applyDecs2$e[13], _set_interacting = _applyDecs2$e[14], _init_extra_interacting = _applyDecs2$e[15], _init_documentHidden = _applyDecs2$e[16], _get_documentHidden = _applyDecs2$e[17], _set_documentHidden = _applyDecs2$e[18], _init_extra_documentHidden = _applyDecs2$e[19], _init_offscreen = _applyDecs2$e[20], _get_offscreen = _applyDecs2$e[21], _set_offscreen = _applyDecs2$e[22], _init_extra_offscreen = _applyDecs2$e[23], _init_mediaSuspended = _applyDecs2$e[24], _get_mediaSuspended = _applyDecs2$e[25], _set_mediaSuspended = _applyDecs2$e[26], _init_extra_mediaSuspended = _applyDecs2$e[27], _init_slides = _applyDecs2$e[28], _get_slides = _applyDecs2$e[29], _applyDecs2$e[30], _init_extra_slides = _applyDecs2$e[31], _applyDecs2$c = _slicedToArray(_applyDecs2.c, 2), _Carousel = _applyDecs2$c[0], _initClass = _applyDecs2$c[1], _Carousel3), _Class = /*#__PURE__*/function (_identity2) {
  function _Class() {
    var _this5;
    _classCallCheck(this, _Class);
    _this5 = _callSuper(this, _Class, [_Carousel]), _defineProperty(_assertThisInitialized(_this5), "styles", [styles, localStyles]), _initClass();
    return _this5;
  }
  _inherits(_Class, _identity2);
  return _createClass(_Class);
}(_identity), _defineProperty(_Class, _Carousel2, void 0), _Class)();
function _onSlotChange() {
  _classPrivateSetter(_Carousel3_brand, _set_count, this, _classPrivateGetter(_Carousel3_brand, this, _get_slides).length);
  _assertClassBrand(_Carousel3_brand, this, _syncSlides).call(this);
}
function _onInteractionChange(event) {
  // Scoped to the slides region rather than the host, so focusing the play
  // button doesn't count as interaction and leave it unable to resume.
  _classPrivateSetter(_Carousel3_brand, _set_interacting, this, event.type === "pointerenter" || event.type === "focusin");
}
function _onPreviousClick() {
  _assertClassBrand(_Carousel3_brand, this, _navigate).call(this, this.index - 1);
}
function _onNextClick() {
  _assertClassBrand(_Carousel3_brand, this, _navigate).call(this, this.index + 1);
}
function _onDotClick(event) {
  _assertClassBrand(_Carousel3_brand, this, _navigate).call(this, Number(event.currentTarget.value));
}
function _onToggleClick() {
  this.playing ? this.pause() : this.play();
}
function _onDotsKeydown(_x) {
  return _onDotsKeydown2.apply(this, arguments);
}
function _onDotsKeydown2() {
  _onDotsKeydown2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(event) {
    var _this$renderRoot$quer;
    var positions;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          positions = {
            ArrowLeft: this.index - 1,
            ArrowRight: this.index + 1,
            Home: 0,
            End: _classPrivateGetter(_Carousel3_brand, this, _get_count) - 1
          };
          if (event.key in positions) {
            _context.n = 1;
            break;
          }
          return _context.a(2);
        case 1:
          event.preventDefault();
          _assertClassBrand(_Carousel3_brand, this, _navigate).call(this, positions[event.key]);

          // `aria-current` is the focus target, so wait for it to settle. lit-html
          // reuses the same button elements across renders, so this moves focus
          // between existing nodes rather than chasing replaced ones.
          _context.n = 2;
          return this.updateComplete;
        case 2:
          (_this$renderRoot$quer = this.renderRoot.querySelector("[part~=dot][aria-current=true]")) === null || _this$renderRoot$quer === void 0 || _this$renderRoot$quer.focus();
        case 3:
          return _context.a(2);
      }
    }, _callee, this);
  }));
  return _onDotsKeydown2.apply(this, arguments);
}
// #endregion
// #region Utility methods
/**
 * Whether the timer should currently be running. `playing` is the user's
 * standing intent; the rest are transient conditions that suspend rotation
 * without discarding that intent.
 */
function _get_advancing(_this) {
  return _this.playing && _classPrivateGetter(_Carousel3_brand, _this, _get_count) > 1 && !_classPrivateGetter(_Carousel3_brand, _this, _get_interacting) && !_classPrivateGetter(_Carousel3_brand, _this, _get_documentHidden) && !_classPrivateGetter(_Carousel3_brand, _this, _get_offscreen);
}
/**
 * Wrap `position` into the slide range. Shared by `willUpdate`, `select` and
 * `#syncSlides` so all three agree on which slide is current, including
 * during a slot change, before `index` itself has been clamped.
 */
function _clamp(position) {
  if (_classPrivateGetter(_Carousel3_brand, this, _get_count) === 0) return 0;
  var requested = Number.isFinite(position) ? Math.trunc(position) : 0;
  return (requested % _classPrivateGetter(_Carousel3_brand, this, _get_count) + _classPrivateGetter(_Carousel3_brand, this, _get_count)) % _classPrivateGetter(_Carousel3_brand, this, _get_count);
}
function _get_interval(_this2) {
  return Math.max(Number.isFinite(_this2.interval) ? _this2.interval * 1000 : 0, 1000);
}
/**
 * Manual navigation surrenders autoplay, per the ARIA authoring practices for
 * carousels: once the reader takes the wheel, the carousel stops moving out
 * from under them. It sets `playing` rather than calling `pause()`, because
 * asking for the next slide is not a request to stop that slide's video.
 */
function _navigate(position) {
  this.playing = false;
  this.select(position);
}
function _syncProgress() {
  var _classPrivateFieldGet4,
    _classPrivateFieldGet5,
    _this6 = this;
  var target = this.renderRoot.querySelector("[part~=dot][aria-current=true]");
  var stale = ((_classPrivateFieldGet4 = _classPrivateFieldGet(_progress, this)) === null || _classPrivateFieldGet4 === void 0 ? void 0 : _classPrivateFieldGet4.effect.target) !== target || ((_classPrivateFieldGet5 = _classPrivateFieldGet(_progress, this)) === null || _classPrivateFieldGet5 === void 0 ? void 0 : _classPrivateFieldGet5.effect.getTiming().duration) !== _classPrivateGetter(_Carousel3_brand, this, _get_interval);
  if (stale) {
    var _classPrivateFieldGet6;
    (_classPrivateFieldGet6 = _classPrivateFieldGet(_progress, this)) === null || _classPrivateFieldGet6 === void 0 || _classPrivateFieldGet6.cancel();
    _classPrivateFieldSet(_progress, this, null);
  }
  if (!_classPrivateGetter(_Carousel3_brand, this, _get_advancing) || !target) {
    var _classPrivateFieldGet7;
    (_classPrivateFieldGet7 = _classPrivateFieldGet(_progress, this)) === null || _classPrivateFieldGet7 === void 0 || _classPrivateFieldGet7.pause();
    return;
  }
  if (_classPrivateFieldGet(_progress, this)) {
    _classPrivateFieldGet(_progress, this).play();
    return;
  }
  _classPrivateFieldSet(_progress, this, target.animate([{
    width: "0%"
  }, {
    width: "100%"
  }], {
    duration: _classPrivateGetter(_Carousel3_brand, this, _get_interval),
    easing: "linear",
    fill: "forwards",
    pseudoElement: "::after"
  }));
  _classPrivateFieldGet(_progress, this).onfinish = function () {
    return _this6.next();
  };
}
function _syncSlides() {
  var _this7 = this;
  var slides = _classPrivateGetter(_Carousel3_brand, this, _get_slides);
  var index = _assertClassBrand(_Carousel3_brand, this, _clamp).call(this, this.index);
  slides.forEach(function (slide, position) {
    slide.position = position;
    slide.total = slides.length;
    slide.toggleAttribute("selected", position === index);
    slide.toggleAttribute("suspended", _classPrivateGetter(_Carousel3_brand, _this7, _get_mediaSuspended));
  });
}
function _emit(name, detail) {
  this.dispatchEvent(new CustomEvent("tcds-carousel-".concat(name), {
    detail: detail,
    bubbles: true,
    composed: true
  }));
}

export { _Carousel as Carousel };
