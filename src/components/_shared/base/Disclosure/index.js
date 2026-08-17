import {LitElement, nothing} from "lit";
import {html} from "lit/static-html.js";
import {property} from "lit/decorators.js";

import sharedStyles from "@/components/_shared/styles";
import disclosureStyles from "./styles.js";

// NOTE: adjust to wherever `AccordionAnimationController` actually lives.
import {AccordionAnimationController} from "@/components/_shared/controllers/AccordionAnimationController";

/**
 * The presentations an item can take. Assigned by the parent group, mirrored to
 * a custom state so the stylesheet can key off it.
 *   tabs      - Title suppressed (the group's tablist owns it), panel is a
 *               tabpanel, whole host hidden unless expanded.
 *   accordion - Heading wraps a trigger button, panel animates open and shut.
 *   plain     - No affordances at all. Real heading, always-visible content.
 */
export const MODES = ["tabs", "accordion", "plain"];

export const DEFAULT_HEADING_LEVEL = 3;

export class Disclosure extends LitElement {
  static styles = [sharedStyles, disclosureStyles];

  // #region Properties and state
  @property({type: String})
  accessor mode;

  @property({type: Number})
  accessor position;

  @property({type: Number})
  accessor total;
  // #endregion

  // #region Private variables
  #internals;
  #animation;
  // #endregion

  // #region Lifecycle
  constructor() {
    super();

    this.mode = "accordion";
    this.position = 0;
    this.total = 1;

    this.#internals = this.attachInternals();

    // Both getters return null outside accordion mode, which makes the
    // controller a no-op where there is nothing to expand or collapse.
    this.#animation = new AccordionAnimationController(this, {
      isOpen: () => this.expanded,
      getPanel: () => (this.mode === "accordion" ? this.panel : null),
      getContent: () => (this.mode === "accordion" ? this.content : null),
    });
  }

  willUpdate(changedProperties) {
    super.willUpdate();

    if (changedProperties.has("mode")) this.#animation.reset();

    for (const mode of MODES) {
      this.#internals.states[mode === this.mode ? "add" : "delete"](mode);
    }

    this.#internals.states[this.visible ? "add" : "delete"]("expanded");
  }

  render() {
    const label = this.titleText;

    return html`
      ${this.mode === "accordion" ? html`
        <div part="heading" role="heading" aria-level=${this.headingLevel}>
          <button
            part="trigger"
            type="button"
            id="trigger"
            aria-expanded=${this.expanded ? "true" : "false"}
            aria-controls="panel"
            @click=${this.#onTriggerClick}
          >
            <slot name="title"></slot>
            <tcds-icon part="marker" icon="${this.expanded ? "minus" : "plus"}"></tcds-icon>
          </button>
        </div>
      ` : html`
        <slot name="title" @slotchange=${this.#onTitleSlotChange}></slot>
      `}
      <div
        part="panel"
        id="panel"
        role=${this.#panelRole ?? nothing}
        tabindex=${this.mode === "tabs" ? "0" : nothing}
        aria-label=${this.mode === "tabs" && label ? label : nothing}
        aria-labelledby=${this.mode === "accordion" ? "trigger" : nothing}
      >
        <div part="content">
          <slot></slot>
        </div>
      </div>
    `;
  }

  firstUpdated() {
    // `hidden="until-found"` (set by the animation controller when collapsed)
    // lets the browser's find-in-page reveal the panel. The UA removes the
    // attribute itself; this keeps our own state in step with it.
    this.panel?.addEventListener("beforematch", this.#onBeforeMatch);
  }

  updated() {
    if (this.mode === "accordion") return;

    // The animation controller owns `hidden` and the inline height, but only in
    // accordion mode. Leaving them behind would keep a panel collapsed after a
    // media query flips the group into another mode.
    const panel = this.panel;

    if (!panel) return;

    panel.hidden = false;
    panel.style.height = null;
  }
  // #endregion

  // #region Public API
  /**
   * Subclasses map this onto their own reflected property — `selected` on tabs,
   * `open` on accordion sections — so each pattern keeps the attribute name
   * that reads naturally in markup.
   */
  get expanded() {
    throw new Error(`<${this.localName}> must implement an \`expanded\` accessor.`);
  }

  set expanded(value) {
    throw new Error(`<${this.localName}> must implement an \`expanded\` accessor.`);
  }

  /**
   * Whether the content is actually on screen. Plain mode ignores `expanded`
   * entirely rather than overwriting it, so the author's state survives a trip
   * through a matching media query and back.
   */
  get visible() {
    return this.mode === "plain" || this.expanded;
  }

  /**
   * The author's `[slot=title]` element. Scoped to direct children so a nested
   * group's titles are never mistaken for this one's.
   */
  get titleElement() {
    return this.querySelector(":scope > [slot=title]");
  }

  get titleText() {
    return this.titleElement?.textContent.trim() ?? "";
  }

  /**
   * Taken from the author's heading tag, so `<h2 slot="title">` and
   * `<h4 slot="title">` both survive being wrapped in a trigger button.
   */
  get headingLevel() {
    const title = this.titleElement;
    const explicit = Number(title?.getAttribute("aria-level"));

    if (Number.isInteger(explicit) && explicit > 0) return explicit;

    const level = Number(title?.tagName.match(/^H([1-6])$/)?.[1]);

    return Number.isInteger(level) ? level : DEFAULT_HEADING_LEVEL;
  }

  get panel() {
    return this.renderRoot?.querySelector("[part=panel]") ?? null;
  }

  get content() {
    return this.renderRoot?.querySelector("[part=content]") ?? null;
  }
  // #endregion

  // #region Events
  #onTriggerClick() {
    this.requestChange(!this.expanded);
  }

  #onBeforeMatch = () => {
    this.requestChange(true);
  };

  #onTitleSlotChange() {
    // The group may be rendering a copy of this title (a tablist button), so it
    // needs to know when the source text changes.
    this.dispatchEvent(new CustomEvent("tcds-disclosure-title-change", {
      bubbles: true,
      composed: true,
    }));

    this.requestUpdate();
  }
  // #endregion

  // #region Utility methods
  get #panelRole() {
    if (this.mode === "tabs") return "tabpanel";
    if (this.mode === "accordion") return "region";

    return null;
  }

  requestChange(expanded) {
    this.dispatchEvent(new CustomEvent("tcds-disclosure-change", {
      detail: {expanded},
      bubbles: true,
      composed: true,
    }));
  }
  // #endregion
}
