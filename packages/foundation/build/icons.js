#!/usr/bin/env node
/**
 * This script keeps track of our icon library in packages/media, and records
 * the category and filenames so that CSS custom properties can be recursively
 * generated in packages/foundation/src/icons/_props.scss.
 */

import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";

async function main() {
  const DIRNAME = path.dirname(fileURLToPath(import.meta.url));
  const ICONS_DIR = path.resolve(DIRNAME, "../../media/dist/icons");

  if(!fs.existsSync(ICONS_DIR)) {
    console.error(`@txch/tcds ❌ ERROR: Icons directory not found at ${ICONS_DIR}`);
    process.exit(1);
  }

  let SCSS = `// AUTO-GENERATED - DO NOT EDIT\n`
    + `$library: (\n`;

  fs.readdirSync(ICONS_DIR)
    .filter(name => fs.statSync(path.join(ICONS_DIR, name)).isDirectory())
    .forEach((category) => {
      const folder = path.join(ICONS_DIR, category);
      const icons = fs.readdirSync(folder)
        .filter(filename => filename.toLowerCase().endsWith(".svg"))
        .map(filename => `"${path.basename(filename, ".svg")}"`);

      SCSS += `  ${category}: (${icons.join(", ")}),\n`;
    });

  SCSS += `);`;

  const outFile = path.join(DIRNAME, "output/icons.scss");
  fs.writeFileSync(outFile, SCSS, "utf8");
}

main().catch((error) => {
  console.log(error);
  process.exit(1);
});
