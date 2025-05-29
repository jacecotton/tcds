"use strict";(self.webpackChunk_txch_tcds=self.webpackChunk_txch_tcds||[]).push([[509],{556:(t,e,n)=>{var r=n(679);const i=new CSSStyleSheet;i.replaceSync(':host {\n  display: block;\n}\n\narticle {\n  display: grid;\n  overflow: hidden;\n  height: 100%;\n}\n\n:host([orientation*="horizontal"]) article {\n    grid-template-columns: min(33.33%, 220px) 1fr;\n  }\n\n:host(:not([orientation*="horizontal"])) article {\n    grid-template-columns: 1fr;\n    grid-template-rows: min-content 1fr;\n  }\n\n[part="image"] {\n  border-radius: 0;\n  border-radius: var(--tcds-card-image-border-radius, 0);\n  position: relative;\n  overflow: hidden;\n}\n\n[part="content"] {\n  display: flex;\n  flex-direction: column;\n  gap: .5rem;\n  padding: 1rem;\n  padding: var(--tcds-card-padding, 1rem);\n}\n\n[part="footer"] {\n  display: flex;\n  justify-content: start;\n  justify-content: var(--tcds-card-footer-justify-content, var(--tcds-card-justify-content, start));\n  gap: 1rem;\n  margin-top: auto;\n  padding-top: 1rem;\n}\n');const a=i;class o extends((0,r.Rv)(HTMLElement)){static observedAttributes=["variant","cta"];constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.adoptedStyleSheets=[r.ir,a]}get template(){return r.qy`
      <article ${this.variant.includes("lite")?"":'data-theme="light"'} data-hover-proxy="tcds-button">
        <figure part="image">
          <slot name="image"></slot>
        </figure>

        <div part="content">
          <slot name="title"></slot>
          <div part="description">
            <slot name="description"></slot>
            <slot></slot>
          </div>
          ${this.#t("footer")||this.cta?r.qy`
            <footer part="footer">
              <slot name="footer">
                ${this.cta?r.qy`
                  <button class="tcds-button" part="cta" variant="secondary" aria-hidden="true">
                    ${this.cta}
                  </button>
                `:""}
              </slot>
            </footer>
          `:""}
          </slot>
        </div>
      </article>
    `}connectedCallback(){r.N2.apply(this,["orientation","variant"]),this.requestUpdate(),this.orientation||(this.orient(),new ResizeObserver(this.orient.bind(this)).observe(this.getRootNode().body),this.closest("tcds-dialog")?.addEventListener("toggle",(()=>this.orient.bind(this))))}attributeChangedCallback(t,e){this.requestUpdate({[t]:e})}orient(){this.orientation=this.getBoundingClientRect?.().width<300||window.innerWidth>640?"vertical":"horizontal"}get orientation(){return this.getAttribute("orientation")?.trim()}set orientation(t){this.setAttribute("orientation",t.trim())}get cta(){let t=this.hasAttribute("cta")&&this.getAttribute("cta").trim();return!1===t?t="Learn more":""===t&&(t=!1),t}set cta(t){this.setAttribute("cta",t.trim())}get variant(){return(this.getAttribute("variant")||"").trim().replace(/\s\s+/g," ").split(" ")}set variant(t){Array.isArray(t)&&(t=t.join(" ")),this.setAttribute("variant",t)}#t(){return!!this.querySelector([...arguments].map((t=>`[slot=${t}]`)).join(", "))}}customElements.define("tcds-card",o)},679:(t,e,n)=>{n.d(e,{ir:()=>o.A,Rv:()=>i.A,qy:()=>a,N2:()=>s.A,IM:()=>d.A,Yv:()=>r.A});var r=n(557),i=n(86);const a=function(t){const e=[t[0]];for(var n=arguments.length,r=new Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];return r.forEach(((n,r)=>{Array.isArray(n)?n.forEach((t=>{e.push(String(t))})):e.push(String(n)),e.push(t[r+1])})),e.join("")};var o=n(355),s=n(124),d=n(295)}},t=>{t.O(0,[501],(()=>t(t.s=556))),t.O()}]);