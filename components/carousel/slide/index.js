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
    this._upgradeProperties(["active"]);

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
          const {offsetLeft: slideLeft, offsetWidth: slideWidth} = this;
          const {offsetLeft: viewportLeft, offsetWidth: viewportWidth} = this.carousel.viewport;

          this.carousel.viewport.scrollLeft = (slideLeft - viewportLeft)
            - (this.carousel.multiple ? (viewportWidth / 2) + (slideWidth / 2) : 0);
        });
      }
    });
  }
}

customElements.define("tcds-slide", Slide);
