import WebComponent from "@tcds/WebComponent/WebComponent.js";

export default class Card extends WebComponent {
  constructor() {
    super();

    this.state.noop = "";
  }

  render() {
    return `
      <article part="card">
        <figure part="figure">
          <slot name="image"></slot>
        </figure>

        <div part="content">
          <slot name="title"></slot>
          <slot name="description"></slot>
          <slot name="footer">
            <footer part="footer">
              <span part="action-label">${this.props["action-label"] || "Read more"}</span>
            </footer>
          </slot>
        </div>
      </article>
    `;
  }

  mounted() {
    if(!this.querySelector("[slot=image]")) {
      this.state.image = false;
    }

    if(!this.props.orientation && this.state.image !== false) {
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

  updated() {
    return {
      state: {
        image: () => {
          if(this.state.image === false) {
            this.setAttribute("no-image", "");
          } else {
            this.removeAttribute("no-image");
          }
        },
      },
    };
  }
}

customElements.define("tcds-card", Card);
