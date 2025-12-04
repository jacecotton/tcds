# Architecture: tcds-foundation

This package contains the global styles, Sass abstracts, and utility classes for the Texas Children's Design System. It serves as the styling foundation for components and applications.

## Structure

```
packages/tcds-foundation/
├── src/
│   ├── abstracts/   # Sass functions, mixins, and variables
│   ├── layout/      # Grid system and layout utilities
│   ├── theming/     # Global theme styles (reset, typography, colors)
│   ├── typography/  # Typography utilities and styles
│   ├── foundation.scss # Main entry point
│   └── shared.scss     # Shared styles
└── dist/            # Compiled CSS output
```

## Tooling

- **Sass**: The primary preprocessor used for styling. Dart Sass (`sass`) is used for compilation.
- **PostCSS**: Used for processing CSS (e.g., autoprefixing), though the primary build command currently relies on Sass's compressed output.

## Build Process

The build uses the Sass CLI to compile `src` to `dist`:

```bash
sass --load-path=../../node_modules --style=compressed --source-map src:dist
```

This maps the `src` directory structure to `dist`, compiling `.scss` files to `.css`.

## Development

To work on this package:

```bash
npm run dev --workspace=packages/tcds-foundation
```

This runs Sass in watch mode, recompiling files whenever source files change.

## Special Notes

- **Abstracts**: The `abstracts/` directory contains Sass tools that don't output CSS directly but are used by other files.
- **Direct Compilation**: Unlike some setups that bundle everything into one file via a JS bundler, this package uses Sass directly to preserve the file structure where appropriate or compile specific entry points.
