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
        if(this.state.active) {
          this.parent.dispatchEvent(new Event("update"));
        }
      }
    }
  }

  select() {
    this.parent.querySelectorAll("tcds-slide").forEach((slide) => {
      slide.state.active = slide === this;

      if(slide === this) {
        const {offsetLeft: slideLeft} = this;
        const {width: slideWidth} = this.getBoundingClientRect();
        const {width: viewportWidth, left: viewportLeft} = this.parent.viewport.getBoundingClientRect();

        this.parent.viewport.scrollTo({
          left: (slideLeft - viewportLeft) - (viewportWidth / 2) + (slideWidth / 2),
          top: 0,
        });
      }
    });
  }
}

customElements.define("tcds-slide", Slide);
