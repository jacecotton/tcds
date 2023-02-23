import WebComponent from "../../../utilities/WebComponent/WebComponent.js";
import slugify from "../../../utilities/string-utils/slugify.js";
import shadowStyles from "./style.css";
import lightStyles from "./style.light.css";

export default class AccordionSection extends WebComponent(HTMLElement) {
  static state = {
    open: {
      type: Boolean,
      reflected: true,
    },
  };

  constructor() {
    super();

    this.shadowRoot.adoptedStyleSheets = [shadowStyles];
    this.getRootNode().adoptedStyleSheets = [...this.getRootNode().adoptedStyleSheets, ...[lightStyles]];
  }

  connectedCallback() {
    super.connectedCallback();

    this.parent = this.closest("tcds-accordion");
    this.siblings = Array.from(this.parent.sections).filter(instance => instance !== this);

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
            <tcds-icon part="icon" icon="chevron-down"></tcds-icon>
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
    if(state.newState) {
      if("open" in state.newState) {
        const panel = this.shadowRoot.querySelector("[part~=panel]");

        if(this.state.open) {
          panel.style.height = "0px";
          panel.hidden = false;

          requestAnimationFrame(() => {
            panel.style.height = `${panel.scrollHeight}px`;
          });

          if(this.parent.props.multiple === false) {
            this.siblings.filter(sibling => sibling.state.open).forEach(sibling => sibling.close());
          }
        } else if(state.oldState.open) {
          panel.style.height = "0px";

          panel.ontransitionend = () => {
            panel.hidden = true;
            panel.style.height = null;
            panel.ontransitionend = null;
          };
        } else {
          panel.hidden = true;
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

  toggle() {
    this.state.open = !this.state.open;
  }
}

customElements.define("tcds-accordion-section", AccordionSection);