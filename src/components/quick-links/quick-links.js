window.addEventListener("DOMContentLoaded", () => {
  const quickLinks = document.querySelectorAll(".tcds-quick-links li");
  if (!quickLinks || !quickLinks.length) return;

  quickLinks.forEach((quickLink) => {
    const textElement = quickLink.querySelector(":scope > a > span");
    if (!textElement) return;

    const childNodes = Array.from(textElement.childNodes);
    let lastTextNode = null;
    let lastTextNodeIndex = -1;

    for (let i = childNodes.length - 1; i >= 0; i--) {
      const node = childNodes[i];
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "") {
        lastTextNode = node;
        lastTextNodeIndex = i;
        break;
      }
    }

    if (!lastTextNode) return;

    const text = lastTextNode.textContent;

    const match = text.match(/(\S+)(\s*)$/);
    if (!match) return;

    const lastWordWithSpace = match[0];
    const remainingText = text.substring(0, text.length - lastWordWithSpace.length);

    lastTextNode.textContent = remainingText;

    const wrapper = document.createElement("span");
    wrapper.className = "white-space-nowrap";
    wrapper.textContent = lastWordWithSpace;

    const tailNodes = childNodes.slice(lastTextNodeIndex + 1);
    tailNodes.forEach((node) => wrapper.appendChild(node));

    textElement.insertBefore(wrapper, lastTextNode.nextSibling);
  });
});
