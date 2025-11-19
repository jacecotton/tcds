import {LitElement, html, css, sharedCSS} from "@shared/index.js";

export class MyComponen2t extends LitElement {
  static styles = [
    sharedCSS,
    css`
      * {
        color: red;
      }
    `,
  ];
  render() {
    return html`test`;
  }
}

customElements.define("my-component2", MyComponen2t);
