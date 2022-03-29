## `src/styles/@tcds`

This folder contains all uncompiled stylesheet source code, written in SCSS and compiled to CSS with [Sass](https://www.npmjs.com/package/sass).

We place all styles in a `@tcds` directory to fake a path namespace. When `@use`-ing or `@forward`-ing a file, Sass automatically searches for files in whatever [load paths](https://sass-lang.com/documentation/at-rules/use#load-paths) are provided. But for clarity and consistency, all TCDS style modules must be imported from the `@tcds` folder, as if it were a namespace.

In a downstream project, the path `./node_modules/@txch/tcds/src/styles/` should be provided in the `sass` callback's `includePaths` configuration option. Then, TCDS style modules can be imported as `@use "@tcds/..."`.

### Forwarding members

Every style module has an `_all.scss` file, which `@forward`s all members (variables, mixins, functions) that belong to the module. You can import and use these members with `@use`.

The root [`_all.scss` file](https://github.com/jacecotton/tcds/blob/main/src/styles/%40tcds/_all.scss) `@forward`s the `_all` file from each style module, so it most cases it's useful to just `@use` this file.
