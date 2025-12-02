# Architecture: tcds-components

This package contains the Web Components library for the Texas Children's Design System, built using Lit.

## Structure

```
packages/tcds-components/
├── src/
│   ├── @shared/     # Shared utilities, decorators, and base classes
│   ├── [component]/ # Individual component directories (e.g., button, card)
│   │   └── [component].js
│   └── index.js     # Main entry point exporting all components
└── dist/            # Bundled output
```

## Tooling

- **Lit**: The library used for building Web Components.
- **Rollup**: The module bundler used to package the components.
- **Babel**: Used for transpiling JavaScript to ensure compatibility.
- **Terser**: Used for minifying the output.

## Build Process

The build is managed by `rollup.config.js`. Key features of the build configuration include:

1.  **Dynamic Entry Points**: The config scans `src/` for directories matching their contained `.js` file (e.g., `src/button/button.js`) and treats them as individual entry points.
2.  **Shared Chunk**: Common code (from `src/@shared` and `node_modules`) is split into a separate `shared` chunk to avoid duplication across component bundles.
3.  **Lit CSS**: The `rollup-plugin-lit-css` plugin allows importing `.css` or `.scss` files directly into Lit components as constructed stylesheets.
4.  **Bundled Dependencies**: Lit and other dependencies are bundled _into_ the output, ensuring the components are self-contained.

## Development

To work on this package:

```bash
npm run dev --workspace=packages/tcds-components
```

This runs Rollup in watch mode.

## Special Notes

- **`@shared` Alias**: An alias is configured to allow imports from `@shared` (mapping to `src/@shared`), simplifying internal imports.
- **Legacy Decorators**: Babel is configured to support legacy decorators (e.g., `@property`, `@customElement`) as required by Lit.
- **Manual Chunks**: The `manualChunks` configuration in Rollup explicitly groups shared code to optimize loading when multiple components are used.
