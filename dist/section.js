"use strict";(self.webpackChunk_txch_tcds=self.webpackChunk_txch_tcds||[]).push([[912],{246:(t,n,a)=>{var e=a(566);const r=new CSSStyleSheet;r.replaceSync('section {\n  display: grid;\n  grid-template-columns: 1fr fit-content(600px);\n  grid-template-areas: "primary secondary";\n  align-items: center;\n  grid-gap: 2rem;\n  gap: 2rem;\n}\n\n[part="primary"] {\n  grid-area: primary;\n  padding-top: var(--_tcds-section-padding-block-start);\n  padding-bottom: var(--_tcds-section-padding-block-end);\n}\n\n[part="secondary"] {\n  grid-area: secondary;\n  padding-top: var(--_tcds-section-padding-block-start);\n  padding-bottom: var(--_tcds-section-padding-block-end);\n}\n\n[part="cta"] {\n  display: flex;\n  gap: 2rem;\n}\n');var s=r;class d extends((0,e.cB)(HTMLElement)){constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.adoptedStyleSheets=[e.TF,s]}get template(){return e.dy`
      <section class="max-width">
        <div part="primary">
          <slot name="primary"></slot>
          <slot></slot>
          ${this.#t("cta")?e.dy`
            <nav part="cta">
              <slot name="cta"></slot>
            </nav>
          `:""}
        </div>
        ${this.#t("secondary")?e.dy`
          <div part="secondary">
            <slot name="secondary"></slot>
          </div>
        `:""}
      </section>
    `}connectedCallback(){this.requestUpdate()}#t(){return!!this.querySelector([...arguments].map((t=>`[slot=${t}]`)).join(", "))}}customElements.define("tcds-section",d)},566:(t,n,a)=>{a.d(n,{TF:()=>d.Z,cB:()=>r.Z,dy:()=>s,ZM:()=>c.Z,lV:()=>e.Z});var e=a(230),r=a(337),s=function(t){const n=[t[0]];for(var a=arguments.length,e=new Array(a>1?a-1:0),r=1;r<a;r++)e[r-1]=arguments[r];return e.forEach(((a,e)=>{Array.isArray(a)?a.forEach((t=>{n.push(String(t))})):n.push(String(a)),n.push(t[e+1])})),n.join("")},d=a(655),c=a(35)}},t=>{t.O(0,[647],(()=>(246,t(t.s=246)))),t.O()}]);