import {
  MotionEasingTranslate,
  MotionEasingEnter,
  MotionEasingExit,
  MotionDurationProductive,
} from "@/js/_gen/tokens.js";

export class AccordionAnimationController {
  host;

  #previousOpen = undefined;

  /**
   * @param {ReactiveElement} host
   * @param {Object} config
   * @param {() => boolean} config.isOpen - Getter for current open state.
   * @param {() => HTMLElement} config.getPanel - Getter for panel element.
   * @param {() => HTMLElement} config.getContent - Getter for content element.
   */
  constructor(host, config) {
    this.host = host;
    this.config = config;
    host.addController(this);
  }

  hostUpdated() {
    const isOpen = this.config.isOpen();
    const panel = this.config.getPanel();
    const content = this.config.getContent();

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

  #animate(isOpen, panel, content) {
    // If user has reduced-motion preference, disable animations by setting
    // duration to 1ms.
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reducedMotion ? 1 : MotionDurationProductive;

    if (isOpen) {
      panel.hidden = false;

      // After animation, we set panel height to auto so it can respond to new
      // elements that add/grow after opening (like nested accordions).
      panel.animate(
        {height: ["0", `${panel.scrollHeight}px`]},
        {duration, easing: MotionEasingTranslate},
      ).onfinish = () => panel.style.height = "auto";

      // Small tertiary animation for the content to add smoothness.
      content.animate(
        {opacity: [0, 1], translate: ["0 -15%", "0 0"]},
        {duration, easing: MotionEasingEnter},
      );
    } else {
      // Reverse animation, reset DOM.
      panel.animate(
        {height: [`${panel.scrollHeight}px`, "0"]},
        {duration, easing: MotionEasingTranslate},
      ).onfinish = () => {
        panel.hidden = "until-found";
        panel.style.height = null;
      };

      content.animate(
        {opacity: [1, 0], translate: ["0 0", "0 -15%"]},
        {duration, easing: MotionEasingExit},
      );
    }
  }
}
