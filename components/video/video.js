document.addEventListener("DOMContentLoaded", function () {
  var videos = document.querySelectorAll(".tcds-video");
  if (videos.length === 0) return;
  videos.forEach(function (video) {
    var summary = video.querySelector("summary");
    var embed = video.querySelector("iframe");
    if (!summary || !embed) return;
    summary.addEventListener("click", function () {
      var src = embed.dataset.src;
      if (!src) return;
      embed.setAttribute("src", src);
      embed.removeAttribute("data-src");
      embed.focus();
    }, {
      once: true
    });
  });
});
