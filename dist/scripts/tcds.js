!function(){"use strict";function t(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function e(e){for(var o=1;o<arguments.length;o++){var r=null!=arguments[o]?arguments[o]:{};o%2?t(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):t(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function n(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function o(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function r(t,e){i(t,e),e.add(t)}function a(t,e,n){i(t,e),e.set(t,n)}function i(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")}function c(t,e){return function(t,e){return e.get?e.get.call(t):e.value}(t,u(t,e,"get"))}function l(t,e,n){return function(t,e,n){if(e.set)e.set.call(t,n);else{if(!e.writable)throw new TypeError("attempted to set read only private field");e.value=n}}(t,u(t,e,"set"),n),n}function u(t,e,n){if(!e.has(t))throw new TypeError("attempted to "+n+" private field on non-instance");return e.get(t)}function s(t,e,n){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return n}var f=new WeakMap,p=new WeakMap,d=new WeakSet,y=new WeakSet,b=function(){function t(n,o){var i=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),r(this,y),r(this,d),a(this,f,{writable:!0,value:void 0}),a(this,p,{writable:!0,value:void 0}),this.element=n,this.state=new Proxy({},s(this,d,m).call(this)),this.props=new Proxy(e({},o),s(this,y,h).call(this)),l(this,f,{}),l(this,p,null),this.element.addEventListener("state-change",(function(t){c(i,f).newState=e(e({},c(i,f).newState),t.detail.newState),c(i,f).prevState=e(e({},c(i,f).prevState),t.detail.prevState),null!==c(i,p)&&cancelAnimationFrame(c(i,p)),l(i,p,requestAnimationFrame((function(){var t=i.sync(c(i,f).newState,c(i,f).prevState);for(var e in t)e in c(i,f).newState&&t[e]();l(i,f,{})})))}))}var n,i;return n=t,(i=[{key:"sync",value:function(){return console.warn("No local sync method provided in component subclass."),{}}}])&&o(n.prototype,i),Object.defineProperty(n,"prototype",{writable:!1}),t}();function m(){var t=this;return{set:function(e,o,r){var a=n({},o,e[o]),i=n({},o,r);return e[o]!==r&&(e[o]=r,t.element.dispatchEvent(new CustomEvent("state-change",{detail:{context:t.element,newState:i,prevState:a}}))),!0},get:function(e,n){return["[object Object]","[object Array]"].indexOf(Object.prototype.toString.call(e[n]))>-1?new Proxy(e[n],s(t,d,m).call(t)):e[n]}}}function h(){var t=this;return{set:function(e,n,o){return n in e&&e[n]!==o?console.warn("Attempt to mutate prop rejected; `this.props` is immutable. To use a mutable property, try initializing state or a new property from the `this.props` property value.",{context:t.element,property:n,"attempted value":o,"persisting value":e[n]}):e[n]=o,!0}}}function v(t){return v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},v(t)}function g(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}function w(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function O(t,e){return O=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},O(t,e)}function S(t,e){if(e&&("object"===v(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function P(t){return P=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},P(t)}var E=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&O(t,e)}(i,t);var e,n,o,r,a=(o=i,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=P(o);if(r){var n=P(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return S(this,t)});function i(t,e){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i),(n=a.call(this,t,e)).props.multiselectable=n.props.multiselectable||!1,n.panels=Array.from(n.element.querySelectorAll("[data-component-part=panel]")),n.buttons=Array.from(n.element.querySelectorAll("[data-component-part=panel-toggle]")),n.expandAllButton=n.element.querySelector("[data-component-part=expand-all]"),n.collapseAllButton=n.element.querySelector("[data-component-part=collapse-all]"),n.state.activeButtons=[],n.buttons.forEach((function(t){t.addEventListener("click",(function(){-1===n.state.activeButtons.indexOf(t)?!1===n.props.multiselectable?n.state.activeButtons=[t]:n.state.activeButtons.push(t):n.state.activeButtons.splice(n.state.activeButtons.indexOf(t),1)}))})),!0===n.props.multiselectable&&(n.expandAllButton.addEventListener("click",(function(){var t;n.state.activeButtons=function(t){if(Array.isArray(t))return g(t)}(t=n.buttons)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(t){if("string"==typeof t)return g(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?g(t,e):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()})),n.collapseAllButton.addEventListener("click",(function(){n.state.activeButtons=[]}))),n}return e=i,(n=[{key:"sync",value:function(){var t=this;this.buttons.forEach((function(e){var n=t.state.activeButtons.indexOf(e)>-1,o=t.getPanelByButton(e),r=e.closest("section");e.setAttribute("aria-expanded",n),r.setAttribute("data-open",n),n?(o.ontransitionend=null,o.hidden=!1,requestAnimationFrame((function(){o.style.height="".concat(o.scrollHeight,"px")}))):(o.style.height="0px",o.ontransitionend=function(){o.hidden=!0})}))}},{key:"getPanelByButton",value:function(t){return this.panels.find((function(e){return t.getAttribute("aria-controls")===e.id}))}}])&&w(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),i}(b);function x(t){return x="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},x(t)}function j(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return new Promise((function(o){if(!1!==n.lazyload){var r=new IntersectionObserver((function(e){e.forEach((function(e){e.isIntersecting&&(a(),!1!==n.runOnce&&r.unobserve(t))}))}),n.lazyloadSettings||{});r.observe(t)}else a();function a(){t.style.setProperty("--animation-element-calculated-height","".concat(t.scrollHeight,"px")),"string"==typeof e?t.style.animation="".concat(e," ")+"var(--animation-".concat(e,"-duration, var(--animation-duration)) ")+"var(--animation-".concat(e,"-easing, var(--animation-easing)) ")+"var(--animation-".concat(e,"-fill-mode, var(--animation-fill-mode))"):"object"===x(e)&&(t.style.animation="",e.forEach((function(e,n){t.style.animation+=(n>0?", ":"")+"".concat(e," ")+"var(--animation-".concat(e,"-duration, var(--animation-duration)) ")+"var(--animation-".concat(e,"-easing, var(--animation-easing)) ")+"var(--animation-".concat(e,"-fill-mode, var(--animation-fill-mode))")})),t.setAttribute("data-animating","true")),t.onanimationend=function(e){e.stopPropagation(),!1!==n.removeOnFinish&&(t.style.animation=null,t.removeAttribute("data-animating")),t.onanimationend=null,o("Animation complete")}}}))}function A(t){return A="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},A(t)}function k(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function T(t,e){return T=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},T(t,e)}function _(t,e){if(e&&("object"===A(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function C(t){return C=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},C(t)}window.addEventListener("load",(function(){document.querySelectorAll("[data-component=Accordion]").forEach((function(t){t&&new E(t,{multiselectable:t.classList.contains("Accordion--multiselectable")})}))}));var R=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&T(t,e)}(i,t);var e,n,o,r,a=(o=i,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=C(o);if(r){var n=C(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return _(this,t)});function i(t,e){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i),void 0===(n=a.call(this,t,e)).props.closeOnClickOutside&&(n.props.closeOnClickOutside=!0),void 0===n.props.target&&(n.props.target=n.element),n.togglers=document.querySelectorAll("[aria-controls=".concat(n.element.id,"]")),n.localStorageState="toggleable_".concat(n.element.id,"_state"),!0===n.props.openOnload?n.state.open="closed"!==localStorage.getItem(n.localStorageState):n.state.open=!1,n.props.closeOnClickOutside&&(document.body.addEventListener("click",(function(){!0===n.state.open&&!0!==n.state.destroyed&&(n.state.open=!1)})),n.element.addEventListener("click",(function(t){!0!==n.state.destroyed&&t.stopPropagation()}))),n.togglers.forEach((function(t){t.addEventListener("click",(function(t){!0!==n.state.destroyed&&(t.stopPropagation(),n.state.open=!n.state.open)}))})),document.addEventListener("keyup",(function(t){"Escape"===t.key&&!0===n.state.open&&!0!==n.state.destroyed&&(n.state.open=!1)})),n}return e=i,(n=[{key:"sync",value:function(t,e){var n=this;return{open:function(){localStorage.setItem(n.localStorageState,n.state.open?"open":"closed"),n.togglers.forEach((function(t){t.setAttribute("aria-expanded",n.state.open)})),!n.props.animation||e&&void 0===e.open?n.props.target.hidden=!n.state.open:!0===n.state.open?(n.element.setAttribute("data-animation-state","opening"),n.props.target.hidden=!1,j(n.props.target,n.props.animation.open||n.props.animation,{lazyload:!1}).then((function(){n.element.removeAttribute("data-animation-state")}))):(n.element.setAttribute("data-animation-state","closing"),j(n.props.target,n.props.animation.close||n.props.animation,{lazyload:!1}).then((function(){n.props.target.hidden=!0,n.element.removeAttribute("data-animation-state")})))}}}},{key:"toggle",value:function(){this.state.open=!this.state.open,this.state.destroyed=!1}},{key:"open",value:function(){this.state.open=!0,this.state.destroyed=!1}},{key:"close",value:function(){this.state.open=!1,this.state.destroyed=!1}},{key:"destroy",value:function(){this.state.open=!0,this.state.destroyed=!0}}])&&k(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),i}(b);function L(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}var B=['a[href]:not([tabindex^="-"])','area[href]:not([tabindex^="-"])','input:not([type="hidden"]):not([type="radio"]):not([disabled]):not([tabindex^="-"])','input[type="radio"]:not([disabled]):not([tabindex^="-"]):checked','select:not([disabled]):not([tabindex^="-"])','textarea:not([disabled]):not([tabindex^="-"])','button:not([disabled]):not([tabindex^="-"])','iframe:not([tabindex^="-"])','audio[controls]:not([tabindex^="-"])','video[controls]:not([tabindex^="-"])','[contenteditable]:not([tabindex^="-"])','[tabindex]:not([tabindex^="-"]'];function q(t){return(e=t.querySelectorAll(B.join(",")),function(t){if(Array.isArray(t))return L(t)}(e)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(e)||function(t,e){if(t){if("string"==typeof t)return L(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?L(t,e):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()).filter((function(t){return t.offsetWidth||t.offsetHeight||t.getClientRects().length}));var e}function I(t){return I="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},I(t)}function M(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function D(){return D="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var o=F(t,e);if(o){var r=Object.getOwnPropertyDescriptor(o,e);return r.get?r.get.call(arguments.length<3?t:n):r.value}},D.apply(this,arguments)}function F(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=N(t)););return t}function H(t,e){return H=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},H(t,e)}function z(t,e){if(e&&("object"===I(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function N(t){return N=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},N(t)}var W=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&H(t,e)}(i,t);var e,n,o,r,a=(o=i,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=N(o);if(r){var n=N(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return z(this,t)});function i(t,e){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i),(n=a.call(this,t,e)).content=n.element.querySelector(".Dialog__content"),n.element.addEventListener("mousedown",(function(){document.body.click()})),n.content.addEventListener("mousedown",(function(t){t.stopPropagation()})),n.element.addEventListener("keydown",(function(t){if("Tab"===t.key){var e=q(n.element),o=e.indexOf(document.activeElement),r=e.length-1;t.shiftKey&&0===o?(e[r].focus(),t.preventDefault()):t.shiftKey||o!==r||(e[0].focus(),t.preventDefault())}})),n}return e=i,(n=[{key:"sync",value:function(){var t=this;return D(N(i.prototype),"sync",this).call(this),{open:function(){if(D(N(i.prototype),"sync",t).call(t).open(),document.body.style.overflowY=!0===t.state.open?"hidden":null,!0===t.state.open){var e=t.element.querySelector("[autofocus]")||q(t.element)[0];t.previouslyFocused=document.activeElement,e&&e.focus()}else t.previouslyFocused&&t.previouslyFocused.focus&&t.previouslyFocused.focus()}}}}])&&M(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),i}(R);function K(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}window.addEventListener("load",(function(){document.querySelectorAll("[data-component=Dialog]").forEach((function(t){t&&new W(t,{openOnload:"true"===t.getAttribute("data-open-onload"),animation:{open:"fade-in",close:"fade-out"}})}))}));var U,V=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.element=e,this.toggleableMenu=new R(this.element,{animation:{open:"slide-in-left",close:"slide-out-right"}});var n=window.matchMedia("(max-width: 1024px)");this.handleHeaderMenu(n),n.addListener(this.handleHeaderMenu.bind(this))}var e,n;return e=t,(n=[{key:"handleHeaderMenu",value:function(t){t.matches?(this.element.hidden=!0,this.toggleableMenu.close(),this.moveSearchTo("utility-menu")):(this.toggleableMenu.destroy(),this.moveSearchTo("main-menu"))}},{key:"moveSearchTo",value:function(t){var e=document.querySelector(".site-header__nav--".concat(t," ul")),n=document.querySelectorAll(".site-header__nav ul li");n&&n.forEach((function(t){e&&t.contains(document.querySelector(".site-menu__toggle"))&&e.appendChild(t)}))}}])&&K(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function Y(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}(U=document.getElementById("header-menu"))&&new V(U);var $=function(){function t(e,n){var o=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.element=e,this.props=n,this.backgroundImages=this.element.getAttribute("data-background-images")&&this.element.getAttribute("data-background-images").trim().split(" "),this.backgroundImages&&this.backgroundImages.length>1&&(this.backgroundImages.forEach((function(t){(new Image).src=t})),requestAnimationFrame((function(){o.rotateBackgrounds()}))),this.props.parallax&&!0===window.matchMedia("(prefers-reduced-motion: no-preference)").matches&&window.addEventListener("scroll",(function(){o.parallax()}))}var e,n;return e=t,(n=[{key:"rotateBackgrounds",value:function(){var t=this;clearTimeout(this.rotationSchedule);var e=0;this.backgroundImages.forEach((function(n,o){t.rotationSchedule=setTimeout((function(){t.element.style.backgroundImage="url(".concat(t.backgroundImages[e],")"),e+1===t.backgroundImages.length?t.rotationSchedule=setTimeout((function(){t.rotateBackgrounds()}),t.props.interval):e++}),t.props.interval*o)}))}},{key:"parallax",value:function(){this.element.style.backgroundPosition="center ".concat(50+.1*window.pageYOffset,"%")}}])&&Y(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function G(t){return G="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},G(t)}function J(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function Q(t,e){return Q=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},Q(t,e)}function X(t,e){if(e&&("object"===G(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function Z(t){return Z=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},Z(t)}document.querySelectorAll(".Hero[data-component=Section]").forEach((function(t){t&&new $(t,{interval:t.getAttribute("data-interval")||1e4,parallax:t.classList.contains("Section--parallax")})}));var tt=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&Q(t,e)}(i,t);var e,n,o,r,a=(o=i,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=Z(o);if(r){var n=Z(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return X(this,t)});function i(t,e){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i),(n=a.call(this,t,e)).toggles=document.querySelectorAll("[aria-controls=".concat(n.element.id,"]")),n.state.expanded=!1,n.toggles.forEach((function(t){t.addEventListener("click",(function(t){t.stopPropagation(),n.state.expanded=!n.state.expanded}))})),document.body.addEventListener("click",(function(){n.state.expanded=!1})),n.element.addEventListener("click",(function(t){t.stopPropagation()})),n.element.addEventListener("keyup",(function(t){"Escape"===t.key&&(n.state.expanded=!1)})),n}return e=i,(n=[{key:"sync",value:function(){var t=this;return{expanded:function(){t.toggles.forEach((function(e){e.setAttribute("aria-expanded",t.state.expanded)})),!0===t.state.expanded?(document.querySelectorAll("[data-component=MegaMenu]").forEach((function(e){e!==t.element&&(e.hidden=!0,document.querySelectorAll("[aria-controls=".concat(e.id,"]")).forEach((function(t){t.setAttribute("aria-expanded","false")})))})),t.element.hidden=!1,window.matchMedia("(min-width: 1280px)").matches?j(t.element,["slide-in-down","fade-in"],{lazyload:!1}):j(t.element,["slide-in-left","fade-in"],{lazyload:!1})):t.element.hidden||j(t.element,"fade-out",{lazyload:!1}).then((function(){t.element.hidden=!0}))}}}}])&&J(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),i}(b);function et(t){return et="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},et(t)}function nt(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function ot(t,e){return ot=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},ot(t,e)}function rt(t,e){if(e&&("object"===et(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function at(t){return at=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},at(t)}document.querySelectorAll("[data-component=MegaMenu]").forEach((function(t){t&&new tt(t,{})})),document.querySelectorAll("[data-component=Notification]").forEach((function(t){t&&new R(t,{openOnload:!0,target:t.querySelector(".Notification__content"),closeOnClickOutside:!1,animation:{open:"expand-down",close:"collapse-up"}})}));var it=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&ot(t,e)}(i,t);var e,n,o,r,a=(o=i,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=at(o);if(r){var n=at(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return rt(this,t)});function i(t,e){var n;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i),(n=a.call(this,t,e)).tabs=Array.from(n.element.querySelectorAll("[role=tab]")),n.tablist=n.element.querySelector("[role=tablist]"),n.panels=Array.from(n.element.querySelectorAll("[role=tabpanel]")),n.panelsContainer=n.element.querySelector("[data-component-part=tabpanels]"),n.state.activeTab=!0!==n.props.hideAll?n.tabs[0]:null;var o={ArrowRight:function(){n.state.activeTab=n.getNextTab(),n.state.activeTab.focus()},ArrowLeft:function(){n.state.activeTab=n.getPreviousTab(),n.state.activeTab.focus()}};return n.tabs.forEach((function(t){t.addEventListener("click",(function(){n.state.activeTab=t})),t.addEventListener("keydown",(function(t){o[t.code]&&o[t.code]()}))})),n}return e=i,n=[{key:"sync",value:function(){var t=this;return{activeTab:function(){t.tabs.forEach((function(e){e.setAttribute("aria-expanded",e===t.state.activeTab),e.setAttribute("tabindex",e!==t.state.activeTab&&t.state.activeTab?"-1":"0")})),t.props.keepPanelVisibility||t.panels.forEach((function(e){e.hidden=!(e===t.getPanelByTab(t.state.activeTab))})),window.dispatchEvent(new Event("scroll"))}}}},{key:"getNextTab",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.state.activeTab;return t===this.tabs[this.tabs.length-1]?this.tabs[0]:this.tabs[this.tabs.indexOf(t)+1]}},{key:"getPreviousTab",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.state.activeTab;return t===this.tabs[0]?this.tabs[this.tabs.length-1]:this.tabs[this.tabs.indexOf(t)-1]}},{key:"getPanelByTab",value:function(t){return t instanceof HTMLElement&&"tab"===t.getAttribute("role")?this.panels.find((function(e){return t.getAttribute("aria-controls")===e.id})):null}}],n&&nt(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),i}(b);function ct(t){return ct="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},ct(t)}function lt(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function ut(){return ut="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var o=st(t,e);if(o){var r=Object.getOwnPropertyDescriptor(o,e);return r.get?r.get.call(arguments.length<3?t:n):r.value}},ut.apply(this,arguments)}function st(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=yt(t)););return t}function ft(t,e){return ft=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},ft(t,e)}function pt(t,e){if(e&&("object"===ct(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return dt(t)}function dt(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function yt(t){return yt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},yt(t)}document.querySelectorAll("[data-component=Tabs]").forEach((function(t){t&&new it(t,{hideAll:t.classList.contains("Tabs--hide-all")})}));var bt=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&ft(t,e)}(i,t);var e,n,o,r,a=(o=i,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=yt(o);if(r){var n=yt(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return pt(this,t)});function i(t,e){var n;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i),(n=a.call(this,t,e)).controls={next:n.element.querySelector("[data-action=next]"),previous:n.element.querySelector("[data-action=previous]"),playPause:n.element.querySelector("[data-action=play-pause]"),expandCollapse:n.element.querySelector("[data-action=expand-collapse]")},!0===window.matchMedia("(prefers-reduced-motion: reduce), (hover: none)").matches?n.state.playing=!1:n.state.playing=n.props.autoplay,n.controls.expandCollapse&&(n.state.expanded=!1),n.controls.next.addEventListener("click",(function(){n.state.activeTab=n.getNextTab(),n.state.playing=!1})),n.controls.previous.addEventListener("click",(function(){n.state.activeTab=n.getPreviousTab(),n.state.playing=!1})),n.controls.playPause&&n.controls.playPause.addEventListener("click",(function(){n.state.playing=!n.state.playing})),n.tabs.forEach((function(t){t.addEventListener("click",(function(){n.state.playing=!1})),t.addEventListener("keydown",(function(){n.state.playing=!1}))})),n.panelsContainer.addEventListener("touchstart",(function(){n.state.playing=!1})),n.panelsContainer.addEventListener("mouseenter",n.temporarilyPause.bind(dt(n))),n.panelsContainer.addEventListener("focusin",n.temporarilyPause.bind(dt(n))),n.panelsContainer.addEventListener("mouseleave",n.resumeFromTemporaryPause.bind(dt(n))),n.panelsContainer.addEventListener("focusout",n.resumeFromTemporaryPause.bind(dt(n))),new IntersectionObserver((function(t){t.forEach((function(t){t.isIntersecting?(n.resumeFromTemporaryPause(),n.isIntersecting=!0):(n.temporarilyPause(),n.isIntersecting=!1)}))}),{threshold:.9}).observe(n.element),document.addEventListener("visibilitychange",(function(){!0===document.hidden?n.temporarilyPause():!1===document.hidden&&!0===n.temporaryPause&&!1!==n.isIntersecting&&requestAnimationFrame((function(){n.resumeFromTemporaryPause()}))}),!1);var o=new IntersectionObserver((function(t){t.forEach((function(t){t.isIntersecting&&!0!==n.state.expanded&&(n.state.activeTab=n.element.querySelector("[role=tab][aria-controls=".concat(t.target.id,"]")))}))}),{root:n.panelsContainer,threshold:1,rootMargin:"1px"});return n.panelsContainer.addEventListener("mouseenter",(function(){n.panels.forEach((function(t){o.observe(t)}))})),n.panelsContainer.addEventListener("mouseleave",(function(){n.panels.forEach((function(t){o.unobserve(t)}))})),n.controls.expandCollapse&&n.controls.expandCollapse.addEventListener("click",(function(){n.state.playing=!1,n.state.expanded=!n.state.expanded})),n}return e=i,(n=[{key:"sync",value:function(){var t=this;return ut(yt(i.prototype),"sync",this).call(this),{activeTab:function(){ut(yt(i.prototype),"sync",t).call(t).activeTab();var e=t.getPanelByTab(t.state.activeTab),n=t.panelsContainer.getBoundingClientRect().left,o=e.getBoundingClientRect().left;t.panelsContainer.scrollLeft+=o-n,t.panels.forEach((function(t){t.ariaHidden=t===e?null:"true",t.tabIndex=t===e?null:"-1"}))},playing:function(){t.element.setAttribute("data-playing",t.state.playing),t.controls.playPause&&(t.controls.playPause.setAttribute("aria-label",t.state.playing?"Pause carousel":"Play carousel"),t.controls.playPause.setAttribute("title",t.state.playing?"Pause carousel":"Play carousel"),t.controls.playPause.innerHTML=t.state.playing?'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>':'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>'),t.panelsContainer.setAttribute("aria-live",t.state.playing?"off":"polite"),!0===t.state.playing?t.playTimer=setTimeout(t.play.bind(t),t.props.interval):clearTimeout(t.playTimer)},expanded:function(){var e=t.state.expanded?"Collapse carousel":"Expand carousel";t.controls.expandCollapse.setAttribute("title",e),t.controls.expandCollapse.setAttribute("aria-label",e),t.controls.expandCollapse.setAttribute("aria-expanded",t.state.expanded),t.element.setAttribute("data-expanded",t.state.expanded),t.element.setAttribute("aria-roledescription",t.state.expanded?"":"carousel"),t.tablist.hidden=t.state.expanded,t.controls.playPause.hidden=t.state.expanded,t.controls.next.hidden=t.state.expanded,t.controls.previous.hidden=t.state.expanded,t.panels.forEach((function(e){e.setAttribute("role",t.state.expanded?"":"tabpanel"),e.setAttribute("aria-roledescription",t.state.expanded?"":"slide")})),t.state.expanded?(t.panelsContainer.removeAttribute("aria-live"),t.panels.forEach((function(t){t.removeAttribute("aria-hidden"),t.removeAttribute("tabindex")}))):t.sync().activeTab()}}}},{key:"play",value:function(){!0===this.state.playing&&(this.state.activeTab=this.getNextTab(),this.playTimer=setTimeout(this.play.bind(this),this.props.interval))}},{key:"temporarilyPause",value:function(){!0===this.state.playing&&(this.state.playing=!1,this.temporaryPause=!0)}},{key:"resumeFromTemporaryPause",value:function(){!0===this.temporaryPause&&(this.state.playing=!0,this.temporaryPause=null)}}])&&lt(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),i}(it);if(window.addEventListener("load",(function(){document.querySelectorAll("[data-component=Carousel]").forEach((function(t){t&&new bt(t,{interval:parseInt(t.getAttribute("data-interval"))||5e3,autoplay:"true"===t.getAttribute("data-autoplay"),keepPanelVisibility:!0})}))})),!("container"in document.documentElement.style)&&document.querySelectorAll(".is-self-responsive").length>0){var mt=document.createElement("script");mt.src="https://unpkg.com/container-query-polyfill/cqfill.iife.min.js",document.head.appendChild(mt)}}();