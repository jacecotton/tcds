"use strict";(self.webpackChunk_txch_tcds=self.webpackChunk_txch_tcds||[]).push([[776],{429:(e,t,s)=>{var i=s(225);class l extends HTMLElement{constructor(){super()}#e=matchMedia(`(max-width: ${i.AV.m}px)`);get scrolled(){return this.hasAttribute("scrolled")}set scrolled(e){this.toggleAttribute("scrolled",Boolean(e))}connectedCallback(){this.details=[...this.querySelectorAll("details")],this.nav=this.querySelector("#site-header-nav"),this.#t(),this.#s(),this.#i(),this.#l(),this.#o()}#t(){this.role="banner"}#s(){this.nav.open=!this.#e.matches,this.#e.addEventListener("change",(()=>this.nav.open=!this.#e.matches))}#i(){window.addEventListener("scroll",(()=>{window.scrollY>this.offsetHeight&&!this.scrolled?this.scrolled=!0:window.scrollY<this.offsetHeight/1.5&&this.scrolled&&(this.scrolled=!1)}))}#l(){const e=Array.from(this.querySelectorAll("details[name=primary-menu]"));e.forEach((t=>{t.addEventListener("toggle",(()=>{this.toggleAttribute("open",Boolean(e.find((e=>e.open))))}))}))}#o(){document.body.addEventListener("click",(()=>{this.#n((e=>!(e===this.nav&&!this.#e.matches)))})),this.details.forEach((e=>{e.addEventListener("click",(t=>{t.stopPropagation(),t.offsetY>this.offsetHeight+e.offsetTop&&(e.open=!1)})),e.querySelector("summary").addEventListener("click",(()=>{this.#n((t=>!(t===this.nav&&!this.#e.matches||t.contains(e))))}))}))}#n(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:()=>!0;this.details.filter((e=>e.open)).filter(e).forEach((e=>e.open=!1))}}customElements.define("tcds-site-header",l)},225:e=>{e.exports=JSON.parse('{"AV":{"s":896,"m":1280}}')}},e=>{e.O(0,[647],(()=>(429,e(e.s=429)))),e.O()}]);