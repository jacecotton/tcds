export default function (eleventyConfig) {
  // Copy dist assets from parent directory to make them accessible
  eleventyConfig.addPassthroughCopy({"../dist": "dist"});

  // Watch dist folder for changes during development
  eleventyConfig.addWatchTarget("../dist");

  return {
    // Use current directory as input
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },

    // Enable Markdown and HTML (Nunjucks available for future use)
    templateFormats: ["md", "html"],

    // Use Markdown for markdown files
    markdownTemplateEngine: false,

    // Use HTML for HTML files
    htmlTemplateEngine: false,
  };
}
