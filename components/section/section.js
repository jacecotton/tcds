document.addEventListener("DOMContentLoaded", function () {
  var sections = document.querySelectorAll(".tcds-section");
  if (!sections) return;
  sections.forEach(function (section) {
    var images = section.querySelectorAll(":scope > :is(img, picture)");
    if (images.length < 2) return;
    var timing = section.dataset.timing;
    var activeIndex = 0;
    images[activeIndex].dataset.active = true;
    setInterval(function () {
      delete images[activeIndex].dataset.active;
      activeIndex = (activeIndex + 1) % images.length;
      images[activeIndex].dataset.active = true;
    }, parseInt(timing) * 1000);
  });
});
