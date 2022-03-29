!function(){"use strict";function t(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function e(e){for(var r=1;r<arguments.length;r++){var o=null!=arguments[r]?arguments[r]:{};r%2?t(Object(o),!0).forEach((function(t){n(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):t(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function n(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function o(t,e){i(t,e),e.add(t)}function a(t,e,n){i(t,e),e.set(t,n)}function i(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")}function c(t,e){return function(t,e){return e.get?e.get.call(t):e.value}(t,l(t,e,"get"))}function u(t,e,n){return function(t,e,n){if(e.set)e.set.call(t,n);else{if(!e.writable)throw new TypeError("attempted to set read only private field");e.value=n}}(t,l(t,e,"set"),n),n}function l(t,e,n){if(!e.has(t))throw new TypeError("attempted to "+n+" private field on non-instance");return e.get(t)}function s(t,e,n){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return n}var f=new WeakMap,p=new WeakMap,y=new WeakSet,d=new WeakSet;function b(){var t=this;return{set:function(e,r,o){var a=n({},r,e[r]),i=n({},r,o);return e[r]!==o&&(e[r]=o,t.element.dispatchEvent(new CustomEvent("state-change",{detail:{context:t.element,newState:i,prevState:a}}))),!0},get:function(e,n){return["[object Object]","[object Array]"].indexOf(Object.prototype.toString.call(e[n]))>-1?new Proxy(e[n],s(t,y,b).call(t)):e[n]}}}function m(){var t=this;return{set:function(e,n,r){return n in e&&e[n]!==r?console.warn("Attempt to mutate prop rejected; `this.props` is immutable. To use a mutable property, try initializing state or a new property from the `this.props` property value.",{context:t.element,property:n,"attempted value":r,"persisting value":e[n]}):e[n]=r,!0}}}function h(t){return h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},h(t)}function v(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function g(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function w(t,e){return w=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},w(t,e)}function O(t,e){if(e&&("object"===h(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function S(t){return S=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},S(t)}var j=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&w(t,e)}(i,t);var e,n,r,o,a=(r=i,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=S(r);if(o){var n=S(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return O(this,t)});function i(t,e){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i),(n=a.call(this,t,e)).props.multiselectable=n.props.multiselectable||!1,n.panels=Array.from(n.element.querySelectorAll("[data-component-part=panel]")),n.buttons=Array.from(n.element.querySelectorAll("[data-component-part=panel-toggle]")),n.expandAllButton=n.element.querySelector("[data-component-part=expand-all]"),n.collapseAllButton=n.element.querySelector("[data-component-part=collapse-all]"),n.state.activeButtons=[],n.buttons.forEach((function(t){t.addEventListener("click",(function(){var e=n.state.activeButtons.indexOf(t);e>-1?n.state.activeButtons.splice(e,1):!1===n.props.multiselectable?n.state.activeButtons=[t]:n.state.activeButtons.push(t)}))})),!0===n.props.multiselectable&&(n.expandAllButton.addEventListener("click",(function(){var t;n.state.activeButtons=function(t){if(Array.isArray(t))return v(t)}(t=n.buttons)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(t){if("string"==typeof t)return v(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?v(t,e):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()})),n.collapseAllButton.addEventListener("click",(function(){n.state.activeButtons=[]}))),n}return e=i,(n=[{key:"sync",value:function(){var t=this;this.buttons.forEach((function(e){var n=t.state.activeButtons.indexOf(e)>-1,r=t.getPanelByButton(e),o=e.closest("section");e.setAttribute("aria-expanded",n),o.setAttribute("data-open",n),n?(r.ontransitionend=null,r.hidden=!1,requestAnimationFrame((function(){r.style.height="".concat(r.scrollHeight,"px")}))):(r.style.height="0px",r.ontransitionend=function(){r.hidden=!0})}))}},{key:"getPanelByButton",value:function(t){return this.panels.find((function(e){return t.getAttribute("aria-controls")===e.id}))}}])&&g(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),i}(function(){function t(n,r){var i=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),o(this,d),o(this,y),a(this,f,{writable:!0,value:void 0}),a(this,p,{writable:!0,value:void 0}),this.element=n,this.state=new Proxy({},s(this,y,b).call(this)),this.props=new Proxy(e({},r),s(this,d,m).call(this)),u(this,f,{}),u(this,p,null),this.element.addEventListener("state-change",(function(t){c(i,f).newState=e(e({},c(i,f).newState),t.detail.newState),c(i,f).prevState=e(e({},c(i,f).prevState),t.detail.prevState),null!==c(i,p)&&cancelAnimationFrame(c(i,p)),u(i,p,requestAnimationFrame((function(){var t=i.sync(c(i,f).newState,c(i,f).prevState);for(var e in t)e in c(i,f).newState&&t[e]();u(i,f,{})})))}))}var n,i;return n=t,(i=[{key:"sync",value:function(t,e){return console.warn("No local sync method provided in component subclass."),{}}}])&&r(n.prototype,i),Object.defineProperty(n,"prototype",{writable:!1}),t}());function A(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}window.addEventListener("load",(function(){document.querySelectorAll("[data-component=Accordion]").forEach((function(t){t&&new j(t,{multiselectable:t.classList.contains("Accordion--multiselectable")})}))}));var k=function(){function t(e,n){var r=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.element=e,this.props=n,this.backgroundImages=this.element.getAttribute("data-background-images")&&this.element.getAttribute("data-background-images").trim().split(" "),this.backgroundImages.length>1&&(this.backgroundImages.forEach((function(t){(new Image).src=t})),requestAnimationFrame((function(){r.rotateBackgrounds()}))),this.props.parallax&&!0===window.matchMedia("(prefers-reduced-motion: no-preference)").matches&&window.addEventListener("scroll",(function(){r.parallax()}))}var e,n;return e=t,(n=[{key:"rotateBackgrounds",value:function(){var t=this;clearTimeout(this.rotationSchedule);var e=0;this.backgroundImages.forEach((function(n,r){t.rotationSchedule=setTimeout((function(){t.element.style.backgroundImage="url(".concat(t.backgroundImages[e],")"),e+1===t.backgroundImages.length?t.rotationSchedule=setTimeout((function(){t.rotateBackgrounds()}),t.props.interval):e++}),t.props.interval*r)}))}},{key:"parallax",value:function(){var t=50+.1*window.pageYOffset;this.element.style.backgroundPosition="center ".concat(t,"%")}}])&&A(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();document.querySelectorAll("[data-component=Hero]").forEach((function(t){new k(t,{interval:t.getAttribute("data-interval")||1e4,parallax:t.classList.contains("Hero--parallax")})}))}();