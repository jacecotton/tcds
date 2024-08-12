import {declarative, refreshProperties} from "../../utilities/index.js";

class Slide extends declarative(HTMLElement) {
  static observedAttributes = ["active"];

  get active() {
    return this.hasAttribute("active");
  }

  set active(value) {
    this.toggleAttribute("active", Boolean(value));
  }

  get carousel() {
    return this.closest("tcds-carousel");
  }

  get template() {
    return `
      <section
        role="tabpanel"
        ${this.active ? `` : `
          aria-hidden="true"
          tabindex="-1"
        `}
      >
        <slot></slot>
      </section>
    `;
  }

  constructor() {
    super();
    this.attachShadow({mode: "open"});
  }

  connectedCallback() {
    refreshProperties.apply(this, ["active"]);
    this.requestUpdate();
  }

  attributeChangedCallback(name, oldValue) {
    this.requestUpdate({[name]: oldValue});
  }

  updatedCallback(old) {
    if("active" in old) {
      this.carousel.requestUpdate();
    }
  }
}

customElements.define("tcds-slide", Slide);
