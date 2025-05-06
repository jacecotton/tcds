import {declarative, html, baseStyles, refreshProperties, registerParts, slugify} from "../utilities/index.js";
import localStyles from "./styles.shadow.css";

/**
 * `tcds-dialog` elements are wrappers for internal built-in `dialog` elements.
 * We do this to automatically handle certain things for component users, like
 * close buttons, as well as more easily standardizing others, like header and
 * footer slots.
 *
 * This component automatically searches for buttons that would qualify to open
 * a dialog, and attaches click handlers if found (see private `attachTriggers`
 * method). The criteria is that the button or other interactive element has the
 * attribute combination of `[aria-haspopup][aria-controls][aria-expanded]`,
 * with an `[aria-haspopup]` value of `dialog` and an `[aria-controls]` value
 * corresponding to the `id` of the `tcds-dialog`.
 *
 * This component also automatically matches API details of the internal
 * `dialog`, such as public methods, properties, and events (see private
 * `relayEvents` and "HTMLDialogElement API" region below).
 *
 * We automatically close all open `tcds-dialog`s when any form in the document
 * is submitted. This is because by default, as per standard practice, we have a
 * `form[method=dialog]` inside our `dialog`, which handles closing the dialog
 * and returning values. However, if a custom form control inside the dialog
 * submits an outer form (through the use of a `form` attribute or the `form`
 * slot to override our default `form[method=dialog]`), we want to clean up the
 * UI by closing the dialog automatically still (see private
 * `attachSubmitHandler` method and static `submitHandlerAttached` field).
 *
 * @todo When a dialog is closed, we automatically pause any contained videos.
 * Vice versa, when a dialog is opened, we automatically pause any videos in the
 * outer document/root node.
 *
 * @todo [label] prop, which automatically adds a `[title]` to the internal
 * `dialog`. However, it will first take the value of `[label]`, and check to
 * see if there's a heading element with an `[id]` of the `[label]` value. If
 * there is, it will instead apply `aria-labelledby`.
 */

class TCDSDialogElement extends declarative(HTMLElement) {
  // #region Setup
  static observedAttributes = ["open", "position"];
  static submitHandlerAttached = false;

  constructor() {
    super();
    this.attachShadow({mode: "open", delegatesFocus: true});

    this.shadowRoot.adoptedStyleSheets = [baseStyles, localStyles];

    if(!TCDSDialogElement.submitHandlerAttached) {
      this.#attachSubmitHandler();
      TCDSDialogElement.submitHandlerAttached = true;
    }
  }

  get template() {
    // If there's a custom form with an ID, have the `closeButton` reference
    // that. If there's a `form` slot overriding our default
    // `form[method=dialog]`, but it's not a `form` element itself (which is
    // expected if the `tcds-dialog` is nested inside an outer form as an
    // extension of that form), then return `null`. Otherwise, if there's no
    // slotted `form`, just reference the `tcds-dialog` ID.
    const formid = this.#has("form") ? this.querySelector("form[slot=form][id]")?.id : this.id;

    // `idstem` is used to construct an `id` for the `form` that this button
    // submits, thus closing the dialog. If there is no such form, manually
    // close the dialog using a simple `onclick`.
    const closeButton = ({title = "Dismiss dialog", idstem} = {}) => html`
      <button class="tcds-button" part="close"
        ${idstem ? `
          form="${idstem}-form"
          value="close"
        ` : `
          onclick="this.getRootNode().host.close('close')"
        `}
      >
        <span class="visually-hidden">${title}</span>
        <tcds-icon icon="x"></tcds-icon>
      </button>
    `;


    return html`
      <dialog part="dialog" aria-labelledby="${this.labelledby}" data-theme="light" ${this.open ? `open` : ``}>
        ${this.#has("header") ? html`
          <header part="header">
            <slot name="header"></slot>
            ${closeButton({idstem: formid})}
          </header>
        ` : `
          ${closeButton({idstem: formid})}
        `}

        <article part="content">
          <slot name="form">
            <form method="dialog" id="${formid}-form">
              <slot></slot>
            </form>
          </slot>
        </article>

        ${this.#has("footer") ? html`
          <footer part="footer">
            <slot name="footer"></slot>
          </footer>
        ` : ``}
      </dialog>
    `;
  }
  // #endregion

