import {initCardResource} from "./card-resource.js";

const initialize = () => initCardResource(document);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialize, {once: true});
} else {
  initialize();
}
