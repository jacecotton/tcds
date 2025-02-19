/**
 * This returns a constructed (adoptable) stylesheet object out of the TCDS base
 * stylesheet for custom element shadow roots. It does this by searching
 * `document.styleSheets` for a stylesheet with `title` of `tcds` — which is
 * added via a `link` in the `head` with `[title=tcds]` — then serializes its
 * `cssRules`, adding it to a new `CSSStyleSheet` via `replaceSync`.
 *
 * For performance, it stores the serialized `cssRules` in `localStorage` as
 * `tcdsBaseStyleRules_v3.0`. Thus, if the base stylesheet has been
 * reconstructed before, it will reuse it for all custom element shadow roots
 * that ask for it in the future. Note however it's just the serialized
 * `cssRules` that are "cached", not the actual `CSSStyleSheet` object, which is
 * created on a per-page load basis.
 */

const localStorageKey = "tcdsBaseStyleRules_v3.0";

if(!localStorage.getItem(localStorageKey)) {
  const tcdsStyleSheet = Array.from(document.styleSheets)
    .find(sheet => sheet.title === "tcds");

  localStorage.setItem(localStorageKey, Array.from(tcdsStyleSheet.cssRules)
    .map(rule => rule.cssText).join("\n")
  );
}

const baseStyles = new CSSStyleSheet();
baseStyles.replaceSync(localStorage.getItem(localStorageKey));

export default baseStyles;
