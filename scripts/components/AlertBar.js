import WebComponent from "../WebComponent/WebComponent.js";

export default class AlertBar extends WebComponent(HTMLElement) {
  render() {
    return /* html */`
      <div part="bar">
        <h2><tcds-icon icon="bell"></tcds-icon> Updates</h2>
        <div part="alerts">
          <slot name="alert"></slot>
        </div>
        <tcds-button part="close" controls="${this.id}" icon="only x" variant="ui" onclick="this.getRootNode().host.close()">Dismiss updates</tcds-button>
      </div>
    `;
  }

  mounted() {
    const details = Array.from(this.querySelectorAll("details"));

    details.forEach((detail) => {
      detail.addEventListener("toggle", () => {
        if(detail.open) {
          details.forEach(_detail => _detail.open = _detail === detail);
        }
      });
    });
  }

  close() {
    this.hidden = true;
  }

  static get styles() {
    return {
      "shadow": () => /* css */`
        :host {
          --tcds-alert-bar-height: var(--tcds-size-large);
          display: flex;
        }

        [part="bar"] {
          width: 100%;
          min-height: var(--tcds-alert-bar-height);
          background-color: #fff;
          background-image: linear-gradient(to bottom,
            #fff var(--tcds-alert-bar-height),
            var(--tcds-color-gray-light) var(--tcds-alert-bar-height),
            var(--tcds-color-gray-light) calc(var(--tcds-alert-bar-height) + 1px),
            #fff 50%
          );
          background-size: 100% calc(var(--tcds-alert-bar-height) * 2);
          background-repeat: no-repeat;
          position: relative;
          z-index: var(--tcds-layer-alert-bar);
          box-shadow: 0 2px 4px var(--tcds-color-shade-x-weak);
        }

        @media (min-width: 768px) {
          :host {
            --tcds-alert-bar-height: var(--tcds-size-x-large);
          }

          [part="bar"] {
            display: flex;
          }

          h2 {
            width: 13rem;
          }
        }

        @media (max-width: 768px) {
          [part="bar"] {
            display: grid;
            grid-template-columns: 1fr auto;
            grid-template-rows: var(--tcds-alert-bar-height) auto;
            grid-template-areas:
              "heading close"
              "alerts  close";
          }

          h2 {
            grid-area: heading;
          }

          [part="alerts"] {
            grid-area: alerts;
          }
        }

        h2 {
          display: flex;
          font-size: var(--tcds-font-size-medium-plus);
          font-family: var(--tcds-font-headings);
          font-weight: var(--tcds-font-weight-normal);
          margin: 0;
          padding: 0 0 0 var(--site-outer-gutter);
          height: var(--tcds-alert-bar-height);
          align-items: center;
          gap: var(--tcds-space-tight);
        }

        h2 tcds-icon {
          color: var(--tcds-color-primary);
        }

        [part="alerts"] {
          display: grid;
          grid-template-rows: var(--tcds-alert-bar-height) min-content;
          grid-template-columns: repeat(12, fit-content(100%));
          max-width: 100%;
          overflow-x: auto;
          overscroll-behavior: none;
          padding: 0 0 0 var(--site-outer-gutter);
        }

        [part="close"] {
          position: absolute;
          right: var(--site-outer-gutter);
          top: calc(var(--tcds-alert-bar-height) *  0.5);
          transform: translateY(-50%);
        }
      `,

      "light": () => /* css */`
        tcds-alert-bar details {
          display: contents; 
        }

        tcds-alert-bar details[open] > summary {
          --tcds-details-icon-rotate: -180deg;
        }

        tcds-alert-bar details summary {
          grid-row: 1 / 2;
          height: var(--tcds-alert-bar-height);
          flex-direction: row-reverse;
          margin-right: var(--tcds-space-normal);
        }

        tcds-alert-bar details summary:hover {
          color: var(--tcds-color-primary);
        }

        tcds-alert-bar details[open] summary {
          box-shadow: inset 0 -4px 0 var(--tcds-color-primary);
        }

        tcds-alert-bar details summary::before {
          -webkit-mask: var(--tcds-icon-chevron-down);
          mask: var(--tcds-icon-chevron-down);
          background-color: var(--tcds-color-primary);
        }

        tcds-alert-bar details article {
          grid-row: 2 / -1;
          grid-column: 1 / -1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: var(--tcds-space-normal) 0;
          position: sticky;
          left: 0;
          max-width: calc(100vw - (var(--site-outer-gutter) * 2));
          background-color: #fff;
          border-top: 1px solid var(--tcds-color-gray-light);
        }
      `,
    };
  }
}

customElements.define("tcds-alert-bar", AlertBar);

(function() {
  document.querySelectorAll("tcds-alert-bar")?.forEach((alertBar, index, array) => {
    alertBar.id = `alert-bar${array.length > 1 ? `-${index + 1}` : ""}`
  });
}());