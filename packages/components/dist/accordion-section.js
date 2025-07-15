import{d as e,b as t,h as i,a as n,s as o}from"./shared.js";const s=new CSSStyleSheet;s.replaceSync('""');var a={productive:{duration:50}};class d extends(e(HTMLElement)){static observedAttributes=["open"];constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.adoptedStyleSheets=[t,s]}get template(){const{title:e,headingLevel:t}=this;return i`
      <section aria-labelledby="heading">
        <${t} part="heading" id="heading">
          <button
            part="button"
            id="button"
            aria-controls="panel"
            aria-expanded="${this.open}"
            onclick="this.getRootNode().host.clickHandler()"
          >
            ${e}
            <tcds-icon part="icon" icon="${this.open?"minus":"plus"}"></tcds-icon>
          </button>
        </${t}>

        <div part="panel" id="panel">
          <div part="content">
            <slot></slot>
          </div>
        </div>
      </section>
    `}async connectedCallback(){n.apply(this,["open"]),await customElements.whenDefined("tcds-accordion").then(()=>{this.requestUpdate()})}async attributeChangedCallback(e,t){await customElements.whenDefined("tcds-accordion").then(()=>{this.requestUpdate({[e]:"open"===e?null!==t:t})})}mountedCallback(){registerParts.apply(this,["heading","panel"]),this.deepLinkHandler(),window.addEventListener("hashchange",this.deepLinkHandler.bind(this))}updatedCallback(e){if("open"in e){const t={height:["0",`${this.parts.panel.scrollHeight}px`]},i=matchMedia("(prefers-reduced-motion: reduce)").matches?1:a.productive.duration;this.open?(this.parts.panel.style.height="0",this.parts.panel.hidden=!1,requestAnimationFrame(()=>{this.parts.panel.animate(t,{duration:i}).onfinish=()=>this.parts.panel.style.height="auto"}),this.accordion.multiple||(this.accordion.closeAll(e=>e!==this),setTimeout(()=>{this.parts.heading.getBoundingClientRect().top<parseInt(getComputedStyle(document.documentElement).getPropertyValue("--tcds-site-header-height"))+25&&this.scrollIntoView(!0)},2*i))):e.open&&(this.parts.panel.animate(t,{direction:"reverse",duration:i}).onfinish=()=>this.parts.panel.hidden="until-found")}else this.open||(this.parts.panel.hidden="until-found")}disconnectedCallback(){window.removeEventListener("hashchange",this.deepLinkHandler)}clickHandler(){this.time=performance.now(),this.toggle()}deepLinkHandler(){const e=window.location.hash.substring(1);e&&(this.id||document.getElementById(o(this.title))||(this.id=o(this.title)),(e===this.id||this.querySelector(`[id=${e}], [name=${e}]`))&&(this.show(),requestAnimationFrame(()=>{document.getElementById(e).scrollIntoView(!0)})))}get open(){return this.hasAttribute("open")}set open(e){this.toggleAttribute("open",Boolean(e))}get title(){return this.querySelector(":scope > [slot=title]")?.innerHTML||console.error("No heading element with [slot=title] provided in accordion section.",this)}get headingLevel(){return this.querySelector(":scope > [slot=title]")?.localName||console.error("No heading element with [slot=title] provided in accordion section.",this)}get accordion(){return this.closest("tcds-accordion")}show(){this.open=!0}close(){this.open=!1}toggle(e){"function"==typeof e&&(e=e()),this.open="boolean"==typeof e?e:!this.open}}customElements.define("tcds-accordion-section",d);export{d as default};
