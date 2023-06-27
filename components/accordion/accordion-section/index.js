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
            <tcds-icon part="icon" icon="${this.accordion.icon === "plus-minus"
              ? (this.open ? "minus" : "plus")
              : (this.accordion.icon === "chevron" ? "chevron-down" : "")
            }"></tcds-icon>
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

    this.open = this.accordion.multiple ? this.open
      : this === this.accordion.sections.find(section => section.open);
  }

  attributeChangedCallback(name, oldValue) {
    this.update({[name]: name === "open" ? oldValue !== null : oldValue});
  }

  #panel;

  mountedCallback() {
    this.#panel = this.shadowRoot.querySelector("[part~=panel]");
  }

  updatedCallback(old) {
    if("open" in old) {
      if(this.open) {
        requestAnimationFrame(() => {
          this.#panel.hidden = false;

          this.#panel.animate([
            {height: "0px"},
            {height: `${this.#panel.scrollHeight}px`},
          ], 80).onfinish = () => this.#panel.style.height = "auto";
        });

        if(!this.accordion.multiple) {
          Array.from(this.accordion.sections)
            .filter(section => section !== this && section.open)
            .forEach(section => section.close());
        }
      } else if(old.open) {
        this.#panel.animate([
          {height: `${this.#panel.scrollHeight}px`},
          {height: "0px"},
        ], 80).onfinish = () => this.#panel.hidden = true;
      }
    } else if(!this.open) {
      this.#panel.hidden = true;
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
