import {LitElement, noChange} from "lit";
import {customElement, property} from "lit/decorators.js";
import {MediaQueryController} from "@/components/_shared/controllers/MediaQueryController";
import {SizeBreakpointLg} from "@/components/_shared/_gen/tokens.js";

/**
 * Upward distance, in pixels, before the header docks. Small and fixed — only
 * enough to keep trackpad jitter from pulling it into view. Downward movement
 * has no threshold at all: the header is never pinned while scrolling down.
 */
const REVEAL_THRESHOLD = 8;

@customElement("tcds-site-header")
export class SiteHeader extends LitElement {
  // #region Properties and state
  /**
   * The header is pinned to the top of the viewport, which is also its compact
   * form — the two are the same condition. Undocked it sits at its place in the
   * document, full size, and scrolls away like anything else. This is what
   * makes the behaviour asymmetric for free: scrolling down releases it, so it
   * leaves expanded; scrolling up docks it, so it returns compact.
   */
  @property({type: Boolean, reflect: true})
  accessor docked = false;

  /**
   * The compact form. Latched: it turns on when the header first docks and stays
   * on until the page is back at the very top, so a header released mid-page
   * scrolls away compact rather than expanding on its way out.
   */
  @property({type: Boolean, reflect: true})
  accessor compact = false;

  /**
   * A mega menu panel is open. Styling hook for scrims and backdrops.
   */
  @property({type: Boolean, reflect: true})
  accessor open = false;
  // #endregion

  // #region Private variables
  #internals;
  #mobile;

  #placeholder = null;
  #resizeObserver = null;

  /**
   * The header's natural height, and therefore both the height of the
   * placeholder and the depth of the zone at the top of the page where docking
   * is refused.
   */
  #offset = 0;

  #previousScrollY = 0;
  #momentum = 0;
  #frame = 0;
  #wasMobile = null;
  // #endregion

  // #region Lifecycle
  constructor() {
    super();

    this.#internals = this.attachInternals();
    this.#internals.role = "banner";
    this.#mobile = new MediaQueryController(this, `(max-width: ${SizeBreakpointLg})`);
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return noChange;
  }

