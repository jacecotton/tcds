#!/usr/bin/env node
/**
 * This script keeps track of our icon library in src/icons, and records
 * the category and filenames so that CSS custom properties can be recursively
 * generated in the Foundation package (and possibly others).
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

async function main() {
  const DIRNAME = path.dirname(fileURLToPath(import.meta.url));
  const OUTPUT_DIR = "../dist/images/icons";
  const ICONS_DIR = path.resolve(DIRNAME, OUTPUT_DIR);

  if (!fs.existsSync(ICONS_DIR)) {
    console.error(`@txch/tcds ❌ ERROR: Icons directory not found at ${ICONS_DIR}`);
    process.exit(1);
  }

  let SCSS = `\n/**
 * Do not edit directly, this file was auto-generated.
 */\n
`
    + `$icons: (\n`;

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

  const outFile = path.join(DIRNAME, `${OUTPUT_DIR}/_index.scss`);
  fs.writeFileSync(outFile, SCSS, "utf8");
}

main().catch((error) => {
  console.log(error);
  process.exit(1);
});
