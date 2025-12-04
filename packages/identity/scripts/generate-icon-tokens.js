#!/usr/bin/env node
/**
 * This script generates icon tokens as a Design Token JSON file:
 * src/tokens/icons.json
 */

import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";

async function main() {
  const DIRNAME = path.dirname(fileURLToPath(import.meta.url));
  const SRC_DIR = path.resolve(DIRNAME, "../src/images/icons");
  const OUTPUT_DIR = path.resolve(DIRNAME, "../src/tokens");

  if (!fs.existsSync(SRC_DIR)) {
    console.error(`@txch/identity ❌ ERROR: Icons source directory not found at ${SRC_DIR}`);
    process.exit(1);
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, {recursive: true});
  }

  const tokens = {
    icon: {},
  };

  const categories = fs.readdirSync(SRC_DIR).filter(name => fs.statSync(path.join(SRC_DIR, name)).isDirectory());

  categories.forEach(category => {
    const categoryDir = path.join(SRC_DIR, category);
    const icons = fs.readdirSync(categoryDir).filter(name => name.toLowerCase().endsWith(".svg"));

    if (icons.length > 0) {
      tokens.icon[category] = {};

      icons.forEach(iconFile => {
        const iconName = path.basename(iconFile, ".svg");
        const iconPath = path.join(categoryDir, iconFile);
        const svgContent = fs.readFileSync(iconPath, "utf8");
        const base64 = Buffer.from(svgContent).toString("base64");
        const dataUri = `url("data:image/svg+xml;base64,${base64}")`;

        tokens.icon[category][iconName] = {
          $value: dataUri,
          $type: "icon",
        };
      });
    }
  });

  fs.writeFileSync(path.join(OUTPUT_DIR, "icons.json"), JSON.stringify(tokens, null, 2), "utf8");

  console.log(`@txch/identity ✅ Generated icon tokens in ${OUTPUT_DIR}/icons.json`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
