import { i, u, a as i$1, n, t } from '../../dist/js/vendor.js';
import { s as styles, r as restoreMedia, p as pauseMedia, b as prepareMedia } from '../../dist/js/shared.js';

var _templateObject$1;
function _taggedTemplateLiteral$1(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var localStyles = i(_templateObject$1 || (_templateObject$1 = _taggedTemplateLiteral$1(["\n  :host {\n    grid-area: 1 / 1;\n    opacity: 0;\n    visibility: hidden;\n    z-index: 1;\n    pointer-events: none;\n\n    @media (prefers-reduced-motion: reduce) {\n      transition: none;\n    }\n  }\n\n  :host(:state(ready)) {\n    transition:\n      opacity var(--tcds-carousel-transition-duration, 500ms) ease,\n      visibility 0s linear var(--tcds-carousel-transition-duration, 500ms);\n  }\n\n  :host(:not([hidden])) {\n    display: block;\n  }\n\n  :host([selected]) {\n    opacity: 1;\n    visibility: visible;\n    z-index: 0;\n    transition: none;\n    pointer-events: auto;\n\n    @media (prefers-reduced-motion: reduce) {\n      transition: none;\n    }\n  }\n"])));

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _Class, _Slide3, _A, _B, _C, _D, _internals, _owner, _settled, _Slide3_brand, _templateObject, _applyDecs2, _applyDecs2$e, _applyDecs2$c;
var _initClass, _init_selected, _init_extra_selected, _init_suspended, _init_extra_suspended, _init_position, _init_extra_position, _init_total, _init_extra_total, _Slide2;
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = true, o = false; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = true, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = false, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = true, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), true), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", { writable: false }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: true, configurable: true } }), Object.defineProperty(t, "prototype", { writable: false }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
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
 * Distinguishes each slide's paused media from a nested carousel's, so an outer
 * slide reactivating doesn't restart embeds an inner slide deliberately stopped.
 */
