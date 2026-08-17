/**
 * Tracks a media query and requests a host update whenever it starts or stops
 * matching. The query itself is reassignable, so a host can expose it as a
 * reactive property without managing listeners.
 */
export class MediaQueryController {
  #host;
  #query = null;
  #list = null;

  /**
   * @param {ReactiveElement} host
   * @param {String | null} query - A media query, e.g. `(max-width: 1000px)`.
   */
  constructor(host, query = null) {
    this.#host = host;
    host.addController(this);

    this.query = query;
  }

  get query() {
    return this.#query;
  }

  set query(query) {
    const next = query || null;

    if (next === this.#query) return;

    this.#stopListening();

    this.#query = next;
    this.#list = next ? matchMedia(next) : null;

    this.#startListening();
    this.#host.requestUpdate();
  }

  get matches() {
    return this.#list?.matches ?? false;
  }

  hostConnected() {
    this.#startListening();
  }

  hostDisconnected() {
    this.#stopListening();
  }

  #onChange = () => {
    this.#host.requestUpdate();
  };

  #startListening() {
    if (!this.#list || !this.#host.isConnected) return;
    this.#list.addEventListener("change", this.#onChange);
  }

  #stopListening() {
    this.#list?.removeEventListener("change", this.#onChange);
  }
}
