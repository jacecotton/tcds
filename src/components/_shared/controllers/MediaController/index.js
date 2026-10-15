import {pauseMedia, restoreMedia, prepareMedia} from "@/components/_shared/utilities/pauseMedia.js";

let owners = 0;

/**
 * Keeps disclosure/slide media in step with visibility, including newly slotted
 * content. Each scope owns its pauses so nested hidden containers stay paused.
 *
 * @implements {import("lit").ReactiveController}
 * @internal
 */
export class MediaController {
  /** @type {import("lit").LitElement} */
  #host;
  /** @type {() => boolean} */
  #isActive;
  #owner = `tcds-media-${++owners}`;
  #settled = false;
  /** @type {number|undefined} */
  #frame;

  /**
   * @param {import("lit").LitElement} host
   * @param {() => boolean} isActive
   */
  constructor(host, isActive) {
    this.#host = host;
    this.#isActive = isActive;
    host.addController(this);
  }

  hostConnected() {
    this.#host.addEventListener("play", this.#onPlay, true);
    this.#host.requestUpdate();
  }

  hostDisconnected() {
    this.#host.removeEventListener("play", this.#onPlay, true);
    if (this.#frame !== undefined) cancelAnimationFrame(this.#frame);
    this.#frame = undefined;
    this.#settled = false;
  }

  hostUpdated() {
    if (this.#settled) {
      this.#sync();
    } else if (this.#frame === undefined) {
      // Let the parent assign the initial selection and responsive mode first.
      this.#frame = requestAnimationFrame(() => {
        this.#frame = undefined;
        this.#settled = true;
        this.#sync();
      });
    }
  }

  contentChanged() {
    prepareMedia(this.#host);
    if (this.#settled) this.#sync();
  }

  #onPlay = () => {
    if (!this.#isActive()) this.#sync();
  };

  #sync() {
    if (this.#isActive()) {
      restoreMedia(this.#host, {owner: this.#owner});
    } else {
      pauseMedia(this.#host, {owner: this.#owner});
    }
  }
}
