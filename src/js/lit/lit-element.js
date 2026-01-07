import {LitElement as _LitElement} from "lit";

export class LitElement extends _LitElement {
  connectedCallback() {
    super.connectedCallback();
    this.#fixShadowedProperties();
  }

  /**
   * Workaround for Babel legacy decorator shadowing issues.
   *
   * When using @babel/plugin-transform-class-properties with {loose: true} (or
   * assumptions.setPublicClassFields: true), class fields are assigned on the
   * instance, which shadows accessors defined on the prototype by Lit's
   * @property decorator. This method detects such shadowed properties, deletes
   * them from the instance, and re-assigns the value to trigger the setter.
   */
  #fixShadowedProperties() {
    const props = this.constructor.elementProperties;
    if(!props) return;

    for (const [prop,] of props) {
      if (Object.prototype.hasOwnProperty.call(this, prop)) {
        const value = this[prop];
        delete this[prop];
        this[prop] = value;
      }
    }
  }
}
