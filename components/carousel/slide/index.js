import WebComponent from "../../../utilities/WebComponent/WebComponent.js";

export default class Slide extends WebComponent(HTMLElement) {
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
    return /* html */`
      <section
        role="tabpanel"
        ${this.active ? `` : /* html */`
          aria-hidden="true"
          tabindex="-1"
        `}
      >
        <slot></slot>
      </section>
    `;
  }

  connectedCallback() {
    this.upgradeProperties("active");
    this.update();
  }

  attributeChangedCallback(name, oldValue) {
    this.update({[name]: oldValue});
  }

  updatedCallback(old) {
    if("active" in old) {
      this.carousel.update();
    }
  }
}

customElements.define("tcds-slide", Slide);
