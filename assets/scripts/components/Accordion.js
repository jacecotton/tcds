import WebComponent from "@tcds/WebComponent/WebComponent.js";
import slugify from "@tcds/utilities/slugify.js";

export default class Accordion extends WebComponent {
  constructor() {
    super();

    this.sections = Array.from(this.querySelectorAll("tcds-accordion-section"));

    this.state.expandedSections = [];
  }

  render() {
    return `
      ${this.props.mode === "multiselectable" ? `
        <div part="controls">
          <tcds-button part="expand-all" color="ghost" size="small" round label="expand all"></tcds-button>
          <tcds-button part="collapse-all" color="ghost" size="small" round label="collapse all"></tcds-button>
        </div>
      ` : ""}
      ${this.sections.map((section, index) => {
        const isExpanded = this.state.expandedSections.includes(index);
        const isLast = index === this.sections.length - 1;

        return `
          <section part="section ${isExpanded ? "expanded" : ""} ${isLast ? "last" : ""}">
            <h${this.props["heading-level"] ? this.props["heading-level"] : "3"} part="heading">
              <button
                part="button ${isExpanded ? "expanded" : ""}"
                id="${slugify(section.props.label)}-button"
                aria-controls="${slugify(section.props.label)}-panel"
                aria-expanded="${isExpanded}"
              >
                <svg part="icon" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="3"
                  stroke-linecap="square">
                  <path d="M6 10l6 6 6-6"/>
                </svg>
                ${section.props.label}
              </button>
            </h${this.props["heading-level"] ? this.props["heading-level"] : "3"}>

            <div
              part="panel ${isExpanded ? "expanded" : ""}"
              id="${slugify(section.props.label)}-panel"
              aria-labelledby="${slugify(section.props.label)}-button"
            >
              <div part="content">${section.innerHTML}</div>
            </div>
          </section>
        `;
      }).join("")}
    `;
  }

  mounted() {
    const sections = Array.from(this.shadowRoot.querySelectorAll("section"));
    this.panels = Array.from(this.shadowRoot.querySelectorAll("[part*=panel]"));
    this.expandAll = this.shadowRoot.querySelector("[label='expand all']");
    this.collapseAll = this.shadowRoot.querySelector("[label='collapse all']");

    this.panels.forEach((panel) => {
      panel.hidden = true;
    });

    sections.forEach((section, index) => {
      const button = section.querySelector("button");

      button.addEventListener("click", () => {
        const isExpanded = this.state.expandedSections.includes(index);

        if(isExpanded) {
          this.state.expandedSections = this.state.expandedSections.filter(_index => _index !== index);
        } else {
          if(this.props.mode !== "multiselectable") {
            this.state.expandedSections = [index];
          } else {
            this.state.expandedSections = [...this.state.expandedSections, ...[index]];
          }
        }
      });
    });

    if(this.props.mode === "multiselectable") {
      this.expandAll.addEventListener("click", () => {
        sections.forEach((section, index) => {
          this.state.expandedSections = [...this.state.expandedSections, ...[index]];
        });
      });

      this.collapseAll.addEventListener("click", () => {
        this.state.expandedSections = [];
      });
    }
  }

  updated(state) {
    return {
      state: {
        expandedSections: () => {
          this.panels && this.panels.forEach((panel, index) => {
            const isExpanded = this.state.expandedSections.includes(index);
            const wasExpanded = state.oldState.expandedSections && state.oldState.expandedSections.includes(index);

            if(isExpanded) {
              panel.style.height = "0px";
              panel.hidden = false;
              requestAnimationFrame(() => {
                panel.style.height = `${panel.scrollHeight}px`;
              });
            } else if(wasExpanded) {
              panel.style.height = "0px";
              panel.ontransitionend = () => {
                panel.hidden = true;
                panel.style.height = null;
                panel.ontransitionend = null;
              };
            } else {
              panel.hidden = true;
            }
          });

          this.sections.forEach((section, index) => {
            if(this.state.expandedSections.includes(index)) {
              section.setAttribute("expanded", "");
            } else {
              section.removeAttribute("expanded");
            }
          });
        },
      },
    };
  }
}

customElements.define("tcds-accordion-section", class AccordionSection extends WebComponent {});
customElements.define("tcds-accordion", Accordion);
