document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".tcds-section");

  if (sections) {
    sections.forEach((section) => {
      const images = section.querySelectorAll(":scope > :is(img, picture)");

      if (images.length === 0) return;

      const {interval} = section.dataset;

      let activeIndex = 0;

      images[activeIndex].dataset.active = true;

      setInterval(() => {
        images[activeIndex].dataset.active = false;
        activeIndex = (activeIndex + 1) % images.length;
        images[activeIndex].dataset.active = true;
      }, interval);
    });
  }
});
