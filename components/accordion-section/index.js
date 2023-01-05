import WebComponent from "../../scripts/WebComponent/WebComponent.js";
import slugify from "../../scripts/utilities/slugify.js";
import shadowStyles from "./style.css";
import lightStyles from "./style.light.css";

export default class AccordionSection extends WebComponent(HTMLElement) {
  static state = {
    open: {
      type: Boolean,
      reflected: true,
    },
  };

  connectedCallback() {
    this.shadowRoot.adoptedStyleSheets = [shadowStyles];
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, ...[lightStyles]];

    this.parent = this.closest("tcds-accordion");
    this.siblings = Array.from(this.parent.querySelectorAll("tcds-accordion-section")).filter(instance => instance !== this);

    this.state.open = this.parent.props.multiple
      ? this.hasAttribute("open")
      : this.parent.sections.filter(section => section.hasAttribute("open")).indexOf(this) === 0;
  }

  render() {
    const id = `${this.parent.id}-${slugify(this.props.label)}`;

    return /* html */`
      <section part="section">
        <h${this.parent.props["heading-level"]} part="heading">
          <button
            part="button"
            id="${id}-button"
            aria-controls="${id}-panel"
            aria-expanded="${this.state.open}"
            onclick="this.getRootNode().host.toggle()"
          >
            ${this.props.label}
            <tcds-icon part="icon" icon="${this.state.open ? "minus" : "plus"}"></tcds-icon>
          </button>
        </h${this.parent.props["heading-level"]}>

        <div part="panel" id="${id}-panel" aria-labelledby="${id}-button">
          <div part="content">
            <slot></slot>
          </div>
        </div>
      </section>
    `;
  }

  updatedCallback(state) {
    return {
      state: {
        open: () => {
          if(this.state.open) {
            const height = `${this.parts["panel"].scrollHeight}px`;

            this.parts["panel"].style.height = "0px";
            this.parts["panel"].hidden = false;

            requestAnimationFrame(() => {
              this.parts["panel"].style.height = height;
            });

            if(this.parent.props.multiple === false) {
              this.siblings.filter(sibling => sibling.state.open).forEach(sibling => sibling.close());
            }
          } else if(state.oldState.open) {
            this.parts["panel"].style.height = "0px";

            this.parts["panel"].ontransitionend = () => {
              this.parts["panel"].hidden = true;
              this.parts["panel"].style.height = null;
              this.parts["panel"].ontransitionend = null;
            };
          } else {
            this.parts["panel"].hidden = true;
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

  toggle() {
    this.state.open = !this.state.open;
  }
}

customElements.define("tcds-accordion-section", AccordionSection);
