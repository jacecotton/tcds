import WebComponent from "../../../utilities/WebComponent/WebComponent.js";

export default class Slide extends WebComponent(HTMLElement) {
  static observedAttributes = ["active"];

  get active() {
    return this.hasAttribute("active");
  }

  set active(value) {
    this.toggleAttribute("active", Boolean(value));
  }

  get template() {
    return /* html */`
      <section
        role="tabpanel"
        part="slide"
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
    this.update();
    this.carousel = this.closest("tcds-carousel");
  }

  attributeChangedCallback(name, oldValue) {
    this.update({[name]: oldValue});
  }

  updatedCallback(old) {
    if("active" in old) {
      if(this.active && old.active !== true) {
        this.carousel.update();
      }
    }
  }

  select() {
    this.carousel.querySelectorAll("tcds-slide").forEach((slide) => {
      slide.active = slide === this;

      if(slide === this) {
        requestAnimationFrame(() => {
          const slideWidth = this.getBoundingClientRect().width;
          const {width: viewportWidth, left: viewportLeft} = this.carousel.viewport.getBoundingClientRect();

          this.carousel.viewport.scrollTo({
            left: (this.offsetLeft - viewportLeft) - (viewportWidth / 2) + (slideWidth / 2),
            top: 0,
          });
        });
      }
    });
  }
}

customElements.define("tcds-slide", Slide);
