import WebComponent from "../WebComponent/WebComponent.js";
import AnimateElement from "../AnimateElement/AnimateElement.js";

export default class MegaMenu extends WebComponent(HTMLElement) {
  static get observedAttributes() {
    return ["open"];
  }

  static state = {
    open: "boolean",
  }

  connected() {
    this.state.open = false;
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

  mounted() {
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

  updated(state) {
    return {
      state: {
        open: () => {
          this.controllers.forEach((controller) => {
            if(controller.hasAttribute("controls")) {
              controller.setAttribute("expanded", this.state.open);
            } else {
              controller.setAttribute("aria-expanded", this.state.open);
            }
          });

          if(this.state.open) {
            this.closeOtherMegaMenus();
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
        },
      },
    };
  }

  open() {
    this.state.open = true;
  }

  close() {
    this.state.open = false;
  }

  closeOtherMegaMenus() {
    const otherMegaMenus = Array.from(document.querySelectorAll("tcds-mega-menu")).filter(otherMegaMenu => otherMegaMenu !== this);
    otherMegaMenus.forEach(otherMegaMenu => otherMegaMenu.close());
  }

  static get styles() {
    return {
      shadow: () => /* css */`
        [part="mega-menu"] {
          position: absolute;
          display: flex;
          font-family: var(--tcds-font-ui);
        }

        @media (max-width: 1200px) {
          [part="mega-menu"] {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            background-color: #fff;
            color: var(--tcds-color-gray);
            box-shadow:
              -1rem 0 2rem var(--tcds-color-shade-xx-weak),
              -.5rem 0 1rem var(--tcds-color-shade-x-weak);
            padding: 3rem 2rem;
            width: 290px;
            max-width: 100vw;
            overflow-y: auto;
            overscroll-behavior: none;
            z-index: 1;
            animation: slide-in-left var(--tcds-animation-expressive-duration) var(--tcds-animation-expressive-easing);
          }

          .max-width {
            width: 100%;
          }

          [part="close"] {
            position: absolute;
            top: 1rem;
            right: var(--site-outer-gutter);
          }
        }

        @media (min-width: 1200px) {
          [part="mega-menu"] {
            background-image: linear-gradient(to bottom, #fff 0%, var(--tcds-color-blue-x-light) 100%);
            box-shadow: 0 4px 6px var(--tcds-color-shade-x-weak);
            padding: 3rem 0;
            position: absolute;
            left: 0;
            right: 0;
            animation: slide-in-down var(--tcds-animation-expressive-duration) var(--tcds-animation-expressive-easing);
            z-index: -1;
          }

          [part="close"] {
            display: none;
          }
        }
      `,

      light: () => /* css */`
        tcds-mega-menu [slot="title"] {
          font-family: var(--tcds-font-ui);
          font-weight: var(--tcds-font-weight-bold);
          font-size: var(--tcds-font-size-large);
          color: var(--tcds-color-blue-dark);
          border-bottom: .25em solid var(--tcds-color-primary);
          padding-bottom: var(--tcds-space-x-tight);
          margin-bottom: var(--tcds-space-loose);
          display: inline-block;
        }

        tcds-mega-menu ul {
          list-style: none;
          padding-left: 0;
        }

        tcds-mega-menu a,
        tcds-mega-menu button {
          text-decoration: none;
          min-height: var(--tcds-size-medium);
          padding: var(--tcds-space-tight) 0;
          display: inline-flex;
          align-items: center;
          color: inherit;
        }

        tcds-mega-menu a:hover,
        tcds-mega-menu button:hover {
          text-decoration: underline;
        }

        @media (min-width: 1200px) {
          tcds-mega-menu nav {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: var(--tcds-space-x-loose);
          }
        }

        @media (max-width: 1200px) {
          tcds-mega-menu [slot="title"] {
            display: none;
          }

          tcds-mega-menu li {
            border-bottom: 1px solid var(--tcds-color-shade-x-weak);
          }

          tcds-mega-menu nav a,
          tcds-mega-menu nav button {
            display: flex;
          }

          tcds-mega-menu nav a:hover,
          tcds-mega-menu nav button:hover {
            color: var(--tcds-color-gray);
          }
        }
      `,
    };
  }
}

customElements.define("tcds-mega-menu", MegaMenu);