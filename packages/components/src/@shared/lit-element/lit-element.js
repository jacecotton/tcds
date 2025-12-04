import {LitElement as _LitElement} from "lit";
import {runEffects} from "./decorators.js";

/**
 * Enhanced LitElement with support for lifecycle effect decorators.
 *
 * Extends Lit's LitElement to support @updated and @willUpdate decorators for
 * granular, declarative lifecycle effects. Idea for upstreaming this was
 * submitted here https://github.com/lit/lit/discussions/5117
 */
export class LitElement extends _LitElement {
  willUpdate(changedProperties) {
    super.willUpdate(changedProperties);
    runEffects(this, "willUpdate", changedProperties);
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    runEffects(this, "updated", changedProperties);
  }
}
