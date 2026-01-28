#!/usr/bin/env node
/**
 * This file contains custom filters, formats, and transforms for Style
 * Dictionary (see ../sd.config.js and ../src/tokens).
 */

import StyleDictionary from "style-dictionary";
import config from "../sd.config.js";

/**
 * Animation tokens.
 * 
 * Animation tokens need to be handled differently. Rather than using the
 * default CSS format, we'll use a custom format that outputs keyframes for the
 * animations themselves. For timing, we'll create custom formats for cubic
 * bezier curves and transition durations.
 */

// Custom filters for sd.config.js to use.
StyleDictionary.registerFilter({
  name: "excludeKeyframes",
  filter: token => token.$type !== "keyframes",
});

StyleDictionary.registerFilter({
  name: "includeKeyframes",
  filter: token => token.$type === "keyframes",
});

// Custom @keyframes format.
StyleDictionary.registerFormat({
  name: "css/keyframes/complex",
  format: ({dictionary}) => {
    return dictionary.allTokens
      .map((token) => {
        if (token.$type !== "keyframes") return "";

        // A frame is an object representing a ruleset within a keyframe set
        // (e.g. `0% {}`, `100% {}`, etc.)
        const frames = token.$value
          .map((frame) => {
            // WAAPI offsets use decimals, CSS uses percentages.
            const percent = `${frame.offset * 100}%`;

            const styles = Object.entries(frame)
              .filter(([key]) => key !== "offset")
              .map(([prop, value]) => {
                // WAAPI uses "easing", CSS uses "animation-timing-function"
                if (prop === "easing") {
                  return `    animation-timing-function: ${value};`;
                }

                return `    ${prop}: ${value};`;
              })
              .join("\n");

            return `  ${percent} {\n${styles}\n  }`;
          })
          .join("\n");

        // Construct `@keyframes` ruleset.
        return `@keyframes ${token.name} {\n${frames}\n}`;
      })
      .join("\n\n");
  },
});

// Custom transform for cubicBezier token types, converting native array value
// to CSS cubic-bezier() function.
StyleDictionary.registerTransform({
  type: "value",
  name: "value/cubic-bezier",
  filter: token => token.$type === "cubicBezier",
  transform: (token) => {
    if (!Array.isArray(token.$value)) return token.$value;
    const [x1, y1, x2, y2] = token.$value;
    return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
  },
});

// For JS token outputs, we just want the raw numerical value instead of the CSS
// unit.
// @todo In the future look into a more intelligent conversion to support other
// units like seconds. For now, as a rule, only use ms.
StyleDictionary.registerTransform({
  type: "value",
  name: "value/duration-js",
  filter: token => token.$type === "duration",
  transform: token => parseInt(token.$value), // "100ms" -> 100
});

/**
 * SVG tokens.
 * 
 * Custom transform for turning SVG icons into embedded CSS URLs, for use as
 * custom property values.
 */

StyleDictionary.registerTransform({
  type: "value",
  name: "value/svg-url",
  filter: token => token.$type === "icon",
  transform: token => `url("data:image/svg+xml,${token.$value}")`,
});

const sd = new StyleDictionary(config);
await sd.buildAllPlatforms();

console.log("[Style Dictionary] Tokens built for all platforms.");
