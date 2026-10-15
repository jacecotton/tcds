import {LitElement} from "lit";
import {html} from "lit/static-html.js";
import {customElement, state, queryAssignedElements} from "lit/decorators.js";

import sharedStyles from "@/components/_shared/styles";
import localStyles from "./animated-graphic.styles.js";

/**
 * A looping video with a play/pause control.
 *
 * @tag tcds-animated-graphic
 * @slot - The video element.
 * @csspart toggle - The play/pause button.
 */
@customElement("tcds-animated-graphic")
export class AnimatedGraphic extends LitElement {
  static styles = [sharedStyles, localStyles];

  // #region Properties and state
  @state()
  accessor #playing = false;

  @state()
  accessor #hasVideo = false;
  // #endregion

  // #region Private variables
  /** @type {HTMLVideoElement[]} */
  @queryAssignedElements({flatten: true, selector: "video"})
  accessor #videos;

  #onPlaybackChange = () => {
    const video = this.#videos[0];
    this.#hasVideo = Boolean(video);
    this.#playing = Boolean(video && !video.paused && !video.ended);
  };
  // #endregion

  // #region Lifecycle
  connectedCallback() {
    super.connectedCallback();

    for (const name of ["play", "pause", "ended", "emptied"]) {
      this.addEventListener(name, this.#onPlaybackChange, true);
    }

    // Reconnection does not necessarily trigger slotchange.
    this.updateComplete.then(() => {
      if (this.isConnected) this.#onPlaybackChange();
    });
  }

  render() {
    const label = this.#playing ? "Pause animation" : "Play animation";

    return html`
      <slot @slotchange=${this.#onPlaybackChange}></slot>
      <button
        part="toggle"
        class="tcds-button tcds-button--media"
        type="button"
        title=${label}
        ?disabled=${!this.#hasVideo}
        @click=${this.#onToggleClick}
      >
        <span class="visually-hidden">${label}</span>
        <tcds-icon icon=${this.#playing ? "pause" : "play"}></tcds-icon>
      </button>
    `;
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    for (const name of ["play", "pause", "ended", "emptied"]) {
      this.removeEventListener(name, this.#onPlaybackChange, true);
    }
  }
  // #endregion

  // #region Event handlers
  async #onToggleClick() {
    const video = this.#videos[0];
    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
      } catch {
        // Playback may be rejected by browser policy or an unavailable source.
        this.#onPlaybackChange();
      }
    } else {
      video.pause();
    }
  }
  // #endregion
}
