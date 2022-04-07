**Work in progress.** See #5

## Architecture
This document describes the high-level architecture of Texas Children's Design System.

### Overview
The Design System is ultimately just a collection of scripts, styles, templates, and SVG icons.

These assets are delivered in two options:

* [`src/`](https://github.com/jacecotton/tcds/tree/main/src) — The *uncompiled* assets, [installable as a dependency]((https://www.npmjs.com/package/@txch/tcds)).
* [`dist/`](https://github.com/jacecotton/tcds/tree/main/dist) — The *precompiled* assets, [linkable from a CDN](https://unpkg.com/).

Using the former in a project requires a build process to compile the Design System along with a project's other code (see [Getting Started &sect; Local installation](http://tcds.herokuapp.com/getting-started#local-installation)). This is the best option for larger projects that require configuration (theming, extension, granular inclusion, etc.) or deeper integration with the Design System's tools (Sass utilities, JavaScript module exports, Twig templates, etc.)

The latter simply provides a single JavaScript bundle, a master stylesheet, and a collection of SVG icons. This is the best option for a simple project that has no build system or need for configuration, and only needs for the documented HTML elements and components to have the proper styling and functionality (with the default theming).

### Build process
Within the Design System project, `dist/` files are compiled from `src/` files. Both `dist/` and `src/` files are the product, they're just used downstream in different contexts.

We use [gulp.js](https://gulpjs.com/) as the build process (see [gulpfile.js](https://github.com/jacecotton/tcds/blob/main/gulpfile.js)). The tasks and their dependencies are as follows:

* `styles` — `src/styles/@tcds/` to `dist/styles/`
  * [sass](https://www.npmjs.com/package/sass), [gulp-sass](https://www.npmjs.com/package/gulp-sass) (style pre-processing)
  * [postcss](https://www.npmjs.com/package/gulp-postcss) (style post-processing)
    * [autoprefixer](https://www.npmjs.com/package/autoprefixer) (browser compatibility)
* `scripts` — `src/scripts/` to `dist/scripts/`
  * [webpack](https://www.npmjs.com/package/webpack-stream) (module bundling)
    * [babel-loader](https://www.npmjs.com/package/babel-loader), [@babel/core](https://www.npmjs.com/package/@babel/core), [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env) (browser compatibility)
* `icons` — `src/icons/` to `dist/icons/`
  * [imagemin](https://www.npmjs.com/package/gulp-imagemin) (file minimization)
