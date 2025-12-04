## @txch/tcds-foundation

The `tcds-foundation` package creates the Design System's main stylesheet.

## Source code

The `src/` folder contains all the Sass (SCSS) source code for the library.

Each subfolder roughly matches a module from the [tcds-identity](../tcds-identity/README.md) package (color, icons, layout, motion, typography).

Most contain one or both of the following (files prefixed with `_` are partials and are not generated as separate CSS files):

- `_props.scss` — custom properties derived from identity tokens (typically either `:root`-scoped or scoped to `data-theme` or `data-mode` attributes).
- `_utilities.scss` — utility classes, largely derived from tokens but also manually defined (most flagged with `!important` as they're intended to trump any other styles).

Notable exceptions:

- `theming/` folder — contains default styles for unclassed elements.
- `typography/` folder — contains `@font-face` declarations.

The directory uses the following architecture pattern:

- Each folder has an `_index.scss` entrypoint that imports all other files in the folder.
- The root of `src/` contains three special entrypoints, so that different styles can be loaded in the right order:
  - `_props.scss` — imports `@font-face` declarations, custom properties derived from tokens in the `tcds-identity` package, and all subfolder `_props.scss` files.
  - `_theming.scss` — imports all subfolder `_theming.scss` files.
  - `_utilities.scss` — imports all subfolder `_utilities.scss` files (imported last so they trump).

## Distribution

The `dist/` folder contains two bundles:

| Bundle           | Description                                                                  | Size (gzipped) |
| ---------------- | ---------------------------------------------------------------------------- | -------------- |
| `foundation.css` | All styles (`@font-face`, `props`, `theming`, `utilities`, and `@keyframes`) | 8.26 KB        |
| `shared.css`     | Non-inherited styles (`theming`, `utilities`, and `@keyframes`)              | 5.71 KB        |

The `foundation.css` bundle should be loaded in the `<head>` of a page (or imported by the main stylesheet of a consuming website).

Because `@font-face` declarations and custom properties are inherited by shadow roots, you only need to adopt `shared.css` in the shadow DOMs of custom elements. The [`tcds-components` package](../tcds-components/README.md) provides a `sharedCSS` import for this purpose (using `rollup-plugin-lit-css`).
