/**
 * Resolves the document's fragment identifier to an element and hands it to the
 * host, on connect, on `hashchange`, and on demand.
 *
 * The host decides what a match means. This controller only answers the
 * question "what element is the URL pointing at right now?"
 *
 * @implements {import("lit").ReactiveController}
 * @internal
 */
export class DeepLinkController {
  /** @type {import("lit").ReactiveControllerHost & HTMLElement} */
  #host;
  #onResolve;
  #request = 0;

  /**
   * @param {import("lit").ReactiveControllerHost & HTMLElement} host
   * @param {(target: HTMLElement) => boolean|void} onResolve - Called with the matched
   *   element. Not called at all when the URL has no fragment, or when the
   *   fragment matches nothing in the document. Return true to scroll after
   *   the host and any nested containers have had a chance to reveal it.
   */
  constructor(host, onResolve) {
    this.#onResolve = onResolve;
    this.#host = host;
    host.addController(this);
  }

  /**
   * The element the current URL points at, if any.
   */
  get target() {
    const fragment = location.hash.slice(1);

    if (!fragment) return null;

    try {
      return document.getElementById(decodeURIComponent(fragment));
    } catch {
      // Malformed percent-encoding throws. Fall back to the raw fragment,
      // which is what an author who wrote a literal `%` in an id would expect.
      return document.getElementById(fragment);
    }
  }

  resolve() {
    const target = this.target;
    const request = ++this.#request;
    if (!target || !this.#onResolve(target)) return;

    // All hash listeners run before this frame, and Lit updates flush before
    // rendering. This lets nested groups reveal their panels before scrolling.
    requestAnimationFrame(() => {
      if (!this.#host.isConnected || request !== this.#request || target !== this.target) return;
      target.scrollIntoView({block: "start", behavior: "instant"});
    });
  }

  hostConnected() {
    window.addEventListener("hashchange", this.#onHashChange);
    this.#host.updateComplete.then(() => {
      if (this.#host.isConnected) this.resolve();
    });
  }

  hostDisconnected() {
    this.#request++;
    window.removeEventListener("hashchange", this.#onHashChange);
  }

  #onHashChange = () => {
    this.resolve();
  };
}
