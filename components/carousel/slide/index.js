import {WebComponent, upgradeProperties} from "../../../utilities/WebComponent/WebComponent.js";

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
    upgradeProperties.apply(this, ["active"]);
    this.update();

    this.carousel = this.closest("tcds-carousel");
  }

  attributeChangedCallback(name, oldValue) {
    this.update({[name]: oldValue});
  }

  updatedCallback(old) {
    if("active" in old) {
      if(this.active) {
        this.carousel.update();
      }
    }
  }

  /**
   * Activates the slide.
   *
   * @param {object}  param0 Configuration options
   * @param {boolean} param0.scroll Whether to scroll the viewport when
   *   selecting the slide.
   */
  select({scroll = true} = {}) {
    this.carousel.querySelectorAll("tcds-slide").forEach((slide) => {
      slide.active = slide === this;

      if(slide === this && scroll) {
        requestAnimationFrame(() => {
          const {offsetLeft: slideLeft, offsetWidth: slideWidth} = this;
          const {offsetLeft: viewportLeft, offsetWidth: viewportWidth} = this.carousel.viewport;

          this.carousel.viewport.scrollLeft = this.carousel.multiple
            ? (slideLeft - viewportLeft) - (viewportWidth / 2) + (slideWidth / 2)
            : (slideLeft - viewportLeft);
        });
      }
    });
  }
}

customElements.define("tcds-slide", Slide);
