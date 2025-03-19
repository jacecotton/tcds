/**
 * Caches, deletes, and then re-sets properties on a given object. Meant to be
 * used with custom elements that may have dynamic properties defined by the
 * class (via getters and setters). This function would be called on those
 * properties in the custom element's `connectedCallback` to ensure the getters
 * and setters intercede when the custom element definition is actually loaded,
 * which may happen after a custom element has already been used/modified.
 */

export default function() {
  [...arguments].forEach((property) => {
    if(Object.prototype.hasOwnProperty.call(this, property)) {
      // Cache the value.
      const value = this[property];
      // Delete it.
      delete this[property];
      // Re-add it, this time relevant getters and setters will apply.
      this[property] = value;
    }
  });
}
