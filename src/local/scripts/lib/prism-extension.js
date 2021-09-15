window.setTimeout(function() {
  const prismBlocks = document.querySelectorAll("pre");
  
  prismBlocks.forEach((block) => {
    block.classList.forEach((className) => {
      if(className.indexOf("language-") > -1) {
        const language = className.substring(className.indexOf("language-") + "language-".length);
        block.dataset.language = language;

        if(language === "terminal") {
          const code = block.querySelector("code");
          const marker = `<span class="line-marker">$ </span>`;
          
          code.childNodes.forEach((child) => {
            if(child.nodeType === 3) {
              // Remove final newline.
              let trimmedChildText = child.textContent.replace(/\n+$/g, "");
              // Insert marker after all other newlines.
              trimmedChildText = trimmedChildText.replace(/\n/g, `\n${marker}`);
              // Add marker to first line.
              trimmedChildText = marker + trimmedChildText;

              // Create a node to place each line.
              const fragment = document.createElement("span");
              // Insert line into node.
              fragment.innerHTML = trimmedChildText;

              // Replace previous text with new line.
              code.replaceChild(fragment, child);
            }
          });
        }
      }
    });
  });
}, 100);