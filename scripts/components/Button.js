import WebComponent from "../WebComponent/WebComponent.js";

class Button extends WebComponent(HTMLElement) {
  static props = {
    "icon": "array",
    "new-tab": "boolean",
  }

  render() {
    return /* html */`
      <${this.props.link ? "a" : "button"}
        part="button"
        ${this.props.link ? /* html */`
          href="${this.props.link}"
          ${this.props["new-tab"] ? `target="_blank" rel="noopener noreferrer"` : ""}
        ` : /* html */`
          ${this.props.type ? `type="${this.props.type}"` : ""}
          ${this.props.controls ? `aria-controls="${this.props.controls}"` : ""}
          ${this.props.expanded ? `aria-expanded="${this.props.expanded}"` : ""}
        `}
        ${this.props.icon?.includes("only") ? /* html */`
          aria-label="${this.textContent || this.props.label}"  
          title="${this.textContent || this.props.label}"
        ` : ``}
      >
        ${this.props.icon ? /* html */`
          <tcds-icon part="icon" icon="${this.props.icon.filter(modifier => !["only", "inline", "right"].includes(modifier)).join(" ")}"></tcds-icon>
        ` : ``}
        ${!this.props.icon?.includes("only") ? /* html */`
          <slot>${this.props.label || ""}</slot>
        ` : ``}
      </${this.props.link ? "a" : "button"}>
    `;
  }

  static get styles() {
    return {
      shadow: () => /* css */`
        :host {
          --tcds-button-height: var(--tcds-size-medium);
          --tcds-button-x-padding: var(--tcds-space-normal);
          --tcds-button-font-size: var(--tcds-font-size-medium);
          --tcds-button-background-color: var(--tcds-color-primary);
          --tcds-button-text-color: #fff;
          --tcds-button-icon-color: var(--tcds-color-primary);
          --tcds-button-icon-background-color: #fff;

          display: inline-flex;
          vertical-align: middle;
        }

        :host([size*="large"]) {
          --tcds-button-height: var(--tcds-size-large);
          --tcds-button-x-padding: var(--tcds-size-medium);
          --tcds-button-font-size: 1.125rem;
        }

        :host([size*="small"]) {
          --tcds-button-height: var(--tcds-size-small);
          --tcds-button-font-size: var(--tcds-font-size-small);
        }

        :host([size*="full-width"]),
        :host([size*="full-width"]) [part="button"] {
          display: flex;
          justify-content: center;
          width: 100%;
        }

        :host(:not([variant*="ghost"]):not([variant*="ui"]):not([icon~="only"])) {
          --tcds-button-icon-background-color: var(--tcds-color-primary);
          --tcds-button-icon-color: #fff;
        }

        :host([variant*="ghost"]) {
          --tcds-button-x-padding: 0;
          --tcds-button-background-color: transparent;
          --tcds-button-text-color: var(--tcds-color-secondary);
        }

        :host([variant*="ghost"]:hover) {
          --tcds-button-text-color: var(--tcds-color-primary);
        }

        :host([variant*="secondary"]) {
          --tcds-button-background-color: var(--tcds-color-secondary);
          --tcds-button-text-color: var(--tcds-color-tint-x-strong);
        }

        :host([variant*="ui"]) {
          --tcds-button-background-color: transparent;
          --tcds-button-text-color: inherit;
          --tcds-button-icon-background-color: transparent;
          --tcds-button-icon-color: inherit;
        }

        :host([icon~="right"]) {
          --tcds-button-flex-direction: row-reverse;
        }

        :host([icon~="only"]) {
          --tcds-button-width: var(--tcds-button-height);
          --tcds-button-x-padding: 0;
          --tcds-button-icon-padding: 0;
          --tcds-button-icon-background-color: transparent;
          --tcds-button-icon-color: currentColor;
        }

        :host(:not([icon~="only"]):not([variant*="ui"]):hover) {
          --tcds-button-icon-background-color: var(--tcds-color-primary);
          --tcds-button-icon-color: #fff;
        }
        
        :host(:not([variant*="ghost"]):hover),
        :host([variant*="ui"]:hover) {
          --tcds-button-overlay: var(--tcds-color-shade-x-weak);
        }

        :host(:not([variant*="ghost"]):not([variant*="ui"])) {
          --tcds-button-font-weight: var(--tcds-font-weight-bold);
        }

        :host(:not([variant*="ghost"]):not([variant*="ui"]):not([icon~="only"]):hover) {
          --tcds-button-box-shadow: 0.125rem 0 0.625rem 0 var(--tcds-color-shade-weak);
        }

        :host(:active) {
          --tcds-button-scale: 0.99;
        }

        [part="button"] {
          appearance: none;
          border: 0;
          margin: 0;
          background-color: var(--tcds-button-background-color);
          box-shadow: var(--tcds-button-box-shadow, none);
          color: var(--tcds-button-text-color);
          display: inline-flex;
          align-items: center;
          flex-direction: var(--tcds-button-flex-direction, row);
          gap: var(--tcds-space-tight);
          justify-content: center;
          font-size: var(--tcds-button-font-size);
          font-weight: var(--tcds-button-font-weight, var(--tcds-font-weight-semibold));
          font-family: var(--tcds-font-ui);
          line-height: 1;
          white-space: nowrap;
          overflow: hidden;
          position: relative;
          text-decoration: none;
          text-align: center;
          cursor: pointer;
          user-select: none;
          z-index: 1;
          height: var(--tcds-button-height);
          width: var(--tcds-button-width, auto);
          padding: 0 var(--tcds-button-x-padding);
          border-radius: var(--tcds-button-height);
          transform: scale(var(--tcds-button-scale, 1)) translate(var(--tcds-button-translate, 0, 0));
          transition:
            transform .15s ease-in,
            background-color .08s ease-in,
            color .08s ease-in,
            box-shadow .08s ease-in;
        }

        [part="button"]::after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: -1;
          background-color: var(--tcds-button-overlay, rgba(0, 0, 0, 0));
          transition: background-color .08s ease-in;
        }

        [part="icon"] {
          background-color: var(--tcds-button-icon-background-color);
          color: var(--tcds-button-icon-color);
          padding: var(--tcds-button-icon-padding, .1em);
          border-radius: 1em;
          transition:
            background-color .08s ease-in,
            color .08s ease-in;
        }
      `,

      light: () => /* css */`
        [data-theme="dark"] tcds-button:not([variant*="ghost"]):not([variant*="ui"]):not([variant*="secondary"]):not(:hover) {
          --tcds-button-background-color: #fff;
          --tcds-button-text-color: var(--tcds-color-primary);
          --tcds-button-icon-background-color: #fff;
          --tcds-button-icon-color: var(--tcds-color-primary);
        }

        [data-theme="dark"] tcds-button[variant*="ghost"] {
          --tcds-button-text-color: #fff;
        }

        [data-theme="dark"] tcds-button:hover {
          --tcds-button-overlay: rgba(0, 0, 0, 0);
        }

        [data-theme="dark"] tcds-button[variant*="ui"] {
          --tcds-button-background-color: var(--tcds-color-tint-strong);
          --tcds-button-text-color: var(--tcds-color-secondary);
        }

        [data-theme="dark"] tcds-button[variant*="ui"] {
          --tcds-button-background-color: var(--tcds-color-tint-x-strong);
        }
      `,
    };
  }
}

customElements.define("tcds-button", Button);