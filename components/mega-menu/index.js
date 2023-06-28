import WebComponent from "../../utilities/WebComponent/WebComponent.js";
import animation from "../../animation/config.json";
import styles from "./style.css";

export default class MegaMenu extends WebComponent(HTMLElement) {
  static observedAttributes = ["open"];

  get open() {
    return this.hasAttribute("open");
  }

  set open(value) {
    this.toggleAttribute("open", Boolean(value));
  }

  get template() {
    return /* html */`
      <section>
        <div class="max-width">
          <button is="tcds-ui-button" part="close" variant="ghost" aria-label="Close menu" title="Close menu">
            <tcds-icon icon="x"></tcds-icon>
          </button>

          <slot name="title"></slot>

          <div part="content">
            <slot></slot>
          </div>
        </div>
      </section>
    `;
  }

  constructor() {
    super();
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  connectedCallback() {
    this.upgradeProperties("open");
    this.update({open: null});
  }

  attributeChangedCallback(name, oldValue) {
    this.update({[name]: name === "open" ? oldValue === "" : oldValue});
  }

  mountedCallback() {
    this.megaMenu = this.shadowRoot.querySelector("section");
    this.closeButton = this.shadowRoot.querySelector("[part=close]");

    this.controllers = [
      ...[this.closeButton],
      ...this.getRootNode().querySelectorAll(`[aria-controls="${this.id}"]`),
    ];

    this.controllers.forEach((controller) => {
      controller.addEventListener("click", (event) => {
        event.stopPropagation();
        this.toggle();
      });
    });

    this.getRootNode().body.addEventListener("click", () => {
      this.close();
    });

    this.megaMenu.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    this.getRootNode().addEventListener("keyup", (event) => {
      if(event.key === "Escape") {
        this.close();
      }
    });
  }

  updatedCallback(old) {
    if("open" in old) {
      this.controllers.forEach((controller) => {
        controller.setAttribute("aria-expanded", this.open);
      });

      if(this.open) {
        Array.from(this.getRootNode().querySelectorAll("tcds-mega-menu"))
          .filter(other => other !== this)
          .forEach(other => other.close());
        this.hidden = false;
      } else if(old.open) {
        this.megaMenu.animate(animation.library[window.innerWidth < 1200 ? "slide-out-right" : "slide-out-up"],
          animation.timesets.productive.duration
        ).onfinish = () => this.hidden = true;
      } else {
        this.hidden = true;
      }
    }
  }

  toggle() {
    this.open = !this.open;
  }

  show() {
    this.open = true;
  }

  close() {
    this.open = false;
  }
}

customElements.define("tcds-mega-menu", MegaMenu);
