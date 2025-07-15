/**
 * This returns a constructed (adoptable) stylesheet object out of the TCDS base
 * stylesheet for custom element shadow roots. Note that this is only an interim
 * solution until full browser support for ESM import attributes (with "css")
 * permits. Currently lacking Safari, Firefox, and still-recent versions of
 * Chrome: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/
 * Statements/import/with#browser_compatibility (as of March 2025).
 *
 * This script works by searching `document.styleSheets` for a stylesheet with
 * `title` of `tcds` — which is added via a `link` in the `head` with
 * `title="tcds"` — then serializes its `cssRules`, adding it to a new
 * `CSSStyleSheet` via `replaceSync`.
 *
 * For performance, it stores the serialized `cssRules` in local storage as
 * `tcdsrules_<version>`. Thus, if the base stylesheet has been
 * reconstructed before, it will reuse it for all custom element shadow roots
 * that ask for it in the future (on a per-user basis until browser data is
 * cleared). Note however it's just the serialized `cssRules` that are "cached",
 * not the actual `CSSStyleSheet` object, which is created on a per-session
 * basis.
 *
 * For posterity — we previously pulled in the shared stylesheet via
 * `<style>@import ...</style>` which we just prepended to each component
 * template. This worked well until Chrome and Safari stopped pulling the
 * imported reference from cache and made new network requests, which caused
 * noticeable FOUC. v140 of Firefox also appeared to stop loading it at all. Our
 * new solution — constructing stylesheets out of the base stylesheet already
 * loaded in the document — uses local storage for caching, but really only for
 * memory efficiency's sake. There's no FOUC even without it because we're not
 * making additional network requests either way, and `replaceSync` is highly
 * optimized.
 *
 * This results in a significant advantage over our previous approach anyway.
 * But as stated, this is still just an interim approach until browser support
 * for "with css" ESM import attributes permits — in this case, the request
 * will likely pull from the browser's cache, so no additional network request.
 *
 * @todo Make versioning/invalidation more efficient. Right now we'll just be
 *   tweaking the number manually. Maybe base it on a cache token, if provided,
 *   appended to the href of the base stylesheet loaded in the document head?
 *   The stored rules don't necessarily need to update only on every version
 *   change, they could follow the overall site cache. However, if a cache token
 *   is unavailable, it should fallback to a manually entered number. If the
 *   cache token wasn't provided, we wouldn't want it re-serialized on each page
 *   load.
 */

const STYLESHEET_NAME = "tcdsrules";
const STYLESHEET_VERSION = "3.1";
const STORAGE_KEY = `${STYLESHEET_NAME}_v${STYLESHEET_VERSION}`;

export default (() => {
  function scanAndCache() {
    const sheet = Array.from(document.styleSheets)
      .find(sheet => sheet.title === "tcds");

    if(!sheet) {
      return false;
    }

    let rules;

    try {
      rules = sheet.cssRules;
    } catch(error) {
      // console.error(error);
      return false;
    }

    if(!rules.length) {
      return false;
    }

    const text = Array.from(rules).map(rule => rule.cssText).join("\n");
    localStorage.setItem(STORAGE_KEY, text);

    return true;
  }

  if(!localStorage.getItem(STORAGE_KEY)) {
    // If the version above updates, look through current `localStorage` and
    // remove any old base stylesheet versions.
    Object.keys(localStorage)
      .filter(key => key.startsWith(`${STYLESHEET_NAME}_v`))
      .forEach(key => localStorage.removeItem(key));

    const ok = scanAndCache();

    if(!ok) {
      const link = document.querySelector("link[title=tcds]");

      if(link) {
        link.addEventListener("load", scanAndCache, {once: true});
      }
    }
  }

  // Construct an adoptable stylesheet.
  const sheet = new CSSStyleSheet();
  const rules = localStorage.getItem(STORAGE_KEY) || "";
  // Add the serialized rules.
  sheet.replaceSync(rules);
  // Provide the constructed stylesheet, ready for adoption.
  return sheet;
})();
