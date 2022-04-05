export default class Hero {
  constructor(element, props) {
    this.element = element;
    this.props = props;

    // If `[data-background-images]` attribute exists, create an array from the
    // provided image URLs.
    this.backgroundImages = this.element.getAttribute("data-background-images") && this.element.getAttribute("data-background-images").trim().split(" ");

    // If there is more than one background image...
    if(this.backgroundImages.length > 1) {
      // Preload each image to avoid flashes of white when the background
      // changes.
      this.backgroundImages.forEach((image) => {
        new Image().src = image;
      });

      // Once the next animation frame is available, begin rotating backgrounds.
      requestAnimationFrame(() => {
        this.rotateBackgrounds();
      });
    }

    // If enabled and reduced motion preference is not set, add parallax effect
    // on-scroll.
    if(this.props.parallax && window.matchMedia("(prefers-reduced-motion: no-preference)").matches === true) {
      window.addEventListener("scroll", () => {
        this.parallax();
      });
    }
  }

  rotateBackgrounds() {
    // This function recursively adds a timeout, so cancel the previous one each
    // time this function runs.
    clearTimeout(this.rotationSchedule);

    // Keep track of the cycle.
    let cycle = 0;

    // Loop through the background images...
    this.backgroundImages.forEach((image, index) => {
      this.rotationSchedule = setTimeout(() => {
        // Change the background image according to the current cycle.
        this.element.style.backgroundImage = `url(${this.backgroundImages[cycle]})`;

        // If we've reached the end of the background images array...
        if((cycle + 1) === this.backgroundImages.length) {
          // Start over.
          this.rotationSchedule = setTimeout(() => {
            this.rotateBackgrounds();
          }, this.props.interval);
        } else {
          // Otherwise, increment the cycle.
          cycle++;
        }
      }, this.props.interval * index);
    });
  }

  // Simple parallax effect. Change the background position as a percentage of
  // the current scroll offset.
  parallax() {
    const scrolled = window.pageYOffset;
    const offset = 50 + scrolled * .1;

    this.element.style.backgroundPosition = `center ${offset}%`;
  }
}

document.querySelectorAll("[data-component=Hero]").forEach((instance) => {
  instance && Hero(instance, {
    interval: instance.getAttribute("data-interval") || 10000,
    parallax: instance.classList.contains("Hero--parallax"),
  });
});
