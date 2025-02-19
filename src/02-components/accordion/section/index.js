import {declarative, baseStyles, refreshProperties} from "../../utilities/index.js";
import animation from "../../../00-brand/animation/animation.json";
import layout from "../../../01-layout/layout.json";
import localStyles from "./style.css";

class AccordionSection extends declarative(HTMLElement) {
  // #region Setup
  static observedAttributes = ["open"];

  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.adoptedStyleSheets = [baseStyles, localStyles];
  }

  get template() {
    const {title, headingLevel} = this;

    return /* html */`
      <section>
        <${headingLevel} part="heading">
          <button
            part="button"
            id="button"
            aria-controls="panel"
            aria-expanded="${this.open}"
            onclick="this.getRootNode().host.clickHandler()"
          >
            ${title}
            <tcds-icon part="icon" icon="${this.open ? "minus" : "plus"}"></tcds-icon>
          </button>
        </${headingLevel}>

        <div part="panel" id="panel" aria-labelledby="button">
          <div part="content">
            <slot></slot>
          </div>
        </div>
      </section>
    `;
  }
  // #endregion

  // #region Lifecycle
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
    this.heading = this.shadowRoot.querySelector("[part~=heading]");
    this.panel = this.shadowRoot.querySelector("[part~=panel]");
  }

  updatedCallback(old) {
    if("open" in old) {
      const openAnimation = {height: ["0", `${this.panel.scrollHeight}px`]};
      // Don't animate open/close if reduced motion preference is set.
      const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const openAnimationDuration = reducedMotion ? 1 : animation.timing.productive.duration;

      if(this.open) {
        // Opening from a closed state, so we need to set a starting height of 0
        // before unhiding the panel.
        this.panel.style.height = "0";
        this.panel.hidden = false;

        // Wait to open until next available animation frame to ensure sync with
        // closing animation of sibling panels (if applicable).
        requestAnimationFrame(() => {
          // The animation opens to computed height, but the content could
          // change (like if the window is shrunk or if a nested accordion
          // section is toggled), so after the animation, we need to set the
          // height to `auto`.
          this.panel.animate(openAnimation, {duration: openAnimationDuration})
            .onfinish = () => this.panel.style.height = "auto";
        });

        // Close all sibling sections when this panel is opened (unless
        // [multiple] is enabled).
        if(!this.accordion.multiple) {
          this.accordion.closeAll(section => section !== this);

          // For non-[multiple] accordions, opening a section can sometimes
          // cause a previously open longer section to collapse, which will then
          // shift all of the content up and potentially cause the top of the
          // section just opened to fly past the top of the screen, leaving the
          // user near the bottom of the newly opened section. In these cases,
          // we want the browser to scroll back up to the top of the section.
          setTimeout(() => {
            const headingTop = this.heading.getBoundingClientRect().top;
            // We need to account for a sticky header, plus an arbitrary 25px
            // buffer.
            const viewportTop = parseInt(
              getComputedStyle(document.documentElement)
                .getPropertyValue("--tcds-site-header-height")
            ) + 25;

            if(headingTop < viewportTop) {
              this.scrollIntoView(true);
            }
          }, openAnimationDuration * 2);
        }
      } else if(old.open) {
        // Closing from open state. Hide panel after reversed animation to 0
        // height.
        this.panel.animate(openAnimation, {direction: "reverse", duration: openAnimationDuration})
          .onfinish = () => this.panel.hidden = true;
      }
    } else if(!this.open) {
      // Closing from non-determinate state (probably first render, so just
      // hide the panel without animation).
      this.panel.hidden = true;
    }
  }
  // #endregion

  // #region Event listeners
  clickHandler() {
    this.toggle();
  }
  // #endregion

  // #region Props and state
  get open() {
    return this.hasAttribute("open");
  }

  set open(value) {
    this.toggleAttribute("open", Boolean(value));
  }

  get title() {
    return this.querySelector(":scope > [slot=title]")?.innerHTML
      || console.error("No heading element with [slot=title] provided in accordion section.", this);
  }

  get headingLevel() {
    return this.querySelector(":scope > [slot=title]")?.localName
      || console.error("No heading element with [slot=title] provided in accordion section.", this);
  }

  get accordion() {
    // If this section is constructed, its containing accordion is going to be
    // the root host. Otherwise it's going to be the immediate `tcds-accordion`
    // parent.
    return this.closest("tcds-accordion") || this.getRootNode().host;
  }
  // #endregion

  // #region Public API
  show() {
    this.open = true;
  }

  close() {
    this.open = false;
  }

  toggle() {
    this.open = !this.open;
  }
  // #endregion
}

customElements.define("tcds-accordion-section", AccordionSection);
