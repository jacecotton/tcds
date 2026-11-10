document.addEventListener("DOMContentLoaded", () => {
  const videos = document.querySelectorAll(".tcds-video");

  if (videos.length === 0) return;

  videos.forEach((video) => {
    const summary = video.querySelector("summary");
    const embed = video.querySelector("iframe");

    if (!summary || !embed) return;

    summary.addEventListener("click", () => {
      const src = embed.dataset.src;
      if (!src) return;

      embed.setAttribute("src", src);
      embed.removeAttribute("data-src");
      embed.focus();
    }, {once: true});
  });
});
