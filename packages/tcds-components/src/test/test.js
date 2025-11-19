import {LitElement, html, css, sharedCSS} from "@shared/index.js";

export class MyComponent extends LitElement {
  static styles = [sharedCSS, css`*{color: red}`];
  render() { return html`test`; }
}

customElements.define("my-component", MyComponent);
