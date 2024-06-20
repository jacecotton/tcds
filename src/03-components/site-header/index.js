import {declarative, importSharedStyles} from "../utilities/index.js";
import layout from "../../01-layout/layout.json";
import styles from "./style.css";

class SiteHeader extends declarative(HTMLElement) {
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
          <tcds-icon icon="hamburger"></tcds-icon>
        </summary>
        ${this.mobile ? menus : ``}
      </details>

      <slot name="search-menu"></slot>
      ${this.mobile ? `` : menus}
    `;
  }

  get open() {
    return this.hasAttribute("open");
  }

  set open(value) {
    const old = this.open;
    this.toggleAttribute("open", Boolean(value));
    this.updatedCallback({open: old});
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

  searchToggle = {};

  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  connectedCallback() {
    this.searchToggle.element = this.querySelector("summary tcds-icon[icon=search]")
      .closest("details");
    this.searchToggle.parent = this.searchToggle.element.parentElement;
    this.searchToggle.name = this.searchToggle.element.getAttribute("name");

    this.moveSearchToggle();

    this.requestUpdate();

    this.#mobileQuery.addEventListener("change", () => {
      this.open = false;
      this.requestUpdate({mobile: !this.mobile});
    });
  }

  mountedCallback() {
    this.allToggles.forEach((toggle) => {
      toggle.addEventListener("toggle", () => {
        toggle.open && this.allToggles
          .filter(_toggle => _toggle !== toggle)
          .forEach(_toggle => _toggle.open = false);
      });

      // If we simply listened for a "toggle" event on the `toggle` element,
      // then set `this.open` accordingly, there would be a flicker/flash
      // because the callback happens *after* the toggle has already completed
      // (i.e. on the next animation frame). So if we want to toggle `this.open`
      // in sync with `toggle.open`, we have to intercede on click and manually
      // update `toggle.open` alongside `this.open`.
      toggle.querySelector("summary").addEventListener("click", (event) => {
        event.preventDefault();
        this.open = toggle.open = !toggle.open;
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
      this.searchToggle.element.setAttribute("slot", "search-menu");
      this.searchToggle.element.removeAttribute("name");
      this.appendChild(this.searchToggle.element);
    } else {
      this.searchToggle.element.removeAttribute("slot");
      this.searchToggle.element.setAttribute("name", this.searchToggle.name);
      this.searchToggle.parent.appendChild(this.searchToggle.element);
    }
  }
}

customElements.define("tcds-site-header", SiteHeader);