export default () => `
  <style>@import url(${Array.from(document.styleSheets)
    .find(sheet => sheet.title === "tcds")?.href
    || "https://unpkg.com/@txch/tcds/dist/tcds.css"
  })</style>
`;