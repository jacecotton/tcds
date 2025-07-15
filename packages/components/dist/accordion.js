import{d as t,b as e,h as o,a as n}from"./shared.js";const l=new CSSStyleSheet;l.replaceSync('":host {\\n  display: flex;\\n  flex-direction: column;\\n}\\n\\n[part=\\"controls\\"] {\\n  display: flex;\\n  justify-content: end;\\n  gap: 1rem;\\n  border-bottom: 1px solid var(--tcds-accordion-border-color);\\n  padding: 0 0 .5rem;\\n}\\n\\n[part=\\"open-all\\"],\\n[part=\\"close-all\\"] {\\n  appearance: none;\\n  background: none;\\n  border: 0;\\n  color: inherit;\\n  display: flex;\\n  font-family: var(--tcds-font-ui);\\n  font-weight: var(--tcds-font-weight-semibold);\\n  gap: 1ch;\\n}\\n"');class s extends(t(HTMLElement)){static observedAttributes=["multiple"];constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.adoptedStyleSheets=[e,l]}get template(){return o`
      ${this.multiple?o`
        <div part="controls">
          <button part="open-all" onclick="this.getRootNode().host.showAll()">
            <tcds-icon icon="plus"></tcds-icon>
            <span class="visually-hidden">open</span> all
          </button>
          <button part="close-all" onclick="this.getRootNode().host.closeAll()">
            <tcds-icon icon="minus"></tcds-icon>
            <span class="visually-hidden">close</span> all
          </button>
        </div>
      `:""}
      <slot></slot>
    `}connectedCallback(){n.apply(this,["multiple"]),this.requestUpdate()}attributeChangedCallback(t,e){this.requestUpdate({[t]:e})}get multiple(){return this.hasAttribute("multiple")}set multiple(t){this.toggleAttribute("multiple",Boolean(t))}get sections(){return Array.from(this.querySelectorAll(":scope > tcds-accordion-section"))}showAll(t=()=>!0){this.sections.filter(t=>!t.open).filter(t).forEach(t=>t.show())}closeAll(t=()=>!0){this.sections.filter(t=>t.open).filter(t).forEach(t=>t.close())}}customElements.define("tcds-accordion",s);export{s as default};
