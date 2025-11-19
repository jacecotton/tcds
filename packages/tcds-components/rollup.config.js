import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";

import commonjs from "@rollup/plugin-commonjs";
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
  .filter((dirent) => {
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
    bundle: path.join(SRC_DIR, "index.js"),
  },

  external: [
    "lit",
  ],

  output: {
    dir: "dist",
    format: "esm",
    entryFileNames: "[name].js",
    chunkFileNames: "[name].js",

    manualChunks(id) {
      const normalized = id.split(path.sep).join("/");

      return normalized.includes("/src/@shared/")
        || normalized.includes("node_modules/")
        || id.includes("\0")
          ? "shared" : undefined;
}
  },

  plugins: [
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
      presets: [
        ["@babel/preset-env", {targets: {esmodules: true}}],
      ],
      plugins: [
        ["@babel/plugin-proposal-decorators", {version: "2023-11"}],
        ["@babel/plugin-transform-class-properties", {loose: false}],
        ["@babel/plugin-transform-private-methods", {loose: false}],
        ["@babel/plugin-transform-private-property-in-object", {loose: false}],
        ["@babel/plugin-transform-class-static-block"],
      ],
    }),
    commonjs(),
    terser(),
  ],
};
