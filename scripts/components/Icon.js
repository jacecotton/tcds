import WebComponent from "../WebComponent/WebComponent.js";
import slugify from "../utilities/slugify.js";

export default class Icon extends WebComponent(HTMLElement) {
  render() {
    this.icon = this.props.icon || slugify(this.innerHTML);

    return /* html */`
      <div part="icon" style="--tcds-icon: var(--tcds-icon-${this.icon})"></div>
    `;
  }

  mounted() {
    this.parts["icon"].innerHTML = /* html */`
      <span class="visually-hidden">${this.icon} icon</span>
    `;
  }

  static get styles() {
    return /* css */`
      :host {
        display: inline-flex;
        vertical-align: sub;
      }
      
      [part="icon"] {
        color: inherit;
        height: var(--tcds-icon-size, 1em);
        width: var(--tcds-icon-size, 1em)
      }
      
      [part="icon"]::before {
        background: currentColor;
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