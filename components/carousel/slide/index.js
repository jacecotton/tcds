import WebComponent from "../../../utilities/WebComponent/WebComponent.js";

export default class Slide extends WebComponent(HTMLElement) {
  static state = {
    active: {
      type: Boolean,
      default: false,
      reflected: true,
    },
  };

  connectedCallback() {
    super.connectedCallback();

    this.parent = this.closest("tcds-carousel");
  }

  render() {
    return /* html */`
      <section
        role="tabpanel"
        part="slide"
        ${this.state.active === false ? `
          aria-hidden="true"
          tabindex="-1"
        ` : ``}
      >
        <slot></slot>
      </section>
    `;
  }

  updatedCallback(state) {
    if(state.newState) {
      if("active" in state.newState) {
        if(this.state.active && this.parent.isInView) {
          this.scrollIntoView({
            behavior: "smooth",
            inline: this.parent.props.multiple ? "center" : "start",
            block: "nearest",
          });

          this.parent.dispatchEvent(new Event("update"));
        }
      }
    }
  }

  select() {
    this.parent.querySelectorAll("tcds-slide").forEach((slide) => {
      slide.state.active = slide === this;
    });
  }
}

customElements.define("tcds-slide", Slide);
