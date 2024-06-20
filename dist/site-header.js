"use strict";(self.webpackChunk_txch_tcds=self.webpackChunk_txch_tcds||[]).push([[776],{742:(e,t,s)=>{var l=s(471),n=s(883),o=s(225);const a=new CSSStyleSheet;a.replaceSync("");var i=a;class h extends((0,l.Z)(HTMLElement)){get template(){const e='\n      <slot name="primary-menu"></slot>\n      <slot name="utility-menu"></slot>\n    ';return(0,n.Z)()+`\n      <slot name="logo"></slot>\n\n      <details part="main-toggle" ${this.mobile?"":"hidden"}>\n        <summary>\n          <span class="visually-hidden">Toggle main menu</span>\n          <tcds-icon icon="hamburger"></tcds-icon>\n        </summary>\n        ${this.mobile?e:""}\n      </details>\n\n      <slot name="search-menu"></slot>\n      ${this.mobile?"":e}\n    `}get open(){return this.hasAttribute("open")}set open(e){const t=this.open;this.toggleAttribute("open",Boolean(e)),this.updatedCallback({open:t})}#e=matchMedia(`(max-width: ${o.AV.m}px)`);get mobile(){return this.#e.matches}get allToggles(){return[...this.querySelectorAll("details"),...this.shadowRoot.querySelectorAll("details")]}searchToggle={};constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.adoptedStyleSheets=[i]}connectedCallback(){this.searchToggle.element=this.querySelector("summary tcds-icon[icon=search]").closest("details"),this.searchToggle.parent=this.searchToggle.element.parentElement,this.searchToggle.name=this.searchToggle.element.getAttribute("name"),this.moveSearchToggle(),this.requestUpdate(),this.#e.addEventListener("change",(()=>{this.open=!1,this.requestUpdate({mobile:!this.mobile})}))}mountedCallback(){this.allToggles.forEach((e=>{e.addEventListener("toggle",(()=>{e.open&&this.allToggles.filter((t=>t!==e)).forEach((e=>e.open=!1))})),e.querySelector("summary").addEventListener("click",(t=>{t.preventDefault(),this.open=e.open=!e.open}))}))}updatedCallback(e){"mobile"in e&&this.moveSearchToggle(),"open"in e&&(document.body.style.overflow=this.open&&this.mobile?"hidden":null)}moveSearchToggle(){this.mobile?(this.searchToggle.element.setAttribute("slot","search-menu"),this.searchToggle.element.removeAttribute("name"),this.appendChild(this.searchToggle.element)):(this.searchToggle.element.removeAttribute("slot"),this.searchToggle.element.setAttribute("name",this.searchToggle.name),this.searchToggle.parent.appendChild(this.searchToggle.element))}}customElements.define("tcds-site-header",h)},225:e=>{e.exports=JSON.parse('{"AV":{"s":896,"m":1280}}')}},e=>{e.O(0,[884,150,79],(()=>(742,e(e.s=742)))),e.O()}]);