"use strict";(self.webpackChunk_txch_tcds=self.webpackChunk_txch_tcds||[]).push([[537],{391:(t,e,o)=>{var n=o(957);const i={p:50};class s extends n.WF{static properties={open:{type:Boolean},title:{type:String}};static styles=n.AH`
    [part="heading"] {
      margin: 0;

      @media (max-width: 768px) {
        background: var(--tcds-color-background, var(--tcds-color-white));
        position: var(--tcds-accordion-section-heading-position, sticky);
        top: 0;
        z-index: 2;
      }
    }

    [part="button"] {
      background: none;
      border: none;
      border-bottom: 1px solid var(--tcds-accordion-border-color);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--tcds-micro-s) 0;
      text-align: left;
      font-size: var(--tcds-accordion-heading-font-size, var(--tcds-font-size-m));
      font-family: var(--tcds-font-ui);
      font-weight: var(--tcds-accordion-heading-font-weight, var(--tcds-font-weight-semibold));
      width: 100%;
      color: var(--tcds-color-text);
    }

    [part="icon"] {
      flex-shrink: 0;
      pointer-events: none;
    }

    [part="panel"] {
      overflow: hidden;
    }

    [part="content"] {
      padding: 1.5rem 0;
      border-bottom: 1px solid var(--tcds-accordion-border-color);
    }
  `;constructor(){super(),this.open=!1,this.title=this.querySelector(":scope > [slot=title]")?.innerHTML}connectedCallback(){super.connectedCallback(),this.requestUpdate()}render(){return n.qy`
      <section aria-labelledby="heading">
        <h2 part="heading" id="heading">
          <button
            part="button"
            id="button"
            aria-controls="panel"
            aria-expanded="${this.open}"
            @click="${this.clickHandler}"
          >${this.title}</button>
        </h2>

        <div part="panel" id="panel">
          <div part="content">
            <slot></slot>
          </div>
        </div>
      </section>
    `}clickHandler(){this.time=performance.now(),this.toggle()}show(){this.open=!0}close(){this.open=!1}toggle(t){"function"==typeof t&&(t=t()),this.open="boolean"==typeof t?t:!this.open}firstUpdated(){this.parts={heading:this.renderRoot.querySelector("[part=heading]"),panel:this.renderRoot.querySelector("[part=panel]")}}updated(t){if(t.has("open")&&void 0!==t.get("open")){const e=this.time;this.time=0,e>0&&console.log(`Update process took ${performance.now()-e}ms`);const o={height:["0",`${this.parts.panel.scrollHeight}px`]},n=i.p;this.open?(this.parts.panel.style.height="0",this.parts.panel.hidden=!1,requestAnimationFrame((()=>{this.parts.panel.animate(o,{duration:n}).onfinish=()=>this.parts.panel.style.height="auto"})),this.accordion.closeAll((t=>t!==this))):!0===t.get("open")&&(this.parts.panel.animate(o,{direction:"reverse",duration:n}).onfinish=()=>{this.parts.panel.hidden="until-found"})}else this.open||(this.parts.panel.hidden="until-found")}get accordion(){return this.closest("tcds-accordion")}}customElements.define("tcds-accordion-section",s)}},t=>{t.O(0,[501,866],(()=>t(t.s=391))),t.O()}]);