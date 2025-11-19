export {slugify} from "./utilities/slugify.js";

export {LitElement} from "./lit-element/lit-element.js";

export {html, css, svg, nothing, noChange} from "lit";

export {
  customElement,
  property,
  state,
  query,
  queryAll,
  queryAsync,
  queryAssignedElements,
  queryAssignedNodes,
  eventOptions,
} from "lit/decorators.js";

export {updated, willUpdate} from "./lit-element/decorators.js";

import sharedStyles from "../../../tcds-foundation/dist/shared.css";
export const sharedCSS = sharedStyles;
