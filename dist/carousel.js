"use strict";(self.webpackChunk_txch_tcds=self.webpackChunk_txch_tcds||[]).push([[369],{578:(t,e,i)=>{var n=i(566);const s=new CSSStyleSheet;s.replaceSync(':host {\n  display: block;\n  position: relative;\n}\n\n:host(:hover),\n:host(:focus-within) {\n  --tcds-carousel-play-pause-opacity: 1;\n}\n\n:host([multiple]) {\n  --tcds-carousel-slide-gap: 1.5rem;\n  --tcds-carousel-slide-size: min(300px, 70vw);\n  --tcds-carousel-slide-align: center;\n  --tcds-carousel-padding-inline: 50%;\n  --tcds-carousel-viewport-align-items: stretch;\n  --tcds-carousel-slide-display: grid;\n  --tcds-carousel-spacer: "";\n}\n\nsection {\n  display: grid;\n  grid-template-areas:\n    "slides"\n    "navigation"\n    "play-pause";\n  grid-template-columns: 100%;\n  align-items: center;\n  justify-content: center;\n  grid-gap: 1rem 0;\n  gap: 1rem 0;\n}\n\n@media (min-width: 896px) {\n\nsection {\n    grid-template-areas:\n      "slides     slides"\n      "play-pause navigation";\n    grid-template-columns: min-content 1fr;\n    justify-content: start;\n}\n  }\n\n@media (hover: none), (max-width: 896px) {\n\nsection {\n    --tcds-carousel-play-pause-opacity: 1;\n}\n  }\n\n:host([navigation*="top"][navigation*="right"]) section {\n    --tcds-carousel-navigation-justify: end;\n\n    grid-template-areas:\n      "navigation"\n      "slides"\n      "play-pause";\n  }\n\n@media (min-width: 896px) {\n\n:host([navigation*="top"][navigation*="right"]) section {\n      grid-template-areas:\n        ".          navigation"\n        "slides     slides"\n        "play-pause .";\n  }\n    }\n\n[part="viewport"] {\n  grid-area: slides;\n  display: flex;\n  gap: 0;\n  gap: var(--tcds-carousel-slide-gap, 0);\n  align-items: center;\n  align-items: var(--tcds-carousel-viewport-align-items, center);\n  overflow-x: scroll;\n  scroll-snap-type: x mandatory;\n  scrollbar-width: none;\n  overscroll-behavior-x: none;\n  position: relative;\n  padding-left: 0;\n  padding-right: 0;\n  padding-left: var(--tcds-carousel-padding-inline, 0);\n  padding-right: var(--tcds-carousel-padding-inline, 0);\n}\n\n@media (prefers-reduced-motion: no-preference) {\n\n[part="viewport"] {\n    scroll-behavior: smooth;\n}\n  }\n\n[part="viewport"]::-webkit-scrollbar {\n    display: none;\n  }\n\n[part="viewport"]::after {\n    content: none;\n    content: var(--tcds-carousel-spacer, none);\n    flex: 1 0 100%;\n  }\n\n::slotted(tcds-slide) {\n  display: block;\n  display: var(--tcds-carousel-slide-display, block);\n  flex: 1 0 100%;\n  flex: 1 0 var(--tcds-carousel-slide-size, 100%);\n  scroll-snap-align: start;\n  scroll-snap-align: var(--tcds-carousel-slide-align, start);\n  scroll-snap-stop: always;\n}\n\n[part="navigation"] {\n  grid-area: navigation;\n  grid-column: 1 / -1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  justify-content: var(--tcds-carousel-navigation-justify, center);\n  gap: 1.5rem;\n}\n\n[role="tablist"] {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  gap: 2rem;\n}\n\n[role="tab"] {\n  display: inline-flex;\n  overflow: hidden;\n  padding: 0;\n  border: 0;\n  cursor: pointer;\n  height: .85rem;\n  width: .85rem;\n  min-width: .85rem;\n  border-radius: .85rem;\n  background-color: var(--tcds-color-gray-2);\n}\n\n[role="tab"]:hover,\n  [role="tab"][aria-selected="true"] {\n    background-color: var(--tcds-color-primary);\n  }\n\n/**\n * 1. Increase touch target size.\n */\n[part="play-pause"],\n[part="next"],\n[part="previous"] {\n  -webkit-appearance: none;\n          appearance: none;\n  background: none;\n  border: 0;\n  display: flex;\n  padding: 1rem; /* 1 */\n  margin: -1rem; /* 1 */\n  color: var(--tcds-color-gray-2);\n}\n[part="play-pause"]:hover, [part="next"]:hover, [part="previous"]:hover {\n    color: var(--tcds-color-gray-4);\n  }\n\n[part="play-pause"] {\n  grid-area: play-pause;\n  opacity: 0;\n  opacity: var(--tcds-carousel-play-pause-opacity, 0);\n  transition: opacity var(--tcds-animation-productive-duration) var(--tcds-animation-productive-easing);\n}\n\n@media (max-width: 896px) {\n\n[part="play-pause"] {\n    margin: -1rem auto;\n}\n  }\n\n[part="next"] {\n  order: 3;\n}\n');var a=s;class o extends((0,n.cB)(HTMLElement)){static observedAttributes=["playing","timing","multiple"];constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.adoptedStyleSheets=[n.TF,a]}get template(){const t="playing"===this.playing,e=(t?"Stop":"Start")+" automatic slide show";return n.dy`
      <section aria-roledescription="carousel">
        ${this.timing?n.dy`
          <button
            part="play-pause"
            title="${e}"
            aria-label="${e}"
            onclick="this.getRootNode().host.toggle()"
          >
            <tcds-icon icon="${t?"pause":"play"}"></tcds-icon>
          </button>
        `:""}
        <div part="navigation">
          <button
            part="previous"
            aria-label="Go to previous slide"
            title="Go to previous slide"
            onclick="this.getRootNode().host.previousClick()"
          >
            <tcds-icon icon="caret-left"></tcds-icon>
          </button>
          <button
            part="next"
            aria-label="Go to next slide"
            title="Go to next slide"
            onclick="this.getRootNode().host.nextClick()"
          >
            <tcds-icon icon="caret-right"></tcds-icon>
          </button>
          <div role="tablist" aria-label="Pick slide">
            ${this.slides.map(((t,e)=>n.dy`
              <button
                role="tab"
                aria-selected="${t.selected}"
                aria-disabled="${t.selected}"
                aria-label="Slide ${e+1} of ${this.slides.length}"
                title="Slide ${e+1} of ${this.slides.length}"
                tabindex="${t.selected?"0":"-1"}"
                onclick="this.getRootNode().host.indicatorClick(event)"
                onkeydown="this.getRootNode().host.indicatorKeydown(event)"
              ></button>
            `))}
          </div>
        </div>
        <div
          part="viewport"
          aria-atomic="false"
          aria-live="${t?"off":"polite"}"
          ${this.timing?'\n            onmouseleave="this.getRootNode().host.resume()"\n            onfocus="this.getRootNode().host.pause()"\n            onblur="this.getRootNode().host.resume()"\n          ':""}
          onmouseover="this.getRootNode().host.viewportHover()"
          ontouchstart="this.getRootNode().host.viewportSwipe()"
        >
          <slot></slot>
        </div>
      </section>
    `}#t={};connectedCallback(){n.ZM.apply(this,["playing","timing","multiple"]),this.requestUpdate()}attributeChangedCallback(t,e){this.requestUpdate({[t]:e})}mountedCallback(){this.viewport=this.shadowRoot.querySelector("[part=viewport]"),this.indicators=Array.from(this.shadowRoot.querySelectorAll("[role=tab]"));const t=matchMedia("(prefers-reduced-motion: reduce)").matches,e=matchMedia("(hover: none)").matches;"playing"!==this.playing||t||e||this.play(),this.slides.forEach((t=>this.swipe.observe(t))),this.scrollOutOfView.observe(this),document.addEventListener("visibilitychange",(()=>{document.hidden?this.pause():!1!==this.#t.isInView&&this.resume()}));const i=this.slides.find((t=>t.selected))||this.slides[0];requestAnimationFrame((()=>this.select(i)))}updatedCallback(t){if(("playing"in t||"timing"in t)&&(clearTimeout(this.player),"playing"===this.playing)){const t=()=>{this.timing&&(this.player=setTimeout((()=>{this.select(this.slides[this.nextIndex]),t()}),1e3*this.timing))};t(),this.#t.observingSwipe=!1}}#e;get swipe(){return new IntersectionObserver((t=>{if(!0===this.#t.observingSwipe)if(this.multiple){const{left:t,right:e}=this.viewport.getBoundingClientRect(),i=Math.floor((t+e)/2);clearTimeout(this.#e),this.#e=setTimeout((()=>{const t=this.slides.reduce(((t,e)=>{const{left:n,right:s}=e.getBoundingClientRect(),a=Math.floor((n+s)/2),o=Math.abs(a-i);return o<t.distance?{slide:e,distance:o}:t}),{slide:null,distance:1/0});t.slide&&this.select(t.slide,{scroll:!1})}),500)}else t.forEach((t=>{t.isIntersecting&&this.select(t.target,{scroll:!1})}))}),{root:this.viewport,threshold:this.multiple?Array.from({length:11},((t,e)=>e/10)):1,rootMargin:"1px"})}get scrollOutOfView(){return new IntersectionObserver((t=>{t.forEach((t=>{t.isIntersecting?(this.resume(),this.#t.isInView=!0):(this.pause(),this.#t.isInView=!1)}))}),{threshold:.9})}nextClick(){this.select(this.slides[this.nextIndex]),this.stop(),this.#t.observingSwipe=!1}previousClick(){this.select(this.slides[this.previousIndex]),this.stop(),this.#t.observingSwipe=!1}indicatorClick(t){let{target:e}=t;this.select(this.slides[this.indicators.indexOf(e)]),this.stop(),this.#t.observingSwipe=!1}indicatorKeydown(t){let{key:e}=t;if(["ArrowRight","ArrowLeft"].includes(e)){const t="ArrowRight"===e?this.nextIndex:this.previousIndex;this.indicators[t].focus(),this.select(this.slides[t])}this.stop(),this.#t.observingSwipe=!1}viewportSwipe(){this.stop(),this.#t.observingSwipe=!0}viewportHover(){this.pause(),this.#t.observingSwipe=!0}#i="playing";get playing(){return this.hasAttribute("playing")&&this.timing?"playing":this.#i}set playing(t){this.#i=t,this.toggleAttribute("playing","playing"===t)}get timing(){return Number(this.getAttribute("timing"))}set timing(t){this.setAttribute("timing",Number(t).toString())}get multiple(){return this.hasAttribute("multiple")}set multiple(t){this.toggleAttribute("multiple",Boolean(t))}get slides(){return Array.from(this.querySelectorAll("tcds-slide"))}get nextIndex(){return(this.slides.indexOf(this.querySelector("[selected]"))+1)%this.slides.length}get previousIndex(){return(this.slides.indexOf(this.querySelector("[selected]"))-1+this.slides.length)%this.slides.length}play(){this.timing?this.playing="playing":console.error("TCDS-CAROUSEL cannot play without a timing property.",this)}stop(){this.playing="stopped"}toggle(){"playing"===this.playing?this.stop():this.play()}pause(){"playing"===this.playing&&(this.playing="paused")}resume(){"paused"===this.playing&&requestAnimationFrame((()=>this.play()))}select(t){let{scroll:e=!0}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.slides.forEach((e=>e.selected=e===t)),e&&requestAnimationFrame((()=>{const{offsetLeft:e,offsetWidth:i}=t,{offsetLeft:n,offsetWidth:s}=this.viewport,a=e+i/2,o=n+s/2;this.viewport.scrollLeft=this.multiple?a-o:e-n}))}}customElements.define("tcds-carousel",o)},566:(t,e,i)=>{i.d(e,{TF:()=>o.Z,cB:()=>s.Z,dy:()=>a,ZM:()=>r.Z,lV:()=>n.Z});var n=i(230),s=i(337),a=function(t){const e=[t[0]];for(var i=arguments.length,n=new Array(i>1?i-1:0),s=1;s<i;s++)n[s-1]=arguments[s];return n.forEach(((i,n)=>{Array.isArray(i)?i.forEach((t=>{e.push(String(t))})):e.push(String(i)),e.push(t[n+1])})),e.join("")},o=i(655),r=i(35)}},t=>{t.O(0,[647],(()=>(578,t(t.s=578)))),t.O()}]);