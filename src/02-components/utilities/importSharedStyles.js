export default () => {
  if(!window.__TCDS_GLOBAL_STYLES_CACHE) {
    window.__TCDS_GLOBAL_STYLES_CACHE = Array.from(document.styleSheets)
      .find(sheet => sheet.title === "tcds")?.href
      || "https://unpkg.com/@txch/tcds/dist/tcds.css";
  }

  return `<style>@import url(${window.__TCDS_GLOBAL_STYLES_CACHE})</style>`;
};
