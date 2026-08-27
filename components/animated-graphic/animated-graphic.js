document.addEventListener("DOMContentLoaded", function () {
  var animatedGraphics = document.querySelectorAll(".tcds-animated-graphic");
  if (!animatedGraphics) return;
  animatedGraphics.forEach(function (graphic) {
    var video = graphic.querySelector("video");
    if (!video) return;
    var toggleButton = graphic.querySelector("button");
    if (!toggleButton) return;
    var icon = toggleButton.querySelector("tcds-icon");
    toggleButton.addEventListener("click", function () {
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
