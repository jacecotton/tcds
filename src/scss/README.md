## Stylesheet bundle

This directory contains our base styles.

> **Note:** This directory does not contain component styles. Those are instead found in the [`components`](../components/README.md) directory, as per the [Single Directory Components](https://www.drupal.org/docs/develop/theming-drupal/using-single-directory-components) architecture. Components use these styles as a dependency.

### Directory structure

Files that contain actual styles are classified as one of three types:

- "props" (`_props.scss` or `props/*.scss`) — contains custom properties / scoped tokens
- "theming" (`_theming.scss` or `theming/*.scss`) — contains default styles for native HTML elements
- "utilities" (`_utilities.scss` or `utilities/*.scss`) — contains opt-in `!important`-flagged utility classes

They're separated this way to allow for proper ordering (utilities trump theming styles, and both of these can override/define their own props).

Props and utilities are filed under folders by area of concern (mostly corresponding to the [`tokens`](../tokens/README.md) structure):

```
scss/
├── color/
├── icons/
├── layout/
└── typography/
```

Theming files are kept in a dedicated folder, named for the elements or type of elements they style:

```
scss/
└── theming/
    ├── _body.scss
    ├── _copy.scss
    └── ...
```

Per common Sass conventions, Sass utilities like mixins and functions are stored in `abstracts/` folders:

```
scss/
├── abstracts/
├── layout/
│   └── abstracts/
└── ...
```

@todo

- `_gen`
- `typography/fonts` — must import before props
- the three bundles: `icons`, `shared`, `tcds`

## Authoring

### Sass conventions

Relevant Sass conventions that should be observed:

- `_` files
- `_index` files
- `@use` and `@forward` instead of `@import`

### Token conventions

- Global tokens in `tokens/` (most tokens)
- Semantic layer (selector-modulated tokens) in this directory

### Utility class philosophy

We do not generate utility classes for every possible property, or even for each design token.

Instead we use a hybrid approach, providing utility classes for styles that commonly need to be set conditionally and at point of component consumption/instantiation (e.g. vertical padding for sections, alignment for text and images, background and text colors for containers, etc.)

Our utility classes are also non-atomic and not guaranteed to be 1-to-1 with property-value pairs. For example, `.font-size-*` utility classes also set `line-height` to enforce consistent typography and unburden site builders from needing to remember style minutiae.

Treat utility classes as "trump classes"—they're opt-in at point of component consumption, so they should override all other default styles (thus use `!important`, import last in stylesheet bundles, etc.)

## Build process

## Consumption

- How to use each bundle
