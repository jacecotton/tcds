"use strict";(self.webpackChunk_txch_tcds=self.webpackChunk_txch_tcds||[]).push([[884],{471:(e,t,n)=>{n.d(t,{Z:()=>h});const s=["input","option","textarea"],i=["value","checked","selected"],o=["checked","selected"];function c(e,t){return e.nodeType!==t.nodeType||e.tagName!==t.tagName||e.getAttribute?.("is")!==t.getAttribute?.("is")||e.id!==t.id||e.src!==t.src}function r(e,t,n){if(function(e,t){const n=t.replace(/\s+/g,"").toLowerCase();if(["src","href","xlink:href"].includes(e)&&n.includes("javascript:")||n.includes("data:text/html"))return!0}(t,n))return!0;i.includes(t)&&(e[t]="value"===t?n:""),e.setAttribute(t,n)}function d(e,t){i.includes(t)&&(e[t]=""),e.removeAttribute(t)}function l(e,t){if(1!==e.nodeType)return;const n=e.attributes,c=t.attributes;for(let{name:c,value:l}of n)i.includes(c)&&s.includes(e.tagName.toLowerCase())||(o.includes(c)&&0==!["false","null","undefined","0","-0","NaN","0n","-0n"].includes(l)?d(t,c):r(t,c,l));for(let{name:e}of c)n[e]||i.includes(e)&&s.includes(t.tagName.toLowerCase())||d(t,e);Array.from(e.attributes).sort().join()!==Array.from(t.attributes).sort().join()&&l(e,t)}function a(e){return e.childNodes&&e.childNodes.length?null:e.textContent}function u(e,t){1!==e.nodeType&&(e=function(e){const t=(new DOMParser).parseFromString(e,"text/html"),{head:n,body:s}=t;return n&&n.childNodes.length&&Array.from(n.childNodes).reverse().forEach((e=>{s.insertBefore(e,s.firstChild)})),s||t.createElement("body")}(e));const n=e.childNodes,s=t.childNodes;n.forEach(((e,n)=>{if(!s[n])return void t.append(e.cloneNode(!0));if(c(e,s[n])){const t=[...s].slice(n+1).find((t=>!c(e,t)));if(!t)return void s[n].before(e.cloneNode(!0));s[n].before(t)}if(e.hasAttribute?.("static"))return;l(e,s[n]);const i=a(e);if(i&&i!==a(s[n])&&(s[n].textContent=i),e.childNodes.length||!s[n].childNodes.length){if(!s[n].childNodes.length&&e.childNodes.length){const t=document.createDocumentFragment();return u(e,t),void s[n].appendChild(t)}e.childNodes.length&&u(e,s[n]),e.touchCallback?.()}else s[n].innerHTML=""})),function(e,t){let n=e.length-t.length;if(!(n<1))for(;n>0;n--)e[e.length-1].remove()}(s,n)}var h=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:HTMLElement;return class extends e{#e=null;#t={};#n=0;requestUpdate(e){e&&(this.#t={...this.#t,...e}),null!==this.#e&&cancelAnimationFrame(this.#e),this.#e=requestAnimationFrame(this.#s.bind(this))}#s(){const e=Object.assign({},this.#t);this.#t={},this.#e=null,this.shadowRoot&&this.template&&(u(this.template,this.shadowRoot),this.#n++,1===this.#n&&this.mountedCallback?.(),this.updatedCallback?.(e))}}}}},e=>{e(e.s=471)}]);