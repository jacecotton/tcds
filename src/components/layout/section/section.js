document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".tcds-section");
  if (!sections) return;

  sections.forEach((section) => {
    const images = section.querySelectorAll(":scope > :is(img, picture)");

    if (images.length < 2) return;

    const timing = Number.parseFloat(section.dataset.timing);
    if (!Number.isFinite(timing) || timing <= 0) return;

    let activeIndex = 0;
    images[activeIndex].dataset.active = true;

    setInterval(() => {
      delete images[activeIndex].dataset.active;
      activeIndex = (activeIndex + 1) % images.length;
      images[activeIndex].dataset.active = true;
    }, parseInt(timing) * 1000);
  });
});
