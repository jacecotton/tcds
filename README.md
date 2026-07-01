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
