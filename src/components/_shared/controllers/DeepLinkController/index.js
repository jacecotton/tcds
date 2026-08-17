/**
 * Resolves the document's fragment identifier to an element and hands it to the
 * host, on connect, on `hashchange`, and on demand.
 *
 * The host decides what a match means. This controller only answers the
 * question "what element is the URL pointing at right now?"
 */
export class DeepLinkController {
  #host;
  #onResolve;

  /**
   * @param {ReactiveElement} host
   * @param {(target: Element) => void} onResolve - Called with the matched
   *   element. Not called at all when the URL has no fragment, or when the
   *   fragment matches nothing in the document.
   */
  constructor(host, onResolve) {
    this.#host = host;
    this.#onResolve = onResolve;

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
    if (target) this.#onResolve(target);
  }

  hostConnected() {
    window.addEventListener("hashchange", this.#onHashChange);
  }

  hostDisconnected() {
    window.removeEventListener("hashchange", this.#onHashChange);
  }

  #onHashChange = () => {
    this.resolve();
  };
}
