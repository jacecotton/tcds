import {LitElement, html, css, sharedCSS, updated} from "@shared/index.js";
import {customElement, property} from "lit/decorators.js";

@customElement("my-component")
export class MyComponent extends LitElement {
  static styles = [
    sharedCSS,
    css`
      :host {
        color: yellow;
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

  @updated(["test"]) updatedtest() {
    console.log("updated", this.test);
  }
}
