import WebComponent from "../WebComponent/WebComponent.js";
import slugify from "../utilities/slugify.js";

export default class Tabs extends WebComponent(HTMLElement) {
  static props = {
    "inactive": "boolean",
  };
  
  connected() {
    this.tabs = Array.from(this.querySelectorAll("tcds-tab"));
    
    const activeTabs = this.tabs.filter(tab => tab.hasAttribute("active"));

    if(activeTabs.length === 0 && this.props["inactive"] === false) {
      this.select(this.tabs[0]);
    } else if(activeTabs.length >= 1) {
      this.select(activeTabs[0]);
    }
  }

  render() {
    return /* html */`
      <div role="tablist">
        ${this.tabs.map(tab => /* html */`
          <button
            role="tab"
            part="tab"
            id="${slugify(tab.props.label)}-tab"
            aria-controls="${slugify(tab.props.label)}-panel"
            aria-expanded="${tab.state.active}"
            tabindex="${tab.state.active ? "0" : "-1"}"
            onclick="this.getRootNode().host.tabClick(event)"
            onkeydown="this.getRootNode().host.tabKeydown(event)"
          >
            <span>${tab.props.label}</span>
          </button>
        `).join("")}
      </div>
      <div part="viewport">
        <slot></slot>
      </div>
    `;
  }

  select(activeTab) {
    this.tabs.forEach((tab) => {
      tab.state.active = tab === activeTab;
    });
  }

  tabClick(event) {
    this.select(this.tabs[this.parts["tab"].indexOf(event.currentTarget)]);
  }

  tabKeydown(event) {
    if(event.key === "ArrowRight") {
      event.preventDefault();
      this.next().then((next) => {
        this.parts["tab"][next].focus();
      });
    } else if(event.key === "ArrowLeft") {
      event.preventDefault();
      this.previous().then((previous) => {
        this.parts["tab"][previous].focus();
      });
    }
  }

  next() {
    return new Promise((resolve) => {
      const nextIndex = (this.tabs.indexOf(this.querySelector("[active]")) + 1) % this.tabs.length;
      this.select(this.tabs[nextIndex]);
      resolve(nextIndex);
    });
  }

  previous() {
    return new Promise((resolve) => {
      const previousIndex = (this.tabs.indexOf(this.querySelector("[active]")) - 1 + this.tabs.length) % this.tabs.length;
      this.select(this.tabs[previousIndex]);
      resolve(previousIndex);
    });
  }

  static get styles() {
    return {
      shadow: () => /* css */`
        :host {
          display: block;
        }

        :host([size*="small"]) {
          --tcds-tabs-tab-font-size: var(--tcds-font-size-small);
          --tcds-tabs-tab-height: var(--tcds-size-small);
          --tcds-tabs-tab-x-padding: var(--tcds-space-tight);
        }

        :host([size*="large"]) {
          --tcds-tabs-tab-flex-grow: 1;
          --tcds-tabs-tab-font-size: var(--tcds-font-size-medium-plus);
          --tcds-tabs-tab-height: var(--tcds-size-large);
          --tcds-tabs-tab-x-padding: var(--tcds-space-loose);
          --tcds-tab-padding-top: var(--tcds-space-loose);
        }

        [role="tablist"] {
          display: flex;
          overflow-x: auto;
          overscroll-behavior: none;
        }

        [part="tab"] {
          appearance: none;
          background: none;
          border: none;
          color: var(--tcds-color-secondary);
          font-family: var(--tcds-font-ui);
          font-weight: var(--tcds-font-weight-semibold);
          font-size: var(--tcds-tabs-tab-font-size, var(--tcds-font-size-medium));
          flex: var(--tcds-tabs-tab-flex-grow, 0) 0;
          padding: 0 var(--tcds-tabs-tab-x-padding, var(--tcds-space-normal));
          height: var(--tcds-tabs-tab-height, var(--tcds-size-medium));
          width: 100%;
          white-space: nowrap;
          cursor: pointer;
          transition: color var(--tcds-animation-productive-duration) var(--tcds-animation-productive-easing);
        }

        [part="tab"]:nth-of-type(1) {
          padding-left: 0;
        }

        [part="tab"] span {
          border-bottom: 5px solid var(--tcds-tabs-tab-indicator-color, transparent);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          height: 100%;
          transition: border-color var(--tcds-animation-productive-duration) var(--tcds-animation-productive-easing);
        }

        @media (any-hover: hover) {
          [part="tab"]:hover {
            color: var(--tcds-color-primary);
          }
        }

        [part="tab"][aria-expanded="true"] {
          --tcds-tabs-tab-indicator-color: var(--tcds-tabs-tab-indicator-active-color, var(--tcds-color-primary));
        }
      `,

      light: () => /* css */`
        .bg-primary[data-theme="dark"] tcds-tabs {
          --tcds-tabs-tab-indicator-active-color: var(--tcds-color-tint);
        }

        [class*="bg-"][data-theme] tcds-tabs::part(tab) {
          color: inherit;
        }
      `,
    };
  }
}

customElements.define("tcds-tabs", Tabs);
