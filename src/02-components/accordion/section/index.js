import {declarative, importSharedStyles, refreshProperties} from "../../utilities/index.js";
import animation from "../../../00-brand/animation/animation.json";
import layout from "../../../01-layout/layout.json";
import styles from "./style.css";

class AccordionSection extends declarative(HTMLElement) {
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
    // If this section is constructed, its containing accordion is going to be
    // the root host. Otherwise it's going to be the immediate `tcds-accordion`
    // parent.
    return this.closest("tcds-accordion") || this.getRootNode().host;
  }

  get template() {
    const heading = `h${this.getAttribute("heading-level") || this.accordion.headingLevel}`;

    return importSharedStyles() + /* html */`
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
            <tcds-icon part="icon" icon="${this.open ? "minus" : "plus"}"></tcds-icon>
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
    this.attachShadow({mode: "open"});
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  connectedCallback() {
    refreshProperties.apply(this, ["open", "label"]);
    this.requestUpdate();
  }

  attributeChangedCallback(name, old) {
    // Because [open] is a boolean attribute, null = absent = false. Only other
    // potential value is "", which = present = true.
    this.requestUpdate({[name]: name === "open" ? old !== null : old});
  }

  mountedCallback() {
    this.panel = this.shadowRoot.querySelector("[part~=panel]");
  }

  updatedCallback(old) {
    if("open" in old) {
      const openAnimation = {height: ["0", `${this.panel.scrollHeight}px`]};
      // Don't animate open/close if reduced motion preference is set.
      const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

      if(this.open) {
        // Opening from a closed state, so we need to set a starting height of 0
        // before unhiding the panel.
        this.panel.style.height = "0";
        this.panel.hidden = false;

        // Wait to open until next available animation frame to ensure sync with
        // closing animation of sibling panels (if applicable).
        requestAnimationFrame(() => {
          // The animation opens to computed height, but the content could
          // change (like if the window is shrunk), so after the animation,
          // we need to set the height to `auto`.
          this.panel.animate(openAnimation, {
            duration: reducedMotion ? 1 : animation.timing.productive.duration,
          }).onfinish = () => this.panel.style.height = "auto";
        });

        // Close all sibling sections when this panel is opened (unless
        // [multiple] is enabled).
        if(!this.accordion.multiple) {
          this.accordion.closeAll(section => section !== this);
        }
      } else if(old.open) {
        // Closing from open state. Hide panel after reversed animation to 0
        // height.
        this.panel.animate(openAnimation, { 
          direction: "reverse",
          duration: reducedMotion ? 1 : animation.timing.productive.duration,
        }).onfinish = () => this.panel.hidden = true;
      }
    } else if(!this.open) {
      // Closing from non-determinate state (probably first render, so just
      // hide the panel without animation).
      this.panel.hidden = true;
    }
  }

  clickHandler() {
    this.toggle();

    // On smaller viewports, scroll to the accordion section heading when opened
    // (unless it's a nested accordion).
    if(this.open && window.innerWidth < layout.breakpoints.s
      && this.accordion.parentElement.localName !== "tcds-accordion-section") {
      // Allow ample time for animations to finish before scrolling.
      setTimeout(this.scrollIntoView, animation.timing.productive.duration * 2);
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
