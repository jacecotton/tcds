import { destroyCardResource, initCardResource } from './card-resource.js';

window.Drupal.behaviors.tcdsCardResource = {
  /** @param {ParentNode} context */attach: function attach(context) {
    initCardResource(context);
  },
  /**
   * @param {ParentNode} context
   * @param {object} settings
   * @param {string} trigger
   */
  detach: function detach(context, settings, trigger) {
    if (trigger === "unload") destroyCardResource(context);
  }
};
