import {
  MotionEasingEnter,
  MotionEasingExit,
  MotionDurationProductive,
  MotionDurationExpressive,
} from "@/components/_shared/_gen/tokens.js";

/**
 * @typedef {object} AccordionAnimationConfig
 * @property {() => boolean} isOpen
 * @property {() => HTMLElement|null} getPanel
 * @property {() => HTMLElement|null} getContent
 */

/**
 * Reactive controller that synchronizes a disclosure panel's hidden state and
 * animates transitions between its expanded and collapsed states.
 *
 * @implements {import("lit").ReactiveController}
 * @internal
 */
export class AccordionAnimationController {
  /** @type {AccordionAnimationConfig} */
  #config;
  /** @type {boolean|undefined} */
  #previousOpen = undefined;

  /**
   * Discards the remembered state, so the next `hostUpdated` re-runs the
   * initial-render branch and re-establishes `hidden` without animating. For
   * hosts that disable the controller (by returning a null panel) and later
   * re-enable it, during which time the DOM may have been changed underneath.
   */
  reset() {
    this.#previousOpen = undefined;
  }

  /**
   * @param {import("lit").ReactiveControllerHost} host
   * @param {AccordionAnimationConfig} config
   */
  constructor(host, config) {
    this.#config = config;
    host.addController(this);
  }

  hostUpdated() {
    const isOpen = this.#config.isOpen();
    const panel = this.#config.getPanel();
    const content = this.#config.getContent();

    if (!panel || !content) return;

    // Initial render - no animation, just set state.
    if (this.#previousOpen === undefined) {
      // `[hidden=until-found]` keeps the content discoverable by browser text
      // search (cmd/ctrl+F).
      if (!isOpen) panel.hidden = "until-found";
      this.#previousOpen = isOpen;
      return;
    }

    if (isOpen === this.#previousOpen) return;

    this.#animate(isOpen, panel, content);

    this.#previousOpen = isOpen;
  }

  /**
   * @param {boolean} isOpen
   * @param {HTMLElement} panel
   * @param {HTMLElement} content
   */
  #animate(isOpen, panel, content) {
    // If user has reduced-motion preference, disable animations by setting
    // duration to 1ms.
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reducedMotion ? 1 : MotionDurationProductive;
    const durationExpressive = reducedMotion ? 1 : MotionDurationExpressive;

    if (isOpen) {
      panel.hidden = false;
      content.style.opacity = 0;

      // After animation, we set panel height to auto so it can respond to new
      // elements that add/grow after opening (like nested accordions).
      panel.animate(
        {height: ["0", `${panel.scrollHeight}px`]},
        {duration, easing: MotionEasingEnter},
      ).onfinish = () => panel.style.height = "auto";

      // Small tertiary animation for the content to add smoothness.
      content.animate(
        {opacity: [0, 1]},
        {duration: durationExpressive, easing: MotionEasingEnter, delay: 50},
      ).onfinish = () => content.style.opacity = null;
    } else {
      // Reverse animation, reset DOM.
      panel.animate(
        {height: [`${panel.scrollHeight}px`, "0"]},
        {duration, easing: MotionEasingEnter},
      ).onfinish = () => {
        panel.hidden = "until-found";
        panel.style.height = null;
      };

      content.animate(
        {opacity: [1, 0]},
        {duration, easing: MotionEasingExit},
      );
    }
  }
}