  // #region Lifecycle
  connectedCallback() {
    refreshProperties.apply(this, ["open", "position"]);
    this.#ensureSurfaceDOMCompliance();
    this.requestUpdate();

    // Find eligible elements that can open the dialog and automatically attach
    // click listeners to them.
    this.#attachTriggers();
  }

  mountedCallback() {
    registerParts.apply(this, ["dialog", "header", "close", "content", "footer"]);

    // Listen for all events on the internal `dialog[part=dialog]` in the shadow
    // DOM, and pass them along to the host `tcds-dialog`. This way there's API
    // parity/interoperability.
    this.#relayEvents();

    // Reflect [open] on `tcds-dialog` based solely on `beforetoggle` event of
    // internal `dialog[part=dialog]`.
    this.parts["dialog"].addEventListener("beforetoggle", (event) => {
      this.open = event.newState === "open";
    });

    // Close the dialog if user clicks anywhere outside of it.
    this.parts["dialog"].addEventListener("mousedown", ({target: dialog}) => {
      if(dialog.nodeName === "DIALOG") {
        this.close("dismissed");
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

  get labelledby() {
    const headings = "h1, h2, h3, h4, h5, h6";
    const headerSlotHeading = this.querySelector(`:is(${headings})[slot=header]`);
    const bareHeading = this.querySelector(headings);

    return this.getAttribute("labelledby") || (headerSlotHeading || bareHeading)?.id;
  }
  // #endregion

  // #region HTMLDialogElement API
  /**
   * Pass public methods and events between internal `dialog` and host
   * `tcds-dialog` element.
   */
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
    ["toggle", "beforetoggle"].forEach((eventName) => {
      this.parts["dialog"].addEventListener(eventName, (event) => {
        this.dispatchEvent(new ToggleEvent(eventName, event));
      });
    });

    ["cancel", "close"].forEach((eventName) => {
      this.parts["dialog"].addEventListener(eventName, (event) => {
        this.dispatchEvent(new Event(eventName, event));
      });
    });
  }
  // #endregion

  // #region Private members
  /**
   * We have certain accessibility requirements imposed on component users,
   * within the scope of the surface DOM. While as a matter of best practice we
   * avoid manipulating the surface DOM, we're doing it here as a failsafe in
   * case those requirements are not met.
   *
   * Namely, every dialog must have an accessible title. If the dialog contains
   * a heading element without a unique ID, we're deriving one from the dialog's
   * ID (which is also a requirement).
   */
  #ensureSurfaceDOMCompliance() {
    if(this.getAttribute("labelledby")) return;

    const firstHeading = this.querySelector("h1, h2, h3, h4, h5, h6");

    if(!firstHeading.id) {
      const idstem = this.id || slugify(firstHeading.textContent);
      firstHeading.id = `${idstem}-title`;
    }
  }

  /**
   * We want all open dialogs to close any time a form is submitted in the
   * document. Since forms with `[method=dialog]` automatically close their
   * containing dialog, we'll exclude those. We'll also move user focus to the
   * submit button of the form that was submitted.
   */
  #attachSubmitHandler() {
    this.getRootNode().addEventListener("submit", (event) => {
      if(event.target.matches("form[method=dialog]")) {
        return;
      }

      this.getRootNode().querySelectorAll("tcds-dialog[open]")
        .forEach(dialog => dialog.close("done"));

      event.target.querySelector("button:not([type]), [type=submit]")?.focus();
    });
  }

  /**
   * Find eligible buttons for opening the dialog, and automatically attach
   * click listeners.
   */
  #attachTriggers() {
    if(!this.id) return;

    this.triggers = this.getRootNode()
      .querySelectorAll(`:is(button, input)[aria-haspopup][aria-expanded][aria-controls=${this.id}]`);

    this.triggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        this.showModal();
      });
    });

    this.addEventListener("toggle", () => {
      this.triggers.forEach(trigger => trigger.setAttribute("aria-expanded", this.open));
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
