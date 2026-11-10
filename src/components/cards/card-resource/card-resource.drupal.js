import {initCardResource, destroyCardResource} from "./card-resource.js";

window.Drupal.behaviors.tcdsCardResource = {
  /** @param {ParentNode} context */
  attach(context) {
    initCardResource(context);
  },

  /**
   * @param {ParentNode} context
   * @param {object} settings
   * @param {string} trigger
   */
  detach(context, settings, trigger) {
    if (trigger === "unload") destroyCardResource(context);
  },
};
