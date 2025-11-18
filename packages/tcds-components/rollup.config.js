import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";

import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import alias from "@rollup/plugin-alias";
import terser from "@rollup/plugin-terser";
import babel from "@rollup/plugin-babel";

import esmcss from "./scripts/plugin-esm-css.js";

const DIRNAME = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR = path.resolve(DIRNAME, "src");

const componentEntries = fs
  .readdirSync(SRC_DIR, {withFileTypes: true})
  .filter((dirent) => {
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

  output: {
    dir: "dist",
    format: "esm",
    entryFileNames: "[name].js",
    chunkFileNames: "[name].js",

    manualChunks(id) {
      const normalized = id.split(path.sep).join("/");
      return normalized.includes("/src/@shared/") || normalized.includes("node_modules/")
        ? "shared" : undefined;
    },
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
    // Polyfill ESM import assertions for CSS file types.
    esmcss(),
    resolve({extensions: [".js", ".css"]}),
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
