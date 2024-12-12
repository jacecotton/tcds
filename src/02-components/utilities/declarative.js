import reconcile from "./reconcile.js";

/**
 * A class mixin to provide declarative-style templating to custom elements.
 *
 * When used, this mixin provides a `requestUpdate` method, which requests that
 * the subclass's `template` property (a string of declaratively-written HTML)
 * be re-evaluated and then used to update the custom element's shadow DOM (with
 * DOM diffing, see `reconcile`). This provides reactivity to components, as
 * `requestUpdate` can be called from anywhere (prop setters, event listeners,
 * hooks, etc.)
 *
 * This class mixin provides two callback methods for hooking into the update
 * process: `mountedCallback` and `updatedCallback`. The former runs after the
 * first render (which should generally be requested with `requestUpdate` in
 * `connectedCallback`), while the latter runs after every render.
 *
 * For performance, back-to-back `requestUpdate` calls are debounced using
 * `requestAnimationFrame` and `cancelAnimationFrame`, so that there's only one
 * DOM reconciliation per animation frame. Data passed to `requestUpdate` is
 * batched across all debounced calls and then passed down to `updatedCallback`,
 * to give context about when/where/why update(s) were made (for instance,
 * passing the old values of reactive props for comparison against the new
 * values).
 */

export default (ElementInterface = HTMLElement) => class extends ElementInterface {
  // Keep track of whether to debounce back-to-back `requestUpdate` calls.
  #debounce = null;
  // Accumulate a batch of data passed to `requestUpdate` across back-to-back
  // calls.
  #batch = {};
  // Keep internal track of how many render passes have happened.
  #passes = 0;

  // Merges `record` into ongoing `#batch`, then determines whether to be
  // debounced. If not, calls `#update` to execute the actual update process.
  requestUpdate(record) {
    if(record) {
      this.#batch = {...this.#batch, ...record};
    }

    // Cancel any updates scheduled before the next animation frame.
    if(this.#debounce !== null) {
      cancelAnimationFrame(this.#debounce);
    }

    // Wait until the next animation frame to finally make an update.
    this.#debounce = requestAnimationFrame(this.#update.bind(this, this.template));
  }

  #update(template) {
    // Cache the batch of update records.
    const old = Object.assign({}, this.#batch);

    // Reset batch and debounce flag for this update round.
    this.#batch = {};
    this.#debounce = null;

    if(this.shadowRoot && template) {
      // Reconcile template DOM against existing shadow tree.
      reconcile(template, this.shadowRoot);

      this.#passes++;

      if(this.#passes === 1) {
        // First render, is mounted.
        this.mountedCallback?.();
      }

      this.updatedCallback?.(old);
    }
  }
};
