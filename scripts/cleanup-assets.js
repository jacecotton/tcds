#!/usr/bin/env node
/**
 * This is a preuninstall and postinstall script that removes assets copied from
 * the node_modules/@txch/tcds package and into the downstream project's asset
 * directory as listed in a JSON manifest file, which would have been populated
 * by the copy-assets.js script after the previous install. This helps assets
 * get replaced (if stale) or swept away on TCDS upgrade or uninstall,
 * respectively.
 */

import fs from "fs-extra";
import path from "path";

async function main() {
  const manifestLocation = path.join(process.cwd(), ".tcds-manifest.json");

  let oldManifest = [];

  try {
    oldManifest = await fs.readJson(manifestLocation);
  } catch(error) {
    // No manifest, nothing to clean, we're done here.
    if(error.code === "ENOENT") {
      return;
    } else {
      // Something else went wrong other than "no manifest".
      throw error;
    }
  }

  // Remove each file listed in the manifest.
  for(const entry of oldManifest) {
    const filePath = path.join(process.cwd(), entry.destination);
    await fs.remove(filePath);

    console.log(`Removed: ${entry.destination}`);
  }

  // Remove the manifest file itself.
  await fs.remove(manifestLocation);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
