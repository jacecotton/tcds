"use strict";(self.webpackChunk_txch_tcds=self.webpackChunk_txch_tcds||[]).push([[760],{943:(t,e,i)=>{var s=i(471),r=i(883),n=i(426);class a extends((0,s.Z)(HTMLElement)){get template(){return this.querySelector("a[slot=title][href]"),this.querySelector("[slot=title]"),(0,r.Z)()+'\n      <article>\n        <figure>\n          <slot name="image"></slot>\n        </figure>\n\n        <div part="content">\n          <slot name="title"></slot>\n          <slot name="description"></slot>\n          <slot></slot>\n\n          <slot name="footer">\n\n          </slot>\n        </div>\n      </article>\n    '}get orientation(){return this.getAttribute("orientation")?.trim()}set orientation(t){this.setAttribute("orientation",t.trim())}get actionLabel(){let t=this.hasAttribute("action-label")&&this.getAttribute("action-label").trim();return!1===t?t="Read more":""===t&&(t=!1),t}set actionLabel(t){this.setAttribute("action-label",t.trim())}get size(){return this.getAttribute("size")?.trim()}set size(t){this.setAttribute("size",t.trim())}get variant(){return this.getAttribute("variant")?.trim().replace(/\s\s+/g," ").split(" ")}set variant(t){Array.isArray(t)&&(t=t.join(" ")),this.setAttribute("variant",t)}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){n.Z.apply(this,["orientation","actionLabel","size","variant"]),this.requestUpdate()}}customElements.define("tcds-card",a)}},t=>{t.O(0,[884,150,79],(()=>(943,t(t.s=943)))),t.O()}]);