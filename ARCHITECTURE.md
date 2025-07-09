## `packages/`
The `@txch/tcds` monorepo provides five packages, with cascading dependencies on each other:

|   | Package | Machine name | Description | `@txch` dependency |
| - | ------- | ------------ | ----------- | ---------- |
| 1 | **Tokens** | `@txch/tokens` | Design choices like typography units and color codes, single-sourced from YAML (`src/*.yml`) and distributed as Sass maps (`dist/scss/*.scss`) and JavaScript objects (`dist/js/*.js`). | None |
| 2 | **Media** | `@txch/media` | Static media assets like images, fonts, and icons, organized into folders by file type. | None |
| 3 | **Foundation** | `@txch/foundation` | All *base* CSS styles, including: global defaults to bare HTML elements (`elements`), opt-in utility classes (`utilities`), and custom properties/CSS variables (`props`; most of which are generated recursively from `@txch/tokens/dist/scss/*.scss`). | `@txch/tokens`<br>`@txch/media` |
| 4 | **Components** | `@txch/components` | Scripts, shadow DOM styles, and Twig templates for each component. | `@txch/foundation` |
| 5 | **Templates** | `@txch/templates` | Twig templates (with supporting CSS and JS) for content types and page layouts. Defines the basic structure and schema. Assumes clean, processed data, so limited logic. | `@txch/components` |

Dependencies between `@txch` packages and build step sequence are orchestrated as [npm workspaces](https://docs.npmjs.com/cli/v8/using-npm/workspaces).

## `scripts/`
The build process and some install hooks for the main package, as well as that of some other packages, invoke custom scripts kept in the top-level `scripts/` folder.

<style>
  table code { white-space: nowrap }
</style>

| Script | Description | Invoked by |
| ------ | ----------- | ---------- |
| `asset-config.js` | Generates a Sass file containing a config variable (`$public-path`) defining the browser-resolvable path to static assets (compiled JS and CSS, icons, fonts, etc.) and places it in `packages/foundation/` as `_config.scss`. It will default to a CDN-friendly (unpkg) path, but can be manually configured with flags (see [README &sect; Installation via npm](README.md#via-npm)). | `npm install` |
| `copy-assets.js` | Moves built assets from `node_modules/@txch/tcds` into the project directory it's installed on, in the path specified by the user with the `--copy-assets-to` flag (the presence of which is an enabling flag). Generates a `.tcds-manifest.json` file to keep track of which assets were moved over. | `npm install`
| `cleanup-assets.js` | Deletes the assets copied over by `copy-assets.js`, using `.tcds-manifest.json` as a reference. | * `preuninstall` hook<br>* `postinstall` hook

## `docs/`
Code for the Design System documentation site, powered by 11ty.

We intend to copy Twig templates over directly from the Design System, but render them via Nunjucks. Twig and Nunjucks are Jinja ports for PHP and JavaScript, respectively. While there are some divergences, they're mostly compatible.
