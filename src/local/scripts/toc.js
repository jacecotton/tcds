/**
 * Generates a table of contents (TOC) from headings in a document.
 *
 * This script assumes two important things:
 * 1. The headings already have unique IDs.
 * 2. The headings follow a proper order, not skipping any heading levels.
 *
 * @param {object} options Configuration options for the TOC.
 * @param {number} [options.renderThreshold=4] The minimum amount of headings
 * there must be in the document for the TOC to render.
 * @param {number} [options.depthLimit=4] The maximum heading level to display
 * in the TOC.
 * 
 * @todo Make script more robust by accounting for skipped heading levels (log a
 * warning).
 * @todo Add option for including H1 in the heading tree.
 * @todo Add option for generating idents.
 */
const toc = (function(options) {
  // Destructure options for easier reference.
  const { renderThreshold, depthLimit } = options;

  // Get all headings (except for `h1`) in the document.
  const headings = Array.from(document.querySelectorAll("h2, h3, h4, h5, h6"));

  // Generate JSON-like tree from headings.
  const headingTree = generateTree(headings);

  // If the number of headings is greater than or equal to the set threshold,
  // and the heading tree was successfully populated...
  if(headings.length >= renderThreshold && headingTree.length > 0) {
    // ...render the table of contents from a generated tree of headings.
    renderToc(headingTree);
  }

  /**
   * Generates a data tree of heading metadata.
   *
   * @param {array} headings An array of heading nodes in the document to
   * construct the tree out of.
   * @returns {array} An JSON-like array of objects with heading data.
   */
  function generateTree(headings) {
    // Initialize tree to build upon.
    let headingTree = [];

    // Later, we'll create an object for each heading, containing information
    // about it (level, id, text, and children). This store will be used to keep
    // track of the latest heading object created for each level for later
    // reference.
    let lastHeadingOfLevel = {};

    headings.forEach((heading) => {
      // Get the level of the current heading as an integer.
      const level = parseInt(heading.tagName.substring(1));

      // Construct an object containing information about the current heading.
      // Will later append this to a parent object. This object contains a
      // `children` entry of its own, which itself can be appended to for levels
      // lower than itself.
      const headingInfo = {
        level: level,
        id: heading.id,
        text: heading.textContent,
        children: [],
      };

      // The parent object for the current heading will be the `children`
      // property of the last object one level higher than the current level (so
      // if the current level is 3, the parent will be the last object of level
      // 2's `children` array). If the current level is 2, there is no higher
      // level, so we'll make the parent the heading tree itself.
      const parent = (level > 2) ? lastHeadingOfLevel[level - 1].children : headingTree;

      // Store the current heading object as the running last heading object of
      // the current level.
      lastHeadingOfLevel[level] = headingInfo;

      // Push the heading object to the now-determined parent.
      parent.push(headingInfo);
    });

    // Return the tree.
    return headingTree;
  }

  function renderToc(headingTree) {
    const tocNav = document.querySelector("[data-toc]");
    const tocNavDisclosure = document.querySelector("[data-toc-disclosure]");
    tocNavDisclosure.hidden = false;

    addTocList(headingTree, tocNav);

    function addTocList(branch, parent) {
      const tocList = document.createElement("ol");
      tocList.classList.add("toc__list");

      branch.forEach((heading) => {
        const tocItem = document.createElement("li");
        tocItem.classList.add("toc__item");

        const tocItemLink = document.createElement("a");
        tocItemLink.href = `#${heading.id}`;
        tocItemLink.textContent = heading.text;
        tocItemLink.classList.add("toc__link");

        tocItem.appendChild(tocItemLink);
        tocList.appendChild(tocItem);

        // If the current heading has children and is under the set depth
        // limit...
        if(heading.children.length > 0 && heading.level < depthLimit) {
          // ...recursively add a sublist of children with the current item as
          // the parent.
          addTocList(heading.children, tocItem);
        }
      });

      parent.appendChild(tocList);
    }
  }

  (function trackProgress() {
    function matchLinkToHash() {
      const prevCurrentLink = document.querySelector("[data-toc] a[aria-current]");
      const currentLink = document.querySelector(`[data-toc] a[href="${window.location.hash}"]`);

      if(prevCurrentLink) {
        prevCurrentLink.removeAttribute("aria-current");
      }

      if(currentLink) {
        currentLink.setAttribute("aria-current", "true");
      }
    }

    matchLinkToHash();

    window.addEventListener("hashchange", matchLinkToHash);
  }());

  // Publicly expose a method to generate a tree of headings, as the data may be
  // useful as a general API for other contexts.
  return {
    generateTree: generateTree,
  };
}({
  renderThreshold: 4,
  depthLimit: 4,
}));