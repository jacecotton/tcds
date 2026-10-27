import { a as i, n, t, u } from '../../dist/js/vendor.CyjMR3IY.js';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _Form2, _templateObject;
var _initClass, _init_variant, _init_extra_variant;
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = true, o = false; try { if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = true, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: true } : { done: false, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = true, u = false; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = true, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
function _applyDecs(e, t, n, r, o, i) { var a, c, u, s, f, l, p, d = Symbol.metadata || Symbol["for"]("Symbol.metadata"), m = Object.defineProperty, h = Object.create, y = [h(null), h(null)], v = t.length; function g(t, n, r) { return function (o, i) { n && (i = o, o = e); for (var a = 0; a < t.length; a++) i = t[a].apply(o, r ? [i] : []); return r ? i : o; }; } function b(e, t, n, r) { if ("function" != typeof e && (r || void 0 !== e)) throw new TypeError(t + " must " + (n || "be") + " a function" + (r ? "" : " or undefined")); return e; } function applyDec(e, t, n, r, o, i, u, s, f, l, p) { function d(e) { if (!p(e)) throw new TypeError("Attempted to access private element on non-instance"); } var h = [].concat(t[0]), v = t[3], w = !u, D = 1 === o, S = 3 === o, j = 4 === o, E = 2 === o; function I(t, n, r) { return function (o, i) { return n && (i = o, o = e), r && r(o), P[t].call(o, i); }; } if (!w) { var P = {}, k = [], F = S ? "get" : j || D ? "set" : "value"; if (f ? (l || D ? P = { get: _setFunctionName(function () { return v(this); }, r, "get"), set: function set(e) { t[4](this, e); } } : P[F] = v, l || _setFunctionName(P[F], r, E ? "" : F)) : l || (P = Object.getOwnPropertyDescriptor(e, r)), !l && !f) { if ((c = y[+s][r]) && 7 !== (c ^ o)) throw Error("Decorating two elements with the same name (" + P[F].name + ") is not supported yet"); y[+s][r] = o < 3 ? 1 : o; } } for (var N = e, O = h.length - 1; O >= 0; O -= n ? 2 : 1) { var T = b(h[O], "A decorator", "be", true), z = n ? h[O - 1] : void 0, A = {}, H = { kind: ["field", "accessor", "method", "getter", "setter", "class"][o], name: r, metadata: a, addInitializer: function (e, t) { if (e.v) throw new TypeError("attempted to call addInitializer after decoration was finished"); b(t, "An initializer", "be", true), i.push(t); }.bind(null, A) }; if (w) c = T.call(z, N, H), A.v = 1, b(c, "class decorators", "return") && (N = c);else if (H["static"] = s, H["private"] = f, c = H.access = { has: f ? p.bind() : function (e) { return r in e; } }, j || (c.get = f ? E ? function (e) { return d(e), P.value; } : I("get", 0, d) : function (e) { return e[r]; }), E || S || (c.set = f ? I("set", 0, d) : function (e, t) { e[r] = t; }), N = T.call(z, D ? { get: P.get, set: P.set } : P[F], H), A.v = 1, D) { if ("object" == _typeof(N) && N) (c = b(N.get, "accessor.get")) && (P.get = c), (c = b(N.set, "accessor.set")) && (P.set = c), (c = b(N.init, "accessor.init")) && k.unshift(c);else if (void 0 !== N) throw new TypeError("accessor decorators must return an object with get, set, or init properties or undefined"); } else b(N, (l ? "field" : "method") + " decorators", "return") && (l ? k.unshift(N) : P[F] = N); } return o < 2 && u.push(g(k, s, 1), g(i, s, 0)), l || w || (f ? D ? u.splice(-1, 0, I("get", s), I("set", s)) : u.push(E ? P[F] : b.call.bind(P[F])) : m(e, r, P)), N; } function w(e) { return m(e, d, { configurable: true, enumerable: true, value: a }); } return void 0 !== i && (a = i[d]), a = h(null == a ? null : a), f = [], l = function l(e) { e && f.push(g(e)); }, p = function p(t, r) { for (var i = 0; i < n.length; i++) { var a = n[i], c = a[1], l = 7 & c; if ((8 & c) == t && !l == r) { var p = a[2], d = !!a[3], m = 16 & c; applyDec(t ? e : e.prototype, a, m, d ? "#" + p : _toPropertyKey(p), l, l < 2 ? [] : t ? s = s || [] : u = u || [], f, !!t, d, r, t && d ? function (t) { return _checkInRHS(t) === e; } : o); } } }, p(8, 0), p(0, 0), p(8, 1), p(0, 1), l(u), l(s), c = f, v || w(e), { e: c, get c() { var n = []; return v && [w(e = applyDec(e, [t], r, e.name, 5, n)), g(n, 1)]; } }; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _setFunctionName(e, t, n) { "symbol" == _typeof(t) && (t = (t = t.description) ? "[" + t + "]" : ""); try { Object.defineProperty(e, "name", { configurable: !0, value: n ? n + " " + t : t }); } catch (e) {} return e; }
function _checkInRHS(e) { if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (null !== e ? _typeof(e) : "null")); return e; }

/**
 * @typedef {Object} RadioOther
 * @property {HTMLInputElement} radio
 * @property {HTMLInputElement} text
 */

/**
 * Enhances native forms with editable radio values. Each
 * `[data-tcds-form="radio-other"]` contains a radio and a text input.
 *
 * @tag tcds-form
 * @slot - Native form markup.
 */
var _Form;
var _A = /*#__PURE__*/new WeakMap();
var _required = /*#__PURE__*/new WeakMap();
var _observer = /*#__PURE__*/new WeakMap();
var _Form_brand = /*#__PURE__*/new WeakSet();
var _syncRequired = /*#__PURE__*/new WeakMap();
var _onEvent = /*#__PURE__*/new WeakMap();
var Form = /*#__PURE__*/function (_LitElement) {
  function Form() {
    var _this;
    _classCallCheck(this, Form);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, Form, [].concat(args));
    // #endregion
    // #region Utilities
    /** @returns {RadioOther[]} */
    _classPrivateMethodInitSpec(_this, _Form_brand);
    // #region Properties
    /**
     * Use `display` for large controls and radio choices styled as buttons.
     * @type {"display"|undefined}
     */
    _classPrivateFieldInitSpec(_this, _A, _init_variant(_this));
    // #endregion

    // #region Private variables
    /** @type {Map<HTMLInputElement, boolean>} */
    _classPrivateFieldInitSpec(_this, _required, (_init_extra_variant(_this), new Map()));
    _classPrivateFieldInitSpec(_this, _observer, new MutationObserver(function () {
      return _classPrivateFieldGet(_syncRequired, _this).call(_this);
    }));
    _classPrivateFieldInitSpec(_this, _syncRequired, function () {
      var pairs = _assertClassBrand(_Form_brand, _this, _pairs).call(_this);
      var current = new Set(pairs.map(function (_ref) {
        var text = _ref.text;
        return text;
      }));
      var _iterator = _createForOfIteratorHelper(_classPrivateFieldGet(_required, _this)),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
            text = _step$value[0],
            required = _step$value[1];
          if (!current.has(text)) {
            text.required = required;
            _classPrivateFieldGet(_required, _this)["delete"](text);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var _iterator2 = _createForOfIteratorHelper(pairs),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _step2$value = _step2.value,
            radio = _step2$value.radio,
            _text = _step2$value.text;
          if (!_classPrivateFieldGet(_required, _this).has(_text)) _classPrivateFieldGet(_required, _this).set(_text, _text.required);
          _text.required = radio.checked && !radio.matches(":disabled");
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    });
    // #endregion

    // #region Event handlers
    /** @param {Event} event */
    _classPrivateFieldInitSpec(_this, _onEvent, function (event) {
      if (event.type === "reset") {
        // The browser applies defaults after the reset event finishes dispatching.
        queueMicrotask(function () {
          if (_this.isConnected && !event.defaultPrevented) _classPrivateFieldGet(_syncRequired, _this).call(_this);
        });
        return;
      }
      var _iterator3 = _createForOfIteratorHelper(_assertClassBrand(_Form_brand, _this, _pairs).call(_this)),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _step3$value = _step3.value,
            radio = _step3$value.radio,
            text = _step3$value.text;
          if (event.type === "formdata") {
            if (event.target !== radio.form) continue;
            var formData = (/** @type {FormDataEvent} */event).formData;
            // Legacy named companion fields must have a unique, distinct name.
            if (text.name && text.name !== radio.name) formData["delete"](text.name);
            if (radio.checked && radio.name && !radio.matches(":disabled") && !text.matches(":disabled")) {
              formData.set(radio.name, text.value);
            }
          } else if (event.target === text && !text.matches(":disabled") && !radio.matches(":disabled")) {
            if (event.type === "click" || event.type === "input" && text.value !== "") {
              _assertClassBrand(_Form_brand, _this, _select).call(_this, radio);
            }
          } else if (event.target === radio && event.type === "click" && /** @type {MouseEvent} */event.detail > 0 && !radio.matches(":disabled") && !text.matches(":disabled")) {
            text.focus();
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      _classPrivateFieldGet(_syncRequired, _this).call(_this);
    });
    return _this;
  }
  _inherits(Form, _LitElement);
  return _createClass(Form, [{
    key: "variant",
    get: function get() {
      return _classPrivateFieldGet(_A, this);
    },
    set: function set(v) {
      _classPrivateFieldSet(_A, this, v);
    }
  }, {
    key: "connectedCallback",
    value:
    // #endregion

    // #region Lifecycle
    function connectedCallback() {
      _superPropGet(Form, "connectedCallback", this)([]);
      for (var _i = 0, _arr = ["click", "input", "change", "reset", "formdata"]; _i < _arr.length; _i++) {
        var name = _arr[_i];
        this.addEventListener(name, _classPrivateFieldGet(_onEvent, this), true);
      }
      window.addEventListener("pageshow", _classPrivateFieldGet(_syncRequired, this));
      _classPrivateFieldGet(_observer, this).observe(this, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["data-tcds-form", "type", "form", "disabled", "checked"]
      });
      _classPrivateFieldGet(_syncRequired, this).call(this);
    }
  }, {
    key: "render",
    value: function render() {
      return u(_templateObject || (_templateObject = _taggedTemplateLiteral(["<slot></slot>"])));
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      _superPropGet(Form, "disconnectedCallback", this)([]);
      for (var _i2 = 0, _arr2 = ["click", "input", "change", "reset", "formdata"]; _i2 < _arr2.length; _i2++) {
        var name = _arr2[_i2];
        this.removeEventListener(name, _classPrivateFieldGet(_onEvent, this), true);
      }
      window.removeEventListener("pageshow", _classPrivateFieldGet(_syncRequired, this));
      _classPrivateFieldGet(_observer, this).disconnect();
      var _iterator4 = _createForOfIteratorHelper(_classPrivateFieldGet(_required, this)),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var _step4$value = _slicedToArray(_step4.value, 2),
            text = _step4$value[0],
            required = _step4$value[1];
          text.required = required;
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      _classPrivateFieldGet(_required, this).clear();
    }
  }]);
}(i);
_Form2 = Form;
function _pairs() {
  var _this2 = this;
  return _toConsumableArray(this.querySelectorAll('[data-tcds-form="radio-other"]')).flatMap(function (group) {
    var radio = group.querySelector('input[type="radio"]');
    var text = group.querySelector('input[type="text"]');
    if (!(radio instanceof HTMLInputElement) || !(text instanceof HTMLInputElement) || group.closest("tcds-form") !== _this2 || !radio.form || !_this2.contains(radio.form) || text.form !== radio.form) return [];
    return [{
      radio: radio,
      text: text
    }];
  });
}
/** @param {HTMLInputElement} radio */
function _select(radio) {
  if (radio.checked || radio.matches(":disabled")) return;
  radio.checked = true;
  radio.dispatchEvent(new Event("input", {
    bubbles: true
  }));
  radio.dispatchEvent(new Event("change", {
    bubbles: true
  }));
}
var _applyDecs2 = _applyDecs(_Form2, [t("tcds-form")], [[n({
  type: String,
  reflect: true
}), 1, "variant"]], 0, void 0, i);
var _applyDecs2$e = _slicedToArray(_applyDecs2.e, 2);
_init_variant = _applyDecs2$e[0];
_init_extra_variant = _applyDecs2$e[1];
var _applyDecs2$c = _slicedToArray(_applyDecs2.c, 2);
_Form = _applyDecs2$c[0];
_initClass = _applyDecs2$c[1];
_initClass();

export { _Form as Form };
