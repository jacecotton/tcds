!function(){var e={287:function(){!function(){"use strict";if("undefined"!=typeof document&&!("adoptedStyleSheets"in document)){var e="ShadyCSS"in window&&!ShadyCSS.nativeShadow,t=document.implementation.createHTMLDocument(""),n=new WeakMap,o="object"==typeof DOMException?Error:DOMException,i=Object.defineProperty,r=Array.prototype.forEach,a=/@import.+?;?$/gm,s=CSSStyleSheet.prototype;s.replace=function(){return Promise.reject(new o("Can't call replace on non-constructed CSSStyleSheets."))},s.replaceSync=function(){throw new o("Failed to execute 'replaceSync' on 'CSSStyleSheet': Can't call replaceSync on non-constructed CSSStyleSheets.")};var c=new WeakMap,l=new WeakMap,d=new WeakMap,u=new WeakMap,h=M.prototype;h.replace=function(e){try{return this.replaceSync(e),Promise.resolve(this)}catch(e){return Promise.reject(e)}},h.replaceSync=function(e){if(N(this),"string"==typeof e){var t=this;c.get(t).textContent=function(e){var t=e.replace(a,"");return t!==e&&console.warn("@import rules are not allowed here. See https://github.com/WICG/construct-stylesheets/issues/119#issuecomment-588352418"),t.trim()}(e),u.set(t,[]),l.get(t).forEach((function(e){e.isConnected()&&x(t,k(t,e))}))}},i(h,"cssRules",{configurable:!0,enumerable:!0,get:function(){return N(this),c.get(this).sheet.cssRules}}),i(h,"media",{configurable:!0,enumerable:!0,get:function(){return N(this),c.get(this).sheet.media}}),["addRule","deleteRule","insertRule","removeRule"].forEach((function(e){h[e]=function(){var t=this;N(t);var n=arguments;u.get(t).push({method:e,args:n}),l.get(t).forEach((function(o){if(o.isConnected()){var i=k(t,o).sheet;i[e].apply(i,n)}}));var o=c.get(t).sheet;return o[e].apply(o,n)}})),i(M,Symbol.hasInstance,{configurable:!0,value:E});var f={childList:!0,subtree:!0},p=new WeakMap,m=new WeakMap,g=new WeakMap,v=new WeakMap;if(O.prototype={isConnected:function(){var e=m.get(this);return e instanceof Document?"loading"!==e.readyState:function(e){return"isConnected"in e?e.isConnected:document.contains(e)}(e.host)},connect:function(){var e=P(this);v.get(this).observe(e,f),g.get(this).length>0&&F(this),L(e,(function(e){T(e).connect()}))},disconnect:function(){v.get(this).disconnect()},update:function(e){var t=this,n=m.get(t)===document?"Document":"ShadowRoot";if(!Array.isArray(e))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+n+": Iterator getter is not callable.");if(!e.every(E))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+n+": Failed to convert value to 'CSSStyleSheet'");if(e.some(C))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+n+": Can't adopt non-constructed stylesheets");t.sheets=e;var o,i,r=g.get(t),a=(o=e).filter((function(e,t){return o.indexOf(e)===t}));(i=a,r.filter((function(e){return-1===i.indexOf(e)}))).forEach((function(e){var n;(n=k(e,t)).parentNode.removeChild(n),function(e,t){d.get(e).delete(t),l.set(e,l.get(e).filter((function(e){return e!==t})))}(e,t)})),g.set(t,a),t.isConnected()&&a.length>0&&F(t)}},window.CSSStyleSheet=M,A(Document),"ShadowRoot"in window){A(ShadowRoot);var y=Element.prototype,w=y.attachShadow;y.attachShadow=function(e){var t=w.call(this,e);return"closed"===e.mode&&n.set(this,t),t}}var S=T(document);S.isConnected()?S.connect():document.addEventListener("DOMContentLoaded",S.connect.bind(S))}function b(e){return e.shadowRoot||n.get(e)}function E(e){return"object"==typeof e&&(h.isPrototypeOf(e)||s.isPrototypeOf(e))}function C(e){return"object"==typeof e&&s.isPrototypeOf(e)}function k(e,t){return d.get(e).get(t)}function x(e,t){requestAnimationFrame((function(){t.textContent=c.get(e).textContent,u.get(e).forEach((function(e){return t.sheet[e.method].apply(t.sheet,e.args)}))}))}function N(e){if(!c.has(e))throw new TypeError("Illegal invocation")}function M(){var e=this,n=document.createElement("style");t.body.appendChild(n),c.set(e,n),l.set(e,[]),d.set(e,new WeakMap),u.set(e,[])}function T(e){var t=p.get(e);return t||(t=new O(e),p.set(e,t)),t}function A(e){i(e.prototype,"adoptedStyleSheets",{configurable:!0,enumerable:!0,get:function(){return T(this).sheets},set:function(e){T(this).update(e)}})}function L(e,t){for(var n=document.createNodeIterator(e,NodeFilter.SHOW_ELEMENT,(function(e){return b(e)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}),null,!1),o=void 0;o=n.nextNode();)t(b(o))}function P(e){var t=m.get(e);return t instanceof Document?t.body:t}function F(e){var t=document.createDocumentFragment(),n=g.get(e),o=v.get(e),i=P(e);o.disconnect(),n.forEach((function(n){t.appendChild(k(n,e)||function(e,t){var n=document.createElement("style");return d.get(e).set(t,n),l.get(e).push(t),n}(n,e))})),i.insertBefore(t,null),o.observe(i,f),n.forEach((function(t){x(t,k(t,e))}))}function O(t){var n=this;n.sheets=[],m.set(n,t),g.set(n,[]),v.set(n,new MutationObserver((function(t,o){document?t.forEach((function(t){e||r.call(t.addedNodes,(function(e){e instanceof Element&&L(e,(function(e){T(e).connect()}))})),r.call(t.removedNodes,(function(t){t instanceof Element&&(function(e,t){return t instanceof HTMLStyleElement&&g.get(e).some((function(t){return k(t,e)}))}(n,t)&&F(n),e||L(t,(function(e){T(e).disconnect()})))}))})):o.disconnect()})))}}()}},t={};function n(o){var i=t[o];if(void 0!==i)return i.exports;var r=t[o]={exports:{}};return e[o](r,r.exports,n),r.exports}!function(){"use strict";n(287);const e=["input","option","textarea"],t=["value","checked","selected"],o=["checked","selected"];function i(e,t){return e.nodeType!==t.nodeType||e.tagName!==t.tagName||e.id!==t.id||e.src!==t.src}function r(e,n,o){if(function(e,t){const n=t.replace(/\s+/g,"").toLowerCase();if(["src","href","xlink:href"].includes(e)&&n.includes("javascript:")||n.includes("data:text/html"))return!0}(n,o))return!0;t.includes(n)&&(e[n]="value"===n?o:""),e.setAttribute(n,o)}function a(e,n){t.includes(n)&&(e[n]=""),e.removeAttribute(n)}function s(n,i){if(1!==n.nodeType)return;const c=n.attributes,l=i.attributes;for(let{name:s,value:l}of c)t.includes(s)&&e.includes(n.tagName.toLowerCase())||(o.includes(s)&&0==!["false","null","undefined","0","-0","NaN","0n","-0n"].includes(l)?a(i,s):r(i,s,l));for(let{name:n}of l)c[n]||t.includes(n)&&e.includes(i.tagName.toLowerCase())||a(i,n);Array.from(n.attributes).sort().join()!==Array.from(i.attributes).sort().join()&&s(n,i)}function c(e){return e.childNodes&&e.childNodes.length?null:e.textContent}function l(e,t){1!==e.nodeType&&(e=function(e){const t=(new DOMParser).parseFromString(e,"text/html"),{head:n,body:o}=t;return n&&n.childNodes.length&&Array.from(n.childNodes).reverse().forEach((e=>{o.insertBefore(e,o.firstChild)})),o||t.createElement("body")}(e));const n=e.childNodes,o=t.childNodes;n.forEach(((e,n)=>{if(!o[n])return void t.append(e.cloneNode(!0));if(i(e,o[n])){const t=[...o].slice(n+1).find((t=>!i(e,t)));if(!t)return void o[n].before(e.cloneNode(!0));o[n].before(t)}if(s(e,o[n]),e.nodeName.includes("-"))return;const r=c(e);if(r&&r!==c(o[n])&&(o[n].textContent=r),e.childNodes.length||!o[n].childNodes.length){if(!o[n].childNodes.length&&e.childNodes.length){const t=document.createDocumentFragment();return l(e,t),void o[n].appendChild(t)}e.childNodes.length&&l(e,o[n])}else o[n].innerHTML=""})),function(e,t){let n=e.length-t.length;if(!(n<1))for(;n>0;n--)e[e.length-1].remove()}(o,n)}function d(e,t){h(e,t),t.add(e)}function u(e,t,n){h(e,t),t.set(e,n)}function h(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}function f(e,t,n){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return n}function p(e,t){return function(e,t){return t.get?t.get.call(e):t.value}(e,g(e,t,"get"))}function m(e,t,n){return function(e,t,n){if(t.set)t.set.call(e,n);else{if(!t.writable)throw new TypeError("attempted to set read only private field");t.value=n}}(e,g(e,t,"set"),n),n}function g(e,t,n){if(!t.has(e))throw new TypeError("attempted to "+n+" private field on non-instance");return t.get(e)}const v=new CSSStyleSheet;v.replaceSync(':host {\n  display: block;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background: rgba(0 0 0 / 20%);\n  z-index: 999;\n}\n\n:host(:not([open])) {\n  display: none;\n}\n\n[part="dialog"] {\n  width: 50vw;\n  height: 50vh;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 1000;\n  background: #fff;\n  padding: 3rem;\n}\n');var y=v;class w extends(function(){var e,t,n,o,i;let r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:HTMLElement;return e=new WeakMap,t=new WeakMap,n=new WeakMap,o=new WeakMap,i=new WeakSet,class extends r{constructor(){var r;super(),d(this,i),u(this,e,{writable:!0,value:null}),u(this,t,{writable:!0,value:[]}),u(this,n,{writable:!0,value:0}),u(this,o,{writable:!0,value:this.constructor.baseStyles||(null===(r=document.querySelector("link[title=tcds]"))||void 0===r?void 0:r.href)||"https://unpkg.com/@txch/tcds/dist/tcds.css"}),this.attachShadow({mode:"open"})}connectedCallback(){this._requestUpdate()}_upgradeProperty(e){if(Object.prototype.hasOwnProperty.call(this,e)){const t=this[e];delete this[e],this[e]=t}}_requestUpdate(n){m(this,t,[...p(this,t),n]),null!==p(this,e)&&cancelAnimationFrame(p(this,e)),m(this,e,requestAnimationFrame(f(this,i,a).bind(this)))}};function a(){var i;if(m(this,e,null),l(`\n      ${p(this,o)?`\n        <style id="tcds">@import url(${p(this,o)})</style>\n      `:""}\n      ${this.constructor.template||""}\n    `,this.shadowRoot),m(this,n,(i=p(this,n),++i)),1===p(this,n)){const e=[...this.shadowRoot.querySelectorAll(":not(:defined)")].map((e=>customElements.whenDefined(e.localName)));Promise.all(e).then((()=>{var e,n;this.dispatchEvent(new Event("mount")),null===(e=this.mountedCallback)||void 0===e||e.call(this),null===(n=this.updatedCallback)||void 0===n||n.call(this,p(this,t))})).catch((e=>{console.error("Child components are not defined.",e)}))}else{var r;null===(r=this.updatedCallback)||void 0===r||r.call(this,p(this,t))}m(this,t,[])}}(HTMLElement)){static get observedAttributes(){return["open"]}constructor(){super(),this.shadowRoot.adoptedStyleSheets=[y]}connectedCallback(){this._upgradeProperty.bind("open",this)}static get template(){return'\n      <div part="dialog">\n        <button onclick="this.getRootNode().host.close()">close</button>\n        <slot></slot>\n      </div>\n    '}attributeChangedCallback(e){this._requestUpdate(e)}get open(){return this.hasAttribute("open")}set open(e){this.toggleAttribute("open",Boolean(e))}close(){this.open=!1}show(){this.open=!0}}function S(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return t=[t].flat(),new Promise((o=>{if(!1!==n.lazyload){const t=new IntersectionObserver((o=>{o.forEach((o=>{o.isIntersecting&&(i(),!1!==n.runOnce&&t.unobserve(e))}))}),n.lazyloadSettings||{});t.observe(e)}else i();function i(){e.style.setProperty("--calculated-height",`${e.scrollHeight}px`);let i="";t.forEach(((e,t)=>{i+=`\n          ${t>0?",":""}\n          ${e}\n          var(--tcds-animation-${e}-duration, var(--tcds-animation-${n.timing||"productive"}-duration))\n          var(--tcds-animation-${e}-easing, var(--tcds-animation-${n.timing||"productive"}-easing))\n          var(--tcds-animation-${e}-fill-mode, forwards)\n        `.trim()})),e.style.animation=i,e.onanimationend=t=>{t.stopPropagation(),!1!==n.removeOnFinish&&(e.style.animation=null,""===e.style&&(e.style=null)),e.onanimationend=null,o()}}}))}customElements.define("tcds-dialog",w),window.addEventListener("load",(function(){if(document.querySelector(".site-header")){const e=document.getElementById("site-header-navs"),t=document.querySelectorAll("[controls=site-header-navs]"),n=window.matchMedia("(max-width: 1200px)");function o(n){n.matches?(e.hidden=!0,t.forEach((e=>{e.setAttribute("expanded","false")}))):(e.hidden=!1,t.forEach((e=>{e.setAttribute("expanded","true")})))}function i(){S(e,"slide-out-right",{lazyload:!1}).then((()=>{e.hidden=!0,t.forEach((e=>{e.setAttribute("expanded","false")}))}))}o(n),n.addListener(o.bind(this)),t.forEach((o=>{o.addEventListener("click",(n=>{n.stopPropagation(),e.hidden?(e.hidden=!1,t.forEach((e=>{e.setAttribute("expanded","true")})),S(e,"slide-in-left",{lazyload:!1})):i()})),document.body.addEventListener("click",(()=>{n.matches&&!e.hidden&&i()})),e.addEventListener("click",(e=>{e.stopPropagation()}))}))}}))}()}();