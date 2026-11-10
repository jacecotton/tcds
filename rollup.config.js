import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

import alias from "@rollup/plugin-alias";
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import litCss from "rollup-plugin-lit-css";

const DIRNAME = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR = path.resolve(DIRNAME, "src");
const COMPONENTS_DIR = path.join(SRC_DIR, "components");

/**
 * Discover component JavaScript entries recursively.
 *
 * Component directories are identified by <name>.component.yml.
 * Matching <name>.js, <name>.browser.js, and <name>.drupal.js files become
 * separate entries, allowing shared logic and environment-specific setup.
 *
 * Entry names omit organizational directories, for example:
 * src/components/presentation/accordion/accordion.js
 * -> components/accordion/accordion.js
 *
 * Component names must be unique across all categories.
 */
function getComponentEntries(directory = COMPONENTS_DIR) {
  const entries = {};
  const componentDirectories = new Map();

  function visit(currentDirectory) {
    for (const dirent of fs.readdirSync(currentDirectory, {withFileTypes: true})) {
      const {name} = dirent;
      if (!dirent.isDirectory() || name === "_shared") continue;

      const componentDir = path.join(currentDirectory, name);
      const componentBase = path.join(componentDir, name);
      const metadataPath = componentBase + ".component.yml";

      if (!fs.existsSync(metadataPath)) {
        // Organizational directories may contain further groups.
        visit(componentDir);
        continue;
      }

      const existingDirectory = componentDirectories.get(name);

      if (existingDirectory) {
        throw new Error(
          'Duplicate component name "' + name + '" in "' +
          path.relative(SRC_DIR, existingDirectory) + '" and "' +
          path.relative(SRC_DIR, componentDir) +
          '". Component names must be unique across categories.'
        );
      }

      componentDirectories.set(name, componentDir);

      for (const suffix of ["", ".browser", ".drupal"]) {
        const entryPath = componentBase + suffix + ".js";
        if (fs.existsSync(entryPath)) {
          entries["components/" + name + "/" + name + suffix] = entryPath;
        }
      }

      // Component directories are leaves; do not scan their internal folders.
    }
  }

  visit(directory);
  return entries;
}

const componentEntries = getComponentEntries();

export default {
  input: {
    ...componentEntries,
  },
  output: {
    dir: DIRNAME,
    format: "es",
    entryFileNames: "[name].js",
    chunkFileNames: "dist/[name].[hash].js",
    manualChunks(id) {
      const normalizedId = id.replaceAll("\\", "/");

      if (normalizedId.includes("/node_modules/")) {
        return "js/vendor";
      }

      if (normalizedId.includes("/src/components/_shared/")) {
        return "js/shared";
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
      babelHelpers: "inline",
      exclude: "node_modules/**",
      presets: ["@babel/preset-env"],
      plugins: [
        ["@babel/plugin-proposal-decorators", {version: "2023-11"}],
      ],
    }),
    alias({
      entries: [
        {find: "@", replacement: path.resolve(SRC_DIR)},
      ],
    }),
  ],
};
