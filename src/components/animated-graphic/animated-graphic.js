document.addEventListener("DOMContentLoaded", () => {
  const animatedGraphics = document.querySelectorAll(".tcds-animated-graphic");
  if (!animatedGraphics) return;

  animatedGraphics.forEach((graphic) => {
    const video = graphic.querySelector("video");
    if (!video) return;
    const toggleButton = graphic.querySelector("button");
    if (!toggleButton) return;
    const icon = toggleButton.querySelector("tcds-icon");

    toggleButton.addEventListener("click", () => {
      if (video.paused) {
        video.play();
        icon.setAttribute("icon", "pause");
      } else {
        video.pause();
        icon.setAttribute("icon", "play");
      }
    });
  });
});
