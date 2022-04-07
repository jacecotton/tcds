## `assets/styles/@tcds`

This folder contains all uncompiled stylesheet source code, written in SCSS and compiled to CSS with [Sass](https://www.npmjs.com/package/sass).

We place all styles in a `@tcds` directory to fake a path namespace. When `@use`-ing or `@forward`-ing a file, Sass automatically searches for files in whatever [load paths](https://sass-lang.com/documentation/at-rules/use#load-paths) are provided. But for clarity and consistency, all TCDS style modules must be imported from the `@tcds` folder, as if it were a namespace.

In a downstream project, the path `./node_modules/@txch/tcds/assets/styles/` should be provided in the `sass` callback's `includePaths` configuration option. Then, TCDS style modules can be imported as `@use "@tcds/..."`.

### Granular module imports

Each module bundles its own styles to be compiled to CSS in an `_index.scss` file. Files named as such can simply be referred to by their folder name, so

```css
@use "@tcds/layout";
```

will bring in all styles for the layout module.

### Forwarding members

Every style module has an `_all.scss` file, which `@forward`s all members (variables, mixins, functions) that belong to the module. You can import and use these members with `@use`:

```css
@use "@tcds/layout/_all" as *;
```

The root [`_all.scss`](https://github.com/jacecotton/tcds/blob/main/assets/styles/%40tcds/_all.scss) file `@forward`s each style module's `_all.scss` file, so in most cases it's useful to just `@use` this "master" file. So from any file in the styles folder, you can

```css
@use "@tcds/_all" as *;
```

to have access to every member from each module.
