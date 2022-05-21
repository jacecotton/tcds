import AnimateElement from "./AnimateElement.js";

/**
 * Animates elements according to their `on-enter` or `on-every-enter` class
 * hooks.
 *
 * Example usage:
 * ```
 * <div class="on-enter:fade-in">
 *   Fades in when scrolled into view the first time.
 * </div>
 * <div class="on-every-enter:fade-in">
 *   Fades in every time scrolled (back) into view.
 * </div>
 * ```
 */
(function() {
  document.querySelectorAll("[class*=on-enter], [class*=on-every-enter]").forEach((element) => {
    // Get all the classes of the selected elements.
    Array.from(element.classList)
      // Only take the ones with the desired prefixes.
      .filter((className) => className.startsWith("on-enter:") || className.startsWith("on-every-enter:"))
      // Loop through each of those.
      .forEach((className) => {
        // Determine the class prefix based on what the class name starts with.
        const prefix = className.startsWith("on-enter:") ? "on-enter:" : "on-every-enter:";
        // Animate the element.
        AnimateElement(element, className.substring(className.indexOf(prefix) + prefix.length), {
          // We only want to run the animation repeatedly if the prefix is
          // `on-every-enter`. By default, `on-enter` will cause the animation
          // to run only once.
          runOnce: prefix === "on-enter:",
        });
        // Remove the original hook, it doesn't do anything.
        element.classList.remove(className);
      });
  });
}());
