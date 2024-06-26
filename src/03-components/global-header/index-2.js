import {declarative, importSharedStyles} from "../utilities/index.js";
import layout from "../../01-layout/layout.json";
import styles from "./style.css";

class GlobalHeader extends declarative(HTMLElement) {
  get template() {
    const menus = `
      <slot name="primary-menu"></slot>
      <slot name="utility-menu"></slot>
    `;

    return importSharedStyles() + `
      <slot name="logo"></slot>

      <details part="main-toggle" ${this.mobile ? `` : `hidden`}>
        <summary>
          <span class="visually-hidden">Toggle main menu</span>
          <tcds-icon icon="${this.open ? "x" : "hamburger"}"></tcds-icon>
        </summary>
        <div>
          ${this.mobile ? menus : ``}
        </div>
      </details>

      <details part="search-toggle" ${this.mobile ? `` : `hidden`}>
        <summary>
          <span class="visually-hidden">Toggle search menu</span>
          <tcds-icon icon="${this.open ? "x" : "search"}"></tcds-icon>
        </summary>
        <slot name="search-content"></slot>
      </details>

      ${this.mobile ? `` : menus}
    `;
  }

  get open() {
    return this.hasAttribute("open");
  }

  set open(value) {
    const old = this.open;
    this.toggleAttribute("open", Boolean(value));
    this.requestUpdate({open: old});
  }

  #mobileQuery = matchMedia(`(max-width: ${layout.breakpoints.m}px)`);

  get mobile() {
    return this.#mobileQuery.matches;
  }

  get allToggles() {
    return [
      ...this.querySelectorAll("details"),
      ...this.shadowRoot.querySelectorAll("details"),
    ];
  }

  searchContent = {};

  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  connectedCallback() {
    this.searchContent.parent = this.querySelector("summary tcds-icon[icon=search]")
      .closest("details");
    this.searchContent.element = this.searchContent.parent.querySelector("div");

    this.moveSearchToggle();

    this.requestUpdate();

    this.#mobileQuery.addEventListener("change", () => {
      this.open = false;
      this.requestUpdate({mobile: !this.mobile});
    });
  }

  mountedCallback() {
    this.allToggles.forEach((toggle) => {
      // If we simply listened for a "toggle" event on the `toggle` element,
      // then set `this.open` accordingly, there would be a flicker/flash
      // because the callback happens *after* the toggle has already completed
      // (i.e. on the next animation frame). So if we want to toggle `this.open`
      // in sync with `toggle.open`, we have to intercede on click and manually
      // update `toggle.open` alongside `this.open`.
      toggle.querySelector("summary").addEventListener("click", (event) => {
        event.preventDefault();
        
        toggle.open = !toggle.open;
        toggle.open && this.allToggles
          .filter(_toggle => _toggle !== toggle && _toggle.getRootNode() === toggle.getRootNode())
          .forEach(_toggle => _toggle.open = false);

        this.open = this.allToggles.some(_toggle => _toggle.open);
      });
    });
  }

  updatedCallback(old) {
    if("mobile" in old) {
      this.moveSearchToggle();
    }

    if("open" in old) {
      document.body.style.overflow = this.open && this.mobile ? "hidden" : null;
    }
  }

  moveSearchToggle() {
    if(this.mobile) {
      this.searchContent.element.setAttribute("slot", "search-content");
      this.searchContent.parent.hidden = true;
      this.appendChild(this.searchContent.element);
    } else {
      this.searchContent.element.removeAttribute("slot");
      this.searchContent.parent.appendChild(this.searchContent.element);
      this.searchContent.parent.hidden = false;
    }
  }
}

customElements.define("tcds-global-header", GlobalHeader);