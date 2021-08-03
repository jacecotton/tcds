# Texas Children's Design System

This is the monorepo for the Texas Children's Design System and its associated documentation site.

Maintainers of the Design System should contribute to this repo.

* **Note:** This README is *not* intended to provide instruction on how to use the Design System, but how to *contribute* to and *maintain* it. For how to use the Design System, visit (texaschildrens.design)[https://tcds.herokuapp.com/]

## Setting up

After you've cloned the repository, install dependencies then start up a development environment:

```bash
$ npm install
$ npm run dev
```

This will start a local server on `localhost:3000` and watch for changes.

## Technology

### Backend

The documentation site uses a [Node.js](https://nodejs.org/en/) runtime with [Express.js](https://expressjs.com/) as the backend framework.

[Twing](https://github.com/NightlyCommit/twing) is used as a JavaScript port of [Twig](https://twig.symfony.com/), a templating language by [Symfony](https://symfony.com/), the framework behind [Drupal](https://drupal.org/), the CMS behind [Texas Children's](https://www.texaschildrens.org).

* **Note:** Using Twing and JavaScript for the documentation site enforces interoporability and platform agnosticism. What works on the documentation site should work in a Drupal environment and vice versa.

### Frontend

[Gulp.js](https://gulpjs.com/) is used as the build process for frontend code, allowing us to use:

* [Babel.js](https://babeljs.io/) for compiling new JavaScript to browser-compatible JavaScript.
* [terser](https://github.com/terser/terser) for optimizing JavaScript files.
* [gulp-concat](https://www.npmjs.com/package/gulp-concat) for packaging JavaScript files.
* [Sass](https://sass-lang.com/) (SCSS syntax) for pre-processing styles.
* [PostCSS](https://postcss.org/) (and its plugins) for post-processing styles.
* [clean-css](https://github.com/clean-css/clean-css) for CSS optimization.
* [imagemin](https://github.com/imagemin/imagemin) and [svgo](https://github.com/svg/svgo) for image optimization.
* [Markdown](https://github.com/sindresorhus/gulp-markdown) for HTML pre-processing.
* [map-stream](https://github.com/dominictarr/map-stream) for HTML post-processing (adding Twig compatibility).

Refer to [package.json](./package.json) for details and other dependencies, and the [gulpfile](./gulpfile.js) to better understand the build process specifics.

## Creating new pages

All pages should be written in Markdown in the [pages/](./pages) folder.

To create a route and metadata for your page, make an entry in [content.js](./content.js) inside the relevant parent object (or create another). Follow the schema of existing pages.

* **Note:** You can use `<twig></twig>` tags within markdown files to insert arbitrary Twig code. This allows you to use components from the Design System within pages. Without the tags, the Twig code will be sanitized (useful for displaying example Twig code).

## Project structure

```
├── src/
│   ├── local/
│   │   ├── scripts/
│   │   └── styles/
│   └── tcds/
│       ├── scripts/
│       └── styles/
├── public/
│   ├── dist/
│   │   └── tcds/
│   ├── scripts/
│   └── styles/
├── pages/
└── views/
    ├── templates/
    │   ├── partials/ 
    │   └── components/
    └── pages/
```

* `src/` contains uncompiled assets.
  * `local/` contains files for the documentation site.
  * `tcds/` contains files for the Design System itself.
* `public/` contains compiled static files.
  * `dist/tcds/` is the export package, contains all the compiled files for the Design System.
  * `scripts/` contains documentation site-specific scripts.
  * `styles/` contains documentation site-specific styles.
* `pages/` contains markdown files for each page in the documentation site, to be compiled as Twig to `views/pages/`.
* `views/` contains Twig files for rendering the site.
  * `templates/` contains non-page Twig files (to be included from within pages).
    * `partials/` contains partials for the documentation site.
    * `components/` contains the Design System's components.
  * `pages/` contains the Twig files compiled from the markdown files to be rendered on the frontend.