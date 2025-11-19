import {LitElement, html, css, sharedCSS} from "@shared/index.js";

@customElement("my-component")
export class MyComponent extends LitElement {
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

  @property() test = "hello";

  connectedCallback() {
    super.connectedCallback();
    this.test = "world";
  }

  @updated("test") updatedtest() {
    console.log("updated", this.test);
  }
}
