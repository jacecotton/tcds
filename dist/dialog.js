"use strict";(self.webpackChunk_txch_tcds=self.webpackChunk_txch_tcds||[]).push([[288],{42:(t,e,o)=>{var s=o(679);const r=new CSSStyleSheet;r.replaceSync("");const a=r;class n extends((0,s.Rv)(HTMLElement)){static observedAttributes=["open","position"];constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.adoptedStyleSheets=[s.ir,a]}get template(){const t=()=>s.qy`
      <button part="close" onclick="this.getRootNode().host.close()">
        <tcds-icon icon="x"></tcds-icon>
      </button>
    `;return s.qy`
      <dialog part="dialog" ${this.open?"open":""}>
        ${this.#t("header")?s.qy`
          <header part="header">
            <slot name="header"></slot>
            ${t()}
          </header>
        `:`\n          ${t()}\n        `}

        <div part="content">
          <slot></slot>
        </div>

        ${this.#t("footer")?s.qy`
          <footer part="footer">
            <slot name="footer"></slot>
          </footer>
        `:""}
        </dialog>
    `}connectedCallback(){s.N2.apply(this,["open","position"]),this.requestUpdate()}mountedCallback(){s.IM.apply(this,["dialog","header","close","content","footer"])}attributeChangedCallback(t,e){this.requestUpdate({[t]:e})}get open(){return this.hasAttribute("open")}set open(t){this.toggleAttribute("open",t)}get returnValue(){return this.parts.dialog.returnValue}set returnValue(t){this.parts.dialog.returnValue=t}showModal(){this.parts.dialog.showModal()}close(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";this.parts.dialog.close(t)}requestClose(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";this.parts.dialog.requestClose(t)}#t(){return!!this.querySelector([...arguments].map((t=>`[slot=${t}]`)).join(", "))}}customElements.define("tcds-dialog",n)},679:(t,e,o)=>{o.d(e,{ir:()=>n.A,Rv:()=>r.A,qy:()=>a,N2:()=>i.A,IM:()=>l.A,Yv:()=>s.A});var s=o(557),r=o(86);const a=function(t){const e=[t[0]];for(var o=arguments.length,s=new Array(o>1?o-1:0),r=1;r<o;r++)s[r-1]=arguments[r];return s.forEach(((o,s)=>{Array.isArray(o)?o.forEach((t=>{e.push(String(t))})):e.push(String(o)),e.push(t[s+1])})),e.join("")};var n=o(355),i=o(124),l=o(295)}},t=>{t.O(0,[501],(()=>t(t.s=42))),t.O()}]);