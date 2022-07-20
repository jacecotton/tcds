const formFields = ["input", "option", "textarea"];
const formAttributes = ["value", "checked", "selected"];
const formAttributesNoValue = ["checked", "selected"];

function stringToHTML(string) {
  const fragment = new DOMParser().parseFromString(string, "text/html");

  if(fragment.head && fragment.head.childNodes.length) {
    Array.from(fragment.head.childNodes).reverse().forEach((node) => {
      fragment.body.insertBefore(node, fragment.body.firstChild);
    });
  }

  return fragment.body || document.createElement("body");
}

function isDifferentNode(comparator, comparer) {
  return (
    comparator.nodeType !== comparer.nodeType ||
    comparator.tagName !== comparer.tagName ||
    comparator.id !== comparer.id ||
    comparator.src !== comparer.src
  );
}

function stringToBoolean(string) {
  return !["false", "null", "undefined", "0", "-0", "NaN", "0n", "-0n"].includes(string);
}

function aheadInTree(node, existingNodes, index) {
  return Array.from(existingNodes).slice(index + 1).find((branch) => {
    return !isDifferentNode(node, branch);
  });
}

function addAttribute(element, attribute, value) {
  if(skipAttribute(attribute, value)) {
    return true;
  }

  if(formAttributes.includes(attribute)) {
    element[attribute] = attribute === "value" ? value : "";
  }

  element.setAttribute(attribute, value);
}

function removeAttribute(element, attribute) {
  if(formAttributes.includes(attribute)) {
    element[attribute] = "";
  }

  element.removeAttribute(attribute);
}

function skipAttribute(name, value, events) {
  const normalizedValue = value.replace(/\s+/g, "").toLowerCase();

  if(["src", "href", "xlink:href"].includes(name) && normalizedValue.includes("javascript:") || normalizedValue.includes("data:text/html")) {
    return true;
  }

  if(!events && name.startsWith("on")) {
    return true;
  }
}

function diffAttributes(template, existing) {
  if(template.nodeType !== 1) {
    return;
  }

  const templateAttributes = template.attributes;
  const existingAttributes = existing.attributes;

  for(let {name, value} of templateAttributes) {
    if(formAttributes.includes(name) && formFields.includes(template.tagName.toLowerCase())) {
      continue;
    }

    if(formAttributesNoValue.includes(name) && stringToBoolean(value) === false) {
      removeAttribute(existing, name);
      continue;
    }

    addAttribute(existing, name, value);
  }

  // eslint-disable-next-line no-unused-vars
  for(let {name, value} of existingAttributes) {
    if(templateAttributes[name]) {
      continue;
    }

    if(formAttributes.includes(name) && formFields.includes(existing.tagName.toLowerCase())) {
      continue;
    }

    removeAttribute(existing, name);
  }
}

function getNodeContent(node) {
  return node.childNodes && node.childNodes.length ? null : node.textContent;
}

function trimExtraNodes(existingNodes, templateNodes) {
  let extra = existingNodes.length - templateNodes.length;

  if(extra < 1) {
    return;
  }

  for(; extra > 0; extra--) {
    existingNodes[existingNodes.length - 1].remove();
  }
}

function diff(template, existing) {
  const templateNodes = template.childNodes;
  const existingNodes = existing.childNodes;

  templateNodes.forEach((node, index) => {
    if(!existingNodes[index]) {
      existing.append(node.cloneNode(true));
      return;
    }

    if(isDifferentNode(node, existingNodes[index])) {
      const ahead = aheadInTree(node, existingNodes, index);

      if(!ahead) {
        existingNodes[index].before(node.cloneNode(true));
        return;
      }

      existingNodes[index].before(ahead);
    }

    diffAttributes(node, existingNodes[index]);

    if(node.nodeName.includes("-")) {
      return;
    }

    const templateContent = getNodeContent(node);

    if(templateContent && templateContent !== getNodeContent(existingNodes[index])) {
      existingNodes[index].textContent = templateContent;
    }

    if(!node.childNodes.length && existingNodes[index].childNodes.length) {
      existingNodes[index].innerHTML = "";
      return;
    }

    if(!existingNodes[index].childNodes.length && node.childNodes.length) {
      const fragment = document.createDocumentFragment();
      diff(node, fragment);
      existingNodes[index].appendChild(fragment);
      return;
    }

    if(node.childNodes.length) {
      diff(node, existingNodes[index]);
    }
  });

  trimExtraNodes(existingNodes, templateNodes);
}

export {stringToHTML, diff};
