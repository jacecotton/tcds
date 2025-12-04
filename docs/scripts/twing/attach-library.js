import path from "path";
import fs from "fs";
import {createRequire} from "module";
import {fileURLToPath} from "url";

const require = createRequire(import.meta.url);
const {createFunction} = require("twing");
const yaml = require("js-yaml");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Libraries cache
const libraries = {};

/**
 * Creates the attach_library Twing function
 * @param {object} eleventyConfig - The Eleventy configuration object
 * @returns {TwingFunction} The attach_library function
 */
export function createAttachLibrary(eleventyConfig) {
  return createFunction(
    "attach_library",
    (context, libraryPath) => {
      const [namespace, libraryName] = libraryPath.split("/");

      if (!namespace || !libraryName) {
        console.warn(`Invalid library path: ${libraryPath}. Expected format: namespace/library`);
        return Promise.resolve("");
      }

      // Load libraries file for namespace if not already loaded
      if (!libraries[namespace]) {
        // Assuming the structure is consistent relative to this script
        // docs/scripts/twing/attach-library.js -> ../../../dist/components
        const librariesFilePath = path.resolve(__dirname, `../../../dist/components/${namespace}.libraries.yml`);
        try {
          if (fs.existsSync(librariesFilePath)) {
            const fileContents = fs.readFileSync(librariesFilePath, "utf8");
            libraries[namespace] = yaml.load(fileContents);
            // Watch this new libraries file
            eleventyConfig.addWatchTarget(librariesFilePath);
          } else {
            console.warn(`Libraries file not found for namespace: ${namespace} at ${librariesFilePath}`);
            libraries[namespace] = {}; // Prevent repeated load attempts
          }
        } catch (e) {
          console.warn(`Could not load libraries file for ${namespace}:`, e);
          libraries[namespace] = {};
        }
      }

      if (!libraries[namespace] || !libraries[namespace][libraryName]) {
        console.warn(`Library "${libraryName}" not found in namespace "${namespace}".`);
        return Promise.resolve("");
      }

      const library = libraries[namespace][libraryName];

      let assets;
      try {
        const actualContext = context.context;
        if (actualContext) {
          if (typeof actualContext.get === "function") {
            assets = actualContext.get("assets");
          } else {
            assets = actualContext["assets"];
          }
        }
      } catch (e) {
        console.error("Error getting assets from context:", e);
      }

      if (assets) {
        if (library.css) {
          library.css.forEach(css => assets.css.add(`assets/${css}`));
        }
        if (library.js) {
          library.js.forEach(js => assets.js.add(`assets/${js}`));
        }
      }

      return Promise.resolve("");
    },
    [{name: "libraryPath"}],
    {needs_context: true, is_safe: ["html"]},
  );
}
