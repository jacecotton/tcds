#!/usr/bin/env node
/**
 * This script generates an SCSS file on the fly for defining the path to static
 * assets, based either on install flags or heuristics. This is both an optional
 * postinstall script for the root @txch/tcds package, as well as a required
 * build script utilized by this package, @txch/foundations.
 *
 * As a build script, this is invoked by this package as a necessary step to
 * compile SCSS, which needs to know what paths to use for references to static
 * assets such as fonts and SVGs from within SCSS.
 *
 * On install, users can set a --public-path flag, which will be passed to this
 * config script. Users can also set --copy-assets-into, which will trigger the
 * copy-assets.js script to copy static assets into the downstream directory,
 * and the flag value will be treated as the public path if --public-path is not
 * set.
 *
 * Finally, this script generates the file, output/_config.scss, which defines a
 * `$public-path` variable. This path prefix will either be the value of
 * --public-path, --copy-assets-into, or a CDN-friendly (unpkg) default.
 *
 * If necessary, this script could be modified to generate additional configs in
 * different formats (JS, etc.), but haven't run into the need for it yet.
 */

import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";

async function main() {
  const DIRNAME = path.dirname(fileURLToPath(import.meta.url));
  // Flags
  const RAW_PUBLIC_PATH = process.env.npm_config_public_path;
  const RAW_COPY_ASSETS_INTO = process.env.npm_config_copy_assets_into;
  // Construct a jsDelivr-friendly path to use as default for assets.
  const DEFAULT_PREFIX = `/@txch/tcds/packages/media/dist`;

  let publicPath = null;

  if(RAW_PUBLIC_PATH) {
    console.log(`@txch/tcds ℹ️ --public-path given as ${RAW_PUBLIC_PATH}`);
    publicPath = RAW_PUBLIC_PATH;
  } else if(RAW_COPY_ASSETS_INTO) {
    console.log(`@txch/tcds ℹ️ Config will be generated using --copy-assets-into value as public asset path. Use --public-path flag to specify a different path.`);
    publicPath = RAW_COPY_ASSETS_INTO;
  } else {
    console.log(`@txch/tcds ℹ️ Generating asset configs. No --public-path given, using jsDelivr-friendly default.`);
    publicPath = DEFAULT_PREFIX;
  }

  // We must use absolute paths because asset resolution may be evaluated from
  // documents in varying-depth paths (since in our case it only ever happens at
  // runtime, can't just handle it at build time since not fully SSG), so we'll
  // make sure the path starts with a leading slash.
  publicPath = publicPath.startsWith("/") ? publicPath : `/${publicPath}`;
  // Responsibility to add leading slash to beginning of specific asset path
  // beyond the prefix lies downstream, so we'll remove it if it was added.
  publicPath = publicPath.endsWith("/") ? publicPath.slice(0, -1) : publicPath;

  const SCSS = `// AUTO-GENERATED - DO NOT EDIT\n`
    + `$public-path: "${publicPath}" !default;\n`;

  const outFile = path.join(DIRNAME, "output/config.scss");
  fs.writeFileSync(outFile, SCSS, "utf8");

  console.log(`@txch/tcds ✅ Wrote ${outFile} with $public-path as "${publicPath}"`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
