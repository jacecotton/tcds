import StyleDictionary from "style-dictionary";

export default {
  source: ["src/tokens/**/*.json"],
  platforms: {
    // Build for SCSS so tokens can be iterated through as a map to dynamically
    // generate helper classes, custom properties, etc.
    scss: {
      buildPath: "src/scss/_gen",
      transforms: [
        ...StyleDictionary.hooks.transformGroups["scss"],
        "value/svg-url",
        "value/cubic-bezier",
      ],
      files: [
        {
          destination: "_tokens.scss",
          format: "scss/map-deep",
          filter: token => token.$type !== "keyframes",
        },
      ],
    },
    // Build for CSS to provide flat custom properties for raw tokens. Other
    // custom properties may also be derived from the tokens in downstream
    // projects, but this transform provides a 1-to-1 mapping.
    css: {
      buildPath: "src/scss/_gen",
      prefix: "tcds",
      transforms: [
        ...StyleDictionary.hooks.transformGroups["css"],
        "value/svg-url",
        "value/cubic-bezier",
      ],
      files: [
        {
          destination: "_tokens.css",
          format: "css/variables",
          filter: token => !["keyframes", "icon"].includes(token.$type),
          options: {
            outputReferences: true,
          },
        },
        {
          destination: "_icons.css",
          format: "css/variables",
          filter: token => token.$type === "icon",
        },
        {
          destination: "_animations.css",
          format: "css/keyframes/complex",
          filter: token => token.$type === "keyframes",
        },
      ],
    },
    // Build for JS so tokens can be imported and read by other modules.
    js: {
      buildPath: "src/js/_gen",
      transforms: [
        ...StyleDictionary.hooks.transformGroups["js"],
        "value/cubic-bezier",
        "value/duration-js",
      ],
      files: [
        {
          destination: "tokens.js",
          format: "javascript/es6",
        },
      ],
    },
  },
};
