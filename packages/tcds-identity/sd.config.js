export default {
  source: ["src/tokens/**/*.json"],
  platforms: {
    // Build for SCSS so tokens can be iterated through as a map to dynamically
    // generate helper classes, custom properties, etc.
    scss: {
      transformGroup: "scss",
      buildPath: "dist/tokens/",
      files: [
        {
          destination: "_index.scss",
          format: "scss/map-deep",
        },
      ],
    },
    // Build for CSS to provide flat custom properties for raw tokens. Other
    // custom properties may also be derived from the tokens in downstream
    // projects, but this transform provides a 1-to-1 mapping.
    css: {
      transformGroup: "css",
      buildPath: "dist/tokens/",
      prefix: "tcds",
      files: [
        {
          destination: "index.css",
          format: "css/variables",
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    // Build for JS so tokens can be imported and read by other modules.
    js: {
      transformGroup: "js",
      buildPath: "dist/tokens/",
      files: [
        {
          destination: "index.js",
          format: "javascript/es6",
        },
      ],
    },
  },
};
