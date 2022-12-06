import WebComponent from "../../scripts/WebComponent/WebComponent.js";
import styles from "./style.css";

import slugify from "../../scripts/utilities/slugify.js";

export default class AccordionSection extends WebComponent(HTMLElement) {
  static state = {
    "expanded": "boolean",
  };

  static get observedAttributes() {
    return ["expanded"];
  }

  connected() {
    this.shadowRoot.adoptedStyleSheets = [styles];

    this.parent = this.closest("tcds-accordion");
    this.siblings = Array.from(this.parent.querySelectorAll("tcds-accordion-section")).filter(instance => instance !== this);

    this.state.expanded = this.parent.props.multiple
      ? this.hasAttribute("expanded")
      : this.parent.sections.filter(section => section.hasAttribute("expanded")).indexOf(this) === 0;
  }

  render() {
    const id = `${this.parent.id}-${slugify(this.props.label)}`;

    return /* html */`
      <section part="section">
        <h${this.parent.props["heading-level"] || "3"} part="heading">
          <button
            part="button"
            id="${id}-button"
            aria-controls="${id}-panel"
            aria-expanded="${this.state.expanded}"
            onclick="this.getRootNode().host.toggle()"
          >
            ${this.props.label}
            <tcds-icon part="icon" icon="${this.state.expanded ? "minus" : "plus"}"></tcds-icon>
          </button>
        </h${this.parent.props["heading-level"] || "3"}>

        <div part="panel" id="${id}-panel" aria-labelledby="${id}-button">
          <div part="content">
            <slot></slot>
          </div>
        </div>
      </section>
    `;
  }

  updated(state) {
    return {
      state: {
        "expanded": () => {
          if(this.state.expanded) {
            this.parts["panel"].style.height = "0px";
            this.parts["panel"].hidden = false;

            requestAnimationFrame(() => {
              this.parts["panel"].style.height = `${this.parts["panel"].scrollHeight}px`;

              if(this.parent.props.multiple === false) {
                this.siblings.filter(sibling => sibling.state.expanded).forEach(sibling => sibling.collapse());
              }
            });
          } else if(state.oldState.expanded) {
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

  expand() {
    this.state.expanded = true;
  }

  collapse() {
    this.state.expanded = false;
  }

  toggle() {
    this.state.expanded = !this.state.expanded;
  }
}

customElements.define("tcds-accordion-section", AccordionSection);
