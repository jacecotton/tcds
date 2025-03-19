import {declarative, html, baseStyles, refreshProperties, registerParts, slugify} from "../../utilities/index.js";
import animation from "../../../00-brand/animation/animation.json";
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

    return html`
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
    refreshProperties.apply(this, ["open"]);
    this.requestUpdate();
  }

  disconnectedCallback() {
    window.removeEventListener("hashchange", this.deepLinkHandler);
  }

  attributeChangedCallback(name, old) {
    // Because [open] is a boolean attribute, null = absent = false. Only other
    // potential value is "", which = present = true.
    this.requestUpdate({[name]: name === "open" ? old !== null : old});
  }

  mountedCallback() {
    registerParts.apply(this, ["heading", "panel"]);

    // Accordion sections should open if there is a URL hash that matches the
    // section's ID, generated automatically from its title (if not otherwise
    // specified).
    this.deepLinkHandler();
    window.addEventListener("hashchange", this.deepLinkHandler.bind(this));
  }

  updatedCallback(old) {
    if("open" in old) {
      // Animate from 0px height to its calculated height (`scrollHeight`).
      const openAnimation = {height: ["0", `${this.parts.panel.scrollHeight}px`]};
      // Don't animate open/close if reduced motion preference is set.
      const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const openAnimationDuration = reducedMotion ? 1 : animation.timing.productive.duration;

      if(this.open) {
        // Opening from a closed state, so we need to set a starting height of 0
        // before unhiding the panel.
        this.parts.panel.style.height = "0";
        this.parts.panel.hidden = false;

        // Wait to open until next available animation frame to ensure sync with
        // closing animation of sibling panels (if applicable).
        requestAnimationFrame(() => {
          // The animation opens to computed height, but the content could
          // change (like if the window is shrunk or if a nested accordion
          // section is toggled), so after the animation, we need to set the
          // height to `auto`.
          this.parts.panel.animate(openAnimation, {duration: openAnimationDuration})
            .onfinish = () => this.parts.panel.style.height = "auto";
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
            const headingTop = this.parts.heading.getBoundingClientRect().top;
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
        this.parts.panel.animate(openAnimation, {
          direction: "reverse",
          duration: openAnimationDuration,
        }).onfinish = () => this.parts.panel.hidden = "until-found";
      }
    } else if(!this.open) {
      // Closing from non-determinate state (probably first render, so just
      // hide the panel without animation).
      this.parts.panel.hidden = "until-found";
    }
  }
  // #endregion

  // #region Event listeners
  clickHandler() {
    this.toggle();
  }

  deepLinkHandler() {
    // Get hash from URL for deep linking.
    const hash = window.location.hash.substring(1);

    // Derive an ID from section title if not already provided.
    if(!this.id) {
      this.id = slugify(this.title);
    }

    // Open section if hash matches ID.
    if(hash === this.id) {
      this.show();
    }
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
    return this.closest("tcds-accordion");
  }
  // #endregion

  // #region Public API
  // We have to name this method `show` because `open` is already taken by the
  // `open` property above. This matches the convention used by the `dialog`
  // built-in element.
  show() {
    this.open = true;
  }

  close() {
    this.open = false;
  }

  toggle(test) {
    if(test === undefined) {
      test = !this.open;
    }

    this.open = test;
  }
  // #endregion
}

customElements.define("tcds-accordion-section", AccordionSection);
