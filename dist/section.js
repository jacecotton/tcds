"use strict";(self.webpackChunk_txch_tcds=self.webpackChunk_txch_tcds||[]).push([[764],{679:(t,n,a)=>{a.d(n,{ir:()=>i.A,Rv:()=>r.A,qy:()=>e,N2:()=>c.A,IM:()=>d.A,Yv:()=>s.A});var s=a(557),r=a(86);const e=function(t){const n=[t[0]];for(var a=arguments.length,s=new Array(a>1?a-1:0),r=1;r<a;r++)s[r-1]=arguments[r];return s.forEach(((a,s)=>{Array.isArray(a)?a.forEach((t=>{n.push(String(t))})):n.push(String(a)),n.push(t[s+1])})),n.join("")};var i=a(355),c=a(124),d=a(295)},959:(t,n,a)=>{var s=a(679);const r=new CSSStyleSheet;r.replaceSync('section {\n  display: grid;\n  grid-template-columns: 1fr fit-content(50%);\n  grid-template-areas: "primary secondary";\n  align-items: center;\n  grid-gap: 2rem;\n  gap: 2rem;\n}\n\n@media (max-width: 896px) {\n    :host([variant*="billboard"]) section {\n      --tcds-section-justify: center;\n    }\n\n    :host([variant*="billboard"]:not([image*="sink"])) section {\n      --tcds-section-primary-padding-block-start: 0;\n      --tcds-section-secondary-padding-block-start: 0;\n      --tcds-section-secondary-padding-block-end: 0;\n      --tcds-section-secondary-margin: 0 calc(var(--tcds-site-outer-gutter) * -2);\n\n      grid-template-columns: 1fr;\n      grid-template-rows: repeat(2, auto);\n      grid-template-areas:\n        "secondary"\n        "primary";\n    }\n  }\n\n[part="primary"] {\n  grid-area: primary;\n  padding-top: var(--tcds-section-primary-padding-block-start, var(--_tcds-section-padding-block-start));\n  padding-bottom: var(--tcds-section-primary-padding-block-end, var(--_tcds-section-padding-block-end));\n  display: grid;\n  justify-items: start;\n  justify-items: var(--tcds-section-justify, start);\n  text-align: left;\n  text-align: var(--tcds-section-justify, start);\n}\n\n[part="secondary"] {\n  grid-area: secondary;\n  padding-top: var(--tcds-section-secondary-padding-block-start, var(--_tcds-section-padding-block-start));\n  padding-bottom: var(--tcds-section-secondary-padding-block-end, var(--_tcds-section-padding-block-end));\n  margin: 0;\n  margin: var(--tcds-section-secondary-margin, 0);\n}\n\n[part="cta"] {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: start;\n  justify-content: var(--tcds-section-justify, start);\n  gap: 2rem;\n}\n');const e=r;class i extends((0,s.Rv)(HTMLElement)){constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.adoptedStyleSheets=[s.ir,e]}get template(){return s.qy`
      <section class="max-width">
        <div part="primary">
          <slot name="primary"></slot>
          <slot></slot>
          ${this.#t("cta")?s.qy`
            <nav part="cta">
              <slot name="cta"></slot>
            </nav>
          `:""}
        </div>
        ${this.#t("secondary")?s.qy`
          <div part="secondary">
            <slot name="secondary"></slot>
          </div>
        `:""}
      </section>
    `}connectedCallback(){this.requestUpdate()}#t(){return!!this.querySelector([...arguments].map((t=>`[slot=${t}]`)).join(", "))}}customElements.define("tcds-section",i)}},t=>{t.O(0,[501,866],(()=>t(t.s=959))),t.O()}]);