/**
 * This returns a constructed (adoptable) stylesheet object out of the TCDS base
 * stylesheet for custom element shadow roots. Note that this is only an interim
 * solution until browser support for ES import attributes permits. Currently
 * lacking Safari and Firefox: https://caniuse.com/?search=import%20attributes
 * (as of March 2025 - still need to support Safari 17).
 *
 * This script works by searching `document.styleSheets` for a stylesheet with
 * `title` of `tcds` — which is added via a `link` in the `head` with
 * `title="tcds"` — then serializes its `cssRules`, adding it to a new
 * `CSSStyleSheet` via `replaceSync`.
 *
 * For performance, it stores the serialized `cssRules` in `localStorage` as
 * `tcdsBaseStyleRules_<version>`. Thus, if the base stylesheet has been
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
 * noticeable FOUC (Firefox didn't seem to have this issue). Our new solution —
 * constructing stylesheets out of the base stylesheet already loaded in the
 * document — uses local storage for caching, but really only for memory
 * efficiency's sake. There's no FOUC even without it because we're not making
 * additional network requests either way, and `replaceSync` is insanely
 * optimized.
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

const styleSheetName = "tcdsBaseStyleRules";
const styleSheetVersion = "3.1";
const localStorageKey = `${styleSheetName}_v${styleSheetVersion}`;

if(!localStorage.getItem(localStorageKey)) {
  // If the version above updates, look through current `localStorage` and
  // remove any old base stylesheet versions.
  Object.keys(localStorage).forEach((key) => {
    if(key.startsWith(`${styleSheetName}_v`)) {
      localStorage.removeItem(key);
    }
  });

  // Find the base stylesheet.
  const tcdsStyleSheet = Array.from(document.styleSheets)
    .find(sheet => sheet.title === "tcds");

  if(tcdsStyleSheet) {
    // Store the base stylesheet's serialized CSS rules in local storage.
    localStorage.setItem(
      localStorageKey,
      Array.from(tcdsStyleSheet.cssRules)
        .map(rule => rule.cssText)
        .join("\n")
    );
  }
}

// Construct an adoptable stylesheet.
const baseStyleSheet = new CSSStyleSheet();
const baseStyleRules = localStorage.getItem(localStorageKey);

// Add the serialized rules.
if(baseStyleRules) {
  baseStyleSheet.replaceSync(baseStyleRules);
}

// Provide the constructed stylesheet, ready for adoption.
export default baseStyleSheet;
