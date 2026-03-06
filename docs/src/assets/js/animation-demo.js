document.addEventListener("DOMContentLoaded", () => {
  const figures = document.querySelectorAll(".animation-demo figure");

  figures.forEach(figure => {
    const block = figure.querySelector("tcds-icon");

    figure.addEventListener("mouseenter", () => {
      block.classList.remove("animate-out");
      void block.offsetWidth;
      block.classList.add("animate-in");
    });

    figure.addEventListener("mouseleave", () => {
      if (block.classList.contains("animate-in")) {
        block.classList.remove("animate-in");
        void block.offsetWidth;
        block.classList.add("animate-out");
      }
    });
  });
});
