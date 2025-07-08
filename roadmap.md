Copying assets and configuring the public path are two separate things.

The copy script applies to all `.svg`, `.woff2`, `.css`, `.js`, and `.njk` (renaming `.njk` → `.twig`), and copies them into subfolders of the `--copy-assets-into` directory, the subfolders named for the respective file extension of each file. The copy script should look in `packages/**/dist/**/*.(svg|woff2|css|js)` and output `(svg|woff2|css|js)/*.(svg|woff2|css|js)`.

`.njk` files are a special case. The script should look for `packages/**/dist/**/*.njk`, but then rename the files to `.twig` extensions, and then place them in a `templates/components` folder. THIS IS NOT AN EXCEPTION TO A USER-DEFINED CONFIG, but rather is *only an exception to the copy-script's job of moving each file into a subfolder named for its extension*. In other words, `css/bundle.css` and `templates/components/accordion.twig` live in the same folder.

Then, separately, the config script simply redefines `$public-path` from `/@txch/tcds/packages/media/dist` to whatever was passed to `--public-path` (e.g. `/themes/custom/tc`), or if no `--public-path` is specified, fallback to `--copy-assets-to` (converted to absolute/docroot-relative), falling further back to the default—`/@txch/tcds/packages/media/dist`.

`--copy-assets-into` triggers the move of media assets, foundation bundles, and component scripts.

`--public-path` redefines the `$public-path` config variable purely for media asset purposes. *It has nothing to do with CSS and JS bundles, other than that they may reference paths to media assets.*
