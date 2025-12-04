# Architecture: tcds-identity

This package manages the core identity assets of the Texas Children's Design System, including fonts, icons, logos, and design tokens.

## Structure

```
packages/tcds-identity/
├── src/
│   ├── fonts/       # Web font files (woff2, etc.)
│   ├── icons/       # SVG icons
│   ├── logos/       # Brand logos
│   └── tokens/      # Design tokens (JSON)
├── scripts/
│   ├── build-tokens.js         # Style Dictionary build script
│   └── create-icon-manifest.js # Generates icon manifest JSON
└── dist/            # Generated output
```

## Tooling

- **cpx**: Used to copy static assets (fonts, icons, logos) from `src` to `dist`.
- **Style Dictionary**: Used to transform design tokens from JSON into various formats (CSS variables, SCSS variables, JS objects).
- **Node Scripts**: Custom scripts in `scripts/` handle specific build tasks like icon manifest generation.

## Build Process

The `build` script orchestrates several sub-tasks:

1.  **Fonts**: Copies files from `src/fonts` to `dist/fonts`.
2.  **Icons**: Copies SVGs to `dist/images/icons`.
3.  **Tokens**: Generates `dist/tokens/_icons.scss` (Sass map) and `dist/tokens/icons.css` (CSS custom properties) with base64 encoded data URIs.
4.  **Logos**: Copies files to `dist/images/logos`.
5.  **Tokens**: Runs `scripts/build-tokens.js` to generate token outputs in `dist/tokens`.

## Development

To work on this package:

```bash
npm run dev --workspace=packages/tcds-identity
```

This runs `cpx` in watch mode for assets. Note that token generation currently requires a manual rebuild or a restart of the watcher if `src/tokens` changes, as it is handled by a Node script.

## Special Notes

- **Icon Manifest**: The `create-icon-manifest.js` script scans the `src/icons` directory and creates a JSON file listing all available icons. This is useful for consuming applications to know what icons are available without listing the directory.
