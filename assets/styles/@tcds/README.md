## `assets/styles/@tcds`

This folder contains all uncompiled stylesheet source code, written in SCSS and compiled to CSS with [Sass](https://www.npmjs.com/package/sass).

We place all styles in a `@tcds` directory to fake a path namespace. When `@use`-ing or `@forward`-ing a file, Sass automatically searches for files in whatever [load paths](https://sass-lang.com/documentation/at-rules/use#load-paths) are provided. But for clarity and consistency, all TCDS style modules must be imported from the `@tcds` folder, as if it were a namespace.

In a downstream project, the path `./node_modules/@txch/tcds/assets/styles/` should be provided in the `sass` callback's `includePaths` configuration option. Then, TCDS style modules can be imported as `@use "@tcds/..."`.

### Granular package imports

Each package bundles its own styles in an `_index.scss` file, to be compiled to CSS. Files named as such can simply be referred to by their folder name, so

```css
@use "@tcds/layout";
```

will bring in all styles for the layout package (pointing to the file `@tcds/layout/_index.scss`).

### Forwarding abstracts

Every package has an `_all.scss` file, which `@forward`s all abstracts (variables, mixins, functions) that belong to the package. You can import and use these abstracts with `@use`:

```css
@use "@tcds/layout/all" as *;
```

The root [`_all.scss`](https://github.com/jacecotton/tcds/blob/main/assets/styles/%40tcds/_all.scss) file `@forward`s each package's `_all.scss` file, so in most cases it's useful to just `@use` this "master" file. So from any file in the styles folder, you can

```css
@use "@tcds/all" as *;
```

to have access to every abstract from each package.
