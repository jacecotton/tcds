import WebComponent from "../../../utilities/WebComponent/WebComponent.js";
import animation from "../../../animation/config.json";
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
    const heading = "h" + this.accordion.headingLevel;

    return /* html */`
      <section>
        <${heading} part="heading">
          <button
            part="button"
            id="button"
            aria-controls="panel"
            aria-expanded="${this.open}"
            onclick="this.getRootNode().host.clickHandler()"
          >
            ${this.label}
            <tcds-icon part="icon" icon="${this.accordion.icon === "plus-minus"
              ? (this.open ? "minus" : "plus")
              : (this.accordion.icon === "chevron" ? "chevron-down" : "")
            }"></tcds-icon>
          </button>
        </${heading}>

        <div part="panel" id="panel" aria-labelledby="button">
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
  }

  attributeChangedCallback(name, oldValue) {
    this.update({[name]: name === "open" ? oldValue !== null : oldValue});
  }

  mountedCallback() {
    this.panel = this.shadowRoot.querySelector("[part~=panel]");
  }

  updatedCallback(old) {
    if("open" in old) {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const openAnimation = {height: ["0", `${this.panel.scrollHeight}px`]};

      if(this.open) {
        this.panel.style.height = "0";
        this.panel.hidden = false;

        requestAnimationFrame(() => {
          this.panel.animate(openAnimation, {
            duration: reducedMotion ? 1 : animation.timing.productive.duration,
          }).onfinish = () => this.panel.style.height = "auto";
        });

        if(!this.accordion.multiple) {
          this.accordion.closeAll(section => section !== this);
        }
      } else if(old.open) {
        this.panel.animate(openAnimation, {
          duration: reducedMotion ? 1 : animation.timing.productive.duration,
          direction: "reverse",
        }).onfinish = () => this.panel.hidden = true;
      }
    } else if(!this.open) {
      this.panel.hidden = true;
    }
  }

  clickHandler() {
    this.toggle();

    setTimeout(() => {
      if(this.open && window.innerWidth < 768
        && this.accordion.parentElement.localName !== "tcds-accordion-section") {
        this.scrollIntoView();
      }
    }, animation.timing.productive.duration * 2);
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
