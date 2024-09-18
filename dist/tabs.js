"use strict";(self.webpackChunk_txch_tcds=self.webpackChunk_txch_tcds||[]).push([[520],{882:(t,e,n)=>{var a=n(337),s=n(138),r=n(35);const o=new CSSStyleSheet;o.replaceSync(':host {\n  --tcds-tabs-tab-indicator-size: 4px;\n  --tcds-tabs-tab-padding-inline: 1rem;\n\n  display: block;\n}\n\n:host([size*="full-width"]) {\n  --tcds-tabs-tab-flex-grow: 1;\n}\n\n:host([variant*="centered"]) {\n  --tcds-tabs-tab-justify: center;\n}\n\n[role="tablist"] {\n  display: flex;\n  justify-content: start;\n  justify-content: var(--tcds-tabs-tab-justify, start);\n  overflow-x: auto;\n  overflow-y: hidden;\n  overflow: auto hidden;\n  overscroll-behavior: none;\n  gap: .75rem;\n  padding-bottom: var(--tcds-tabs-tab-indicator-size);\n}\n\n[role="tab"] {\n  -webkit-appearance: none;\n          appearance: none;\n  background: none;\n  border: 0;\n  color: var(--tcds-tabs-tab-text-color, var(--tcds-color-text));\n  font-weight: var(--tcds-font-weight-semibold);\n  font-size: 1.125rem;\n  font-family: var(--tcds-font-ui);\n  display: inline-flex;\n  align-items: center;\n  flex: 0;\n  flex: var(--tcds-tabs-tab-flex-grow, 0);\n  white-space: nowrap;\n  position: relative;\n}\n\n[role="tab"]::after {\n    content: "";\n    display: block;\n    width: calc(100% - var(--tcds-tabs-tab-padding-inline) * 2);\n    height: var(--tcds-tabs-tab-indicator-size);\n    background: var(--tcds-tabs-tab-indicator-color);\n    position: absolute;\n    bottom: calc(var(--tcds-tabs-tab-indicator-size) * -1);\n    left: 50%;\n    transform: translateX(-50%);\n  }\n\n[role="tab"]:hover,\n  [role="tab"]:focus-visible {\n    --tcds-tabs-tab-text-color: var(--tcds-color-red);\n    --tcds-tabs-tab-background: var(--tcds-color-pink);\n  }\n\n[role="tab"]:active {\n    --tcds-tabs-tab-text-color: var(--tcds-color-red-2);\n    --tcds-tabs-tab-background: var(--tcds-color-pink-2);\n  }\n\n[role="tab"][aria-selected="true"] {\n    --tcds-tabs-tab-indicator-color: var(--tcds-color-red);\n  }\n\n[role="tab"] span {\n    background: var(--tcds-tabs-tab-background);\n    border-radius: var(--tcds-border-radius-m);\n    padding: .75rem var(--tcds-tabs-tab-padding-inline);\n  }\n\n:host([variant*="raised"]) {\n  margin-top: -66px !important;\n}\n\n:host([variant*="raised"]) {\n  position: relative;\n  z-index: 2;\n}\n\n:host([variant*="raised"]) [role="tablist"] {\n    gap: 0;\n    padding-top: 1px;\n  }\n\n:host([variant*="raised"]) [role="tab"] {\n    border-top-right-radius: var(--tcds-border-radius-m);\n    border-top-left-radius: var(--tcds-border-radius-m);\n    padding: 10px;\n  }\n\n:host([variant*="raised"]) [role="tab"]:not(:first-of-type) {\n      left: -1px;\n    }\n\n:host([variant*="raised"]) [role="tab"][aria-selected="true"],\n    :host([variant*="raised"]) [role="tab"]:hover {\n      --tcds-tabs-tab-text-color: var(--tcds-color-red);\n      --tcds-tabs-tab-background: var(--tcds-color-pink);\n\n      background: #fff;\n      box-shadow:\n        1px -1px 2px -1px var(--tcds-shade-weak),\n        -1px 0px 2px -1px var(--tcds-shade-weak);\n    }\n');var i=o;class d extends((0,a.Z)(HTMLElement)){static observedAttributes=["collapsed"];constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.adoptedStyleSheets=[i]}get template(){return(0,s.Z)()+`\n      <div role="tablist">\n        ${this.tabs.map((t=>`\n          <button\n            role="tab"\n            aria-selected="${t.selected}"\n            aria-disabled="${t.selected}"\n            tabindex="${t.selected?"0":"-1"}"\n            onclick="this.getRootNode().host.tabClick(event)"\n            onkeydown="this.getRootNode().host.tabKeydown(event)"\n          ><span>${t.label}</span></button>\n        `)).join("")}\n      </div>\n      <slot></slot>\n    `}connectedCallback(){r.Z.apply(this,["collapsed"]),this.requestUpdate()}mountedCallback(){this.tabButtons=Array.from(this.shadowRoot.querySelectorAll("[role=tab]")),this.collapsed||this.select(this.tabs.find((t=>t.selected))||this.tabs[0])}tabClick(t){let{currentTarget:e}=t;this.select(this.tabs[this.tabButtons.indexOf(e)])}tabKeydown(t){let{key:e}=t;if(["ArrowRight","ArrowLeft"].includes(e)){const t="ArrowRight"===e?this.nextIndex:this.previousIndex;this.tabButtons[t].focus(),this.select(this.tabs[t])}}get collapsed(){return this.hasAttribute("collapsed")}set collapsed(t){this.toggleAttribute("collapsed",Boolean(t))}get tabs(){return Array.from(this.querySelectorAll("tcds-tab"))}get nextIndex(){return(this.tabs.indexOf(this.querySelector("[selected]"))+1)%this.tabs.length}get previousIndex(){return(this.tabs.indexOf(this.querySelector("[selected]"))-1+this.tabs.length)%this.tabs.length}select(t){this.tabs.forEach((e=>e.selected=e===t))}}customElements.define("tcds-tabs",d)}},t=>{t.O(0,[647],(()=>(882,t(t.s=882)))),t.O()}]);