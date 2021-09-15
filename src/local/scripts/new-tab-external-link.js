/**
 * Open external links in new tabs.
 */
(function() {
  // Create a test for what counts as "internal".
  const internal = new RegExp(location.host.replace("www.", ""), "i");

  // Get all links.
  const links = document.querySelectorAll("a");

  links.forEach((link) => {
    // Determine the host of the link.
    const destination = link.host;

    // Determine whether it matches our "internal" test.
    if(!internal.test(destination)) {
      // If not, open in new tab.
      link.setAttribute("target", "_blank");
      // Other attributes for cross-site security.
      link.setAttribute("rel", "noopener noreferrer");
    }
  });
}());