import {LitElement} from "lit";
import {html, unsafeStatic} from "lit/static-html.js";
import {customElement, property, state, queryAssignedElements} from "lit/decorators.js";
import sharedStyles from "@/components/_shared/styles";

@customElement("tcds-table")
export class Table extends HTMLElement {
  connectedCallback() {
    this.role = "region";
    this.tabindex = "0";

    const caption = this.querySelector("caption[id]");

    if (caption) {
      this.setAttribute("aria-labelledby", caption.id);
    }

    const table = this.querySelector("table");
    const cells = table.querySelectorAll("td, th");

    cells.forEach((cell) => {
      const cellSize = cell.textContent.replace(/\s+/g, " ").length;

      const wrapper = document.createElement("span");
      wrapper.style.display = "inline-block";
      wrapper.append(...cell.childNodes);

      if(cellSize < 60) {
        wrapper.style.whiteSpace = "nowrap";
      } else {
        wrapper.style.width = "60ch";
      }

      cell.appendChild(wrapper);
    })
  }
}
