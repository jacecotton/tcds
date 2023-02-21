import WebComponent from "../../utilities/WebComponent/WebComponent.js";
import AnimateElement from "../../utilities/AnimateElement/AnimateElement.js";
import shadowStyles from "./style.css";
import lightStyles from "./style.light.css";

export default class MegaMenu extends WebComponent(HTMLElement) {
  static state = {
    open: {
      type: Boolean,
      reflected: true,
      default: false,
    },
  };

  constructor() {
    super();

    this.shadowRoot.adoptedStyleSheets = [shadowStyles];
    this.getRootNode().adoptedStyleSheets = [...this.getRootNode().adoptedStyleSheets, ...[lightStyles]];
  }

  render() {
    return /* html */`
      <section part="mega-menu">
        <div class="max-width">
          <tcds-button part="close" variant="ui" icon="only x" label="Close menu" controls="${this.id}"></tcds-button>
          <slot name="title"></slot>

          <div part="content">
            <slot></slot>
          </div>
        </div>
      </section>
    `;
  }

  mountedCallback() {
    this.controllers = [
      ...document.querySelectorAll(`[aria-controls="${this.id}"], [controls="${this.id}"]`),
      ...this.shadowRoot.querySelectorAll(`[aria-controls="${this.id}"], [controls="${this.id}"]`)
    ];

    this.controllers.forEach((controller) => {
      controller.addEventListener("click", () => {
        this.state.open = !this.state.open;
      });
    });

    document.body.addEventListener("click", () => {
      this.state.open = false;
    });

    this.parts["mega-menu"].addEventListener("click", (event) => {
      event.stopPropagation();
    });

    this.addEventListener("keyup", (event) => {
      if(event.key === "Escape") {
        this.state.open = false;
      }
    });
  }

  updatedCallback(state) {
    if(state.newState) {
      if("open" in state.newState) {
        this.controllers.forEach((controller) => {
          if(controller.hasAttribute("controls")) {
            controller.setAttribute("expanded", this.state.open);
          } else {
            controller.setAttribute("aria-expanded", this.state.open);
          }
        });

        if(this.state.open) {
          const otherMegaMenus = Array.from(document.querySelectorAll("tcds-mega-menu")).filter(otherMegaMenu => otherMegaMenu !== this);
          otherMegaMenus.forEach(otherMegaMenu => otherMegaMenu.close());
          this.hidden = false;
        } else if(state.oldState.open === true) {
          AnimateElement(this.parts["mega-menu"], (window.innerWidth < 1200 ? "slide-out-right" : ["slide-out-up", "fade-out"]), {
            lazyload: false,
            timing: window.innerWidth < 1200 ? "productive" : "expressive",
          }).then(() => {
            this.hidden = !this.state.open;
          });
        } else {
          this.hidden = true;
        }
      }
    }
  }

  open() {
    this.state.open = true;
  }

  close() {
    this.state.open = false;
  }
}

customElements.define("tcds-mega-menu", MegaMenu);
