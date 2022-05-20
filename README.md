[![npm version](https://badge.fury.io/js/@txch%2Ftcds.svg)](https://www.npmjs.com/package/@txch/tcds)
[![documentation](https://img.shields.io/badge/Documentation-Here-informational)](https://tcds.herokuapp.com/)

# Texas Children's Design System

[Texas Children's Design System](https://tcds.herokuapp.com/) (TCDS) is a centralized library of web components, design patterns, and design resources. It aims to improve standardization, efficiency, and scalability by providing a single, custom front-end framework for building websites at scale.

**Note:** The Design System is currently in **pre-release**. Not all features currently documented are available or ready for production. You can track progress for the release of **v1.0.0** at the [official release milestone](https://github.com/jacecotton/tcds/milestone/1).

## Getting started

To install the Design System in a project, run the following from your project's directory:

```
npm install --save-dev @txch/tcds
```

To import and use Design System assets with your project, you will need to configure a build process and your environment as described in the [Getting Started](https://tcds.herokuapp.com/getting-started) page of the documentation site.

After that, you will be able to bring in Design System assets and bundle it with your other code using the `@tcds` path namespace. Examples:

**Twig** (components)

```twig
{{ include("@tcds/components/button/button.html.twig", {
  label: "Click me",
}) }}
```

**Sass** (styling)

\[main.scss\]
```scss
// Brings in all actual styles to be compiled to CSS (component styles, utility
// classes, etc.)
@use "@tcds/tcds";

// Alternatively, you can choose to only import specific packages.
@use "@tcds/components";
@use "@tcds/typography";

// Or even specific modules within a package.
@use "@tcds/components/button";
@use "@tcds/typography/fonts";
```

\[_all.scss\]
```scss
// By @forward-ing the @tcds package here, this file can be @use-d from any
// other file to access TCDS utilities (variables, functions, mixins, etc.),
// without having to re-import from the @tcds package each time.
@forward "@tcds/all" with (
  // Configuration variables can be set here.
);
```

**JavaScript**

```javascript
// Brings in all modules to be compiled to JavaScript.
import "@tcds/index.js";

// Alternatively, you can choose to only import specific modules.
import Tabs from "@tcds/components/Tabs.js";
```

## Contributing

**Developers:** For guidance on how to contribute to this project, see [CONTRIBUTING](CONTRIBUTING.md). To familiarize yourself with the repository and project setup, see [ARCHITECTURE](ARCHITECTURE.md).

**Designers, editors, and feedback:** For guidance on how to contribute to the Design System as a whole, see the [Contributing](https://tcds.herokuapp.com/contributing) page on the documentation site.

## See also

* [tcds-site](https://github.com/jacecotton/tcds-site) — Repository for the documentation site
