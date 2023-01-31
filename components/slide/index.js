import WebComponent from "../../scripts/WebComponent/WebComponent.js";

export default class Slide extends WebComponent(HTMLElement) {
  static state = {
    active: {
      type: Boolean,
      default: false,
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
          this.scrollIntoView({
            behavior: "smooth",
            inline: this.parent.props.multiple ? "center" : "start",
          });
        }
      }
    }
  }
}

customElements.define("tcds-slide", Slide);
