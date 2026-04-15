document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".tcds-section");

  if (sections) {
    sections.forEach((section) => {
      const images = section.querySelectorAll(":scope > :is(img, picture)");

      if (images.length < 2) return;

      const {interval} = section.dataset;

      let activeIndex = 0;

      images[activeIndex].dataset.active = true;

      setInterval(() => {
        delete images[activeIndex].dataset.active;
        activeIndex = (activeIndex + 1) % images.length;
        images[activeIndex].dataset.active = true;
      }, parseInt(interval) * 1000);
    });
  }
});
