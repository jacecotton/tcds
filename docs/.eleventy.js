import {fileURLToPath} from "url";
import markdownIt from "markdown-it";

import eleventyNavigationPlugin from "@11ty/eleventy-navigation";

import configureTwing from "./scripts/twing-config.js";
import {navigationFilter, breadcrumbFilter} from "./scripts/navigation.js";

const __filename = fileURLToPath(import.meta.url);

export default function (eleventyConfig) {
  // Configure markdown-it to recognize custom web component elements as
  // block-level HTML. Without this, markdown-it wraps transitions between
  // custom elements (e.g. </tcds-tab><tcds-tab>) in <p> tags, which breaks
  // the DOM structure of web components rendered by Twig.
  const md = markdownIt({html: true});

  // Post-process markdown tokens to unwrap custom elements from paragraphs.
  // markdown-it doesn't recognize custom elements (tags with hyphens, e.g.
  // <tcds-tab>) as block-level HTML, so they get wrapped in <p> tags. This
  // core rule converts any paragraph containing custom element tags into a
  // raw html_block token instead.
  md.core.ruler.push("custom_element_blocks", state => {
    const tokens = state.tokens;
    for (let i = tokens.length - 1; i >= 0; i--) {
      const token = tokens[i];
      if (token.type === "inline" && token.children) {
        if (/<\/?[a-z][a-z0-9]*-[a-z0-9-]*/i.test(token.content)) {
          if (i > 0 && tokens[i - 1].type === "paragraph_open") {
            let closeIdx = i + 1;
            while (closeIdx < tokens.length && tokens[closeIdx].type !== "paragraph_close") {
              closeIdx++;
            }
            if (closeIdx < tokens.length) {
              const htmlBlock = new state.Token("html_block", "", 0);
              htmlBlock.content = token.content + "\n";
              tokens.splice(i - 1, closeIdx - i + 2, htmlBlock);
            }
          }
        }
      }
    }
  });

  eleventyConfig.setLibrary("md", md);

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
  twing.addFilter(breadcrumbFilter);

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
