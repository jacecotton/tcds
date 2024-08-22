import {declarative, refreshProperties} from "../../utilities/index.js";

class Slide extends declarative(HTMLElement) {
  static observedAttributes = ["selected"];

  get selected() {
    return this.hasAttribute("selected");
  }

  set selected(value) {
    this.toggleAttribute("selected", Boolean(value));
  }

  get carousel() {
    return this.closest("tcds-carousel");
  }

  get template() {
    return `
      <section
        role="tabpanel"
        ${this.selected ? `` : `aria-hidden="true" tabindex="-1"`}
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
    refreshProperties.apply(this, ["selected"]);
    this.requestUpdate();
  }

  attributeChangedCallback(name, oldValue) {
    this.requestUpdate({[name]: oldValue});
  }

  updatedCallback(old) {
    if("selected" in old) {
      this.carousel.requestUpdate();
    }
  }
}

customElements.define("tcds-slide", Slide);
