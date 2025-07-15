import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";

import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import alias from "@rollup/plugin-alias";
import terser from "@rollup/plugin-terser";

import esmcss from "./plugins/esm-css.js";

const DIRNAME = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR = path.resolve(DIRNAME, "../../src");

const componentEntries = fs
  .readdirSync(SRC_DIR, {withFileTypes: true})
  .filter(dirent => dirent.isDirectory() && dirent.name !== "common")
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

      if(normalized.includes("/src/common/") || normalized.includes("node_modules/")) {
        return "shared";
      }
    },
  },

  plugins: [
    alias({
      entries: [
        {
          find: "@common",
          replacement: path.resolve(SRC_DIR, "common"),
        },
      ],
    }),
    // Polyfill ESM import assertions for CSS file types.
    esmcss(),
    resolve({extensions: [".js", ".css"]}),
    commonjs(),
    terser(),
  ],
};
