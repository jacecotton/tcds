import * as sass from "sass";
import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR = path.resolve(__dirname, "../src");
const DIST_DIR = path.resolve(__dirname, "../dist");

if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR, {recursive: true});
}

function compileScss() {
  const entries = fs.readdirSync(SRC_DIR, {withFileTypes: true});

  for (const entry of entries) {
    if (entry.isDirectory() && entry.name !== "@shared") {
      const scssFile = path.join(SRC_DIR, entry.name, `${entry.name}.scss`);

      if (fs.existsSync(scssFile)) {
        try {
          const result = sass.compile(scssFile, {
            loadPaths: [path.resolve(__dirname, "../../../node_modules")],
            style: "expanded",
            sourceMap: false,
          });

          const outFile = path.join(DIST_DIR, entry.name, `${entry.name}.css`);

          // Ensure directory exists
          fs.mkdirSync(path.dirname(outFile), {recursive: true});

          fs.writeFileSync(outFile, result.css);
          console.log(`Compiled ${entry.name}.scss to ${outFile}`);
        } catch (error) {
          console.error(`Error compiling ${entry.name}.scss:`, error);
          process.exit(1);
        }
      }
    }
  }
}

const args = process.argv.slice(2);
const isWatch = args.includes("--watch");

if (isWatch) {
  import("chokidar").then(chokidar => {
    console.log("Watching SCSS files...");
    chokidar.default.watch(path.join(SRC_DIR, "**/*.scss"), {ignoreInitial: true}).on("all", (event, filePath) => {
      console.log(`SCSS change detected: ${filePath}`);
      compileScss();
    });
  });
  compileScss();
} else {
  compileScss();
}