  connectedCallback() {
    super.connectedCallback();

    window.addEventListener("scroll", this.#onScroll, {passive: true});
    document.addEventListener("click", this.#onDocumentClick);

    this.addEventListener("keydown", this.#onKeydown);
    this.addEventListener("focusin", this.#onFocusIn);
    this.addEventListener("toggle", this.#onDetailsToggle, {capture: true});

    this.#previousScrollY = window.scrollY;
    this.#attachPlaceholder();
  }

  updated() {
    const mobile = this.#mobile.matches;
    if (mobile === this.#wasMobile) return;

    this.#wasMobile = mobile;

    // Above the breakpoint the menus wrapper is held open and gets
    // `display: contents`.
    if (this.#menus) this.#menus.open = !mobile;
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    window.removeEventListener("scroll", this.#onScroll);
    document.removeEventListener("click", this.#onDocumentClick);

    this.removeEventListener("keydown", this.#onKeydown);
    this.removeEventListener("focusin", this.#onFocusIn);
    this.removeEventListener("toggle", this.#onDetailsToggle, {capture: true});

    this.#resizeObserver?.disconnect();
    this.#placeholder?.remove();
    this.#placeholder = null;

    cancelAnimationFrame(this.#frame);
    this.#frame = 0;
  }
  // #endregion

  // #region Public API
  /**
   * Closes every open disclosure in the header. The desktop menus wrapper is
   * exempt, since closing it would remove the nav bar.
   */
  close() {
    for (const details of this.#details) {
      if (details.open && this.#isDisclosure(details)) details.open = false;
    }
  }

  /**
   * Brings the header on screen. A no-op near the top of the page, where it is
   * already partly visible in the flow.
   */
  reveal() {
    this.#momentum = 0;
    this.#dock(window.scrollY);
  }
  // #endregion

  // #region Events
  #onScroll = () => {
    if (this.#frame) return;
    this.#frame = requestAnimationFrame(this.#measureScroll);
  };

  #measureScroll = () => {
    this.#frame = 0;

    // Read before writing anything: layout is clean at this point in the frame,
    // and the property writes below would invalidate it.
    const scrollY = window.scrollY;
    const viewport = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const delta = scrollY - this.#previousScrollY;

    this.#previousScrollY = scrollY;

    if (delta === 0) return;

    if (scrollY <= 0) {
      this.style.removeProperty("--tcds-site-header-release");
      this.compact = false;
      this.docked = false;
      this.#momentum = 0;

      return;
    }

    // The end of the document is a resting place rather than a gesture.
    if (scrollY + viewport >= documentHeight - 1) {
      this.#dock(scrollY);
      return;
    }

    // Momentum resets whenever the direction reverses, so the threshold
    // measures committed movement one way rather than total distance traveled.
    this.#momentum = Math.sign(delta) === Math.sign(this.#momentum)
      ? this.#momentum + delta
      : delta;

    if (this.#momentum > 0) {
      // Downward the header is never pinned. Released at the position it
      // currently occupies on screen, it scrolls off with the page rather than
      // being animated away.
      this.#release(scrollY);
      this.#momentum = 0;
      return;
    }

    if (Math.abs(this.#momentum) < REVEAL_THRESHOLD) return;

    this.#dock(scrollY);
    this.#momentum = 0;
  };

  #onHeaderResize = ([entry]) => {
    if (this.compact) return;

    const height = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height;

    if (!height || height === this.#offset) return;

    this.#offset = height;
    this.#placeholder.style.height = `${height}px`;
  };

  #onDetailsToggle = () => {
    this.open = this.#details.some((details) => {
      return details.getAttribute("name") === "primary-menu" && details.open;
    });

    // A panel opening while the header is off screen would open into nothing.
    if (this.open) this.reveal();
  };

  #onDocumentClick = (event) => {
    if (!this.contains(event.target)) {
      this.close();
      return;
    }

    const details = event.target;

    if (this.#details.includes(details) && details.open && this.#isDisclosure(details)) {
      details.open = false;
    }
  };

  #onFocusIn = () => {
    // An off-screen header still holds focusable links. Docking on focus keeps
    // keyboard users from tabbing into something they cannot see.
    this.reveal();
  };

  #onKeydown = (event) => {
    if (event.key !== "Escape") return;

    const open = this.#details.filter((details) => {
      return details.open && this.#isDisclosure(details);
    });

    if (open.length === 0) return;

    event.preventDefault();

    // Innermost first, so Escape inside a mobile mega menu closes that section
    // before it closes the hamburger. `#details` is in document order, which
    // puts nested elements after their ancestors.
    const target = open.findLast((details) => details.contains(event.target)) ?? open.at(-1);

    target.open = false;
    target.querySelector("summary")?.focus();
  };
  // #endregion

  // #region Utility methods
  /**
   * Queried live rather than cached, so a menu re-rendered by the CMS is picked
   * up without reconnecting the component.
   */
  get #details() {
    return [...this.querySelectorAll("details")];
  }

  get #menus() {
    return this.querySelector("[data-tcds-site-header=menus]");
  }

  /**
   * Above the breakpoint the menus wrapper is forced open and acts as the nav
   * bar, so it is exempt from anything that closes or counts open disclosures.
   */
  #isDisclosure(details) {
    return !(details === this.#menus && !this.#mobile.matches);
  }

  #dock(scrollY) {
    if (this.docked || this.open || scrollY <= this.#offset) return;
    this.style.removeProperty("--tcds-site-header-release");
    this.compact = true;
    this.docked = true;
  }

  /**
   * Hands the header back to the document at `top`, in document coordinates.
   * Only meaningful while docked — once released it is an ordinary absolutely
   * positioned element and must be left alone, or rewriting its offset every
   * frame would make it track the scroll.
   */
  #release(top) {
    if (!this.docked) return;
    this.style.setProperty("--tcds-site-header-release", `${top}px`);
    this.docked = false;
  }

  /**
   * A block in normal flow standing in for the header, which is positioned out
   * of flow so it can both scroll away and pin without ever shifting the page.
   */
  #attachPlaceholder() {
    this.#placeholder = document.createElement("div");
    this.#placeholder.setAttribute("data-tcds-site-header", "placeholder");
    this.#placeholder.setAttribute("aria-hidden", "true");
    this.#placeholder.style.cssText = "display: block; height: 0; pointer-events: none;";

    this.before(this.#placeholder);

    this.#resizeObserver = new ResizeObserver(this.#onHeaderResize);
    this.#resizeObserver.observe(this);
  }
  // #endregion
}
