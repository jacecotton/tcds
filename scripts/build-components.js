import fs from "node:fs";
import path from "node:path";
import {spawnSync} from "node:child_process";
import {createRequire} from "node:module";
import {fileURLToPath} from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = path.join(ROOT, "src", "components");
const DESTINATION = path.join(ROOT, "components");
const mode = process.argv[2];

if (!["assets", "css"].includes(mode)) {
  throw new Error("Usage: node scripts/build-components.js <assets|css>");
}

// Match Rollup's discovery rules, including Twig-only components.
function getComponents(directory = SOURCE, components = new Map()) {
  for (const dirent of fs.readdirSync(directory, {withFileTypes: true})) {
    const {name} = dirent;
    if (!dirent.isDirectory() || name === "_shared") continue;

    const source = path.join(directory, name);
    const metadata = path.join(source, name + ".component.yml");

    if (!fs.existsSync(metadata)) {
      getComponents(source, components);
      continue;
    }

    const existing = components.get(name);

    if (existing) {
      throw new Error(`Duplicate component name "${name}" in ${path.relative(ROOT, existing)} and ${path.relative(ROOT, source)}.`);
    }

    components.set(name, source);
  }

  return components;
}

// Preserve paths within each component while removing category directories.
function copyAssets(source, destination) {
  for (const dirent of fs.readdirSync(source, {withFileTypes: true})) {
    const input = path.join(source, dirent.name);
    const output = path.join(destination, dirent.name);

    if (dirent.isDirectory()) {
      copyAssets(input, output);
    } else if (
      dirent.isFile() &&
      (dirent.name.endsWith(".twig") || dirent.name.endsWith(".component.yml"))
    ) {
      fs.mkdirSync(path.dirname(output), {recursive: true});
      fs.copyFileSync(input, output);
    }
  }
}

const components = getComponents();

if (mode === "assets") {
  for (const [name, source] of components) {
    copyAssets(source, path.join(DESTINATION, name));
  }

  // Retain shared Twig/YAML files at their existing component-root paths.
  const shared = path.join(SOURCE, "_shared");

  if (fs.existsSync(shared)) {
    copyAssets(shared, path.join(DESTINATION, "_shared"));
  }
} else if (components.size > 0) {
  const require = createRequire(import.meta.url);
  const sassDirectory = path.dirname(require.resolve("sass"));
  const sassCli = path.join(sassDirectory, "sass.js");
  const relative = (file) => path.relative(ROOT, file).split(path.sep).join("/");

  const mappings = Array.from(components, ([name, source]) =>
    relative(source) + ":" + relative(path.join(DESTINATION, name))
  );

  const result = spawnSync(process.execPath, [
    sassCli,
    "--load-path=node_modules",
    "--load-path=.",
    "--style=compressed",
    "--source-map",
    ...mappings,
  ], {
    cwd: ROOT,
    stdio: "inherit",
  });

  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
}
