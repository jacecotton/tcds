import diff from "./diff.js";

const WebComponent = (ElementInterface = HTMLElement) => class extends ElementInterface {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
  }

  connectedCallback() {
    this._requestUpdate();
  }

  #debounce = null;
  #batch = [];
  #renderPasses = 0;
  #baseStyles = this.constructor.baseStyles
    || document.querySelector("link[title=tcds]")?.href
    || "https://unpkg.com/@txch/tcds/dist/tcds.css";

  _upgradeProperty(property) {
    if(Object.prototype.hasOwnProperty.call(this, property)) {
      const value = this[property];
      delete this[property];
      this[property] = value;
    }
  }

  _requestUpdate(property) {
    this.#batch = [...this.#batch, ...[property]];

    if(this.#debounce !== null) {
      cancelAnimationFrame(this.#debounce);
    }

    this.#debounce = requestAnimationFrame(this.#update.bind(this));
  }

  #update() {
    this.#debounce = null;

    diff(`
      ${this.#baseStyles ? `
        <style id="tcds">@import url(${this.#baseStyles})</style>
      ` : ""}
      ${this.constructor.template || ""}
    `, this.shadowRoot);

    this.#renderPasses++;

    if(this.#renderPasses === 1) {
      const childComponentsAreDefined = [...this.shadowRoot.querySelectorAll(":not(:defined)")]
        .map(child => customElements.whenDefined(child.localName));

      Promise.all(childComponentsAreDefined).then(() => {
        this.dispatchEvent(new Event("mount"));
        this.mountedCallback?.();
        this.updatedCallback?.(this.#batch);
      }).catch((error) => {
        console.error("Child components are not defined.", error);
      });
    } else {
      this.updatedCallback?.(this.#batch);
    }

    this.#batch = [];
  }
};

export default WebComponent;
