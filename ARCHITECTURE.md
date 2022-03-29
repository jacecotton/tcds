**Work in progress.** See #5

## Architecture

This document describes the high-level architecture of Texas Children's Design System.

The Design System is ultimately just a collection of scripts, styles, templates, and SVG icons.

These assets are delivered in two options:

* `src/` — The *uncompiled* assets, installable as a dependency.
* `dist/` — The *precompiled* assets, linkable from a CDN.

Using the former requires a build system to compile the Design System along with a project's other code (see [Getting Started &sect; Local installation](http://tcds.herokuapp.com/getting-started#local-installation)). This is the best option for larger projects that require configuration (theming, extension, granular inclusion, etc.) or deeper integration with the Design System's tools (Sass utilities, JavaScript module exports, etc.)

The latter simply provides a single JavaScript bundle, a master stylesheet, and a collection of SVG icons. This is the best option for a simple project that has no build system or need for configuration, and only needs for the documented HTML snippets to have the proper styling and functionality.

* gulp.js for build process
* webpack.js for module bundling
* src/ for uncompiled assets to import, compile, and bundle with downstream project's other assets
* dist/ for precompiled assets to link from a CDN
