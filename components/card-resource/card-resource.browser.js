import { initCardResource } from './card-resource.js';

var initialize = function initialize() {
  return initCardResource(document);
};
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialize, {
    once: true
  });
} else {
  initialize();
}
