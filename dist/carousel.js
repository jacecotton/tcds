"use strict";(self.webpackChunk_txch_tcds=self.webpackChunk_txch_tcds||[]).push([[369],{578:(t,e,n)=>{var i=n(337),s=n(138),o=n(35);const a=new CSSStyleSheet;a.replaceSync(':host {\n  display: block; \n}\n\n:host(:hover),\n:host(:focus-within) {\n  --tcds-carousel-play-pause-opacity: 1;\n}\n\n:host([multiple]) {\n  --tcds-carousel-slide-gap: 4vw;\n  --tcds-carousel-slide-size: min(700px, 70vw);\n  --tcds-carousel-slide-align: center;\n  --tcds-carousel-padding-inline-end: 50%;\n  --tcds-carousel-viewport-align-items: stretch;\n  --tcds-carousel-slide-display: grid;\n  --tcds-carousel-spacer: "";\n}\n\nsection {\n  display: grid;\n  grid-template-areas:\n    "slides"\n    "navigation"\n    "play-pause";\n  grid-template-columns: 100%;\n  align-items: center;\n  justify-content: center;\n  grid-gap: var(--tcds-space-loose) 0;\n  gap: var(--tcds-space-loose) 0;\n}\n\n@media (min-width: 700px) {\n\nsection {\n    grid-template-areas:\n      "slides     slides"\n      "play-pause navigation";\n    grid-template-columns: min-content 1fr;\n    justify-content: start;\n}\n  }\n\n@media (hover: none), (max-width: 1024px) {\n\nsection {\n    --tcds-carousel-play-pause-opacity: 1;\n}\n  }\n\n:host([navigation*="top"][navigation*="right"]) section {\n    --tcds-carousel-navigation-justify: end;\n\n    grid-template-areas:\n      ".          navigation"\n      "slides     slides"\n      "play-pause .";\n    gap: 1rem;\n  }\n\n[part="viewport"] {\n  grid-area: slides;\n  display: flex;\n  gap: 0;\n  gap: var(--tcds-carousel-slide-gap, 0);\n  align-items: center;\n  align-items: var(--tcds-carousel-viewport-align-items, center);\n  overflow-x: scroll;\n  scroll-snap-type: x mandatory;\n  scrollbar-width: none;\n  overscroll-behavior-x: none;\n  position: relative;\n  padding:\n    1.5rem\n    0\n    1.5rem\n    0;\n  padding:\n    var(--tcds-carousel-padding-block, 1.5rem)\n    var(--tcds-carousel-padding-inline-start, 0)\n    var(--tcds-carousel-padding-block, 1.5rem)\n    var(--tcds-carousel-padding-inline-end, 0);\n}\n\n@media (prefers-reduced-motion: no-preference) {\n\n[part="viewport"] {\n    scroll-behavior: smooth;\n}\n  }\n\n[part="viewport"]::-webkit-scrollbar {\n    display: none;\n  }\n\n[part="viewport"]::after {\n    content: none;\n    content: var(--tcds-carousel-spacer, none);\n    flex: 1 0 100%;\n  }\n\n::slotted(tcds-slide) {\n  display: block;\n  display: var(--tcds-carousel-slide-display, block);\n  flex: 1 0 100%;\n  flex: 1 0 var(--tcds-carousel-slide-size, 100%);\n  scroll-snap-align: start;\n  scroll-snap-align: var(--tcds-carousel-slide-align, start);\n  scroll-snap-stop: always;\n}\n\n[part="navigation"] {\n  grid-area: navigation;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  justify-content: var(--tcds-carousel-navigation-justify, center);\n  gap: 1.5rem;\n}\n\n[role="tablist"] {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  gap: 2rem;\n}\n\n[role="tab"] {\n  display: inline-flex;\n  overflow: hidden;\n  padding: 0;\n  border: 0;\n  cursor: pointer;\n  height: .85rem;\n  width: .85rem;\n  min-width: .85rem;\n  border-radius: .85rem;\n  background: #a8a8a8;\n  transition: background-color var(--tcds-animation-productive-duration) var(--tcds-animation-productive-easing);\n}\n\n[role="tab"]:hover,\n  [role="tab"][aria-selected="true"] {\n    background-color: var(--tcds-color-primary);\n  }\n\n[part="play-pause"],\n[part="next"],\n[part="previous"] {\n  -webkit-appearance: none;\n          appearance: none;\n  background: none;\n  border: 0;\n}\n\n[part="play-pause"] {\n  grid-area: play-pause;\n  margin: 0 auto;\n  opacity: 0;\n  opacity: var(--tcds-carousel-play-pause-opacity, 0);\n  transition: opacity var(--tcds-animation-productive-duration) var(--tcds-animation-productive-easing);\n}\n\n[part="next"]:not(:hover), [part="previous"]:not(:hover) {\n    color: #a8a8a8;\n  }\n\n[part="next"] {\n  order: 3;\n}');var r=a;class l extends((0,i.Z)(HTMLElement)){static observedAttributes=["playing","timing","multiple"];constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.adoptedStyleSheets=[r]}get template(){const t="playing"===this.playing,e=(t?"Stop":"Start")+" automatic slide show";return(0,s.Z)()+`\n      <section aria-roledescription="carousel">\n        ${this.timing?`\n          <button\n            part="play-pause"\n            title="${e}"\n            aria-label="${e}"\n            onclick="this.getRootNode().host.toggle()"\n          >\n            <tcds-icon icon="${t?"pause":"play"}"></tcds-icon>\n          </button>\n        `:""}\n        <div part="navigation">\n          <button\n            part="previous"\n            aria-label="Go to previous slide"\n            title="Go to previous slide"\n            onclick="this.getRootNode().host.previousClick()"\n          >\n            <tcds-icon icon="caret-left"></tcds-icon>\n          </button>\n          <button\n            part="next"\n            aria-label="Go to next slide"\n            title="Go to next slide"\n            onclick="this.getRootNode().host.nextClick()"\n          >\n            <tcds-icon icon="caret-right"></tcds-icon>\n          </button>\n          <div role="tablist" aria-label="Pick slide">\n            ${this.slides.map(((t,e)=>`\n              <button\n                role="tab"\n                aria-selected="${t.selected}"\n                aria-label="Slide ${e+1} of ${this.slides.length}"\n                title="Slide ${e+1} of ${this.slides.length}"\n                tabindex="${t.selected?"0":"-1"}"\n                onclick="this.getRootNode().host.indicatorClick(event)"\n                onkeydown="this.getRootNode().host.indicatorKeydown(event)"\n              ></button>\n            `)).join("")}\n          </div>\n        </div>\n        <div\n          part="viewport"\n          ${this.timing?`\n            aria-live="${t?"off":"polite"}"\n            onmouseleave="this.getRootNode().host.resume()"\n            onfocus="this.getRootNode().host.pause()"\n            onblur="this.getRootNode().host.resume()"  \n          `:""}\n          onmouseover="this.getRootNode().host.viewportHover()"\n          ontouchstart="this.getRootNode().host.viewportSwipe()"\n        >\n          <slot></slot>\n        </div>\n      </section>\n    `}#t={};connectedCallback(){o.Z.apply(this,["playing","timing","multiple"]),this.requestUpdate()}attributeChangedCallback(t,e){this.requestUpdate({[t]:e})}mountedCallback(){this.viewport=this.shadowRoot.querySelector("[part=viewport]"),this.indicators=Array.from(this.shadowRoot.querySelectorAll("[role=tab]"));const t=matchMedia("(prefers-reduced-motion: reduce)").matches,e=matchMedia("(hover: none)").matches;"playing"!==this.playing||t||e||this.play(),this.slides.forEach((t=>this.swipe.observe(t))),this.scrollOutOfView.observe(this),document.addEventListener("visibilitychange",(()=>{document.hidden?this.pause():!1!==this.#t.isInView&&this.resume()}));const n=this.slides.find((t=>t.selected))||this.slides[0];requestAnimationFrame((()=>this.select(n)))}updatedCallback(t){if("playing"in t)if("playing"===this.playing){const t=()=>{this.player=setTimeout((()=>{this.select(this.slides[this.nextIndex]),t()}),1e3*this.timing)};t(),this.#t.observingSwipe=!1}else clearTimeout(this.player)}#e;get swipe(){return new IntersectionObserver((t=>{if(!0===this.#t.observingSwipe)if(this.multiple){const{left:t,right:e}=this.viewport.getBoundingClientRect(),n=Math.floor((t+e)/2);clearTimeout(this.#e),this.#e=setTimeout((()=>{const t=this.slides.reduce(((t,e)=>{const{left:i,right:s}=e.getBoundingClientRect(),o=Math.floor((i+s)/2),a=Math.abs(o-n);return a<t.distance?{slide:e,distance:a}:t}),{slide:null,distance:1/0});t.slide&&this.select(t.slide,{scroll:!1})}),500)}else t.forEach((t=>{t.isIntersecting&&this.select(t.target,{scroll:!1})}))}),{root:this.viewport,threshold:this.multiple?Array.from({length:11},((t,e)=>e/10)):1,rootMargin:"1px"})}get scrollOutOfView(){return new IntersectionObserver((t=>{t.forEach((t=>{t.isIntersecting?(this.resume(),this.#t.isInView=!0):(this.pause(),this.#t.isInView=!1)}))}),{threshold:.9})}nextClick(){this.select(this.slides[this.nextIndex]),this.stop(),this.#t.observingSwipe=!1}previousClick(){this.select(this.slides[this.previousIndex]),this.stop(),this.#t.observingSwipe=!1}indicatorClick(t){let{target:e}=t;this.select(this.slides[this.indicators.indexOf(e)]),this.stop(),this.#t.observingSwipe=!1}indicatorKeydown(t){let{key:e}=t;if(["ArrowRight","ArrowLeft"].includes(e)){event.preventDefault();const t="ArrowRight"===e?this.nextIndex:this.previousIndex;this.indicators[t].focus(),this.select(this.slides[t])}this.stop(),this.#t.observingSwipe=!1}viewportSwipe(){this.stop(),this.#t.observingSwipe=!0}viewportHover(){this.pause(),this.#t.observingSwipe=!0}#n="stopped";get playing(){return this.hasAttribute("playing")&&this.hasAttribute("timing")?"playing":this.#n}set playing(t){this.#n=t,this.toggleAttribute("playing","playing"===t)}get timing(){return Number(this.getAttribute("timing"))}set timing(t){this.setAttribute("timing",Number(t).toString())}get multiple(){return this.hasAttribute("multiple")}set multiple(t){this.toggleAttribute("multiple",Boolean(t))}get slides(){return Array.from(this.querySelectorAll("tcds-slide"))}get nextIndex(){return(this.slides.indexOf(this.querySelector("[selected]"))+1)%this.slides.length}get previousIndex(){return(this.slides.indexOf(this.querySelector("[selected]"))-1+this.slides.length)%this.slides.length}play(){this.playing="playing"}stop(){this.playing="stopped"}toggle(){"playing"===this.playing?this.stop():this.play()}pause(){"playing"===this.playing&&(this.playing="paused")}resume(){"paused"===this.playing&&requestAnimationFrame((()=>{this.play()}))}select(t){let{scroll:e=!0}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.slides.forEach((e=>e.selected=e===t)),e&&requestAnimationFrame((()=>{const{offsetLeft:e,offsetWidth:n}=t,{offsetLeft:i,offsetWidth:s}=this.viewport,o=e+n/2,a=i+s/2;this.viewport.scrollLeft=this.multiple?o-a:e-i}))}}customElements.define("tcds-carousel",l)}},t=>{t.O(0,[647],(()=>(578,t(t.s=578)))),t.O()}]);