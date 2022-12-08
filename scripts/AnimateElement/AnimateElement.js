export default function AnimateElement(element, animations, options = {}) {
  animations = [animations].flat();

  return new Promise((resolve) => {
    if(options.lazyload !== false) {
      const inView = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if(entry.isIntersecting) {
            triggerAnimation();

            if(options.runOnce !== false) {
              inView.unobserve(element);
            }
          }
        });
      }, options.lazyloadSettings || {});

      inView.observe(element);
    } else {
      triggerAnimation();
    }

    function triggerAnimation() {
      element.style.setProperty("--calculated-height", `${element.scrollHeight}px`);

      let animationValue = "";

      animations.forEach((animation, index) => {
        animationValue += `
          ${index > 0 ? "," : ""}
          ${animation}
          var(--tcds-animation-${animation}-duration, var(--tcds-animation-${options.timing || "productive"}-duration))
          var(--tcds-animation-${animation}-easing, var(--tcds-animation-${options.timing || "productive"}-easing))
          var(--tcds-animation-${animation}-fill-mode, forwards)
        `.trim();
      });

      element.style.animation = animationValue;

      element.onanimationend = (event) => {
        event.stopPropagation();

        if(options.removeOnFinish !== false) {
          element.style.animation = null;
          
          if(element.style === "") {
            element.style = null;
          }
        }

        element.onanimationend = null;

        resolve();
      };
    }
  });
}
