import {declarative, importSharedStyles} from "../utilities/index.js";
import layout from "../../01-layout/layout.json";
import styles from "./style.css";

class GlobalHeader extends declarative(HTMLElement) {
  static observedAttributes = ["open", "scrolled"];

  get template() {
    return importSharedStyles() + `
      <slot name="logo"></slot>

      <button part="search-toggle" popovertarget="search-menu">
        <span class="visually-hidden">Open search menu</span>
        <tcds-icon icon="search"></tcds-icon>
      </button>

      <button part="main-toggle" popovertarget="global-menus">
        <span class="visually-hidden">Open main menu</span>
        <tcds-icon icon="hamburger"></tcds-icon>
      </button>

      <div part="global-menus" ${this.mobile ? `popover id="global-menus"` : ``}>
        <button part="main-close" popovertarget="global-menus">
          <span class="visually-hidden">Close main menu</span>
          <tcds-icon icon="x"></tcds-icon>
        </button>

        <slot name="primary-menu"></slot>
        <slot name="utility-menu"></slot>
      </div>

      <div part="search-menu" popover id="search-menu">
        <button part="search-close" popovertarget="search-menu">
          <span class="visually-hidden">Close search menu</span>
          <tcds-icon icon="x"></tcds-icon>
        </button>

        <slot name="search-menu"></slot>
      </div>
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

  get scrolled() {
    return this.hasAttribute("scrolled");
  }

  set scrolled(value) {
    this.toggleAttribute("scrolled", Boolean(value));
  }

  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  connectedCallback() {
    this.requestUpdate({mobile: this.#mobileQuery.matches});

    this.#mobileQuery.addEventListener("change", (event) => {
      this.requestUpdate({mobile: !event.matches});
    });
  }

  attributeChangedCallback(name, value) {
    this.requestUpdate({[name]: value});
  }

  mountedCallback() {
    this.#syncDetailsState();
    this.#syncPopoverState();
    this.#handleScroll();
    this.#polyfillPopover();
  }

  updatedCallback(old) {
    if("mobile" in old) {
      this.#closeEverything();

      if(this.mobile) {
        this.#syncPopoverState();
      }
    }
  }

  get popoverTargets() {
    return [
      ...this.shadowRoot.querySelectorAll("[popover]"),
      ...this.querySelectorAll("[popover]"),
    ];
  }

  get details() {
    return [...this.querySelectorAll("details")];
  }

  #syncPopoverState() {
    // Sync header open state to state of last-toggled popover (or keep open if
    // any details are still open - only applicable to mobile).
    this.popoverTargets.forEach((target) => {
      target.addEventListener("beforetoggle", (event) => {
        this.open = event.newState === "open"
          || this.details.some(detail => detail.open);
      });
    });
  }

  #syncDetailsState() {
    const summaries = [...this.querySelectorAll("summary")];

    // Mimic the `beforetoggle` event of popovers.
    summaries.forEach((summary) => {
      summary.addEventListener("click", () => {
        const detail = summary.closest("details");

        detail.dispatchEvent(new CustomEvent("beforetoggle", {
          detail: {
            oldState: detail.open ? "open" : "closed",
            newState: detail.open ? "closed" : "open",
          },
        }));
      });
    });

    this.details.forEach((detail) => {
      detail.addEventListener("click", (event) => {
        event.stopPropagation();
      });

      // Sync header open state to state of last-toggled detail (or keep open if
      // any popovers are still open - only applicable to mobile).
      detail.addEventListener("beforetoggle", (event) => {
        this.open = event.detail.newState === "open"
          || this.popoverTargets.some(target => target.matches(":popover-open"));
      });
    });

    // Mimic the "light dismiss" of popovers.
    document.body.addEventListener("click", () => {
      this.details.forEach((detail) => {
        const oldState = detail.open;
        detail.open = false;
        
        detail.dispatchEvent(new CustomEvent("beforetoggle", {
          detail: {
            oldState: oldState ? "open" : "closed",
            newState: "closed",
          },
        }));
      });
    });
  }

  #closeEverything() {
    this.details.forEach(detail => detail.open = false);
    this.popoverTargets.forEach(target => target.hidePopover());
    this.open = false;
  }

  #handleScroll() {
    const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--tcds-global-header-height"));

    window.addEventListener("scroll", () => {
      if(window.scrollY > headerHeight && !this.scrolled) {
        this.scrolled = true;
      } else if(window.scrollY < headerHeight / 1.5 && this.scrolled) {
        this.scrolled = false;
      }
    });
  }

  // Temporarily using a minimally-viable custom polyfill because we need for it
  // to apply to our shadow root which (afaik) existing polyfills don't support.
  // Need to research further.
  #polyfillPopover() {
    if(!HTMLElement.prototype.hasOwnProperty("popover")) {
      const popoverTargets = this.shadowRoot.querySelectorAll("[popover]");
      const popoverTriggers = this.shadowRoot.querySelectorAll("[popovertarget]");

      popoverTargets.forEach((target) => {
        target.addEventListener("click", event => event.stopPropagation());
      });

      popoverTriggers.forEach((trigger) => {
        trigger.addEventListener("click", (event) => {
          event.stopPropagation();
          togglePopover(this.shadowRoot.getElementById(trigger.getAttribute("popovertarget")));
        });
      });

      document.body.addEventListener("click", () => {
        popoverTargets.forEach(target => togglePopover(target, {test: false}));
      });

      function togglePopover(target, options = {}) {
        const {test, event} = options;
        // This boolean indicates *is* open, *needs* to close.
        const open = test === false || target.hasAttribute("open");
        
        const state = {
          oldState: open ? "open" : "closed",
          newState: open ? "closed" : "open",
        };

        if(event !== false) {
          target.dispatchEvent(new CustomEvent("beforetoggle", {
            bubbles: false,
            detail: state,
          }));
        }

        target.toggleAttribute("open", !open);

        if(event !== false) {
          target.dispatchEvent(new CustomEvent("toggle", {
            bubbles: false,
            detail: state,
          }));
        }
      }
    }
  }
}

customElements.define("tcds-global-header", GlobalHeader);