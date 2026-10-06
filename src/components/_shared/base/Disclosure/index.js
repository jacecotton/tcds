import {LitElement, nothing} from "lit";
import {html} from "lit/static-html.js";
import {property} from "lit/decorators.js";

import sharedStyles from "@/components/_shared/styles";
import disclosureStyles from "./styles.js";

import {AccordionAnimationController} from "@/components/_shared/controllers/AccordionAnimationController";

/**
 * The display mode of the disclosure. Assigned by the parent group, mirrored to
 * a custom state for styling.
 *
 * tabs      - Title suppressed (the group's tablist owns it), panel is a
 *             tabpanel, whole host hidden unless expanded.
 * accordion - Heading wraps a trigger button, panel animates open and shut.
 * plain     - No affordances at all. Real heading, always-visible content.
 */
export const MODES = /** @type {const} */ (["tabs", "accordion", "plain"]);
/** @typedef {(typeof MODES)[number]} DisclosureMode */

export const DEFAULT_HEADING_LEVEL = 3;

export class Disclosure extends LitElement {
  static styles = [sharedStyles, disclosureStyles];

  // #region Properties and state
  /**
   * @type {DisclosureMode}
   * @internal
   */
  @property({type: String, attribute: false})
  accessor mode;

  /** @internal */
  @property({type: Number, attribute: false})
  accessor position;

  /** @internal */
  @property({type: Number, attribute: false})
  accessor total;
  // #endregion

  // #region Private variables
  /** @type {ElementInternals} */
  #internals;
  /** @type {AccordionAnimationController} */
  #animation;
  /** @type {Node[]|null} */
  #titleContent = null;
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

    if (changedProperties.has("mode")) {
      this.#animation.reset();

      for (const mode of MODES) {
        if (mode === this.mode) {
          this.#internals.states.add(mode);
        } else {
          this.#internals.states.delete(mode);
        }
      }
    }

    if (this.visible) {
      this.#internals.states.add("expanded");
    } else {
      this.#internals.states.delete("expanded");
    }
  }

  render() {
    const label = this.titleText;

    return html`
      ${this.mode === "accordion" ? html`
        <div
          part="heading"
          role="heading"
          aria-level=${this.headingLevel}
        >
          <button
            part="trigger"
            type="button"
            id="trigger"
            aria-expanded=${this.expanded ? "true" : "false"}
            aria-controls="panel"
            @click=${this.#onTriggerClick}
          >
            ${this.titleContent}
            <tcds-icon
              part="marker"
              icon="${this.expanded ? "caret-up" : "caret-down"}"
            ></tcds-icon>
          </button>
        </div>
      ` : nothing}

      <slot
        name="title"
        ?hidden=${this.mode !== "plain"}
        @slotchange=${this.#onTitleSlotChange}
      ></slot>

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

  // #region Subclass API
  /**
   * Subclasses map this onto their own reflected property — `selected` on tabs,
   * `open` on accordion sections — so each pattern keeps the attribute name
   * that reads naturally in markup.
   *
   * @type {boolean}
   * @internal
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
   *
   * @type {boolean}
   * @internal
   */
  get visible() {
    return this.mode === "plain" || this.expanded;
  }

  /**
   * The author's `[slot=title]` element. Scoped to direct children so a nested
   * group's titles are never mistaken for this one's.
   *
   * @type {Element|null}
   * @internal
   */
  get titleElement() {
    return this.querySelector(":scope > [slot=title]");
  }

  /**
   * @type {string}
   * @internal
   */
  get titleText() {
    return this.titleElement?.textContent.trim() ?? "";
  }

  /**
   * A stable clone of the author's title contents, suitable for rendering
   * inside controls such as accordion triggers and tabs.
   *
   * IDs are stripped because the clone may coexist with the source title in the
   * document.
   *
   * @type {Node[]}
   * @internal
   */
  get titleContent() {
    if (this.#titleContent !== null) return this.#titleContent;

    const title = this.titleElement;
    const nodes = title ? [...title.cloneNode(true).childNodes] : [];

    for (const node of nodes) {
      if (!(node instanceof Element)) continue;

      node.removeAttribute("id");

      for (const descendant of node.querySelectorAll("[id]")) {
        descendant.removeAttribute("id");
      }
    }

    this.#titleContent = nodes;

    return nodes;
  }

  /**
   * Taken from the author's heading tag, so `<h2 slot="title">` and
   * `<h4 slot="title">` both survive being wrapped in a trigger button.
   *
   * @type {number}
   * @protected
   * @internal
   */
  get headingLevel() {
    const title = this.titleElement;
    const explicit = Number(title?.getAttribute("aria-level"));

    if (Number.isInteger(explicit) && explicit > 0) return explicit;

    const level = Number(title?.tagName.match(/^H([1-6])$/)?.[1]);

    return Number.isInteger(level) ? level : DEFAULT_HEADING_LEVEL;
  }

  /**
   * @type {HTMLElement|null}
   * @protected
   * @internal
   */
  get panel() {
    return this.renderRoot?.querySelector("[part=panel]") ?? null;
  }

  /**
   * @type {HTMLElement|null}
   * @protected
   * @internal
   */
  get content() {
    return this.renderRoot?.querySelector("[part=content]") ?? null;
  }
  // #endregion

  // #region Event handlers
  #onTriggerClick() {
    this.#requestChange(!this.expanded);
  }

  #onBeforeMatch = () => {
    this.#requestChange(true);
  };

  #onTitleSlotChange() {
    this.#titleContent = null;

    this.dispatchEvent(new CustomEvent("tcds-disclosure:title-change", {
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

  #requestChange(expanded) {
    this.dispatchEvent(new CustomEvent("tcds-disclosure:change", {
      detail: {expanded},
      bubbles: true,
      composed: true,
    }));
  }
  // #endregion
}
