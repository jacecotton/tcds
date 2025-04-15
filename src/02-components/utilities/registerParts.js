/**
 * This is a utility for querying `[part]` elements in a custom element's shadow
 * DOM and accessing them from a `this.parts` object. This can be called after
 * the component has mounted (via `mountedCallback`) or at any point afterwards.
 */

export default function() {
  this.parts = {};

  [...arguments].forEach((part) => {
    const query = this.shadowRoot.querySelectorAll(`[part~=${part}]`);

    if(query.length === 1) {
      this.parts[part] = query[0];
    } else {
      this.parts[part] = [...query];
    }
  });
}
