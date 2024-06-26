import {declarative, importSharedStyles} from "../utilities/index.js";
import layout from "../../01-layout/layout.json";
import styles from "./style.css";

class GlobalHeader extends declarative(HTMLElement) {
  // 5. remove all details[open] and :host([open]) on outer body:click
  // 6. updatedCallback => this.open ? document.body.style.overflow = hidden
  // 7. toggle :host([scrolled]) based on window scroll threshold

  observedAttributes = ["open"];

  get template() {
    return /* html */`
      <slot name="logo"></slot>
      <slot name="menu-toggle"></slot>
      <slot name="search-toggle"></slot>
    `;
  }

  #mobileQuery = matchMedia(`(max-width: ${layout.breakpoints.m}px)`);

  get mobile() {
    return this.#mobileQuery.matches;
  }

  get open() {
    return this.hasAttribute("open");
  }

  set open(value) {
    this.toggleAttribute("open", Boolean(value));
  }

  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  connectedCallback() {
    this.#polyfillDetailsName();
    this.#handleMobile();
    this.#handleScroll();

    this.requestUpdate();

    this.querySelectorAll("details").forEach((detail) => {
      detail.querySelector("summary").addEventListener("click", (event) => {
        event.preventDefault();
        this.open = detail.open = !detail.open;
        this.#handleToggle();
      });

      detail.addEventListener("toggle", () => {
        this.#handleToggle();
      });
    });

    this.querySelectorAll("details[name=menu-toggle]").forEach((globalToggle) => {
      globalToggle.addEventListener("toggle", () => {
        globalToggle.querySelectorAll("details").forEach(_detail => _detail.open = false);
      });
    });
  }

  attributeChangedCallback(name, value) {
    this.requestUpdate({[name]: value});
  }

  updatedCallback(old) {
    if("mobile" in old) {
      this.querySelectorAll("details").forEach(detail => detail.open = false);

      if(this.mobile) {
        this.querySelector("details[slot=search-toggle]").setAttribute("name", "menu-toggle");
      } else {
        this.querySelector("details[slot=menu-toggle]").open = true;
        this.querySelector("details[slot=search-toggle]").setAttribute("name", "primary-menu");
      }
    }

    if("open" in old) {

    }
  }

  #handleToggle() {
    this.open = [...this.querySelectorAll("details")]
      .filter(detail => this.mobile || detail.getAttribute("name") !== "menu-toggle")
      .some(detail => detail.open);
  }

  #handleMobile() {
    this.requestUpdate({mobile: this.#mobileQuery.matches});

    this.#mobileQuery.addEventListener("change", (event) => {
      this.requestUpdate({mobile: !event.matches});
    });
  }

  #handleScroll() {

  }

  #polyfillDetailsName() {
    if(!("name" in document.createElement("details"))) {
      const details = [...document.querySelectorAll("details")];

      details.forEach((detail) => {
        detail.addEventListener("toggle", () => {
          detail.open && details
            .filter(_detail => _detail.getAttribute("name") === detail.getAttribute("name"))
            .filter(_detail => _detail !== detail)
            .forEach(_detail => _detail.open = false);
        });
      });
    }
  }
}

customElements.define("tcds-global-header", GlobalHeader);
