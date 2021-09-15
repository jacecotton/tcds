/**
 * Global nav functionality.
 *
 * First goal is to detect the last scroll position of the nav, store that as a
 * cookie, then when navigating to a new page, scroll to that position.
 *
 * Additionally, if the current page isn't within the global nav's scroll
 * window, smooth scroll to it.
 */
(function() {
  // Get global nav.
  const globalNav = document.querySelector(".global-nav");

  // When the user scrolls, store the position as a cookie.
  globalNav.addEventListener("scroll", () => {
    document.cookie = `navScroll=${globalNav.scrollTop}; path=/`;
  });
  
  // If the cookie exists on page load...
  if(document.cookie) {
    // Get the position.
    var navScrollPosition = document.cookie.split("; ").find((row) => row.startsWith("navScroll=")).split("=")[1];
  }

  // If we have a position, scroll to it.
  if(navScrollPosition) {
    globalNav.scrollTo(0, navScrollPosition);
  }

  // If the active link is not within the scroll viewport (above or below),
  // scroll to it regardless of the previously stored position.
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if(!entry.isIntersecting) {
        // Add a small delay to make the scrolling animation less jarring since
        // it happens on page load.
        const delay = 300;

        window.setTimeout(() => {
          // Use smooth scrolling to add context to the location of the link.
          entry.target.scrollIntoView({
            behavior: "smooth",
          });

          // Unobserve the link once it's been scrolled to so that it doesn't
          // scroll back to it after the user starts scrolling.
          observer.unobserve(entry.target);
        }, delay);
      } else {
        // Also unobserve the link if it was visible/intersecting to start with.
        observer.unobserve(entry.target);
      }
    });
  }, {
    // Observe relative to the global nav.
    root: globalNav,
    // Lower the threshold a bit because of the scroll gradient at the bottom
    // covering elements that would otherwise be visible at a 1.0 threshold.
    threshold: .8,
  });

  // Observe the active link only.
  observer.observe(document.querySelector(".global-nav [aria-current]"));
}());