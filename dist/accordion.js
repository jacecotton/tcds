"use strict";(self.webpackChunk_txch_tcds=self.webpackChunk_txch_tcds||[]).push([[131],{679:(t,e,n)=>{n.d(e,{ir:()=>i.A,Rv:()=>s.A,qy:()=>l,N2:()=>c.A,IM:()=>r.A,Yv:()=>o.A});var o=n(557),s=n(86);const l=function(t){const e=[t[0]];for(var n=arguments.length,o=new Array(n>1?n-1:0),s=1;s<n;s++)o[s-1]=arguments[s];return o.forEach(((n,o)=>{Array.isArray(n)?n.forEach((t=>{e.push(String(t))})):e.push(String(n)),e.push(t[o+1])})),e.join("")};var i=n(355),c=n(124),r=n(295)},857:(t,e,n)=>{var o=n(679);const s=new CSSStyleSheet;s.replaceSync(':host {\n  display: flex;\n  flex-direction: column;\n}\n\n[part="controls"] {\n  display: flex;\n  justify-content: end;\n  gap: 1rem;\n  border-bottom: 1px solid var(--tcds-color-gray-2);\n  padding: 0 0 .5rem;\n}\n\n[part="open-all"],\n[part="close-all"] {\n  -webkit-appearance: none;\n          appearance: none;\n  background: none;\n  border: 0;\n  color: inherit;\n  display: flex;\n  font-family: var(--tcds-font-ui);\n  font-weight: var(--tcds-font-weight-semibold);\n  gap: 1ch;\n}');const l=s;class i extends((0,o.Rv)(HTMLElement)){static observedAttributes=["multiple"];constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.adoptedStyleSheets=[o.ir,l]}get template(){return o.qy`
      ${this.multiple?o.qy`
        <div part="controls">
          <button part="open-all" onclick="this.getRootNode().host.showAll()">
            <tcds-icon icon="plus"></tcds-icon>
            <span class="visually-hidden">open</span> all
          </button>
          <button part="close-all" onclick="this.getRootNode().host.closeAll()">
            <tcds-icon icon="minus"></tcds-icon>
            <span class="visually-hidden">close</span> all
          </button>
        </div>
      `:""}
      <slot></slot>
    `}connectedCallback(){o.N2.apply(this,["multiple"]),this.requestUpdate()}attributeChangedCallback(t,e){this.requestUpdate({[t]:e})}get multiple(){return this.hasAttribute("multiple")}set multiple(t){this.toggleAttribute("multiple",Boolean(t))}get sections(){return Array.from(this.querySelectorAll(":scope > tcds-accordion-section"))}showAll(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:()=>!0;this.sections.filter((t=>!t.open)).filter(t).forEach((t=>t.show()))}closeAll(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:()=>!0;this.sections.filter((t=>t.open)).filter(t).forEach((t=>t.close()))}}customElements.define("tcds-accordion",i)}},t=>{t.O(0,[501],(()=>t(t.s=857))),t.O()}]);