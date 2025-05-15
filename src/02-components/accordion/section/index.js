import {LitElement, html, css} from "lit";
import animation from "../../../00-brand/animation/animation.json";

export class TCDSAccordionSectionElement extends LitElement {
  // #region Setup
  static properties = {
    open: {type: Boolean},
    title: {type: String},
  };

  static styles = css`
    [part="heading"] {
      margin: 0;

      @media (max-width: 768px) {
        background: var(--tcds-color-background, var(--tcds-color-white));
        position: var(--tcds-accordion-section-heading-position, sticky);
        top: 0;
        z-index: 2;
      }
    }

    [part="button"] {
      background: none;
      border: none;
      border-bottom: 1px solid var(--tcds-accordion-border-color);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--tcds-micro-s) 0;
      text-align: left;
      font-size: var(--tcds-accordion-heading-font-size, var(--tcds-font-size-m));
      font-family: var(--tcds-font-ui);
      font-weight: var(--tcds-accordion-heading-font-weight, var(--tcds-font-weight-semibold));
      width: 100%;
      color: var(--tcds-color-text);
    }

    [part="icon"] {
      flex-shrink: 0;
      pointer-events: none;
    }

    [part="panel"] {
      overflow: hidden;
    }

    [part="content"] {
      padding: 1.5rem 0;
      border-bottom: 1px solid var(--tcds-accordion-border-color);
    }
  `;

  constructor() {
    super();

    this.open = false;
    this.title = this.querySelector(":scope > [slot=title]")?.innerHTML;
  }

  connectedCallback() {
    super.connectedCallback();
    this.requestUpdate();
  }

  render() {
    return html`
      <section aria-labelledby="heading">
        <h2 part="heading" id="heading">
          <button
            part="button"
            id="button"
            aria-controls="panel"
            aria-expanded="${this.open}"
            @click="${this.clickHandler}"
          >${this.title}</button>
        </h2>

        <div part="panel" id="panel">
          <div part="content">
            <slot></slot>
          </div>
        </div>
      </section>
    `;
  }

  clickHandler() {
    this.time = performance.now();
    this.toggle();
  }

  show() {
    this.open = true;
  }

  close() {
    this.open = false;
  }

  toggle(test) {
    if(typeof test === "function") {
      test = test();
    }

    this.open = typeof test === "boolean" ? test : !this.open;
  }

  firstUpdated() {
    this.parts = {
      heading: this.renderRoot.querySelector("[part=heading]"),
      panel: this.renderRoot.querySelector("[part=panel]"),
    };
  }

  updated(changedProperties) {
    if(changedProperties.has("open") && changedProperties.get("open") !== undefined) {
      const then = this.time;
      this.time = 0;

      if(then > 0) {
        console.log(`Update process took ${performance.now() - then}ms`);
      }

      const openAnimationDuration = animation.timing.productive.duration;

      if(this.open) {
        this.parts.panel.style.height = "0";
        this.parts.panel.hidden = false;

        requestAnimationFrame(() => {
          const openAnimation = {height: ["0", `${this.parts.panel.scrollHeight}px`]};

          this.parts.panel.animate(openAnimation, {duration: openAnimationDuration})
            .onfinish = () => this.parts.panel.style.height = "auto";

          this.accordion.closeAll(section => section !== this);
        });
      } else if(changedProperties.get("open") === true) {
        this.parts.panel.animate({height: ["0", `${this.parts.panel.scrollHeight}px`]}, {
          direction: "reverse",
          duration: openAnimationDuration,
        }).onfinish = () => {
          this.parts.panel.hidden = "until-found";
        };
      }
    } else if(!this.open) {
      this.parts.panel.hidden = "until-found";
    }
  }

  get accordion() {
    return this.closest("tcds-accordion");
  }
}

customElements.define("tcds-accordion-section", TCDSAccordionSectionElement);
