/**
 * A utility function for adding an animation to an element. By default, runs
 * only once and only when the element is visible, and all DOM mutations are
 * undone when the animation is complete.
 *
 * Animation tokens are provided by the keyframe library in
 * @tcds/animation/library.scss.
 *
 * Example usage:
 * ```
 * AnimateElement(document.querySelector("#animate-me"), "fade-in").then(() => {
 *   // Animation has completed.
 * })
 * ```
 *
 * @param {HTMLElement} element The HTML element to which the animation applies.
 * @param {string} animation The animation token to apply to the element (e.g.
 * "slide-up", "fade-in", etc.)
 * @param {object} options Configuration options.
 * @param {boolean} [options.lazyload=true] Only trigger the animation when the
 * element has scrolled into view. If `false`, the animation will trigger
 * immediately.
 * @param {object} [options.lazyloadSettings] Settings for the
 * IntersectionObserver for lazyloading (see IntersectionObserver API for
 * details).
 * @param {boolean} [options.runOnce=true] Whether to run the animation only
 * once (unobserves element intersection, only applies when lazyload is true).
 * @param {boolean} [options.removeOnFinish=true] Whether to remove the
 * animation class after the animation has completed.
 *
 * @returns {Promise} Promise object represents the completion of the animation.
 */
export default function AnimateElement(element, animation, options = {}) {
  return new Promise((resolve) => {
    // If lazyload is enabled (default), trigger the animation when the element
    // is intersecting the viewport via an IntersectionObserver.
    if(options.lazyload !== false) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if(entry.isIntersecting) {
            triggerAnimation();
            // To run only once, remove IntersectionObserver.
            options.runOnce !== false && observer.unobserve(element);
          }
        });
      }, options.lazyloadSettings || {});

      observer.observe(element);
    } else {
      // Lazyload is disabled, so trigger the animation immediately (onload).
      triggerAnimation();
    }

    function triggerAnimation() {
      // Add the utility class that triggers the animation (must be a valid
      // animation token).
      if(typeof animation === "string") {
        element.style.animation = `${animation} `
          + `var(--animation-${animation}-duration, var(--animation-duration)) `
          + `var(--animation-${animation}-easing, var(--animation-easing)) `
          + `var(--animation-${animation}-fill-mode, var(--animation-fill-mode))`;
      } else if(typeof animation === "object") {
        element.style.animation = "";
        animation.forEach((keyframeset, index) => {
          element.style.animation +=
            (index > 0 ? ", " : "")
            + `${keyframeset} `
            + `var(--animation-${keyframeset}-duration, var(--animation-duration)) `
            + `var(--animation-${keyframeset}-easing, var(--animation-easing)) `
            + `var(--animation-${keyframeset}-fill-mode, var(--animation-fill-mode))`;
        });
      }

      // When the animation has finished...
      element.addEventListener("animationend", (event) => {
        event.stopPropagation();
        // Remove the animation style (unless `removeOnFinish` is disabled).
        if(options.removeOnFinish !== false) {
          element.style.animation = null;
        }
        // Resolve promise.
        resolve("Animation complete");
      }, { once: true });
    }
  });
}
