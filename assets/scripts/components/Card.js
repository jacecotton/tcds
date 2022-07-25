import WebComponent from "@tcds/WebComponent/WebComponent.js";

export default class Card extends WebComponent {
  static get observedAttributes() {
    return ["image", "title", "content", "size", "orientation"];
  }

  constructor() {
    super();
  }

  render() {
    return `
      <article part="card">
        <figure part="figure">
          <slot name="image" part="image"></slot>
        </figure>

        <div part="content">
          <slot name="title" part="title"></slot>
          <slot name="description" part="description"></slot>
          <slot name="footer">
            <footer part="footer">
              <span part="action-label">${this.hasAttribute("action-label") && this.getAttribute("action-label") || "Read more"}</span>
            </footer>
          </slot>
        </div>
      </article>
    `;
  }

  mounted() {
    if(!this.querySelector("[slot=image]")) {
      this.setAttribute("image", "false");
    }

    if(!this.getAttribute("orientation") || !this.getAttribute("orientation").match("lock")) {
      const resize = new ResizeObserver(() => {
        if(this.getBoundingClientRect().width > 600) {
          this.setAttribute("orientation", "horizontal");
        } else {
          this.setAttribute("orientation", "vertical");
        }
      });

      resize.observe(document.body);
    }
  }

  attributeChangedCallback(attribute) {
    if(attribute === "orientation") {
      this.state.orientation = this.getAttribute("orientation");
    }
  }
}

customElements.define("tcds-card", Card);
