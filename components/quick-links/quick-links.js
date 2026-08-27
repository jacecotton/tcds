window.addEventListener("DOMContentLoaded", function () {
  var quickLinks = document.querySelectorAll(".tcds-quick-links li");
  if (!quickLinks || !quickLinks.length) return;
  quickLinks.forEach(function (quickLink) {
    var textElement = quickLink.querySelector(":scope > a > span");
    if (!textElement) return;
    var childNodes = Array.from(textElement.childNodes);
    var lastTextNode = null;
    var lastTextNodeIndex = -1;
    for (var i = childNodes.length - 1; i >= 0; i--) {
      var node = childNodes[i];
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "") {
        lastTextNode = node;
        lastTextNodeIndex = i;
        break;
      }
    }
    if (!lastTextNode) return;
    var text = lastTextNode.textContent;
    var match = text.match(/(\S+)(\s*)$/);
    if (!match) return;
    var lastWordWithSpace = match[0];
    var remainingText = text.substring(0, text.length - lastWordWithSpace.length);
    lastTextNode.textContent = remainingText;
    var wrapper = document.createElement("span");
    wrapper.className = "white-space-nowrap";
    wrapper.textContent = lastWordWithSpace;
    var tailNodes = childNodes.slice(lastTextNodeIndex + 1);
    tailNodes.forEach(function (node) {
      return wrapper.appendChild(node);
    });
    textElement.insertBefore(wrapper, lastTextNode.nextSibling);
  });
});
