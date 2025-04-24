"use strict";(self.webpackChunk_txch_tcds=self.webpackChunk_txch_tcds||[]).push([[509],{556:(t,n,e)=>{var i=e(679);const r=new CSSStyleSheet;r.replaceSync(':host {\n  display: block;\n  container-type: inline-size;\n}\n\narticle {\n  display: grid;\n  overflow: hidden;\n  height: 100%;\n}\n\n:host([orientation*="horizontal"]) article {\n    grid-template-columns: min(33.33%, 220px) 1fr;\n  }\n\n:host(:not([orientation*="horizontal"])) article {\n    grid-template-columns: 1fr;\n    grid-template-rows: min-content 1fr;\n  }\n\n@container (min-width: 375px) {\n    :host(:not([orientation*="horizontal"]):not([variant*="lite"])) article {\n      --tcds-card-padding: 2rem;\n    }\n  }\n\narticle:hover {\n    --tcds-card-image-scale: 1.025;\n  }\n\narticle:hover [part="cta"] {\n      --tcds-button-secondary-text-color: var(--tcds-color-primary);\n      --tcds-button-secondary-icon-background-color: var(--tcds-color-primary);\n      --tcds-button-secondary-icon-color: var(--tcds-color-white);\n    }\n\n[part="image"] {\n  border-radius: 0;\n  border-radius: var(--tcds-card-image-border-radius, 0);\n  position: relative;\n  overflow: hidden;\n}\n\n[part="image"] ::slotted(img) {\n    width: 100% !important;\n    height: 100% !important;\n    object-fit: cover !important;\n    object-position: center !important;\n    scale: 1 !important;\n    scale: var(--tcds-card-image-scale, 1) !important;\n    transition: scale var(--tcds-animation-expressive-duration) var(--tcds-animation-expressive-easing) !important;\n  }\n\n[part="content"] {\n  display: flex;\n  flex-direction: column;\n  gap: .5rem;\n  padding: 1rem;\n  padding: var(--tcds-card-padding, 1rem);\n}\n\n[part="footer"] {\n  display: flex;\n  justify-content: start;\n  justify-content: var(--tcds-card-footer-justify-content, var(--tcds-card-justify-content, start));\n  gap: 1rem;\n  margin-top: auto;\n  padding-top: 1rem;\n}\n');const a=r;class o extends((0,i.Rv)(HTMLElement)){static observedAttributes=["variant","cta"];constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.adoptedStyleSheets=[i.ir,a]}get template(){return i.qy`
      <article ${this.variant.includes("lite")?"":'data-theme="light"'}>
        <figure part="image">
          <slot name="image"></slot>
        </figure>

        <div part="content">
          <slot name="title"></slot>
          <div part="description">
            <slot name="description"></slot>
            <slot></slot>
          </div>
          ${this.#t("footer")||this.cta?i.qy`
            <footer part="footer">
              <slot name="footer">
                ${this.cta?i.qy`
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
    `}connectedCallback(){if(i.N2.apply(this,["orientation","variant"]),this.requestUpdate(),!this.orientation){this.orient(),new ResizeObserver(this.orient.bind(this)).observe(this.getRootNode().body);const t=this.closest("tcds-dialog");t&&t.addEventListener("toggle",(()=>this.orient.bind(this)))}}attributeChangedCallback(t,n){this.requestUpdate({[t]:n})}orient(){this.orientation=this.getBoundingClientRect?.().width<300||window.innerWidth>640?"vertical":"horizontal"}get orientation(){return this.getAttribute("orientation")?.trim()}set orientation(t){this.setAttribute("orientation",t.trim())}get cta(){let t=this.hasAttribute("cta")&&this.getAttribute("cta").trim();return!1===t?t="Learn more":""===t&&(t=!1),t}set cta(t){this.setAttribute("cta",t.trim())}get variant(){return(this.getAttribute("variant")||"").trim().replace(/\s\s+/g," ").split(" ")}set variant(t){Array.isArray(t)&&(t=t.join(" ")),this.setAttribute("variant",t)}#t(){return!!this.querySelector([...arguments].map((t=>`[slot=${t}]`)).join(", "))}}customElements.define("tcds-card",o)},679:(t,n,e)=>{e.d(n,{ir:()=>o.A,Rv:()=>r.A,qy:()=>a,N2:()=>s.A,IM:()=>c.A,Yv:()=>i.A});var i=e(557),r=e(86);const a=function(t){const n=[t[0]];for(var e=arguments.length,i=new Array(e>1?e-1:0),r=1;r<e;r++)i[r-1]=arguments[r];return i.forEach(((e,i)=>{Array.isArray(e)?e.forEach((t=>{n.push(String(t))})):n.push(String(e)),n.push(t[i+1])})),n.join("")};var o=e(355),s=e(124),c=e(295)}},t=>{t.O(0,[501],(()=>t(t.s=556))),t.O()}]);