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

/**
 * Convert a given string of HTML to a parsed DOM.
 *
 * @param {string} string The string to parse as HTML.
 * @returns {HTMLElement} The parsed HTML.
 */
function stringToHTML(string) {
  // Parse string as HTML.
  const parsedHTML = new DOMParser().parseFromString(string, "text/html");

  // If a head exists in the given HTML.
  if(parsedHTML.head && parsedHTML.head.childNodes.length) {
    // Insert contents into body.
    Array.from(parsedHTML.head.childNodes).reverse().forEach((node) => {
      parsedHTML.body.insertBefore(node, parsedHTML.body.firstChild);
    });
  }

  // Return the body of the created DOM, or if the string is empty, return an
  // empty new body.
  return parsedHTML.body || parsedHTML.createElement("body");
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
 * Return false from falsy string values, true for everything else.
 *
 * @param {String} string The string to convert to a boolean.
 *
 * @returns {Boolean} The boolean.
 */
function stringToBoolean(string) {
  return !["false", "null", "undefined", "0", "-0", "NaN", "0n", "-0n"].includes(string);
}

/**
 * Check if the desired node is further ahead in the existing DOM, and if so,
 * what the index position is.
 *
 * @param {Node} node The node to look for.
 * @param {NodeList} existingNodes The existing DOM.
 * @param {Number} index The indexing index.
 *
 * @return {Number} How many nodes ahead the target node is.
 */
function aheadInTree(node, existingNodes, index) {
  return Array.from(existingNodes).slice(index + 1).find(branch => !isDifferentNode(node, branch));
}

/**
 * Add an attribute to an element.
 *
 * @param {Node} element The element.
 * @param {String} attribute The attribute.
 * @param {String} value The value.
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
 *
 * @return {Boolean} If true, skip the attribute.
 */
function skipAttribute(name, value) {
  const normalizedValue = value.replace(/\s+/g, "").toLowerCase();

  if(["src", "href", "xlink:href"].includes(name) && normalizedValue.includes("javascript:") || normalizedValue.includes("data:text/html")) {
    return true;
  }
}

/**
 * Compare and reconcile the differences between the given node attributes and
 * existing node attributes.
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

/**
 * Compare and reconcile the differences between a given `template` and the
 * `existing` DOM.
 */
export default function diff(template, existing) {
  // If the given `template` is not already HTML, convert it.
  if(template.nodeType !== 1) {
    template = stringToHTML(template);
  }

  const templateNodes = template.childNodes;
  const existingNodes = existing.childNodes;

  templateNodes.forEach((node, index) => {
    // If the given `template` node does not exist in the `existing` DOM...
    if(!existingNodes[index]) {
      // Append it.
      existing.append(node.cloneNode(true));
      return;
    }

    // If the node in the `existing` DOM in the same position of the given
    // `node` is a different node...
    if(isDifferentNode(node, existingNodes[index])) {
      // Get how far ahead the same node is in the tree...
      const ahead = aheadInTree(node, existingNodes, index);

      // If it doesn't exist...
      if(!ahead) {
        // Insert the given `node` prior to the existing node in the same
        // position.
        existingNodes[index].before(node.cloneNode(true));
        return;
      }

      existingNodes[index].before(ahead);
    }

    // Diff the given attributes against the existing attributes.
    diffAttributes(node, existingNodes[index]);

    // Do not diff custom elements. Rendering is handled internally.
    if(node.nodeName.includes("-")) {
      return;
    }

    // Diff text content.
    const templateContent = getNodeContent(node);

    if(templateContent && templateContent !== getNodeContent(existingNodes[index])) {
      existingNodes[index].textContent = templateContent;
    }

    // If given node is empty, empty existing node.
    if(!node.childNodes.length && existingNodes[index].childNodes.length) {
      existingNodes[index].innerHTML = "";
      return;
    }

    // If a node in the position of the given node does not exist...
    if(!existingNodes[index].childNodes.length && node.childNodes.length) {
      // Create it.
      const fragment = document.createDocumentFragment();
      diff(node, fragment);
      // Add it.
      existingNodes[index].appendChild(fragment);
      return;
    }

    // Repeat the process recursively down the node branch.
    if(node.childNodes.length) {
      diff(node, existingNodes[index]);
    }
  });

  trimExtraNodes(existingNodes, templateNodes);
}
