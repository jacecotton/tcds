import path from "path";
import fs from "fs";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function (eleventyConfig) {
  // Copy public assets (like aggregated dist)
  eleventyConfig.addPassthroughCopy({"src/public": "."});

  // Explicitly watch source directory
  eleventyConfig.addWatchTarget(path.resolve(__dirname, "src"));
  // Watch dist folder for changes during development
  eleventyConfig.addWatchTarget(path.resolve(__dirname, "../dist"));
  // Watch package.json to trigger rebuilds from aggregation script
  eleventyConfig.addWatchTarget("./package.json");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["md", "html", "njk"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
