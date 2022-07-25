const formFields = ["input", "option", "textarea"];
const formAttributes = ["value", "checked", "selected"];
const formAttributesNoValue = ["checked", "selected"];

function stringToHTML(string) {
  const parser = new DOMParser();
  const document = parser.parseFromString(string, "text/html");

  if(document.head && document.head.childNodes.length) {
    Array.from(document.head.childNodes).reverse().forEach((node) => {
      document.body.insertBefore(node, document.body.firstChild);
    });
  }

  return document.body || document.createElement("body");
}

/**
 * Check if two nodes are different.
 *
 * @param {Node} node1 The node to compare against.
 * @param {Node} node2 The node to compare.
 *
 * @returns {Boolean} Whether they're different nodes.
 */
function isDifferentNode(node1, node2) {
  return (
    node1.nodeType !== node2.nodeType ||
    node1.tagName !== node2.tagName ||
    node1.id !== node2.id ||
    node1.src !== node2.src
  );
}

/**
 * Convert falsy string values to boolean values.
 *
 * @param {String} string The string to convert to a boolean.
 *
 * @returns {Boolean} The boolean.
 */
function stringToBoolean(string) {
  return !["false", "null", "undefined", "0", "-0", "NaN", "0n", "-0n"].includes(string);
}

/**
 * Check if the desired node is further ahead in the DOM `existingNodes`.
 *
 * @param {Node} node The node to look for.
 * @param {NodeList} existingNodes The DOM `existingNodes`.
 * @param {Integer} index The indexing index.
 *
 * @return {Integer} How many nodes ahead the target node is.
 */
function aheadInTree(node, existingNodes, index) {
  return Array.from(existingNodes).slice(index + 1).find((branch) => {
    return !isDifferentNode(node, branch);
  });
}

/**
 * Add an attribute to an element.
 *
 * @param {Node} element The element.
 * @param {String} attribute The attribute.
 * @param {String} val The value.
 */
function addAttribute(element, attribute, value) {
  if(skipAttribute(attribute, value)) {
    return true;
  }

  if(formAttributes.includes(attribute)) {
    element[attribute] = attribute === "value" ? value : "";
  }

  element.setAttribute(attribute, value);
}

/**
 * Remove an attribute from an element.
 *
 * @param {Node} element The element.
 * @param {String} attribute The attribute.
 */
function removeAttribute(element, attribute) {
  if(formAttributes.includes(attribute)) {
    element[attribute] = "";
  }

  element.removeAttribute(attribute);
}

/**
 * Check if attribute should be skipped (sanitize properties).
 *
 * @param {String} name The attribute name.
 * @param {String} value The attribute value.
 * @param {Boolean} events If true, inline events are allowed.
 *
 * @return {Boolean} If true, skip the attribute.
 */
function skipAttribute(name, value, events) {
  const normalizedValue = value.replace(/\s+/g, "").toLowerCase();

  if(["src", "href", "xlink:href"].includes(name) && normalizedValue.includes("javascript:") || normalizedValue.includes("data:text/html")) {
    return true;
  }

  if(!events && name.startsWith("on")) {
    return true;
  }
}

/**
 * Compare the existing node attributes to the template node attributes and make
 * updates.
 *
 * @param  {Node} template The new template.
 * @param  {Node} existing The existing DOM node.
 */
function diffAttributes(template, existing) {
  // Exit function if given template is not HTML.
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

/**
 * Get the content from a node.
 *
 * @param {Node} node The node.
 *
 * @return {String} The content.
 */
function getNodeContent(node) {
  return node.childNodes && node.childNodes.length ? null : node.textContent;
}

/**
 * If there are extra elements in DOM, remove them.
 *
 * @param {Array} existingNodes The existing DOM.
 * @param {Array} templateNodes The template.
 */
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

export default diff;
