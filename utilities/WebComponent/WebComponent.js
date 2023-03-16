import diff from "./diff.js";

const WebComponent = (ElementInterface = HTMLElement) => class extends ElementInterface {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
  }

  #debounce = null;
  #batch = [];
  #renderPasses = 0;
  #baseStyles = this.constructor.baseStyles
    || document.querySelector("link[title=tcds]")?.href
    || "https://unpkg.com/@txch/tcds/dist/tcds.css";

  connectedCallback() {
    if(this.#renderPasses === 0) {
      this._requestUpdate(this.constructor.observedAttributes);
    }
  }

  attributeChangedCallback(attribute) {
    this._requestUpdate(attribute);
  }

  _upgradeProperties(properties) {
    properties.forEach((property) => {
      if(Object.prototype.hasOwnProperty.call(this, property)) {
        const value = this[property];
        delete this[property];
        this[property] = value;
      }
    });
  }

  _requestUpdate(property) {
    this.#batch = [...this.#batch, ...[property].flat()];

    if(this.#debounce !== null) {
      cancelAnimationFrame(this.#debounce);
    }

    this.#debounce = requestAnimationFrame(this.#update.bind(this));
  }

  #update() {
    const props = [...this.#batch];

    this.#batch = [];
    this.#debounce = null;

    diff(`
      ${this.#baseStyles ? `
        <style id="tcds">@import url(${this.#baseStyles})</style>
      ` : ""}
      ${this.template || ""}
    `, this.shadowRoot);

    this.#renderPasses++;

    if(this.#renderPasses === 1) {
      this.dispatchEvent(new Event("mount"));
      this.mountedCallback?.();
      this.updatedCallback?.(props);
    } else {
      this.updatedCallback?.(props);
    }
  }
};

export default WebComponent;
