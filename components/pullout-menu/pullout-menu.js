function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var selector = "details.tcds-pullout-menu:not([data-tcds-pullout-menu-measuring])";
/** @type {WeakMap<HTMLDetailsElement, () => void>} */
var instances = new WeakMap();

/**
 * @param {Document|DocumentFragment|Element} [context=document]
 * @returns {() => void} Disconnect the initialized menus, e.g. on detach().
 */
function initPulloutMenus() {
  var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  var menus = _toConsumableArray(/** @type {NodeListOf<HTMLDetailsElement>} */context.querySelectorAll(selector));
  if ("matches" in context && context.matches(selector)) {
    menus.unshift(/** @type {HTMLDetailsElement} */context);
  }
  var cleanups = menus.map(initPulloutMenu);
  return function () {
    return cleanups.forEach(function (cleanup) {
      return cleanup();
    });
  };
}

/**
 * @param {HTMLDetailsElement} pulloutMenu
 * @returns {() => void}
 */
function initPulloutMenu(pulloutMenu) {
  if (instances.has(pulloutMenu)) return instances.get(pulloutMenu);
  var summary = pulloutMenu.querySelector(":scope > summary");
  var list = pulloutMenu.querySelector(":scope > .tcds-pullout-menu__list");
  if (!summary || !list) return function () {};
  var frame = 0;
  var disposed = false;
  function setSize(property, size) {
    var value = "".concat(size, "px");
    if (pulloutMenu.style.getPropertyValue(property) !== value) {
      pulloutMenu.style.setProperty(property, value);
    }
  }
  function measure() {
    if (disposed || !pulloutMenu.isConnected) return;

    // Closed <details> hides its content. Measure an open, invisible copy
    // instead of opening the real menu or reading its animated dimensions.
    var measurement = /** @type {HTMLDetailsElement} */pulloutMenu.cloneNode(true);
    measurement.removeAttribute("id");
    measurement.removeAttribute("name");
    measurement.removeAttribute("data-tcds-pullout-menu");
    measurement.setAttribute("data-tcds-pullout-menu-measuring", "");
    measurement.setAttribute("aria-hidden", "true");
    measurement.inert = true;
    measurement.open = true;

    // Avoid duplicate IDs and accidental details-group interactions.
    measurement.querySelectorAll("[id], details[name]").forEach(function (element) {
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
      transition: "none"
    });
    var measurementSummary = /** @type {HTMLElement} */measurement.querySelector(":scope > summary");
    var measurementList = /** @type {HTMLUListElement} */measurement.querySelector(":scope > .tcds-pullout-menu__list");
    measurementSummary.style.width = "max-content";
    var toggleWidth;
    var totalHeight;
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
    frame = requestAnimationFrame(function () {
      frame = 0;
      measure();
    });
  }
  measure();

  // Observe the content, not the drawer's animated width/height. Its list
  // stays at the final width, so animation frames do not trigger remeasurement.
  var resizeObserver = new ResizeObserver(scheduleMeasure);
  resizeObserver.observe(summary, {
    box: "border-box"
  });
  resizeObserver.observe(list, {
    box: "border-box"
  });
  var mutationObserver = new MutationObserver(scheduleMeasure);
  var contentOptions = {
    childList: true,
    characterData: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class", "style", "hidden"]
  };
  mutationObserver.observe(summary, contentOptions);
  mutationObserver.observe(list, contentOptions);
  mutationObserver.observe(pulloutMenu, {
    attributes: true,
    attributeFilter: ["class", "style"]
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
  window.addEventListener("resize", scheduleMeasure, {
    passive: true
  });
  var fonts = pulloutMenu.ownerDocument.fonts;
  fonts === null || fonts === void 0 || fonts.ready.then(scheduleMeasure);
  fonts === null || fonts === void 0 || fonts.addEventListener("loadingdone", onToggle);
  function cleanup() {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    mutationObserver.disconnect();
    pulloutMenu.removeEventListener("toggle", scheduleMeasure);
    window.removeEventListener("resize", scheduleMeasure);
    fonts === null || fonts === void 0 || fonts.removeEventListener("loadingdone", scheduleMeasure);
    pulloutMenu.removeAttribute("data-tcds-pullout-menu");
    instances["delete"](pulloutMenu);
  }
  instances.set(pulloutMenu, cleanup);
  return cleanup;
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    return initPulloutMenus();
  }, {
    once: true
  });
} else {
  initPulloutMenus();
}

export { initPulloutMenu, initPulloutMenus };
