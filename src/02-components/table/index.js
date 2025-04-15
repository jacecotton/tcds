// Good resource: https://piccalil.li/blog/styling-tables-the-modern-css-way/

class TCDSTableElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.role = "region";
    this.tabindex = "0";

    const caption = this.querySelector("caption[id]");

    if(caption) {
      this.setAttribute("aria-labelledby", caption.id);
    }
  }
}

customElements.define("tcds-table", TCDSTableElement);
