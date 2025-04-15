"use strict";(self.webpackChunk_txch_tcds=self.webpackChunk_txch_tcds||[]).push([[288],{42:(t,e,s)=>{var o=s(679);const a=new CSSStyleSheet;a.replaceSync("dialog {\n  align-self: center;\n  justify-self: center;\n  place-self: center;\n}\n");const n=a;class r extends((0,o.Rv)(HTMLElement)){static observedAttributes=["open","position"];constructor(){super(),this.attachShadow({mode:"open",delegatesFocus:!0}),this.shadowRoot.adoptedStyleSheets=[o.ir,n]}get template(){const t=function(){let{title:t="Dismiss dialog"}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return o.qy`
      <button is="tcds-ui-button" part="close" value="close">
        <span class="visually-hidden">${t}</span>
        <tcds-icon icon="x"></tcds-icon>
      </button>
    `};return o.qy`
      <dialog part="dialog" ${this.open?"open":""}>
        <slot name="form">
          <form method="dialog">
            ${this.#t("header")?o.qy`
              <header part="header">
                <slot name="header"></slot>
                ${t()}
              </header>
            `:`\n              ${t()}\n            `}

            <article part="content">
              <slot></slot>
            </article>

            ${this.#t("footer")?o.qy`
              <footer part="footer">
                <slot name="footer"></slot>
              </footer>
            `:""}
          </form>
        </slot>
      </dialog>
    `}connectedCallback(){o.N2.apply(this,["open","position"]),this.requestUpdate()}mountedCallback(){o.IM.apply(this,["dialog","header","close","content","footer"]),this.#e(),this.parts.dialog.addEventListener("beforetoggle",(t=>{this.open="open"===t.newState})),this.parts.dialog.addEventListener("mousedown",(t=>{let{target:e}=t;"DIALOG"===e.nodeName&&this.close(-1)}))}get open(){return this.hasAttribute("open")}set open(t){this.toggleAttribute("open",t)}get returnValue(){return this.parts.dialog.returnValue}set returnValue(t){this.parts.dialog.returnValue=t}showModal(){this.parts.dialog.showModal()}show(){this.parts.dialog.show()}close(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";this.parts.dialog.close(t)}requestClose(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";this.parts.dialog.requestClose(t)}#e(){["toggle","beforetoggle"].forEach((t=>{this.parts.dialog.addEventListener(t,(e=>{this.dispatchEvent(new ToggleEvent(t,e))}))})),["cancel","close"].forEach((t=>{this.parts.dialog.addEventListener(t,(e=>{this.dispatchEvent(new Event(t,e))}))}))}#t(){return!!this.querySelector([...arguments].map((t=>`[slot=${t}]`)).join(", "))}}customElements.define("tcds-dialog",r)},679:(t,e,s)=>{s.d(e,{ir:()=>r.A,Rv:()=>a.A,qy:()=>n,N2:()=>l.A,IM:()=>i.A,Yv:()=>o.A});var o=s(557),a=s(86);const n=function(t){const e=[t[0]];for(var s=arguments.length,o=new Array(s>1?s-1:0),a=1;a<s;a++)o[a-1]=arguments[a];return o.forEach(((s,o)=>{Array.isArray(s)?s.forEach((t=>{e.push(String(t))})):e.push(String(s)),e.push(t[o+1])})),e.join("")};var r=s(355),l=s(124),i=s(295)}},t=>{t.O(0,[501],(()=>t(t.s=42))),t.O()}]);