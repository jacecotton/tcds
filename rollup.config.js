import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

import alias from "@rollup/plugin-alias";
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import litCss from "rollup-plugin-lit-css";

const DIRNAME = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR = path.resolve(DIRNAME, "src");

/**
 * Get an array of all component entries in `src/`, e.g.
 * [
 *   {"components/accordion/accordion": "./src/components/accordion/accordion.js"},
 *   ...
 * ]
 */
const componentEntries = fs
  .readdirSync(path.join(SRC_DIR, "components"), {withFileTypes: true})
  .filter(dirent => {
    if (!dirent.isDirectory()) return false;
    const filePath = path.join(SRC_DIR, "components", dirent.name, `${dirent.name}.js`);
    return fs.existsSync(filePath);
  })
  .reduce((entries, dirent) => {
    const name = dirent.name;
    entries[`components/${name}/${name}`] = path.join(SRC_DIR, "components", name, `${name}.js`);
    return entries;
  }, {});

export default {
  input: {
    ...componentEntries,
  },
  output: {
    dir: ".",
    format: "es",
    entryFileNames: "[name].js",
    chunkFileNames: "[name].js",
    manualChunks(id) {
      if (id.includes("node_modules")) {
        return "dist/js/vendor";
      }
      if (id.includes("src/js/")) {
        return "dist/js/shared";
      }
    },
  },
  plugins: [
    resolve({
      browser: true,
    }),
    litCss({
      include: ["**/*.css"],
    }),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
      presets: ["@babel/preset-env"],
      assumptions: {
        setPublicClassFields: true,
      },
      plugins: [
        ["@babel/plugin-proposal-decorators", {legacy: true}],
        "@babel/plugin-transform-class-properties",
        "@babel/plugin-transform-private-property-in-object",
        "@babel/plugin-transform-private-methods",
      ],
    }),
    alias({
      entries: [
        {find: "@", replacement: path.resolve(SRC_DIR)},
      ],
    }),
  ],
};
