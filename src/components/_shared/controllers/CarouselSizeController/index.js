const PROPERTY = "--tcds-carousel-slide-max-height";

/**
 * Publishes intrinsic slide height without imposing a height on the carousel.
 * Hidden-until-found content must briefly participate in layout to measure it.
 * All measurement overrides are restored synchronously, before the next paint.
 *
 * @implements {import("lit").ReactiveController}
 * @internal
 */
export class CarouselSizeController {
  /** @type {import("lit").LitElement} */
  #host;
  /** @type {() => HTMLElement[]} */
  #getSlides;
  /** @type {ResizeObserver} */
  #resize;
  /** @type {MutationObserver} */
  #mutations;
  /** @type {number|undefined} */
  #frame;
  #width = -1;

  /**
   * @param {import("lit").LitElement} host
   * @param {() => HTMLElement[]} getSlides
   */
  constructor(host, getSlides) {
    this.#host = host;
    this.#getSlides = getSlides;
    this.#mutations = new MutationObserver(this.#schedule);

    this.#resize = new ResizeObserver(([entry]) => {
      // Publishing the height may resize the host. Only width affects wrapping;
      // ignoring height here avoids a measurement/consumer-style feedback loop.
      if (entry.contentRect.width === this.#width) return;
      this.#width = entry.contentRect.width;
      this.#schedule();
    });

    host.addController(this);
  }

  hostConnected() {
    this.#observeContent();
    this.#resize.observe(this.#host);

    this.#host.addEventListener("load", this.#schedule, true);
    this.#host.addEventListener("loadedmetadata", this.#schedule, true);
    window.addEventListener("resize", this.#schedule);
    document.fonts?.addEventListener("loadingdone", this.#schedule);

    this.#schedule();
  }

  hostUpdated() {
    this.#schedule();
  }

  hostDisconnected() {
    this.#resize.disconnect();
    this.#mutations.disconnect();

    this.#host.removeEventListener("load", this.#schedule, true);
    this.#host.removeEventListener("loadedmetadata", this.#schedule, true);
    window.removeEventListener("resize", this.#schedule);
    document.fonts?.removeEventListener("loadingdone", this.#schedule);

    if (this.#frame !== undefined) cancelAnimationFrame(this.#frame);
    this.#frame = undefined;
    this.#width = -1;
  }

  #observeContent() {
    this.#mutations.observe(this.#host, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
    });
  }

  #schedule = () => {
    if (!this.#host.isConnected || this.#frame !== undefined) return;

    this.#frame = requestAnimationFrame(() => {
      this.#frame = undefined;
      this.#measure();
    });
  };

  #measure() {
    // Keep the previous value while an ancestor hides the entire carousel.
    if (!this.#host.isConnected || this.#host.getClientRects().length === 0) return;

    const slides = this.#getSlides().filter((slide) => {
      const hidden = slide.getAttribute("hidden");
      return hidden === null || hidden === "until-found";
    });

    const originalStyles = slides.map((slide) => slide.getAttribute("style"));
    const needsReveal = slides.map((slide) => getComputedStyle(slide).contentVisibility === "hidden");

    let height = 0;

    // Do not observe our own temporary styles or the published CSS property.
    this.#mutations.disconnect();

    try {
      for (const [index, slide] of slides.entries()) {
        // Leave currently visible slides (including outgoing fades) alone.
        if (needsReveal[index]) {
          slide.style.setProperty("transition-property", "opacity", "important");
          slide.style.setProperty("content-visibility", "visible", "important");
        }

        const overrides = {
          "visibility": "hidden",
          "height": "auto",
          "block-size": "auto",
          "min-height": "0",
          "min-block-size": "0",
          "max-height": "none",
          "max-block-size": "none",
          "align-self": "start",
        };

        for (const [name, value] of Object.entries(overrides)) {
          slide.style.setProperty(name, value, "important");
        }
      }

      // Batch writes before reads. Clear consumer heights during measurement so
      // the published maximum can shrink as well as grow.
      height = Math.max(0, ...slides.map((slide) => slide.offsetHeight));
    } finally {
      slides.forEach((slide, index) => {
        const original = originalStyles[index];
        if (original === null) slide.removeAttribute("style");
        else slide.setAttribute("style", original);
        // Restore hidden layout before re-enabling content-visibility's
        // discrete transition. Keep the existing opacity fade running.
        if (needsReveal[index]) slide.style.setProperty("transition-property", "opacity", "important");
      });

      for (const slide of slides) void slide.offsetHeight;

      slides.forEach((slide, index) => {
        const original = originalStyles[index];
        if (original === null) slide.removeAttribute("style");
        else slide.setAttribute("style", original);
      });

      const value = `${height}px`;

      if (this.#host.style.getPropertyValue(PROPERTY) !== value) {
        this.#host.style.setProperty(PROPERTY, value);
      }

      this.#observeContent();
    }
  }
}
