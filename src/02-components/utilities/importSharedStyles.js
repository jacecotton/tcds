/**
 * The idea here is to find a stylesheet in the outer DOM with a `title` of
 * `tcds`, create an inline `style` that `@import`s that stylesheet, which can
 * then be inserted into the shadow DOM of a custom element, thus sharing the
 * Design System's base stylesheet across all component shadow DOMs. This is in
 * lieu of a way to adopt external stylesheets.
 *
 * Ideally however this should be made to be more efficient. The usual
 * performance problems with using `@import` don't necessarily apply here, as
 * the stylesheet has already been downloaded - all we're doing is bringing that
 * stylesheet into the scope of the respective shadow tree. In fact, as of
 * testing in 2023, `@import` noticeably outperformed `<link>` in Safari (which
 * had massive FOUC on every re-render). However, we do need a more efficient
 * way to cache the actual `href`. Right now we're using a per-page load global
 * variable (`__TCDS_GLOBAL_STYLES_CACHE`) but eventually we should use local
 * storage for session-level persistence. Caching could be extremely aggressive
 * because the `href` itself is unlikely to change, if ever.
 */

export default () => {
  if(!window.__TCDS_GLOBAL_STYLES_CACHE) {
    window.__TCDS_GLOBAL_STYLES_CACHE = Array.from(document.styleSheets)
      .find(sheet => sheet.title === "tcds")?.href
      || "https://unpkg.com/@txch/tcds/dist/tcds.css";
  }

  return `<style>@import url(${window.__TCDS_GLOBAL_STYLES_CACHE})</style>`;
};
