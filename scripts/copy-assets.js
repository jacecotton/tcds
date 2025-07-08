#!/usr/bin/env node
/**
 * This script enables an optional `--copy-assets-into` flag during install,
 * which will copy static assets from @txch/tcds/packages/../dist and into the
 * specified directory (relative to cwd), placing them in subfolders named for
 * the filetype (css/, js/, svg/, woff2/, etc.) Exceptions are (1) twig
 * templates, which are placed in templates/components/ instead of twig/ (to
 * better match Drupal theming conventions), and (2) *.*.map files, which are
 * placed in their associated file type folders (e.g. .css.map → css/).
 *
 * Note that how we copy assets into the project (and how we distribute assets
 * in general) will likely change when we move to Drupal's Single Directory
 * Component architecture.
 */

import fs from "fs-extra";
import path from "path";
import {fileURLToPath} from "url";

async function main() {
  if(!process.env.npm_config_copy_assets_into) {
    console.log("@txch/tcds ℹ️ Skipping asset placement.");
    process.exit(0);
  }

  console.log(`@txch/tcds ⬇️ Copying assets into [${COPY_ASSETS_INTO}]`);

  const DIRNAME = path.dirname(fileURLToPath(import.meta.url));
  const COPY_ASSETS_INTO = path.resolve(process.cwd(), process.env.npm_config_copy_assets_into);

  // File extensions of the assets we're copying into downstream project.
  const exts = [".svg", ".woff2", ".css", ".js", ".twig"];

  // Recursively walk a directory, invoking callback(filePath) for each file.
  function walk(dir, callback) {
    [...fs.readdirSync(dir, {withFileTypes: true})].forEach((entry) => {
      const full = path.join(dir, entry.name);

      if(entry.isDirectory()) {
        walk(full, callback);
      } else if(entry.isFile()) {
        callback(full);
      }
    });
  }

  // Initialize a manifest to keep track of assets that are copied and where
  // they're copied to.
  const manifest = [];

  // Look through every packages/**/dist
  const packagesRoot = path.join(DIRNAME, "packages");

  [...fs.readdirSync(packagesRoot)].forEach((packageName) => {
    const packagePath = path.join(packagesRoot, packageName);
    const distDir = path.join(packagePath, "dist");

    if(!fs.existsSync(distDir)) {
      return;
    }

    walk(distDir, (srcFile) => {
      const extname = path.extname(srcFile).toLowerCase();
      const basename = path.basename(srcFile);

      if(!exts.has(extname)) {
        return;
      }

      let destDir;

      if(extname === ".twig") {
        destDir = path.join(COPY_ASSETS_INTO, "templates", "components");
      } else if(ext === ".map") {
        const inner = path.extname(basename.slice(0, -4)).toLowerCase();
        const folder = inner ? inner.slice(1) : "map";
        destDir = path.join(COPY_ASSETS_INTO, folder);
      } else {
        destDir = path.join(COPY_ASSETS_INTO, extname.slice(1));
      }

      const destFile = path.join(destDir, path.basename(srcFile));

      fs.ensureDirSync(destDir);
      fs.copySync(srcFile, destFile);

      const {mtime} = fs.statSync(destFile);

      manifest.push({
        source: srcFile,
        destination: destFile,
        mtime: mtime.toISOString(),
      });

      console.log(`@txch/tcds ➡️ ${path.relative(distDir, srcFile)} → ${path.relative(process.cwd(), destFile)}`);
    });
  });

  console.log(`@txch/tcds ✅ Assets copied into ${destRoot}.`);

  const manifestPath = path.resolve(process.cwd(), ".tcds-manifest.json");
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf8");

  console.log(`@txch/tcds 📝 Wrote manifest to ${manifestPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
