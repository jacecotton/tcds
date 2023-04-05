import WebComponent from "../../utilities/WebComponent/WebComponent.js";
import shadowStyles from "./style.css";
import lightStyles from "./style.light.css";

export default class Card extends WebComponent(HTMLElement) {
  static state = {
    "no-image": {
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

    if(!this.querySelector("[slot=image]")) {
      this.state["no-image"] = true;
    }

    if(!this.props.orientation && this.state["no-image"] !== true) {
      this.orient();

      const resize = new ResizeObserver(this.orient.bind(this));
      resize.observe(document.body);
    }
  }

  render() {
    const link = this.querySelector("a[slot=title][href]")?.href;

    return /* html */`
      <article part="card">
        <slot name="tag"></slot>
        ${this.state["no-image"] !== true ? /* html */`
          <figure>
            <slot name="image"></slot>
          </figure>
        ` : ``}
        <div part="content">
          <slot name="subtitle"></slot>
          <slot name="title"></slot>
          <slot name="description"></slot>
          <slot name="footer">
            ${this.props["action-label"] !== "" && link ? /* html */`
              <footer part="footer">
                <tcds-button variant="ghost" ${this.props.size !== "large" ? `size="small"` : ""} icon="right chevron-right" label="${this.props["action-label"] || "Read more"}" link="${link}"></tcds-button>
              </footer>
            ` : ``}
          </slot>
        </div>
      </article>
    `;
  }

  orient() {
    const orientation = this.getAttribute("orientation");

    if(this.parentElement?.getBoundingClientRect?.().width > 600) {
      orientation !== "horizontal" && this.setAttribute("orientation", "horizontal");
    } else {
      orientation !== "vertical" && this.setAttribute("orientation", "vertical");
    }
  }
}

customElements.define("tcds-card", Card);
