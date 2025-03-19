"use strict";(self.webpackChunk_txch_tcds=self.webpackChunk_txch_tcds||[]).push([[760],{788:(t,n,e)=>{var r=e(566);const i=new CSSStyleSheet;i.replaceSync(':host {\n  display: block;\n  container-type: inline-size;\n}\n\narticle {\n  display: grid;\n  overflow: hidden;\n}\n\n:host([orientation*="horizontal"]) article {\n    grid-template-columns: min(33.33%, 220px) 1fr;\n  }\n\n:host(:not([orientation*="horizontal"])) article {\n    grid-template-columns: 1fr;\n  }\n\n@container (min-width: 375px) {\n    :host(:not([orientation*="horizontal"]):not([variant="lite"])) article {\n      --tcds-card-padding: 2rem;\n    }\n  }\n\narticle:hover {\n    --tcds-card-image-scale: 1.025;\n  }\n\narticle:hover [part="cta"] {\n      --tcds-button-secondary-text-color: var(--tcds-color-primary);\n      --tcds-button-secondary-icon-background-color: var(--tcds-color-primary);\n      --tcds-button-secondary-icon-color: var(--tcds-color-white);\n    }\n\n[part="image"] {\n  border-radius: 0;\n  border-radius: var(--tcds-card-image-border-radius, 0);\n  position: relative;\n  overflow: hidden;\n}\n\n[part="image"] ::slotted(img) {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    object-position: center;\n    scale: 1;\n    scale: var(--tcds-card-image-scale, 1);\n    transition: scale var(--tcds-animation-expressive-duration) var(--tcds-animation-expressive-easing);\n  }\n\n[part="content"] {\n  display: flex;\n  flex-direction: column;\n  gap: .5rem;\n  padding: 1rem;\n  padding: var(--tcds-card-padding, 1rem);\n}\n\n[part="footer"] {\n  display: flex;\n  justify-content: start;\n  justify-content: var(--tcds-card-footer-justify-content, var(--tcds-card-justify-content, start));\n  gap: 1rem;\n  margin-top: auto;\n  padding-top: 1rem;\n}\n');var a=i;class o extends((0,r.cB)(HTMLElement)){static observedAttributes=["variant","cta"];constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.adoptedStyleSheets=[r.TF,a]}get template(){return r.dy`
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
          ${this.#t("footer")||this.cta?r.dy`
            <footer part="footer">
              <slot name="footer">
                ${this.cta?r.dy`
                  <button is="tcds-ui-button" part="cta" variant="secondary" aria-hidden="true">
                    ${this.cta}
                  </button>
                `:""}
              </slot>
            </footer>
          `:""}
          </slot>
        </div>
      </article>
    `}connectedCallback(){r.ZM.apply(this,["orientation","variant"]),this.requestUpdate(),this.orientation||(this.orient(),new ResizeObserver(this.orient.bind(this)).observe(this.getRootNode().body))}attributeChangedCallback(t,n){this.requestUpdate({[t]:n})}orient(){this.orientation=this.getBoundingClientRect?.().width<300||window.innerWidth>640?"vertical":"horizontal"}get orientation(){return this.getAttribute("orientation")?.trim()}set orientation(t){this.setAttribute("orientation",t.trim())}get cta(){let t=this.hasAttribute("cta")&&this.getAttribute("cta").trim();return!1===t?t="Learn more":""===t&&(t=!1),t}set cta(t){this.setAttribute("cta",t.trim())}get variant(){return(this.getAttribute("variant")||"").trim().replace(/\s\s+/g," ").split(" ")}set variant(t){Array.isArray(t)&&(t=t.join(" ")),this.setAttribute("variant",t)}#t(){return!!this.querySelector([...arguments].map((t=>`[slot=${t}]`)).join(", "))}}customElements.define("tcds-card",o)},566:(t,n,e)=>{e.d(n,{TF:()=>o.Z,cB:()=>i.Z,dy:()=>a,ZM:()=>s.Z,I3:()=>c.Z,lV:()=>r.Z});var r=e(230),i=e(337),a=function(t){const n=[t[0]];for(var e=arguments.length,r=new Array(e>1?e-1:0),i=1;i<e;i++)r[i-1]=arguments[i];return r.forEach(((e,r)=>{Array.isArray(e)?e.forEach((t=>{n.push(String(t))})):n.push(String(e)),n.push(t[r+1])})),n.join("")},o=e(655),s=e(35),c=e(761)}},t=>{t.O(0,[647],(()=>(788,t(t.s=788)))),t.O()}]);