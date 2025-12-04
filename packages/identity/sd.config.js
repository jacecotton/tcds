export default {
  source: ["src/tokens/**/*.json"],
  platforms: {
    // Build for SCSS so tokens can be iterated through as a map to dynamically
    // generate helper classes, custom properties, etc.
    scss: {
      transformGroup: "scss",
      buildPath: "dist/scss/",
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
      transformGroup: "css",
      buildPath: "dist/css/",
      prefix: "tcds",
      files: [
        {
          destination: "tokens.css",
          format: "css/variables",
          filter: token => token.$type !== "keyframes" && token.$type !== "icon",
          options: {
            outputReferences: true,
          },
        },
        {
          destination: "icons.css",
          format: "css/variables",
          filter: token => token.$type === "icon",
        },
        {
          destination: "animations.css",
          format: "css/keyframes/complex",
          filter: token => token.$type === "keyframes",
        },
      ],
    },
    // Build for JS so tokens can be imported and read by other modules.
    js: {
      transformGroup: "js",
      buildPath: "dist/js/",
      files: [
        {
          destination: "tokens.js",
          format: "javascript/es6",
        },
      ],
    },
  },
};
