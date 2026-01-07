## Directory structure

```
src/
├── components/
│   └── [component]/
│       ├── [component].component.yml
│       ├── [component].js
│       ├── [component].scss
│       └── [component].twig
├── fonts/
│   └── [font]/
│       └── [font].woff2
├── js/
│   ├── index.js
│   ├── lit-element/
│   └── ...
├── scss/
│   ├── _tokens.scss
│   ├── _variables.scss
│   └── ...
└── tokens/
    ├── _tokens.json
    └── ...
```

## Build process

**The most important thing is that the build artifacts `components/` and `dist/` are co-located.** The former depends on the presence of the latter (shared JS, CSS, fonts, etc.)

Currently, we just build them to the root of the project, which doubles as a Drupal theme. So, in a Drupal project, the build artifacts are located under:

```
/themes/custom/tcds/components
/themes/custom/tcds/dist
```

For more details on the build process of respective artifacts, see `src/**/README.md` files.

| Script | Function |
| ------ | -------- |
| `npm run build` | Build all artifacts |
| `npm run build:icons` | Build icons |
| `npm run build:tokens` | Build tokens |
| `npm run build:css` | Build CSS |
| `npm run build:js` | Build `src/js` and `src/components/**/*.js` assets. |
| `npm run build:components:assets` | Build component `src/components/**/*.{twig,component.yml}` assets. |
| `npm run build:components:css` | Build component `src/components/**/*.scss` assets. |

## Development dependencies

| Dependency                          | Version | Scope                      | Purpose                                                                                                                    |
| ----------------------------------- | ------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `@babel/core`                       | 7.28.5  | `src/components`, `src/js` | Browser compatibility for modern JavaScript syntax and APIs.                                                               |
| `@babel/plugin-proposal-decorators` | 7.28.0  | `src/components`           | Babel plugin for decorators (used in `LitElement` components, currently a TC39 stage 3 proposal).                          |
| `@babel/preset-env`                 | 7.28.5  | `src/components`, `src/js` | Configurable Babel environment presets.                                                                                    |
| `@rollup/plugin-babel`              | 6.1.0   | `src/components`, `src/js` | Babel plugin for Rollup bundler.                                                                                           |
| `@rollup/plugin-node-resolve`       | 16.0.3  | `src/components`, `src/js` | Helps Rollup resolve and bundle `node_modules` dependencies from within our JavaScript files.                              |
| `cpx2`                              | 8.0.0   | `build:` scripts           | Cross-platform, glob-enabled, watchable file copying command line tool (`cpx` alternative).                                |
| `lit`                               | 3.3.1   | `src/components`           | JavaScript library for building web components.                                                                            |
| `rimraf`                            | 6.1.2   | `build:` scripts           | Cross-platform recursive file deletion (for cleaning up artifacts during rebuild).                                         |
| `rollup`                            | 4.53.3  | `src/components`, `src/js` | JavaScript bundler.                                                                                                        |
| `rollup-plugin-lit-css`             | 6.0.0   | `src/js`                   | Helps import `.css` files from within `.js` files for use as constructed `CSSStyleSheets` (that `LitElement`s can adopt).  |
| `sass`                              | 1.95.0  | `src/scss`                 | SCSS compiler for stylesheets.                                                                                             |
| `style-dictionary`                  | 5.1.1   | `src/tokens`               | Compiles DTCG-compliant JSON token files to different formats (SCSS maps, CSS custom properties, JavaScript objects, etc.) |

## Dotfiles

| File              | Purpose                                                                                                                |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `.editorconfig`   | Style and formatting options for editors to inherit.                                                                   |
| `.eslintignore`   | Files that should not be checked or touched by ESLint.                                                                 |
| `.eslintrc`       | Non-standard ESLint configuration rules and preset opt-ins.                                                            |
| `.gitignore`      | Files and directories that should not be tracked in Git (build artifacts, environment files, etc.)                     |
| `.htmlhintrc`     | HTMLHint configuration rules for HTML files (enabled in `.vscode/settings.json`, applies to both `.html` and `.twig`). |
| `.prettierignore` | Files that should not be checked or touched by Prettier.                                                               |
| `.prettierrc`     | Non-standard Prettier configuration rules.                                                                             |
