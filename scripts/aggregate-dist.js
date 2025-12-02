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

    // Could add content hash check here for absolute certainty,
    // but mtime/size is usually enough for build scripts
  }

  fs.copyFileSync(src, dest);
  return true;
}

/**
 * Recursively copy files matching a filter, only if changed
 */
function copyFiltered(src, dest, filter) {
  if (!fs.existsSync(src)) return;

  fs.mkdirSync(dest, {recursive: true});

  const entries = fs.readdirSync(src, {withFileTypes: true});

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyFiltered(srcPath, destPath, filter);
    } else if (!filter || filter(entry.name)) {
      copyIfChanged(srcPath, destPath);
    }
  }
}

/**
 * Copy entire directory (incremental)
 */
function copyDir(src, dest) {
  copyFiltered(src, dest, null);
}

async function main() {
  console.log("📦 Aggregating dist assets...");

  // Clean dist - DISABLED to prevent breaking watchers
  const distDir = path.join(ROOT, "dist");
  // if (fs.existsSync(distDir)) {
  //   fs.rmSync(distDir, {recursive: true});
  // }

  // Create structure
  fs.mkdirSync(path.join(distDir, "assets/css"), {recursive: true});
  fs.mkdirSync(path.join(distDir, "assets/fonts"), {recursive: true});
  fs.mkdirSync(path.join(distDir, "assets/images"), {recursive: true});
  fs.mkdirSync(path.join(distDir, "components"), {recursive: true});

  // Copy CSS from foundation
  console.log("  ✓ Copying CSS from tcds-foundation");
  const foundationDist = path.join(ROOT, "packages/tcds-foundation/dist");
  if (fs.existsSync(foundationDist)) {
    for (const file of fs.readdirSync(foundationDist)) {
      if (file.endsWith(".css")) {
        copyIfChanged(path.join(foundationDist, file), path.join(distDir, "assets/css", file));
      }
    }
  }

  // Copy fonts from identity
  console.log("  ✓ Copying fonts from tcds-identity");
  const identityFonts = path.join(ROOT, "packages/tcds-identity/dist/fonts");
  if (fs.existsSync(identityFonts)) {
    copyDir(identityFonts, path.join(distDir, "assets/fonts"));
  }

  // Copy SVGs from identity images
  console.log("  ✓ Copying SVG images from tcds-identity");
  const identityImages = path.join(ROOT, "packages/tcds-identity/dist/images");
  if (fs.existsSync(identityImages)) {
    copyFiltered(identityImages, path.join(distDir, "assets/images"), name => name.endsWith(".svg"));
  }

  // Copy components from tcds-components
  console.log("  ✓ Copying components from tcds-components");
  const componentsDist = path.join(ROOT, "packages/tcds-components/dist");

  if (fs.existsSync(componentsDist)) {
    copyDir(componentsDist, path.join(distDir, "components"));
  }

  // Templates are referenced directly via @tcds namespace pointing to dist/components
  // No need to copy them to docs/_includes

  // Copy aggregated dist to docs/src/public
  const docsPublicDir = path.resolve(__dirname, "../docs/src/public");

  if (!fs.existsSync(docsPublicDir)) {
    fs.mkdirSync(docsPublicDir, {recursive: true});
  }

  // Copy assets
  if (fs.existsSync(path.join(distDir, "assets"))) {
    copyDir(path.join(distDir, "assets"), path.join(docsPublicDir, "assets"));
  }

  // Copy components (excluding templates if we want, but copying everything is easier for now)
  // Actually, we might want to exclude .twig files from public?
  // But for now, let's just copy everything to keep it simple and ensure JS/CSS are available.
  if (fs.existsSync(path.join(distDir, "components"))) {
    copyDir(path.join(distDir, "components"), path.join(docsPublicDir, "components"));
  }

  console.log(`  ✓ Copied dist to docs/src/public`);

  // Touch docs/package.json to trigger Eleventy rebuild
  const docsPackageJson = path.resolve(__dirname, "../docs/package.json");
  if (fs.existsSync(docsPackageJson)) {
    const now = new Date();
    fs.utimesSync(docsPackageJson, now, now);
  }
}

main().catch(error => {
  console.error("❌ Dist aggregation failed:", error);
  process.exit(1);
});
