"use strict";(self.webpackChunk_txch_tcds=self.webpackChunk_txch_tcds||[]).push([[985],{971:(e,t,s)=>{var a=s(337),l=s(138),c=s(35);const d=new CSSStyleSheet;d.replaceSync('[role="tabpanel"] {\n  padding: 1rem 0 0;\n  padding: var(--tcds-tab-padding-block-start, 1rem) 0 0;\n}');var n=d;class r extends((0,a.Z)(HTMLElement)){static observedAttributes=["selected","label"];constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.adoptedStyleSheets=[n]}get template(){return(0,l.Z)()+`\n      <section role="tabpanel" ${this.selected?"":"hidden"}>\n        <slot></slot>\n      </section>\n    `}connectedCallback(){c.Z.apply(this,["selected","label"]),this.requestUpdate()}attributeChangedCallback(e,t){this.requestUpdate({[e]:t})}updatedCallback(e){"selected"in e&&this.tabs.requestUpdate()}get selected(){return this.hasAttribute("selected")}set selected(e){this.toggleAttribute("selected",Boolean(e))}get label(){return this.getAttribute("label")}set label(e){this.setAttribute("label",e)}get tabs(){return this.closest("tcds-tabs")}}customElements.define("tcds-tab",r)}},e=>{e.O(0,[647],(()=>(971,e(e.s=971)))),e.O()}]);