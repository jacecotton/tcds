import{d as t,s as e,h as i,b as n,a as s}from"./shared.js";const a=new CSSStyleSheet;a.replaceSync('":host:not([hidden]) {\\n  display: inline-flex;\\n}\\n\\n[part=\\"icon\\"] {\\n  display: inline-flex;\\n  position: relative;\\n  height: 1em;\\n  width: 1em;\\n  vertical-align: middle;\\n}\\n"');class o extends(t(HTMLElement)){static observedAttributes=["icon","category"];get icon(){return this.getAttribute("icon")||e(this.textContent)}set icon(t){this.setAttribute("icon",t)}get category(){return this.getAttribute("category")}set category(t){this.setAttribute("category",t)}get template(){return i`
      <span part="icon" class="
        tcds-icon--${this.icon}
        ${this.category?`tcds-icon--${category}`:""}
      ">
        <span class="visually-hidden">
          ${this.textContent?.trim().length?this.textContent:`${this.icon} icon`}
        </span>
      </span>
    `}constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.adoptedStyleSheets=[n,a]}connectedCallback(){s.apply(this,["icon","category"]),this.requestUpdate(),!this.getAttribute("icon")&&this.icon&&(this.icon=this.icon)}attributeChangedCallback(t,e){this.requestUpdate()}}customElements.define("tcds-icon",o);export{o as default};
