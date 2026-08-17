document.addEventListener("DOMContentLoaded", () => {
  const videos = document.querySelectorAll(".tcds-video");

  if (!videos) return;

  videos.forEach((video) => {
    const summary = video.querySelector("summary");
    const embed = video.querySelector("iframe");

    if (!summary || !embed) return;

    summary.addEventListener("click", () => {
      embed.focus();
    });
  });
});
