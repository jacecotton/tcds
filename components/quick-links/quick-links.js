window.addEventListener("DOMContentLoaded", function () {
  var quickLinks = document.querySelectorAll(".tcds-quick-links li");
  if (!quickLinks || !quickLinks.length) return;
  quickLinks.forEach(function (quickLink) {
    var textElement = quickLink.querySelector(":scope > a > span");
    if (!textElement) return;
    var textContent = textElement.textContent.trim();
    if (!textContent) return;
    var words = textContent.split(/\s+/);
    var lastWord = words.pop();
    textElement.innerHTML = words.length > 0 ? "".concat(words.join(" "), " <span class=\"nowrap\">").concat(lastWord, "</span>") : "<span class=\"white-space-nowrap\">".concat(lastWord, "</span>");
  });
});
