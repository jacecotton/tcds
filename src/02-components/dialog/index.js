import {declarative, html, baseStyles, refreshProperties, registerParts} from "../utilities/index.js";
import localStyles from "./styles.shadow.css";

class TCDSDialogElement extends declarative(HTMLElement) {
  // #region Setup
  static observedAttributes = ["open", "position"];

  constructor() {
    super();
    this.attachShadow({mode: "open", delegatesFocus: true});
    this.shadowRoot.adoptedStyleSheets = [baseStyles, localStyles];
  }

  get template() {
    const closeButton = ({title = "Dismiss dialog"} = {}) => html`
      <button is="tcds-ui-button" part="close" value="close">
        <span class="visually-hidden">${title}</span>
        <tcds-icon icon="x"></tcds-icon>
      </button>
    `;

    return html`
      <dialog part="dialog" ${this.open ? "open" : ""}>
        <slot name="form">
          <form method="dialog">
            ${this.#has("header") ? html`
              <header part="header">
                <slot name="header"></slot>
                ${closeButton()}
              </header>
            ` : `
              ${closeButton()}
            `}

            <article part="content">
              <slot></slot>
            </article>

            ${this.#has("footer") ? html`
              <footer part="footer">
                <slot name="footer"></slot>
              </footer>
            ` : ``}
          </form>
        </slot>
      </dialog>
    `;
  }
  // #endregion

  // #region Lifecycle
  connectedCallback() {
    refreshProperties.apply(this, ["open", "position"]);
    this.requestUpdate();
  }

  mountedCallback() {
    registerParts.apply(this, ["dialog", "header", "close", "content", "footer"]);
    this.#relayEvents();

    this.parts["dialog"].addEventListener("beforetoggle", (event) => {
      this.open = event.newState === "open";
    });

    this.parts["dialog"].addEventListener("mousedown", ({target: dialog}) => {
      if(dialog.nodeName === "DIALOG") {
        this.close(-1);
      }
    });
  }
  // #endregion

  // #region Props and state
  get open() {
    return this.hasAttribute("open");
  }

  set open(value) {
    this.toggleAttribute("open", value);
  }

  get returnValue() {
    return this.parts["dialog"].returnValue;
  }

  set returnValue(value) {
    this.parts["dialog"].returnValue = value;
  }
  // #endregion

  // #region Custom public API

  // #endregion

  // #region HTMLDialogElement API
  showModal() {
    this.parts["dialog"].showModal();
  }

  show() {
    this.parts["dialog"].show();
  }

  close(returnValue = "") {
    this.parts["dialog"].close(returnValue);
  }

  requestClose(returnValue = "") {
    this.parts["dialog"].requestClose(returnValue);
  }

  #relayEvents() {
    ["toggle", "beforetoggle"].forEach((eventname) => {
      this.parts["dialog"].addEventListener(eventname, (event) => {
        this.dispatchEvent(new ToggleEvent(eventname, event));
      });
    });

    ["cancel", "close"].forEach((eventname) => {
      this.parts["dialog"].addEventListener(eventname, (event) => {
        this.dispatchEvent(new Event(eventname, event));
      });
    });
  }
  // #endregion

  // #region Utilities
  #has() {
    return !!this.querySelector([...arguments].map(slot => `[slot=${slot}]`).join(", "));
  }
  // #endregion
}

customElements.define("tcds-dialog", TCDSDialogElement);
