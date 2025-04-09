import {declarative, refreshProperties} from "../../utilities/index.js";

class Slide extends declarative(HTMLElement) {
  static observedAttributes = ["selected"];

  constructor() {
    super();
    this.attachShadow({mode: "open"});
  }

  get template() {
    return `
      <section
        role="tabpanel"
        ${this.selected ? `` : `aria-hidden="true" tabindex="-1"`}
      >
        <slot></slot>
      </section>
    `;
  }

  connectedCallback() {
    refreshProperties.apply(this, ["selected"]);
    this.requestUpdate();
  }

  attributeChangedCallback(name, oldValue) {
    this.requestUpdate({[name]: oldValue});
  }

  updatedCallback(old) {
    // Also trigger the parent carousel's update process if a slide's selected
    // state changes (in order to update the indicator dots, etc.)
    if("selected" in old) {
      this.carousel.requestUpdate();

      if(this.selected) {
        this.carousel.select(this);
      }
    }
  }

  get carousel() {
    return this.closest("tcds-carousel");
  }

  get selected() {
    return this.hasAttribute("selected");
  }

  set selected(value) {
    this.toggleAttribute("selected", Boolean(value));
  }
}

customElements.define("tcds-slide", Slide);
