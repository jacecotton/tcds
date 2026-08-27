window.addEventListener("DOMContentLoaded", () => {
  const quickLinks = document.querySelectorAll(".tcds-quick-links li");
  if (!quickLinks || !quickLinks.length) return;

  quickLinks.forEach((quickLink) => {
    const textElement = quickLink.querySelector(":scope > a > span");
    if (!textElement) return;
    const textContent = textElement.textContent.trim();
    if (!textContent) return;

    const words = textContent.split(/\s+/);
    const lastWord = words.pop();

    textElement.innerHTML = words.length > 0
      ? `${words.join(" ")} <span class="nowrap">${lastWord}</span>`
      : `<span class="white-space-nowrap">${lastWord}</span>`;
  });
});
