document.addEventListener("DOMContentLoaded", function () {
  var videos = document.querySelectorAll(".tcds-video");
  if (!videos) return;
  videos.forEach(function (video) {
    var summary = video.querySelector("summary");
    var embed = video.querySelector("iframe");
    if (!summary || !embed) return;
    summary.addEventListener("click", function () {
      embed.focus();
    });
  });
});
