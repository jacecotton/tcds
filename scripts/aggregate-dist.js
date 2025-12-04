#!/usr/bin/env node
import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

/**
 * Copy file only if changed (content check)
 */
function copyIfChanged(src, dest) {
  if (!fs.existsSync(src)) return;

  if (fs.existsSync(dest)) {
    const srcStat = fs.statSync(src);
    const destStat = fs.statSync(dest);

    // Simple size/mtime check first
    if (srcStat.size === destStat.size && srcStat.mtimeMs <= destStat.mtimeMs) {
      return false;
    }
  }

  fs.copyFileSync(src, dest);
  return true;
}

/**
 * Recursively copy files matching a filter, only if changed
 */
function copyDir(src, dest, filter = null) {
  if (!fs.existsSync(src)) return;

  fs.mkdirSync(dest, {recursive: true});

  const entries = fs.readdirSync(src, {withFileTypes: true});

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath, filter);
    } else if (!filter || filter(entry.name)) {
      copyIfChanged(srcPath, destPath);
    }
  }
}

async function main() {
  console.log("📦 Aggregating dist assets...");

  const distDir = path.join(ROOT, "dist");

  // Create structure
  fs.mkdirSync(path.join(distDir, "css"), {recursive: true});
  fs.mkdirSync(path.join(distDir, "fonts"), {recursive: true});
  fs.mkdirSync(path.join(distDir, "images"), {recursive: true});
  fs.mkdirSync(path.join(distDir, "components"), {recursive: true});

  // Copy CSS from foundation
  console.log("  ✓ Copying CSS from foundation");
  const foundationDist = path.join(ROOT, "packages/foundation/dist/css");
  if (fs.existsSync(foundationDist)) {
    for (const file of fs.readdirSync(foundationDist)) {
      if (file.endsWith(".css")) {
        copyIfChanged(path.join(foundationDist, file), path.join(distDir, "css", file));
      }
    }
  }

  // Copy fonts from identity
  console.log("  ✓ Copying fonts from identity");
  const identityFonts = path.join(ROOT, "packages/identity/dist/fonts");
  if (fs.existsSync(identityFonts)) {
    copyDir(identityFonts, path.join(distDir, "fonts"));
  }

  // Copy SVGs from identity images
  console.log("  ✓ Copying SVG images from identity");
  const identityIcons = path.join(ROOT, "packages/identity/dist/images/icons");
  if (fs.existsSync(identityIcons)) {
    copyDir(identityIcons, path.join(distDir, "images/icons"));
  }

  const identityLogos = path.join(ROOT, "packages/identity/dist/images/logos");
  if (fs.existsSync(identityLogos)) {
    copyDir(identityLogos, path.join(distDir, "images/logos"));
  }

  // Copy components from components
  console.log("  ✓ Copying components from components");
  const componentsDist = path.join(ROOT, "packages/components/dist");

  if (fs.existsSync(componentsDist)) {
    copyDir(componentsDist, path.join(distDir, "components"));
  }
}

main().catch(error => {
  console.error("❌ Dist aggregation failed:", error);
  process.exit(1);
});
