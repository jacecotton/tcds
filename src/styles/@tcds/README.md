## `src/styles/@tcds`

This folder contains all uncompiled stylesheet source code, written in SCSS and compiled to CSS with [Dart Sass](https://www.npmjs.com/package/sass).

We place all styles in a `@tcds` directory to "fake" a path namespace. Sass [load paths](https://sass-lang.com/documentation/at-rules/use#load-paths) are naive, automatically searching for files in whatever paths are provided when importing (`@use` or `@forward`). For clarity and consistency, all TCDS style modules must be imported from the `@tcds` folder, as if it were a namespace.

In a downstream project, the path `./node_modules/@txch/tcds/src/styles/` should be provided in the `sass` callback's `includePaths` configuration option. Then, TCDS style modules can be imported as `@use "@tcds/..."`.

Precompiled CSS (see [`/dist/styles/`](https://github.com/jacecotton/tcds/tree/main/dist/styles)) is not namespaced. See [`gulpfile.js` L34](https://github.com/jacecotton/tcds/blob/main/gulpfile.js#L34).
