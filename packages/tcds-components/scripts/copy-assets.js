import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR = path.resolve(__dirname, "../src");
const DIST_DIR = path.resolve(__dirname, "../dist");

function copyTwigFiles(src, dest) {
  if (!fs.existsSync(src)) return;
  // The initial call to copyTwigFiles passes DIST_DIR as 'dest'.
  // We don't want to create DIST_DIR/components here, but rather when a twig file is found.
  // So, remove the initial `fs.mkdirSync(dest, {recursive: true});` from here.
  // if (!fs.existsSync(dest)) fs.mkdirSync(dest, {recursive: true}); // This line is removed

  const entries = fs.readdirSync(src, {withFileTypes: true});

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    // const destPath = path.join(dest, entry.name); // This line is no longer needed for twig files

    if (entry.isDirectory()) {
      // For directories, we still want to recurse, but the 'dest' parameter should remain DIST_DIR
      // as the component-specific path is constructed only for the twig files themselves.
      copyTwigFiles(srcPath, dest);
    } else if (entry.isFile() && entry.name.endsWith(".twig")) {
      const componentName = path.parse(entry.name).name; // Get filename without extension
      const outputDir = path.join(DIST_DIR, componentName);
      const outputPath = path.join(outputDir, `${componentName}.twig`);

      // Ensure the specific component directory exists
      fs.mkdirSync(outputDir, {recursive: true});

      fs.copyFileSync(srcPath, outputPath);
    } else if (entry.isFile() && entry.name.endsWith(".libraries.yml")) {
      // Copy libraries.yml to the root of dist
      const outputPath = path.join(DIST_DIR, entry.name);
      fs.copyFileSync(srcPath, outputPath);
    }
  }
}

const args = process.argv.slice(2);
const isWatch = args.includes("--watch");

if (isWatch) {
  import("chokidar").then(chokidar => {
    console.log("Watching asset files...");
    chokidar.default.watch(path.join(SRC_DIR, "**/*.twig"), {ignoreInitial: true}).on("all", (event, filePath) => {
      console.log(`Asset change detected: ${filePath}`);
      copyTwigFiles(SRC_DIR, DIST_DIR);
    });
  });
  copyTwigFiles(SRC_DIR, DIST_DIR);
} else {
  copyTwigFiles(SRC_DIR, DIST_DIR);
}
