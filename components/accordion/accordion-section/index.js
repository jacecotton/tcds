import WebComponent from "../../../utilities/WebComponent/WebComponent.js";
import slugify from "../../../utilities/string-utils/slugify.js";
import styles from "./style.css";

export default class AccordionSection extends WebComponent(HTMLElement) {
  static observedAttributes = ["open", "label"];

  get open() {
    return this.hasAttribute("open");
  }

  set open(value) {
    this.toggleAttribute("open", Boolean(value));
  }

  get label() {
    return this.getAttribute("label");
  }

  set label(value) {
    this.setAttribute("label", value);
  }

  get accordion() {
    return this.closest("tcds-accordion");
  }

  get template() {
    const id = `${this.accordion.id}-${slugify(this.label)}`;

    return /* html */`
      <section>
        <h${this.accordion.headingLevel} part="heading">
          <button
            part="button"
            id="${id}-button"
            aria-controls="${id}-panel"
            aria-expanded="${this.open}"
            onclick="this.getRootNode().host.toggle()"
          >
            ${this.label}
            <tcds-icon part="icon" icon="chevron-down"></tcds-icon>
          </button>
        </h${this.accordion.headingLevel}>

        <div part="panel" id="${id}-panel" aria-labelledby="${id}-button">
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
    this.upgradeProperties("open", "label");
    this.update();

    this.open = (this.accordion.multiple && this.open)
      || this === this.accordion.sections.find(section => section.open);
  }

  attributeChangedCallback(name, oldValue) {
    if(name === "open") {
      oldValue = oldValue !== null || oldValue === "";
    }

    this.update({[name]: oldValue});
  }

  updatedCallback(old) {
    const panel = this.shadowRoot.querySelector("[part~=panel]");

    if("open" in old) {
      if(this.open) {
        panel.style.height = "0px";
        panel.hidden = false;

        requestAnimationFrame(() => {
          panel.style.height = `${panel.scrollHeight}px`;
        });

        if(!this.accordion.multiple) {
          Array.from(this.accordion.sections)
            .filter(section => section !== this && section.open)
            .forEach(section => section.close());
        }
      } else if(old.open) {
        panel.style.height = "0px";

        panel.ontransitionend = () => {
          panel.hidden = true;
          panel.style.height = null;
          panel.ontransitionend = null;
        };
      }
    } else if(!this.open) {
      panel.hidden = true;
    }
  }

  show() {
    this.open = true;
  }

  close() {
    this.open = false;
  }

  toggle() {
    this.open = !this.open;
  }
}

customElements.define("tcds-accordion-section", AccordionSection);
