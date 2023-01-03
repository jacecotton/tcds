import WebComponent from "../../scripts/WebComponent/WebComponent.js";

export default class Slide extends WebComponent(HTMLElement) {
  static state = {
    active: {
      type: Boolean,
      reflected: true,
    },
  };

  connectedCallback() {
    this.parent = this.closest("tcds-carousel");
    this.siblings = Array.from(this.parent.querySelectorAll("tcds-slide"));
    this.position = this.siblings.indexOf(this) + 1;
  }

  render() {
    return /* html */`
      <section
        role="tabpanel"
        aria-roledescription="slide"
        part="slide"
        id="slide-${this.position}"
        aria-labelledby="indicator-${this.position}"
        ${this.state.active === false ? `
          aria-hidden="true"
          tabindex="-1"
        ` : ``}
      >
        <slot></slot>
      </section>
    `;
  }

  updatedCallback() {
    return {
      state: {
        active: () => this.state.active && this.parent.scrollToSlide(this),
      },
    };
  }
}

customElements.define("tcds-slide", Slide);
