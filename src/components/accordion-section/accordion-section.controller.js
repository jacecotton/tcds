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

  /**
   * Runs after the host's update() cycle.
   */
  hostUpdated() {
    const isOpen = this.config.isOpen();
    const panel = this.config.getPanel();
    const content = this.config.getContent();

    if (!panel || !content) return;

    // Initial render. No animation, just set state.
    if (this.#previousOpen === undefined) {
      if (!isOpen) panel.hidden = "until-found";
      this.#previousOpen = isOpen;
      return;
    }

    // No state change, do nothing.
    if (isOpen === this.#previousOpen) return;

    // State changed, run animation.
    this.#animate(isOpen, panel, content);

    // Update state tracker.
    this.#previousOpen = isOpen;
  }

  #animate(isOpen, panel, content) {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reducedMotion ? 1 : MotionDurationProductive;
    const getScrollHeight = () => `${panel.scrollHeight}px`;

    if (isOpen) {
      panel.hidden = false;

      requestAnimationFrame(() => {
        panel.animate(
          {height: ["0", getScrollHeight()]},
          {duration, easing: MotionEasingTranslate},
        ).onfinish = () => panel.style.height = "auto";

        content.animate(
          {opacity: [0, 1], translate: ["0 -15%", "0 0"]},
          {duration, easing: MotionEasingEnter},
        );
      });
    } else {
      panel.animate(
        {height: [getScrollHeight(), "0"]},
        {duration, easing: MotionEasingTranslate},
      ).onfinish = () => panel.hidden = "until-found";

      content.animate(
        {opacity: [1, 0], translate: ["0 0", "0 -15%"]},
        {duration, easing: MotionEasingExit},
      );
    }
  }
}
