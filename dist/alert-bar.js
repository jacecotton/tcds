"use strict";(self.webpackChunk_txch_tcds=self.webpackChunk_txch_tcds||[]).push([[907],{679:(n,t,e)=>{e.d(t,{ir:()=>a.A,Rv:()=>s.A,qy:()=>o,N2:()=>i.A,IM:()=>c.A,Yv:()=>r.A});var r=e(557),s=e(86);const o=function(n){const t=[n[0]];for(var e=arguments.length,r=new Array(e>1?e-1:0),s=1;s<e;s++)r[s-1]=arguments[s];return r.forEach(((e,r)=>{Array.isArray(e)?e.forEach((n=>{t.push(String(n))})):t.push(String(e)),t.push(n[r+1])})),t.join("")};var a=e(355),i=e(124),c=e(295)},748:(n,t,e)=>{var r=e(679);const s=new CSSStyleSheet;s.replaceSync(':host {\n  --tcds-alert-bar-label-width: 13rem;\n\n  display: block;\n}\n\nsection {\n  display: grid;\n  grid-template-columns: var(--tcds-alert-bar-label-width) 1fr min-content;\n  grid-template-rows: 1fr min-content;\n  align-items: center;\n  height: auto;\n  box-shadow: 0 2px 4px var(--tcds-shade-weak);\n}\n\n::slotted(h2),\nslot[name=heading] h2 {\n  grid-column: 1 / -1;\n  grid-row: 1 / 2;\n  border-bottom: 1px solid var(--tcds-color-gray);\n  padding: 1rem 0 1rem 3rem;\n  margin: 0;\n  font-size: var(--tcds-font-size-m);\n}\n\n::slotted(tcds-icon),\nslot[name=heading] tcds-icon {\n  --tcds-icon-size: 1.5rem;\n\n  color: var(--tcds-color-primary);\n  grid-column: 1 / 2;\n  grid-row: 1 / 2;\n  margin-left: 1rem;\n}\n\n[part="close"] {\n  grid-column: -2 / -1;\n  grid-row: 1 / 2;\n}\n\n[part="alerts"] {\n  display: grid;\n  grid-template-columns: repeat(100, 1fr);\n  grid-template-rows: 1fr min-content;\n  grid-column: 1 / -1;\n  align-items: center;\n  overflow-x: auto;\n  overscroll-behavior: none;\n}\n\n@media (min-width: 1536px) {\n\n[part="alerts"] {\n    grid-column: 2 / 3;\n    grid-row: 1 / -1;\n    grid-template-rows: subgrid;\n    width: 100%;\n}\n  }\n\n[part="close"] {\n  z-index: 1;\n  background: transparent;\n  border: 0;\n  -webkit-appearance: none;\n          appearance: none;\n  padding: 1rem;\n  font-size: var(--tcds-font-size-rem);\n}\n');const o=s;class a extends((0,r.Rv)(HTMLElement)){constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.adoptedStyleSheets=[r.ir,o]}get template(){return r.qy`
      <section>
        <slot name="heading">
          <tcds-icon icon="updates"></tcds-icon>
          <h2>Updates</h2>
        </slot>

        <div part="alerts">
          <slot name="alert"></slot>
        </div>

        <button part="close" onclick="this.getRootNode().host.close()" title="Dismiss updates">
          <span class="visually-hidden">Dismiss updates</span>
          <tcds-icon icon="x"></tcds-icon>
        </button>
      </section>
    `}connectedCallback(){this.requestUpdate()}close(){this.hidden=!0}}customElements.define("tcds-alert-bar",a)}},n=>{n.O(0,[501,866],(()=>n(n.s=748))),n.O()}]);