export default class Hero {
  constructor(element, props) {
    this.element = element;
    this.props = props;

    this.backgroundImages = this.element.getAttribute("data-background-images") && this.element.getAttribute("data-background-images").trim().split(" ");
    
    if(this.backgroundImages.length) {
      // Preload each image to avoid flashes of white when the background changes.
      this.backgroundImages.forEach((image) => {
        new Image().src = image;
      });
  
      requestAnimationFrame(() => {
        this.rotateBackgrounds();
      });
    }

    if(this.props.parallax && window.matchMedia("(prefers-reduced-motion: no-preference)").matches === true) {
      window.addEventListener("scroll", () => {
        this.parallax();
      });
    }
  }

  rotateBackgrounds() {
    clearTimeout(this.rotationSchedule);

    let cycle = 0;

    this.backgroundImages.forEach((image, index) => {
      this.rotationSchedule = setTimeout(() => {
        this.element.style.backgroundImage = `url(${this.backgroundImages[cycle]})`;

        if((cycle + 1) === this.backgroundImages.length) {
          this.rotationSchedule = setTimeout(() => {
            this.rotateBackgrounds();
          }, this.props.interval);
        } else {
          cycle++;
        }
      }, this.props.interval * index);
    });
  }

  parallax() {
    const scrolled = window.pageYOffset;
    const offset = 50 + scrolled * .1;

    this.element.style.backgroundPosition = `center ${offset}%`;
  }
}

document.querySelectorAll("[data-component=Hero]").forEach((instance) => {
  new Hero(instance, {
    interval: instance.getAttribute("data-interval") || 10000,
    parallax: instance.classList.contains("Hero--parallax"),
  });
});