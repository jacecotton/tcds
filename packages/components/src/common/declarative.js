import reconcile from "./reconcile.js";

export default (ElementInterface = HTMLElement) => class extends ElementInterface {
  #debounce = null;
  #batch = {};
  #passes = 0;

  requestUpdate(record) {
    if(record) {
      this.#batch = {...this.#batch, ...record};
    }

    // Cancel any updates scheduled before the next animation frame.
    if(this.#debounce !== null) {
      cancelAnimationFrame(this.#debounce);
    }

    // Wait until the next animation frame to finally make an update.
    this.#debounce = requestAnimationFrame(this.#update.bind(this));
  }

  #update() {
    // Cache the batch of update records.
    const old = Object.assign({}, this.#batch);

    // Reset batch and debounce flag for this update round.
    this.#batch = {};
    this.#debounce = null;

    if(this.shadowRoot && this.template) {
      reconcile(this.template, this.shadowRoot);

      this.#passes++;

      if(this.#passes === 1) {
        this.mountedCallback?.();
      }

      this.updatedCallback?.(old);
    }
  }
};
