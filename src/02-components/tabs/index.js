import {declarative, html, baseStyles, registerParts} from "../utilities/index.js";
import localStyles from "./styles.shadow.css";

class TCDSTabsElement extends declarative(HTMLElement) {
  // #region Setup
  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.adoptedStyleSheets = [baseStyles, localStyles];
  }

  get template() {
    return html`
      <div role="tablist">
        ${this.tabs.map(tab => html`
          <button
            role="tab"
            part="button"
            aria-selected="${tab.selected}"
            aria-disabled="${tab.selected}"
            tabindex="${tab.selected ? "0" : "-1"}"
            onclick="this.getRootNode().host.tabClick(event)"
            onkeydown="this.getRootNode().host.tabKeydown(event)"
          ><span>${tab.title}</span></button>
        `).join("")}
      </div>
      <slot></slot>
    `;
  }
  // #endregion

  // #region Lifecycle
  async connectedCallback() {
    await customElements.whenDefined("tcds-tab").then(() => {
      this.requestUpdate();
    });
  }

  mountedCallback() {
    registerParts.apply(this, ["button"]);

    this.deepLinkHandler();
    window.addEventListener("hashchange", this.deepLinkHandler.bind(this));
  }

  disconnectedCallback() {
    window.removeEventListener("hashchange", this.deepLinkHandler);
  }
  // #endregion

  // #region Event listeners
  tabClick({currentTarget}) {
    this.select(this.tabs[this.parts["button"].indexOf(currentTarget)]);
  }

  tabKeydown({key}) {
    if(["ArrowRight", "ArrowLeft"].includes(key)) {
      const goto = key === "ArrowRight" ? this.nextIndex : this.previousIndex;
      this.parts["button"][goto].focus();
      this.select(this.tabs[goto]);
    }
  }

  /**
   * If the URL hash matches the ID of this tab, or the ID of an element within
   * this tab, select it.
   */
  deepLinkHandler() {
    // Get hash from URL.
    const hash = window.location.hash.slice(1);

    // The target tab is one with an ID that matches the hash, or that contains
    // an element with an ID or name that matches the hash.
    const target = hash && this.tabs.find((tab) => {
      return tab.id === hash
        || tab.querySelector(`[id="${hash}"], [name="${hash}"]`);
    });

    if(target) {
      // Select the tab.
      this.select(target);

      requestAnimationFrame(() => {
        // Scroll to whichever element whose ID matches the hash. It may not be
        // a tab, but an element contained by one.
        document.getElementById(hash).scrollIntoView(true);
      });
    } else {
      // Just select the first tab or the first tab marked selected if no hash.
      this.select(this.tabs.find(tab => tab.selected) || this.tabs[0]);
      return;
    }
  }
  // #endregion

  // #region Props and state
  get tabs() {
    return Array.from(this.querySelectorAll(":scope > tcds-tab"));
  }

  get nextIndex() {
    const selectedIndex = this.tabs.indexOf(this.querySelector("[selected]"));
    return (selectedIndex + 1) % this.tabs.length;
  }

  get previousIndex() {
    const selectedIndex = this.tabs.indexOf(this.querySelector("[selected]"));
    return (selectedIndex - 1 + this.tabs.length) % this.tabs.length;
  }
  // #endregion

  // #region Public API
  select(tab) {
    this.tabs.forEach(_tab => _tab.selected = _tab === tab);
  }
  // #endregion
}

customElements.define("tcds-tabs", TCDSTabsElement);
