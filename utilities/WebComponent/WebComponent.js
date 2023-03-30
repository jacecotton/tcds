import diff from "./diff.js";

const WebComponent = (ElementInterface = HTMLElement) => class extends ElementInterface {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
  }

  #debounce = null;
  #batch = {};
  #renderPasses = 0;
  #baseStyles = this.constructor.baseStyles
    || document.querySelector("link[title=tcds]")?.href
    || "https://unpkg.com/@txch/tcds/dist/tcds.css";

  _upgradeProperties(properties) {
    properties.forEach((property) => {
      if(Object.prototype.hasOwnProperty.call(this, property)) {
        const value = this[property];
        delete this[property];
        this[property] = value;
      }
    });
  }

  update(name, oldValue = null) {
    if(name) {
      this.#batch = {...this.#batch, ...{[name]: oldValue}};
    }

    if(this.#debounce !== null) {
      cancelAnimationFrame(this.#debounce);
    }

    this.#debounce = requestAnimationFrame(this.#update.bind(this));
  }

  #update() {
    const old = Object.assign({}, this.#batch);

    this.#batch = {};
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
    }

    this.updatedCallback?.(old);
  }
};

export default WebComponent;
