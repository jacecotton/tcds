const selector = "details.tcds-pullout-menu:not([data-tcds-pullout-menu-measuring])";
/** @type {WeakMap<HTMLDetailsElement, () => void>} */
const instances = new WeakMap();

/**
 * @param {Document|DocumentFragment|Element} [context=document]
 * @returns {() => void} Disconnect the initialized menus, e.g. on detach().
 */
export function initPulloutMenus(context = document) {
  const menus = [.../** @type {NodeListOf<HTMLDetailsElement>} */ (context.querySelectorAll(selector))];

  if ("matches" in context && context.matches(selector)) {
    menus.unshift(/** @type {HTMLDetailsElement} */ (context));
  }

  const cleanups = menus.map(initPulloutMenu);
  return () => cleanups.forEach((cleanup) => cleanup());
}

/**
 * @param {HTMLDetailsElement} pulloutMenu
 * @returns {() => void}
 */
export function initPulloutMenu(pulloutMenu) {
  if (instances.has(pulloutMenu)) return instances.get(pulloutMenu);

  const summary = pulloutMenu.querySelector(":scope > summary");
  const list = pulloutMenu.querySelector(":scope > .tcds-pullout-menu__list");
  if (!summary || !list) return () => {};

  let frame = 0;
  let disposed = false;

  function setSize(property, size) {
    const value = `${size}px`;
    if (pulloutMenu.style.getPropertyValue(property) !== value) {
      pulloutMenu.style.setProperty(property, value);
    }
  }

  function measure() {
    if (disposed || !pulloutMenu.isConnected) return;

    // Closed <details> hides its content. Measure an open, invisible copy
    // instead of opening the real menu or reading its animated dimensions.
    const measurement = /** @type {HTMLDetailsElement} */ (pulloutMenu.cloneNode(true));
    measurement.removeAttribute("id");
    measurement.removeAttribute("name");
    measurement.removeAttribute("data-tcds-pullout-menu");
    measurement.setAttribute("data-tcds-pullout-menu-measuring", "");
    measurement.setAttribute("aria-hidden", "true");
    measurement.inert = true;
    measurement.open = true;

    // Avoid duplicate IDs and accidental details-group interactions.
    measurement.querySelectorAll("[id], details[name]").forEach((element) => {
      element.removeAttribute("id");
      if (element.localName === "details") element.removeAttribute("name");
    });

    Object.assign(measurement.style, {
      position: "absolute",
      inset: "0 auto auto 0",
      translate: "none",
      width: "var(--tcds-pullout-menu-full-width)",
      height: "auto",
      visibility: "hidden",
      pointerEvents: "none",
      transition: "none",
    });

    const measurementSummary = /** @type {HTMLElement} */ (measurement.querySelector(":scope > summary"));
    const measurementList = /** @type {HTMLUListElement} */ (measurement.querySelector(":scope > .tcds-pullout-menu__list"));
    measurementSummary.style.width = "max-content";

    let toggleWidth;
    let totalHeight;

    pulloutMenu.after(measurement);

    try {
      // offsetWidth/Height ignore the summary's rotation and ancestor scaling.
      toggleWidth = measurementSummary.offsetWidth;
      totalHeight = Math.max(toggleWidth, measurementList.offsetHeight);
    } finally {
      measurement.remove();
    }

    if (!toggleWidth || !totalHeight) return;

    setSize("--tcds-pullout-menu-toggle-width", toggleWidth);
    setSize("--tcds-pullout-menu-total-height", totalHeight);

    if (!pulloutMenu.hasAttribute("data-tcds-pullout-menu")) {
      // Commit the initial size before enabling transitions. No timed delay or
      // first-toggle measurement is needed, regardless of the open state.
      void pulloutMenu.offsetHeight;
      pulloutMenu.setAttribute("data-tcds-pullout-menu", "");
    }
  }

  function scheduleMeasure() {
    if (disposed || frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      measure();
    });
  }

  measure();

  // Observe the content, not the drawer's animated width/height. Its list
  // stays at the final width, so animation frames do not trigger remeasurement.
  const resizeObserver = new ResizeObserver(scheduleMeasure);
  resizeObserver.observe(summary, {box: "border-box"});
  resizeObserver.observe(list, {box: "border-box"});

  const mutationObserver = new MutationObserver(scheduleMeasure);
  const contentOptions = {
    childList: true,
    characterData: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class", "style", "hidden"],
  };
  mutationObserver.observe(summary, contentOptions);
  mutationObserver.observe(list, contentOptions);
  mutationObserver.observe(pulloutMenu, {
    attributes: true,
    attributeFilter: ["class", "style"],
  });

  function onToggle() {
    if (pulloutMenu.open) {
      list.style.animation = "none";
      void list.offsetHeight;
      list.style.removeProperty("animation");
    }

    scheduleMeasure();
  }

  pulloutMenu.addEventListener("toggle", onToggle);
  window.addEventListener("resize", scheduleMeasure, {passive: true});
  const fonts = pulloutMenu.ownerDocument.fonts;
  fonts?.ready.then(scheduleMeasure);
  fonts?.addEventListener("loadingdone", onToggle);

  function cleanup() {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    mutationObserver.disconnect();
    pulloutMenu.removeEventListener("toggle", scheduleMeasure);
    window.removeEventListener("resize", scheduleMeasure);
    fonts?.removeEventListener("loadingdone", scheduleMeasure);
    pulloutMenu.removeAttribute("data-tcds-pullout-menu");
    instances.delete(pulloutMenu);
  }

  instances.set(pulloutMenu, cleanup);
  return cleanup;
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => initPulloutMenus(), {once: true});
} else {
  initPulloutMenus();
}
