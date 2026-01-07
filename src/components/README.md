## Components
### Directory structure
We follow the [Single Directory Components](https://www.drupal.org/docs/develop/theming-drupal/using-single-directory-components/) architecture for optimal Drupal compatibility.

Per Drupal theming requirements, the `components/` directory is output to root, rather than `dist/` (with the other assets).

### Authoring
Each component generally has the following files:
* `[component].twig`
* `[component].component.yml`
* `[component].js` (optional)
* `[component].styles.js` (optional — for shadow DOM CSS)
* `[component].scss` (optional — for light DOM CSS)

We use the [Lit](https://lit.dev/) library for authoring components as custom elements (where applicable).

### Build process
Rollup handles building component JS files, via the `build:js` script.

`[component].twig` and `[component].component.yml` files are copied over to the [output directory](#directory-structure) as-is, via the `build:components:assets` script.

`[component].scss` files are compiled to CSS via the `build:components:css` script.