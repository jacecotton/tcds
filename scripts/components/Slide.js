import WebComponent from "../WebComponent/WebComponent.js";

export default class Slide extends WebComponent(HTMLElement) {
  static get observedAttributes() {
    return ["active"];
  }

  static state = {
    active: "boolean",
  };

  connected() {
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

  updated() {
    return {
      state: {
        "active": () => {
          if(this.state.active) {
            const viewportOffset = this.parent.parts["viewport"].getBoundingClientRect().left;
            const slideOffset = this.getBoundingClientRect().left;
            this.parent.parts["viewport"].scrollLeft += slideOffset - viewportOffset;
          }
        },
      },
    };
  }
}

customElements.define("tcds-slide", Slide);
