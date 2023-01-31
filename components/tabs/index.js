import WebComponent from "../../scripts/WebComponent/WebComponent.js";
import shadowStyles from "./style.css";
import lightStyles from "./style.light.css";

/**
 * Discussion:
 * - Presently, there is an accessibility issue regarding IDREFs shared across
 *   shadow boundaries, meaning we cannot associate (using [aria-controls] and
 *   [aria-labelledby]) [role=tab]s in one shadow root (that of tcds-tabs) with
 *   [role=tabpanel]s of another (that of a given tcds-tab) (see 1).
 * - The first rule of ARIA is "no ARIA is better than bad ARIA" (see 2).
 * - Furthermore, while the APG Tabs pattern specification includes both
 *   [aria-controls] and [aria-labelledby] (see 3), the actual ARIA spec for
 *   [role=tab] (see 4) stipulates only that the [role=tabpanel] associated with
 *   the active [role=tab] be *perceivable*, and does not explicitly require
 *   [aria-labelledby] and [aria-controls], respectively.
 * - Lastly, whereas rules about ancestor-descendant relationships regarding
 *   [role=tab] are stated with the verb "MUST", the recommendation for using
 *   [aria-controls] is given with the verb "SHOULD" (see 5 and 6).
 * - Because of the clear association between [role=tab] and [role=tabpanel]
 *   elements, thanks to their proximity and the imperceptibility of inactive/
 *   unassociated siblings, screen reader experience does not seem to be
 *   impacted by the lack of [aria-controls] and [aria-labelledby].
 * - Therefore, until the ARIAMixin spec is widely available and we can
 *   programmatically associate elements using ariaControlsElements (see 7),
 *   [aria-controls] and [aria-labelledby] have been deliberately omitted from
 *   this component implementation.
 *
 * 1. https://github.com/whatwg/html/issues/3515
 * 2. https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/
 * 3. https://www.w3.org/WAI/ARIA/apg/example-index/tabs/tabs-manual.html
 * 4. https://w3c.github.io/aria/#tab
 * 5. https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tab_role
 * 6. https://www.rfc-editor.org/rfc/rfc2119.txt
 * 7. https://w3c.github.io/aria/#dom-ariamixin-ariacontrolselements
 */

export default class Tabs extends WebComponent(HTMLElement) {
  static props = {
    inactive: {type: Boolean},
  };

  connectedCallback() {
    this.shadowRoot.adoptedStyleSheets = [shadowStyles];
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, ...[lightStyles]];

    this.tabs = Array.from(this.querySelectorAll("tcds-tab"));

    const activeTabs = this.tabs.filter(tab => tab.hasAttribute("active"));

    if(activeTabs.length === 0 && this.props["inactive"] === false) {
      this.select(this.tabs[0]);
    } else if(activeTabs.length >= 1) {
      this.select(activeTabs[0]);
    }
  }

  render() {
    return /* html */`
      <div role="tablist">
        ${this.tabs.map(tab => /* html */`
          <button
            role="tab"
            part="tab"
            aria-selected="${tab.state.active}"
            tabindex="${tab.state.active ? "0" : "-1"}"
            onclick="this.getRootNode().host.tabClick(event)"
            onkeydown="this.getRootNode().host.tabKeydown(event)"
          >
            <span>${tab.props.label}</span>
          </button>
        `).join("")}
      </div>
      <div part="viewport">
        <slot></slot>
      </div>
    `;
  }

  select(active) {
    this.dispatchEvent(new Event("update"));

    this.tabs.forEach((tab) => {
      tab.state.active = tab === active;
    });
  }

  tabClick(event) {
    this.select(this.tabs[this.parts["tab"].indexOf(event.currentTarget)]);
  }

  tabKeydown(event) {
    if(event.key === "ArrowRight") {
      event.preventDefault();
      this.next().then((next) => {
        this.parts["tab"][next].focus();
      });
    } else if(event.key === "ArrowLeft") {
      event.preventDefault();
      this.previous().then((previous) => {
        this.parts["tab"][previous].focus();
      });
    }
  }

  next() {
    return new Promise((resolve) => {
      const nextIndex = (this.tabs.indexOf(this.querySelector("[active]")) + 1) % this.tabs.length;
      this.select(this.tabs[nextIndex]);
      resolve(nextIndex);
    });
  }

  previous() {
    return new Promise((resolve) => {
      const previousIndex = (this.tabs.indexOf(this.querySelector("[active]")) - 1 + this.tabs.length) % this.tabs.length;
      this.select(this.tabs[previousIndex]);
      resolve(previousIndex);
    });
  }
}

customElements.define("tcds-tabs", Tabs);
