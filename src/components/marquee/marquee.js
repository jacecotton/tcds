import {LitElement} from "lit";
import {html} from "lit/static-html.js";
import {customElement, property, state, queryAssignedElements} from "lit/decorators.js";

import sharedStyles from "@/components/_shared/styles";
import localStyles from "./marquee.styles.js";

@customElement("tcds-marquee")
export class Marquee extends LitElement {
  static styles = [sharedStyles, localStyles];

  // #region Properties and state
  @property({type: Boolean, reflect: true})
  accessor paused = false;

  @property({type: Number})
  accessor speed;

  @state()
  accessor #copies = 2;
  // #endregion

  // #region Private variables
  #customProperties = new Map();
  #contentVersion = 0;
  #builtVersion = -1;
  #builtCopies = -1;
  #frame = 0;

  #group;
  #slot;
  #resizeObserver;
  // #endregion

  // #region Lifecycle
  constructor() {
    super();

    this.speed = 30;
  }

  render() {
    const clones = Array.from({length: Math.max(this.#copies - 1, 0)}, (_, i) => i);

    return html`
      <div part="track">
        <div class="group">
          <slot @slotchange=${this.#onSlotChange}></slot>
        </div>
        ${clones.map((i) => html`
          <div class="group" aria-hidden="true">
            <slot name="clone-slot-${i}"></slot>
          </div>
        `)}
      </div>
      <button
        part="toggle"
        class="tcds-button tcds-button--media"
        type="button"
        aria-pressed=${this.paused}
        @click=${this.#togglePause}
      >
        <span class="visually-hidden">Toggle scrolling animation</span>
        <tcds-icon icon="${this.paused ? "play" : "pause"}"></tcds-icon>
      </button>
    `;
  }

  firstUpdated() {
    this.#group = this.renderRoot.querySelector(".group");
    this.#slot = this.renderRoot.querySelector("slot:not([name])");

    this.#resizeObserver = new ResizeObserver(() => this.#schedule());
    this.#resizeObserver.observe(this);
    this.#resizeObserver.observe(this.#group);

    document.fonts?.ready.then(() => this.#schedule());
    this.#schedule();
  }

  updated(changedProperties) {
    this.#syncClones();
    if (changedProperties.has("speed")) this.#schedule();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#resizeObserver?.disconnect();
    cancelAnimationFrame(this.#frame);
  }
  // #endregion

  // #region Events
  #onSlotChange() {
    this.#contentVersion++;
    this.#schedule();
    this.#syncClones();
  }

  #togglePause() {
    this.paused = !this.paused;
  }
  // #endregion

  // #region Utility methods
  #schedule() {
    cancelAnimationFrame(this.#frame);
    this.#frame = requestAnimationFrame(() => this.#measure());
  }

  #measure() {
    if (!this.#group || !this.isConnected) return;

    const gap = this.#readGap();
    this.#setCustomProperty("--tcds-marquee-gap", `${gap}px`);

    const groupWidth = this.#group.getBoundingClientRect().width;
    const cycle = groupWidth + gap;
    if (cycle <= 0) return;

    const viewport = this.getBoundingClientRect().width;

    this.#copies = Math.max(2, Math.ceil(viewport / cycle) + 1);

    this.#setCustomProperty("--tcds-marquee-cycle", `${cycle}px`);
    this.#setCustomProperty("--tcds-marquee-duration", `${(cycle / Math.max(this.speed, 1)).toFixed(4)}s`);
  }

  #readGap() {
    const value = parseFloat(getComputedStyle(this).columnGap);
    return Number.isFinite(value) ? value : 0;
  }

  #setCustomProperty(name, value) {
    if (this.#customProperties.get(name) === value) return;
    this.#customProperties.set(name, value);
    this.style.setProperty(name, value);
  }

  #syncClones() {
    if (!this.#slot) return;

    const needed = Math.max(this.#copies - 1, 0);
    if (this.#builtCopies === needed && this.#builtVersion === this.#contentVersion) return;

    this.#builtCopies = needed;
    this.#builtVersion = this.#contentVersion;

    for (const child of Array.from(this.children)) {
      if (child.hasAttribute("data-tcds-marquee-clone")) child.remove();
    }

    const source = this.#slot.assignedElements();
    if (!source.length) return;

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < needed; i++) {
      for (const element of source) {
        fragment.append(this.#makeClone(element, i));
      }
    }

    this.append(fragment);
  }

  #makeClone(element, index) {
    const clone = element.cloneNode(true);
    clone.toggleAttribute("data-tcds-marquee-clone", true);
    clone.setAttribute("slot", `clone-slot-${index}`);
    clone.setAttribute("aria-hidden", "true");
    clone.inert = true;
    clone.removeAttribute("id");

    for (const node of clone.querySelectorAll("[id]")) node.removeAttribute("id");

    return clone;
  }
  // #endregion
}