var owners = 0;
var _Slide;
new (_Slide2 = (_A = /*#__PURE__*/new WeakMap(), _B = /*#__PURE__*/new WeakMap(), _C = /*#__PURE__*/new WeakMap(), _D = /*#__PURE__*/new WeakMap(), _internals = /*#__PURE__*/new WeakMap(), _owner = /*#__PURE__*/new WeakMap(), _settled = /*#__PURE__*/new WeakMap(), _Slide3_brand = /*#__PURE__*/new WeakSet(), _Slide3 = /*#__PURE__*/function (_LitElement) {
  // #endregion

  // #region Lifecycle
  function Slide() {
    var _this;
    _classCallCheck(this, Slide);
    _this = _callSuper(this, Slide);
    // #endregion
    // #region Media
    _classPrivateMethodInitSpec(_this, _Slide3_brand);
    // #region Properties and state
    /**
     * Set by the parent carousel. Drives visibility, which in turn removes
     * unselected slides from the tab order and the accessibility tree.
     */
    _classPrivateFieldInitSpec(_this, _A, _init_selected(_this, false));
    /**
     * Set by the parent carousel while its playback toggle is off. Holds this
     * slide's media paused even when the slide is selected, and is checked again
     * on reveal, so a slide surfaced during a suspension stays quiet.
     */
    _classPrivateFieldInitSpec(_this, _B, (_init_extra_selected(_this), _init_suspended(_this, false)));
    /**
     * Zero-based position among sibling slides, assigned by the parent carousel
     * as a property so the light DOM markup stays clean.
     */
    _classPrivateFieldInitSpec(_this, _C, (_init_extra_suspended(_this), _init_position(_this)));
    /**
     * Total sibling slide count, assigned by the parent carousel.
     */
    _classPrivateFieldInitSpec(_this, _D, (_init_extra_position(_this), _init_total(_this)));
    // #endregion

    // #region Private variables
    _classPrivateFieldInitSpec(_this, _internals, void _init_extra_total(_this));
    _classPrivateFieldInitSpec(_this, _owner, "tcds-slide-".concat(++owners));
    _classPrivateFieldInitSpec(_this, _settled, false);
    _this.position = 0;
    _this.total = 1;
    _classPrivateFieldSet(_internals, _this, _this.attachInternals());
    _classPrivateFieldGet(_internals, _this).role = "group";
    _classPrivateFieldGet(_internals, _this).ariaRoleDescription = "slide";
    return _this;
  }
  _inherits(Slide, _LitElement);
  return _createClass(Slide, [{
    key: "selected",
    get: function get() {
      return _classPrivateFieldGet(_A, this);
    },
    set: function set(v) {
      _classPrivateFieldSet(_A, this, v);
    }
  }, {
    key: "suspended",
    get: function get() {
      return _classPrivateFieldGet(_B, this);
    },
    set: function set(v) {
      _classPrivateFieldSet(_B, this, v);
    }
  }, {
    key: "position",
    get: function get() {
      return _classPrivateFieldGet(_C, this);
    },
    set: function set(v) {
      _classPrivateFieldSet(_C, this, v);
    }
  }, {
    key: "total",
    get: function get() {
      return _classPrivateFieldGet(_D, this);
    },
    set: function set(v) {
      _classPrivateFieldSet(_D, this, v);
    }
  }, {
    key: "firstUpdated",
    value: function () {
      var _firstUpdated = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              // Reading a layout value forces the browser to resolve the component's own
              // styles while `transition` is still `none`, so the jump from the
              // pre-upgrade defaults lands instantly instead of animating. Transitions
              // are enabled only afterward, for real slide changes.
              this.offsetHeight;
              _classPrivateFieldGet(_internals, this).states.add("ready");

              // The initial state is not a transition, so `updated` won't catch it, and
              // it can't be read here either: the parent carousel assigns `selected`
              // from its own update, which may not have run yet. A frame is enough for
              // that to settle, and still lands before the first paint.
              _context.n = 1;
              return new Promise(requestAnimationFrame);
            case 1:
              _classPrivateFieldSet(_settled, this, true);
              _assertClassBrand(_Slide3_brand, this, _syncMedia).call(this);
            case 2:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function firstUpdated() {
        return _firstUpdated.apply(this, arguments);
      }
      return firstUpdated;
    }()
  }, {
    key: "willUpdate",
    value: function willUpdate() {
      _classPrivateFieldGet(_internals, this).ariaLabel = "".concat(this.position + 1, " of ").concat(this.total);
    }
  }, {
    key: "updated",
    value: function updated(changedProperties) {
      // The first update is not a transition; `firstUpdated` handles it once the
      // parent has had a chance to assign both of these.
      if (!_classPrivateFieldGet(_settled, this)) return;
      if (!changedProperties.has("selected") && !changedProperties.has("suspended")) return;
      _assertClassBrand(_Slide3_brand, this, _syncMedia).call(this);
    }
  }, {
    key: "render",
    value: function render() {
      return u(_templateObject || (_templateObject = _taggedTemplateLiteral(["<slot @slotchange=", "></slot>"])), _assertClassBrand(_Slide3_brand, this, _onSlotChange));
    } // #endregion
  }]);
}(i$1), _applyDecs2 = _applyDecs(_Slide3, [t("tcds-slide")], [[n({
  type: Boolean,
  reflect: true
}), 1, "selected"], [n({
  type: Boolean,
  reflect: true
}), 1, "suspended"], [n({
  type: Number
}), 1, "position"], [n({
  type: Number
}), 1, "total"]], 0, void 0, i$1), _applyDecs2$e = _slicedToArray(_applyDecs2.e, 8), _init_selected = _applyDecs2$e[0], _init_extra_selected = _applyDecs2$e[1], _init_suspended = _applyDecs2$e[2], _init_extra_suspended = _applyDecs2$e[3], _init_position = _applyDecs2$e[4], _init_extra_position = _applyDecs2$e[5], _init_total = _applyDecs2$e[6], _init_extra_total = _applyDecs2$e[7], _applyDecs2$c = _slicedToArray(_applyDecs2.c, 2), _Slide = _applyDecs2$c[0], _initClass = _applyDecs2$c[1], _Slide3), _Class = /*#__PURE__*/function (_identity2) {
  function _Class() {
    var _this2;
    _classCallCheck(this, _Class);
    _this2 = _callSuper(this, _Class, [_Slide]), _defineProperty(_assertThisInitialized(_this2), "styles", [styles, localStyles]), _initClass();
    return _this2;
  }
  _inherits(_Class, _identity2);
  return _createClass(_Class);
}(_identity), _defineProperty(_Class, _Slide2, void 0), _Class)();
function _onSlotChange() {
  // Rewrites src, so it has to run before the embed loads rather than on a
  // later transition. Authoring enablejsapi=1 in the markup skips the rewrite.
  prepareMedia(this);

  // Content can arrive long after the slide settles.
  if (_classPrivateFieldGet(_settled, this)) _assertClassBrand(_Slide3_brand, this, _syncMedia).call(this);
}
function _syncMedia() {
  if (this.selected && !this.suspended) {
    // Background video restarts itself. Anything with a soundtrack stays
    // paused: a slide can become selected from autorotation, not a click.
    // Pass `resume: true` here to restart that too.
    restoreMedia(this, {
      owner: _classPrivateFieldGet(_owner, this)
    });
  } else {
    // display:none does not stop playback, and detaching an embed that never
    // loaded defers the request until the slide is actually shown. Media
    // already paused by a nested scope keeps that scope's bookkeeping.
    pauseMedia(this, {
      owner: _classPrivateFieldGet(_owner, this)
    });
  }
}

export { _Slide as Slide };
