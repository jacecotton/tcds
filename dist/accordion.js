"use strict";(self.webpackChunk_txch_tcds=self.webpackChunk_txch_tcds||[]).push([[209],{770:(t,e,n)=>{var o=n(566);const l=new CSSStyleSheet;l.replaceSync(':host {\n  display: flex;\n  flex-direction: column;\n}\n\n[part="controls"] {\n  display: flex;\n  justify-content: end;\n  gap: 1rem;\n  border-bottom: 1px solid var(--tcds-color-gray-2);\n  padding: 0 0 .5rem;\n}\n\n[part="open-all"],\n[part="close-all"] {\n  -webkit-appearance: none;\n          appearance: none;\n  background: none;\n  border: 0;\n  color: inherit;\n  display: flex;\n  font-family: var(--tcds-font-ui);\n  font-weight: var(--tcds-font-weight-semibold);\n  gap: 1ch;\n}');var s=l;class c extends((0,o.cB)(HTMLElement)){static observedAttributes=["multiple"];constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.adoptedStyleSheets=[o.TF,s]}get template(){return o.dy`
      ${this.multiple?o.dy`
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
    `}connectedCallback(){o.ZM.apply(this,["multiple"]),this.requestUpdate()}attributeChangedCallback(t,e){this.requestUpdate({[t]:e})}get multiple(){return this.hasAttribute("multiple")}set multiple(t){this.toggleAttribute("multiple",Boolean(t))}get sections(){return Array.from(this.querySelectorAll(":scope > tcds-accordion-section"))}showAll(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:()=>!0;this.sections.filter((t=>!t.open)).filter(t).forEach((t=>t.show()))}closeAll(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:()=>!0;this.sections.filter((t=>t.open)).filter(t).forEach((t=>t.close()))}}customElements.define("tcds-accordion",c)},566:(t,e,n)=>{n.d(e,{TF:()=>c.Z,cB:()=>l.Z,dy:()=>s,ZM:()=>i.Z,I3:()=>a.Z,lV:()=>o.Z});var o=n(230),l=n(337),s=function(t){const e=[t[0]];for(var n=arguments.length,o=new Array(n>1?n-1:0),l=1;l<n;l++)o[l-1]=arguments[l];return o.forEach(((n,o)=>{Array.isArray(n)?n.forEach((t=>{e.push(String(t))})):e.push(String(n)),e.push(t[o+1])})),e.join("")},c=n(655),i=n(35),a=n(761)}},t=>{t.O(0,[647],(()=>(770,t(t.s=770)))),t.O()}]);