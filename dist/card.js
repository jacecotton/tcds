"use strict";(self.webpackChunk_txch_tcds=self.webpackChunk_txch_tcds||[]).push([[760],{788:(t,n,r)=>{var i=r(566);const e=new CSSStyleSheet;e.replaceSync(':host {\n  display: block;\n  container-type: inline-size;\n}\n\narticle {\n  display: grid;\n  overflow: hidden;\n}\n\n:host([orientation*="horizontal"]) article {\n    grid-template-columns: min(33.33%, 220px) 1fr;\n  }\n\n:host(:not([orientation*="horizontal"])) article {\n    grid-template-columns: 1fr;\n  }\n\n@container (min-width: 375px) {\n    :host(:not([orientation*="horizontal"]):not([variant="lite"])) article {\n      --tcds-card-padding: 2rem;\n    }\n  }\n\narticle:hover {\n    --tcds-card-image-scale: 1.025;\n    --tcds-card-cta-icon-background: var(--tcds-color-primary);\n    --tcds-card-cta-icon-color: #fff;\n  }\n\n[part="image"] {\n  border-radius: 0;\n  border-radius: var(--tcds-card-image-border-radius, 0);\n  position: relative;\n  overflow: hidden;\n}\n\n[part="image"] ::slotted(img) {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    object-position: center;\n    scale: 1;\n    scale: var(--tcds-card-image-scale, 1);\n    transition: scale var(--tcds-animation-expressive-duration) var(--tcds-animation-expressive-easing);\n  }\n\n[part="content"] {\n  display: flex;\n  flex-direction: column;\n  gap: .5rem;\n  padding: 1rem;\n  padding: var(--tcds-card-padding, 1rem);\n}\n\n[part="footer"] {\n  display: flex;\n  justify-content: start;\n  justify-content: var(--tcds-card-justify-content, start);\n  gap: 1rem;\n  margin-top: auto;\n  padding-top: 1rem;\n}\n\n[part="cta"] {\n  display: flex;\n  align-items: center;\n  gap: .6em;\n  font-family: var(--tcds-font-ui);\n  font-size: var(--tcds-font-size-rem);\n  font-weight: var(--tcds-font-weight-semibold);\n  color: var(--tcds-color-text);\n}\n\n[part="cta"] tcds-icon {\n    width: 1.2em;\n    height: 1.2em;\n    border-radius: 1.2em;\n    padding: .3em;\n    background-color: transparent;\n    background-color: var(--tcds-card-cta-icon-background, transparent);\n    color: var(--tcds-card-cta-icon-color, var(--tcds-color-primary));\n    transition:\n      background-color var(--tcds-animation-productive-duration) var(--tcds-animation-productive-duration), color var(--tcds-animation-productive-duration) var(--tcds-animation-productive-duration);\n  }\n');var a=e;class o extends((0,i.cB)(HTMLElement)){static observedAttributes=["variant","cta"];constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.adoptedStyleSheets=[i.TF,a]}get template(){return i.dy`
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
          ${this.#t("footer")||this.cta?i.dy`
            <footer part="footer">
              <slot name="footer">
                ${this.cta?i.dy`
                  <span part="cta" aria-hidden="true">
                    ${this.cta}
                    <tcds-icon icon="caret-right"></tcds-icon>
                  </span>
                `:""}
              </slot>
            </footer>
          `:""}
          </slot>
        </div>
      </article>
    `}connectedCallback(){i.ZM.apply(this,["orientation","variant"]),this.requestUpdate(),this.orientation||(this.orient(),new ResizeObserver(this.orient.bind(this)).observe(this.getRootNode().body))}attributeChangedCallback(t,n){this.requestUpdate({[t]:n})}orient(){this.orientation=this.getBoundingClientRect?.().width<300||window.innerWidth>640?"vertical":"horizontal"}get orientation(){return this.getAttribute("orientation")?.trim()}set orientation(t){this.setAttribute("orientation",t.trim())}get cta(){let t=this.hasAttribute("cta")&&this.getAttribute("cta").trim();return!1===t?t="Learn more":""===t&&(t=!1),t}set cta(t){this.setAttribute("cta",t.trim())}get variant(){return(this.getAttribute("variant")||"").trim().replace(/\s\s+/g," ").split(" ")}set variant(t){Array.isArray(t)&&(t=t.join(" ")),this.setAttribute("variant",t)}#t(){return!!this.querySelector([...arguments].map((t=>`[slot=${t}]`)).join(", "))}}customElements.define("tcds-card",o)},566:(t,n,r)=>{r.d(n,{TF:()=>o.Z,cB:()=>e.Z,dy:()=>a,ZM:()=>s.Z,lV:()=>i.Z});var i=r(230),e=r(337),a=function(t){const n=[t[0]];for(var r=arguments.length,i=new Array(r>1?r-1:0),e=1;e<r;e++)i[e-1]=arguments[e];return i.forEach(((r,i)=>{Array.isArray(r)?r.forEach((t=>{n.push(String(t))})):n.push(String(r)),n.push(t[i+1])})),n.join("")},o=r(655),s=r(35)}},t=>{t.O(0,[647],(()=>(788,t(t.s=788)))),t.O()}]);