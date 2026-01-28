import {fileURLToPath} from "url";

import eleventyNavigationPlugin from "@11ty/eleventy-navigation";

import configureTwing from "./scripts/twing-config.js";
import {navigationFilter} from "./scripts/navigation.js";

const __filename = fileURLToPath(import.meta.url);

export default function (eleventyConfig) {
  // Passthrough copy for components
  // Maps root/components to _site/components
  eleventyConfig.addPassthroughCopy({"../components": "tcds/components"});
  eleventyConfig.addPassthroughCopy({"../dist": "tcds/dist"});
  eleventyConfig.addPassthroughCopy({"./src/assets": "dist"});

  // Navigation setup
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Global Data
  eleventyConfig.addGlobalData("layout", "html.twig");

  // Twing Configuration
  const twing = configureTwing(eleventyConfig, __filename);
  twing.addFilter(navigationFilter);

  eleventyConfig.addWatchTarget("./src/**/*.md");
  // Watch custom scripts
  eleventyConfig.addWatchTarget("./scripts/**/*.js");

  return {
    dir: {
      input: "src",
      output: "_site",
    },
    markdownTemplateEngine: "twig",
  };
}
