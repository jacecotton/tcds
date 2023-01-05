import WebComponent from "../../scripts/WebComponent/WebComponent.js";
import shadowStyles from "./style.css";
import lightStyles from "./style.light.css";

export default class Card extends WebComponent(HTMLElement) {
  static state = {
    "no-image": {
      type: Boolean,
      reflected: true,
    },
  };

  connectedCallback() {
    this.shadowRoot.adoptedStyleSheets = [shadowStyles];
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, ...[lightStyles]];

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
    return /* html */`
      <article part="card">
        <slot name="tag"></slot>
        ${this.state["no-image"] !== true ? /* html */`
          <figure>
            <slot name="image"></slot>
          </figure>
        ` : ``}
        <div part="content">
          <slot name="title"></slot>
          <slot name="description"></slot>
          <slot name="footer">
            ${this.props["action-label"] !== "" ? /* html */`
              <footer part="footer">
                <tcds-button variant="ghost" ${this.props.size !== "large" ? `size="small"` : ""} icon="right chevron-right" label="${this.props["action-label"] || "Read more"}"></tcds-button>
              </footer>
            ` : ``}
          </slot>
        </div>
      </article>
    `;
  }

  orient() {
    const orientation = this.getAttribute("orientation");

    if(this.parentElement.getBoundingClientRect().width > 600) {
      orientation !== "horizontal" && this.setAttribute("orientation", "horizontal");
    } else {
      orientation !== "vertical" && this.setAttribute("orientation", "vertical");
    }
  }
}

customElements.define("tcds-card", Card);
