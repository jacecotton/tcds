import path from "path";
import fs from "fs";
import {fileURLToPath} from "url";
import {createRequire} from "module";
import {createAttachLibrary} from "./scripts/twing/attach-library.js";

const require = createRequire(import.meta.url);
const {createEnvironment, createFilesystemLoader, createArrayLoader, createChainLoader} = require("twing");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Global assets cache
const globalAssets = {};

export default function (eleventyConfig) {
  // Twing (Twig) Configuration
  eleventyConfig.addExtension("twig", {
    outputFileExtension: "html",
    compile: async function (inputContent, inputPath) {
      // 1. Filesystem Loader for includes
      const fsLoader = createFilesystemLoader(fs);
      fsLoader.addPath(path.resolve(__dirname, "src/_includes"));
      // Add @tcds namespace pointing to dist/components
      const tcdsTemplatesPath = path.resolve(__dirname, "../dist/components");
      console.log("Adding Twing path:", tcdsTemplatesPath);
      fsLoader.addPath(tcdsTemplatesPath, "@tcds");
      // Add directory of current file for relative includes
      fsLoader.addPath(path.dirname(inputPath));

      // 2. Array Loader for the current file content
      const templateKey = "main";
      const arrayLoader = createArrayLoader({
        [templateKey]: inputContent,
      });

      // 3. Chain Loader
      const chainLoader = createChainLoader([arrayLoader, fsLoader]);

      // 4. Environment
      const twing = createEnvironment(chainLoader);

      // 5. attach_library function
      const attachLibrary = createAttachLibrary(eleventyConfig);
      twing.addFunction(attachLibrary);

      return async data => {
        // Initialize assets collection for this render
        // We use a global cache keyed by page URL to persist assets between content and layout renders
        const url = data.page.url;
        if (!globalAssets[url] || !data.content) {
          // Reset if it's the content render (no content yet) or new page
          globalAssets[url] = {
            css: new Set(),
            js: new Set(),
          };
        }
        data.assets = globalAssets[url];

        return twing.render(templateKey, data);
      };
    },
  });

  // Copy public assets (like aggregated dist)
  eleventyConfig.addPassthroughCopy({"src/public": "."});

  // Explicitly watch source directory
  eleventyConfig.addWatchTarget(path.resolve(__dirname, "src"));
  // Watch dist folder for changes during development
  eleventyConfig.addWatchTarget(path.resolve(__dirname, "../dist"));
  // Watch package.json to trigger rebuilds from aggregation script
  eleventyConfig.addWatchTarget("./package.json");

  // Watch dist/components for changes to trigger rebuilds
  eleventyConfig.addWatchTarget(path.resolve(__dirname, "../dist/components"));

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["md", "html", "twig"],
    markdownTemplateEngine: "twig",
    htmlTemplateEngine: "twig",
  };
}
