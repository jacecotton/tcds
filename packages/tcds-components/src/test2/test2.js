import {LitElement, html, css, sharedCSS} from "@shared/index.js";

export class MyComponen2t extends LitElement {
  static styles = [
    sharedCSS,
    css`
      :host {
        color: purple !important;
      }
    `,
  ];
  render() {
    return html`
      test24545
    `;
  }
}

customElements.define("my-component2", MyComponen2t);
