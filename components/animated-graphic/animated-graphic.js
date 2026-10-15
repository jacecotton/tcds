import { i, r, o, t, u, a as i$1 } from '../../dist/js/vendor.js';
import { s as styles } from '../../dist/js/shared.js';

var _templateObject$1;
function _taggedTemplateLiteral$1(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var localStyles = i(_templateObject$1 || (_templateObject$1 = _taggedTemplateLiteral$1(["\n  :host {\n    position: relative;\n    border-radius: var(--tcds-border-radius-lg);\n    overflow: hidden;\n  }\n\n  :host(:not([hidden])) {\n    display: inline-block;\n  }\n\n  ::slotted(video) {\n    aspect-ratio: var(--tcds-aspect-ratio-square);\n    object-fit: cover;\n    width: 100%;\n  }\n\n  [part=toggle] {\n    position: absolute;\n    right: var(--tcds-space-component-lg);\n    bottom: var(--tcds-space-component-lg);\n  }\n"])));

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _Class, _AnimatedGraphic3, _A, _AnimatedGraphic3_brand, _B, _C, _onPlaybackChange, _templateObject, _applyDecs2, _applyDecs2$e, _applyDecs2$c;
var _initClass, _init_playing, _get_playing, _set_playing, _init_extra_playing, _init_hasVideo, _get_hasVideo, _set_hasVideo, _init_extra_hasVideo, _init_videos, _get_videos, _init_extra_videos, _AnimatedGraphic2;
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
 * A looping video with a play/pause control.
 *
 * @tag tcds-animated-graphic
 * @slot - The video element.
 * @csspart toggle - The play/pause button.
 */
var _AnimatedGraphic;
new (_AnimatedGraphic2 = (_A = /*#__PURE__*/new WeakMap(), _AnimatedGraphic3_brand = /*#__PURE__*/new WeakSet(), _B = /*#__PURE__*/new WeakMap(), _C = /*#__PURE__*/new WeakMap(), _onPlaybackChange = /*#__PURE__*/new WeakMap(), _AnimatedGraphic3 = /*#__PURE__*/function (_LitElement) {
  function AnimatedGraphic() {
    var _this;
    _classCallCheck(this, AnimatedGraphic);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, AnimatedGraphic, [].concat(args));
    _classPrivateMethodInitSpec(_this, _AnimatedGraphic3_brand);
    // #region Properties and state
    _classPrivateFieldInitSpec(_this, _A, _init_playing(_this, false));
    _classPrivateFieldInitSpec(_this, _B, (_init_extra_playing(_this), _init_hasVideo(_this, false)));
    // #endregion
    // #region Private variables
    /** @type {HTMLVideoElement[]} */
    _classPrivateFieldInitSpec(_this, _C, (_init_extra_hasVideo(_this), _init_videos(_this)));
    _classPrivateFieldInitSpec(_this, _onPlaybackChange, (_init_extra_videos(_this), function () {
      var video = _classPrivateGetter(_AnimatedGraphic3_brand, _this, _get_videos)[0];
      _classPrivateSetter(_AnimatedGraphic3_brand, _set_hasVideo, _this, Boolean(video));
      _classPrivateSetter(_AnimatedGraphic3_brand, _set_playing, _this, Boolean(video && !video.paused && !video.ended));
    }));
    return _this;
  }
  _inherits(AnimatedGraphic, _LitElement);
  return _createClass(AnimatedGraphic, [{
    key: "connectedCallback",
    value:
    // #endregion

    // #region Lifecycle
    function connectedCallback() {
      var _this2 = this;
      _superPropGet(AnimatedGraphic, "connectedCallback", this)([]);
      for (var _i = 0, _arr = ["play", "pause", "ended", "emptied"]; _i < _arr.length; _i++) {
        var name = _arr[_i];
        this.addEventListener(name, _classPrivateFieldGet(_onPlaybackChange, this), true);
      }

      // Reconnection does not necessarily trigger slotchange.
      this.updateComplete.then(function () {
        if (_this2.isConnected) _classPrivateFieldGet(_onPlaybackChange, _this2).call(_this2);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var label = _classPrivateGetter(_AnimatedGraphic3_brand, this, _get_playing) ? "Pause animation" : "Play animation";
      return u(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n      <slot @slotchange=", "></slot>\n      <button\n        part=\"toggle\"\n        class=\"tcds-button tcds-button--media\"\n        type=\"button\"\n        title=", "\n        ?disabled=", "\n        @click=", "\n      >\n        <span class=\"visually-hidden\">", "</span>\n        <tcds-icon icon=", "></tcds-icon>\n      </button>\n    "])), _classPrivateFieldGet(_onPlaybackChange, this), label, !_classPrivateGetter(_AnimatedGraphic3_brand, this, _get_hasVideo), _assertClassBrand(_AnimatedGraphic3_brand, this, _onToggleClick), label, _classPrivateGetter(_AnimatedGraphic3_brand, this, _get_playing) ? "pause" : "play");
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      _superPropGet(AnimatedGraphic, "disconnectedCallback", this)([]);
      for (var _i2 = 0, _arr2 = ["play", "pause", "ended", "emptied"]; _i2 < _arr2.length; _i2++) {
        var name = _arr2[_i2];
        this.removeEventListener(name, _classPrivateFieldGet(_onPlaybackChange, this), true);
      }
    }
    // #endregion

    // #region Event handlers

    // #endregion
  }]);
}(i$1), _applyDecs2 = _applyDecs(_AnimatedGraphic3, [t("tcds-animated-graphic")], [[r(), 1, "playing", function (o) {
  return _classPrivateFieldGet(_A, o);
}, function (o, v) {
  return _classPrivateFieldSet(_A, o, v);
}], [r(), 1, "hasVideo", function (o) {
  return _classPrivateFieldGet(_B, o);
}, function (o, v) {
  return _classPrivateFieldSet(_B, o, v);
}], [o({
  flatten: true,
  selector: "video"
}), 1, "videos", function (o) {
  return _classPrivateFieldGet(_C, o);
}, function (o, v) {
  return _classPrivateFieldSet(_C, o, v);
}]], 0, function (_) {
  return _onPlaybackChange.has(_checkInRHS(_));
}, i$1), _applyDecs2$e = _slicedToArray(_applyDecs2.e, 12), _init_playing = _applyDecs2$e[0], _get_playing = _applyDecs2$e[1], _set_playing = _applyDecs2$e[2], _init_extra_playing = _applyDecs2$e[3], _init_hasVideo = _applyDecs2$e[4], _get_hasVideo = _applyDecs2$e[5], _set_hasVideo = _applyDecs2$e[6], _init_extra_hasVideo = _applyDecs2$e[7], _init_videos = _applyDecs2$e[8], _get_videos = _applyDecs2$e[9], _applyDecs2$e[10], _init_extra_videos = _applyDecs2$e[11], _applyDecs2$c = _slicedToArray(_applyDecs2.c, 2), _AnimatedGraphic = _applyDecs2$c[0], _initClass = _applyDecs2$c[1], _AnimatedGraphic3), _Class = /*#__PURE__*/function (_identity2) {
  function _Class() {
    var _this3;
    _classCallCheck(this, _Class);
    _this3 = _callSuper(this, _Class, [_AnimatedGraphic]), _defineProperty(_assertThisInitialized(_this3), "styles", [styles, localStyles]), _initClass();
    return _this3;
  }
  _inherits(_Class, _identity2);
  return _createClass(_Class);
}(_identity), _defineProperty(_Class, _AnimatedGraphic2, void 0), _Class)();
function _onToggleClick() {
  return _onToggleClick2.apply(this, arguments);
}
function _onToggleClick2() {
  _onToggleClick2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var video;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          video = _classPrivateGetter(_AnimatedGraphic3_brand, this, _get_videos)[0];
          if (video) {
            _context.n = 1;
            break;
          }
          return _context.a(2);
        case 1:
          if (!video.paused) {
            _context.n = 6;
            break;
          }
          _context.p = 2;
          _context.n = 3;
          return video.play();
        case 3:
          _context.n = 5;
          break;
        case 4:
          _context.p = 4;
          _context.v;
          // Playback may be rejected by browser policy or an unavailable source.
          _classPrivateFieldGet(_onPlaybackChange, this).call(this);
        case 5:
          _context.n = 7;
          break;
        case 6:
          video.pause();
        case 7:
          return _context.a(2);
      }
    }, _callee, this, [[2, 4]]);
  }));
  return _onToggleClick2.apply(this, arguments);
}

export { _AnimatedGraphic as AnimatedGraphic };
