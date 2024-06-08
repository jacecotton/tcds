import layout from "../../01-layout/layout.json";

/**
 * JavaScript enhancements for the site header.
 *
 * Most functionality for the site header is accomplished with `details` (mega
 * menus, mobile toggles, etc.), but this script is needed for some things:
 * - On small screens, move both nav elements to a container, behind a hamburger
 *   toggle.
 * - On small screens, move the search toggle from the primary nav to a direct
 *   child of the header (so it's not hidden behind the hamburger).
 * - Add close buttons to search and main nav containers.
 * - Add a modifier class to the root header element when any `details` children
 *   are opened.
 * - Allow `details` elements to be closed by clicking on the outer body area.
 * - Polyfill `details[name]` for browsers that haven't implemented it yet.
 * - Add a class to the header when scroll threshold is over height of header
 *   (CSS will make it sticky and in a "condensed" state).
 */

(function() {
  // Get elements
  const header = document.querySelector(".site-header");
  const navs = header.querySelectorAll(".site-header__nav");
  const navPrimary = header.querySelector(".site-header__nav--primary");
  const navUtility = header.querySelector(".site-header__nav--utility");
  // Identify search toggle by word "Search" appearing in `summary`.
  const searchToggle = [...navPrimary.querySelectorAll(".site-header__mega-toggle")]
    .find(toggle => toggle.querySelector("summary").textContent.includes("Search"));
  const searchToggleParent = searchToggle.parentElement;
  const searchContainer = searchToggle.querySelector(".site-header__mega-content");

  // Create a new `details` element for mobile hamburger toggle.
  const mobileToggle = document.createElement("details");
  mobileToggle.classList.add("site-header__mobile-toggle");

  const mobileToggleButton = document.createElement("summary");
  mobileToggleButton.classList.add("site-header__link");
  mobileToggleButton.innerHTML = `<span class="visually-hidden">Open main site menu</span>`;
  
  const mobileToggleIcon = document.createElement("tcds-icon");
  mobileToggleIcon.icon = "hamburger";

  mobileToggleButton.appendChild(mobileToggleIcon);
  mobileToggle.appendChild(mobileToggleButton);

  // Add a container for both nav elements inside the new mobile toggle.
  const mobileNavContainer = document.createElement("div");
  mobileNavContainer.classList.add("site-header__mega-content");
  mobileToggle.appendChild(mobileNavContainer);

  // Create a close button for mobile container.
  const mobileClose = createCloseButtonFor(mobileToggle);
  mobileNavContainer.prepend(mobileClose);

  header.appendChild(mobileToggle);

  // Create a close button for the search mega menu.
  const searchClose = createCloseButtonFor(searchToggle);
  searchContainer.prepend(searchClose);

  function createCloseButtonFor(parentDetails) {
    const mobileClose = document.createElement("button");
    mobileClose.classList.add("site-header__mobile-close");
    mobileClose.innerHTML = `<span class="visually-hidden">Close menu</span>`;
    mobileClose.addEventListener("click", () => headerOpenToggle(parentDetails, false));

    const mobileCloseIcon = document.createElement("tcds-icon");
    mobileCloseIcon.icon = "x";
    mobileClose.appendChild(mobileCloseIcon);

    return mobileClose;
  }

  // For small screens, move navs to hamburger toggle and move search mega menu
  // out as a direct child of the header. For larger screens, put it all back.
  function syncDOM(isMobile) {
    if(isMobile.matches) {
      mobileNavContainer.appendChild(navPrimary);
      mobileNavContainer.appendChild(navUtility);
      header.appendChild(searchToggle);
      searchToggle.after(mobileToggle);
      searchToggleParent.hidden = true;
    } else {
      header.appendChild(navPrimary);
      header.appendChild(navUtility);
      searchToggleParent.appendChild(searchToggle);
      searchToggleParent.hidden = false;

      if(mobileToggle) {
        headerOpenToggle(mobileToggle, false);
      }
    }
  }

  const isMobile = matchMedia(`(max-width: ${layout.breakpoints.m}px)`);
  syncDOM(isMobile);
  isMobile.addEventListener("change", () => syncDOM(isMobile));

  /**
   * Toggle a class on the header whenever any mega menu (`details` element) is
   * toggled. Note that this requires removing the class only if there are *no*
   * open `details`, not if simply the `details` clicked is no longer open.
   *
   * This somewhat complicates the below script, because `details` elements open
   * and close visibly faster than the performance of querying the DOM to figure
   * that out. As a result, the time between when a `details` element toggles
   * and the class is finally toggled from the header creates a brief flash or
   * flicker with the darkening overlay added in CSS. To address that, we're
   * intentionally creating a bit of delay by explicitly setting the order
   * between when the class is toggled and when the `details` element is
   * toggled.
   */
  function headerOpenToggle(toggle, add) {
    if(toggle.open || add === false) {
      header.classList.remove("site-header--open");
      toggle.open = false;
      document.body.style.overflow = null;
    } else {
      toggle.open = true;
      header.classList.add("site-header--open");

      if(window.innerWidth < layout.breakpoints.m) {
        document.body.style.overflow = "hidden";
      }
    }
  }

  // Wrapping this in an animation frame request to make sure that the above
  // JavaScript-generated toggles are also queried.
  requestAnimationFrame(() => {
    const allToggles = [...header.querySelectorAll("details")];

    allToggles.forEach((toggle) => {
      toggle.addEventListener("click", event => event.stopPropagation());

      toggle.querySelector("summary").addEventListener("click", (event) => {
        event.preventDefault();
        headerOpenToggle(toggle);
      });
    });

    // Toggle mega menus on outer body click.
    document.body.addEventListener("click", () => {
      allToggles.forEach(toggle => headerOpenToggle(toggle, false));
    });

    navs.forEach((nav) => {
      nav.addEventListener("click", event => event.stopPropagation());
    });
  });

  // Toggle class for sticky scroll.
  const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--tcds-site-header-height"));
  const headerStickyClass = "site-header--scrolled";

  window.addEventListener("scroll", () => {
    const headerIsSticky = header.classList.contains(headerStickyClass);

    if(window.scrollY > headerHeight && !headerIsSticky) {
      header.classList.add(headerStickyClass);
    } else if(window.scrollY < headerHeight / 1.5 && headerIsSticky) {
      header.classList.remove(headerStickyClass);
    }
  });

  // Polyfill `details[name]` for Firefox and Safari.
  if(!("name" in document.createElement("details"))) {
    const details = [...document.querySelectorAll("details")];

    details.forEach((detail) => {
      detail.addEventListener("toggle", () => {
        detail.open && details
          .filter(_detail => _detail.getAttribute("name") === detail.getAttribute("name"))
          .filter(_detail => _detail !== detail)
          .forEach(_detail => _detail.open = false);
      });
    });
  }
}());