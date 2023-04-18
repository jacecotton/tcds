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
        ${this.state.active ? `` : /* html */`
          aria-hidden="true"
          tabindex="-1"
        `}
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
        requestAnimationFrame(() => {
          const {offsetLeft: slideLeft, offsetWidth: slideWidth} = this;
          const {offsetLeft: viewportLeft, offsetWidth: viewportWidth} = this.parent.viewport;

          this.parent.viewport.scrollLeft = this.parent.props.multiple
            ? (slideLeft - viewportLeft) - (viewportWidth / 2) + (slideWidth / 2)
            : (slideLeft - viewportLeft);
        });
      }
    });
  }
}

customElements.define("tcds-slide", Slide);
