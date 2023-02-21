/**
 * A library for comparing and reconciling the differences between some given
 * HTML and some existing piece of DOM.
 *
 * Borrowed from the DOM diffing technique by Chris Ferdinandi
 * https://gomakethings.com/dom-diffing-with-vanilla-js/
 */

const formFields = ["input", "option", "textarea"];
const formAttributes = ["value", "checked", "selected"];
const formAttributesNoValue = ["checked", "selected"];

function stringToHTML(string) {
  const parsedHTML = new DOMParser().parseFromString(string, "text/html");

  if(parsedHTML.head && parsedHTML.head.childNodes.length) {
    Array.from(parsedHTML.head.childNodes).reverse().forEach((node) => {
      parsedHTML.body.insertBefore(node, parsedHTML.body.firstChild);
    });
  }

  return parsedHTML.body || parsedHTML.createElement("body");
}

function isDifferentNode(node1, node2) {
  return (
    node1.nodeType !== node2.nodeType
    || node1.tagName !== node2.tagName
    || node1.id !== node2.id
    || node1.src !== node2.src
  );
}

function stringToBoolean(string) {
  return !["false", "null", "undefined", "0", "-0", "NaN", "0n", "-0n"].includes(string);
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

function skipAttribute(name, value) {
  const normalizedValue = value.replace(/\s+/g, "").toLowerCase();

  if(["src", "href", "xlink:href"].includes(name) && normalizedValue.includes("javascript:") || normalizedValue.includes("data:text/html")) {
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

  for(let {name,} of existingAttributes) {
    if(templateAttributes[name]) {
      continue;
    }

    if(formAttributes.includes(name) && formFields.includes(existing.tagName.toLowerCase())) {
      continue;
    }

    removeAttribute(existing, name);
  }

  if(Array.from(template.attributes).sort().join() !== Array.from(existing.attributes).sort().join()) {
    diffAttributes(template, existing);
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

export default function diff(template, existing) {
  if(template.nodeType !== 1) {
    template = stringToHTML(template);
  }

  const templateNodes = template.childNodes;
  const existingNodes = existing.childNodes;

  templateNodes.forEach((node, index) => {
    if(!existingNodes[index]) {
      existing.append(node.cloneNode(true));
      return;
    }

    if(isDifferentNode(node, existingNodes[index])) {
      const ahead = [...existingNodes].slice(index + 1).find(branch => !isDifferentNode(node, branch));

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
