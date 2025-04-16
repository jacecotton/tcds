import reconcile from "./reconcile.js";

/**
 * A class mixin to provide declarative-style templating to custom elements.
 *
 * When used, this mixin provides a `requestUpdate` method, which requests that
 * the subclass's `template` property (a string of declaratively-written HTML)
 * be re-evaluated and then used to update the custom element's shadow DOM (with
 * DOM diffing, see `reconcile`). This provides reactivity to components, as
 * `requestUpdate` can be called from anywhere (setters, proxies, etc.)
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

  // "Mounted" is a lifecycle state corresponding to the component's first
  // render pass.
  isMounted = false;

  // Merges `record` into ongoing `#batch`, then determines whether to be
  // debounced. If not, calls `#update` to execute the actual update process.
  requestUpdate(record) {
    if(record) {
      this.#batch = {...this.#batch, ...record};
    }

    if(this.#passes === 0) {
      this.#update(this.template);
    } else {
      // Cancel any updates scheduled before the next animation frame.
      if(this.#debounce !== null) {
        cancelAnimationFrame(this.#debounce);
      }

      // Wait until the next animation frame to finally make an update.
      this.#debounce = requestAnimationFrame(this.#update.bind(this, this.template));
    }
  }

  #update(template) {
    // Cache the batch of update records.
    const old = Object.assign({}, this.#batch);

    // Reset batch and debounce flag for this update round.
    this.#batch = {};
    this.#debounce = null;

    if(!this.shadowRoot || !template) {
      return;
    }

    if(this.#passes === 0) {
      this.shadowRoot.innerHTML = this.template;

      // Invoke subclass-defined hook.
      this.mountedCallback?.();

      // Signal mounted via a boolean property and a promise resolution.
      this.isMounted = true;
      this.#resolveMounted();
      // @todo dispatch `mount` event?

      this.updatedCallback?.(old);

      // @todo dispatch `update` event with `old` in `details`.
    } else {
      // Reconcile template DOM against existing shadow tree.
      reconcile(template, this.shadowRoot);
      this.updatedCallback?.(old);
    }

    this.#passes++;
  }

  // `whenMounted` returns a promise, which resolves when `#resolveMounted` is
  // called. Per the above, `#resolveMounted` is called after the element's
  // first render pass, corresponding with `mountedCallback`.
  #resolveMounted;

  #mountedPromise = new Promise((resolve) => {
    this.#resolveMounted = resolve;
  });

  whenMounted() {
    return this.#mountedPromise;
  }
};
