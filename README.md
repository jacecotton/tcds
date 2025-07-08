## Installation
### Via CDN
For the quickest, simplest setup that "just works", you can simply link to Design System assets you want using [unpkg](https://unpkg.com). (See [Architecture](ARCHITECTURE.md) to understand the packages and assets you may want to use and how to reference them.)

```html
<!-- Stylesheets -->
<link href="https://unpkg.com/@txch/tcds/packages/foundation/dist/bundle.css" rel="stylesheet">
<!-- Scripts -->
<script src="https://unpkg.com/@txch/tcds/packages/components/dist/bundle.js"></script>
<!-- Images -->
<img src="https://unpkg.com/@txch/tcds/packages/media/dist/icons/logos/texas-childrens.svg">
```

Compiled code that lives in the CDN already references the CDN for things like fonts and icons, so no configuration is necessary.

**⚠️ WARNING:** This is only recommended for quick prototyping and development. *For security and performance reasons, we urge you to install the Design System [via NPM](#via-npm) or [download a release archive](#via-archive-release) for production environments.*


### Via NPM
Default install:

```bash
npm i @txch/tcds
```

If you want the installer to copy compiled assets into your project (for a buildless setup), set the `--copy-assets-into` flag to a path—relative to your current working directory (CWD)—that you use to contain your assets.

```bash
cd project/docroot
npm i @txch/tcds --copy-assets-into=path/to/assets
```

After install, the Design System will rebuild, rewriting cross-references to assets (like stylesheet references to font files). It will treat the given path as an absolute path publicly accessible on your web server (so assets will live under `www.example.com/path/to/assets`).

If this is not the case (say for example this is a Drupal site and you want to keep your assets in a custom theme directory), you will need to configure the publicly accessible path to your theme folder with the `--public-path` flag:

```bash
cd project/docroot/themes/custom/mytheme
npm i @txch/tcds --copy-assets-into=. --public-path=/themes/custom/mytheme
```

In summary:
* `--copy-assets-into` and `--public-path` ultimately need to point to the same folder.
* `--copy-assets-into` is relative to your current working directory for the purposes of copying assets over at build time.
* `--public-path` is relative to your website's public root (i.e. absolute) for the purpose of actually referencing those assets at runtime.
* The value of `--copy-assets-into` will be used for the public path if `--public-path` is not set, but will be treated as absolute/relative to your public root—*not* relative to your CWD.

Notes:
* You may see a `.tcds-manifest.json` file created in your CWD. This helps keep track of which and where assets were copied over, so that they can be cleaned up on upgrade or uninstall. Whether you check this file into your repo depends on if you check in the copied assets and compiled code, or if you defer installation and build processing to a CI/CD pipeline.

### Via archive release
You can download an archive of the TDCS package straight from the [Releases](#releases) page.

Because of the way asset path resolution will have to work (unless you manually rewrite all references), we recommend simply placing the unzipped `@txch/tcds` package wherever your publicly accessible document root is (`/docroot` if Drupal, or `/var/www/html`, `~/public_html` etc. depending on your server).

Then, all Design System files—stylesheets, scripts, fonts, icons, etc.—are accessible under `www.example.com/@txch/tcds/`. If this is not desirable, consider [installing via NPM](#via-npm) with configuration options.
