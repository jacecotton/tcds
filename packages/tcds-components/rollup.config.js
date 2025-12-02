import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";

import commonjs from "@rollup/plugin-commonjs";
import {nodeResolve} from "@rollup/plugin-node-resolve";
import alias from "@rollup/plugin-alias";
import terser from "@rollup/plugin-terser";
import babel from "@rollup/plugin-babel";
import litcss from "rollup-plugin-lit-css";

const DIRNAME = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR = path.resolve(DIRNAME, "src");

/**
 * Get an array of all component entries in `src/`, e.g.
 * [
 *   {accordion: "./src/accordion/accordion.js"},
 *   ...
 * ]
 */
const componentEntries = fs
  .readdirSync(SRC_DIR, {withFileTypes: true})
  .filter(dirent => {
    // Exclude src/@shared/*
    if (!dirent.isDirectory() || dirent.name === "@shared") return false;
    const filePath = path.join(SRC_DIR, dirent.name, `${dirent.name}.js`);
    return fs.existsSync(filePath);
  })
  .reduce((entries, dirent) => {
    const name = dirent.name;
    entries[name] = path.join(SRC_DIR, name, `${name}.js`);
    return entries;
  }, {});

export default {
  input: {
    ...componentEntries,
  },

  output: {
    dir: "dist",
    format: "es",
    entryFileNames: "[name]/[name].js",
    chunkFileNames: "shared/[name].js",

    manualChunks(id) {
      const normalized = id.split(path.sep).join("/");

      if (normalized.includes("/src/@shared/utilities/")) {
        return "utilities";
      }

      if (normalized.includes("/src/@shared/") || normalized.includes("node_modules/") || id.includes("\0")) {
        return "vendor";
      }
    },
  },

  plugins: [
    nodeResolve({
      browser: true,
    }),
    alias({
      entries: [
        {
          find: "@shared",
          replacement: path.resolve(SRC_DIR, "@shared"),
        },
      ],
    }),
    litcss(),
    babel({
      babelHelpers: "bundled",
      extensions: [".js", ".mjs"],
      exclude: /node_modules/,
      sourceMaps: true,
      presets: [
        [
          "@babel/preset-env",
          {
            targets: {esmodules: true},
            bugfixes: true,
          },
        ],
      ],
      plugins: [
        [
          "@babel/plugin-proposal-decorators",
          {
            legacy: true,
          },
        ],
        ["@babel/plugin-transform-class-properties", {loose: false}],
        ["@babel/plugin-transform-private-methods", {loose: false}],
        ["@babel/plugin-transform-private-property-in-object", {loose: false}],
        ["@babel/plugin-transform-class-static-block"],
      ],
    }),
    commonjs({
      include: /node_modules/,
    }),
    terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
