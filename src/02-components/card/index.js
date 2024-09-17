import {declarative, importSharedStyles, refreshProperties} from "../utilities/index.js";
import style from "./styles.css";

class Card extends declarative(HTMLElement) {
  get template() {
    const link = this.querySelector("a[slot=title][href]")?.href;
    const title = this.querySelector("[slot=title]")?.textContent;

    return importSharedStyles() + /* html */`
      <article data-theme="light">
        <figure>
          <slot name="image"></slot>
        </figure>

        <div part="content">
          <slot name="title"></slot>
          <slot name="description"></slot>
          <slot></slot>

          <slot name="footer">

          </slot>
        </div>
      </article>
    `;
  }

  get orientation() {
    return this.getAttribute("orientation")?.trim();
  }

  set orientation(value) {
    this.setAttribute("orientation", value.trim());
  }

  get actionLabel() {
    let value = this.hasAttribute("action-label") && this.getAttribute("action-label").trim();

    // Provide a default label if the [action-label] attribute is absent.
    if(value === false) {
      value = "Read more";
    } else if(value === "") {
      // Do not use an action label if attribute is set specifically to empty.
      value = false;
    }

    return value;
  }

  set actionLabel(value) {
    this.setAttribute("action-label", value.trim());
  }

  get size() {
    return this.getAttribute("size")?.trim();
  }

  set size(value) {
    this.setAttribute("size", value.trim());
  }

  get variant() {
    return this.getAttribute("variant")?.trim().replace(/\s\s+/g, " ").split(" ");
  }

  set variant(value) {
    if(Array.isArray(value)) {
      value = value.join(" ");
    }

    this.setAttribute("variant", value);
  }

  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.adoptedStyleSheets = [style];
  }

  connectedCallback() {
    refreshProperties.apply(this, ["orientation", "actionLabel", "size", "variant"]);
    this.requestUpdate();
  }
}

customElements.define("tcds-card", Card);
