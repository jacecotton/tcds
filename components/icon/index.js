import slugify from "../../utilities/string-utils/slugify.js";

export default class Icon extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});

    this.stylesheet = new CSSStyleSheet();
    this.stylesheet.replaceSync(this.styles);
    this.shadowRoot.adoptedStyleSheets = [this.stylesheet];
  }

  connectedCallback() {
    this.stylesheet.insertRule(`
      :host {
        --tcds-icon: var(--tcds-icon-${this.getAttribute("icon") || slugify(this.innerHTML)});
      }
    `, 0);
  }

  get styles() {
    return /* css */`
      :host {
        color: inherit;
        height: var(--tcds-icon-size, 1em);
        width: var(--tcds-icon-size, 1em);
        vertical-align: sub;
      }

      :host(:not([hidden])) {
        display: inline-flex;
      }

      :host::before {
        background: currentcolor;
        content: "";
        display: block;
        height: 100%;
        width: 100%;
        -webkit-mask: var(--tcds-icon);
        mask: var(--tcds-icon);
        -webkit-mask-position: 50% 50%;
        mask-position: 50% 50%;
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: contain;
        mask-size: contain;
        vertical-align: middle;
      }
    `;
  }
}

customElements.define("tcds-icon", Icon);
