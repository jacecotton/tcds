## Installation

To install the Design System, you will first need to download and include the static CSS and JavaScript assets (see [&sect; Assets](#assets)).

From there, you can use components and patterns by copying and pasting the example HTML included in the documentation.

If you would like to use Twig components, you'll first have to set up an environment with Twig, and then download the Twig component files (see [&sect; Twig](#twig)).

### Assets
#### Node Package Manager

Install the Design System via NPM:

```terminal
npm install @tch/tcds
```

Include in your project:

```html
<head>
  ...
  <link rel="stylesheet" href="/node_modules/@tch/tcds/tcds.min.css">
</head>
<body>
  ...
  <script async src="/node_modules/@tch/tcds/tcds.min.js"></script>
</body>
```

#### From CDN

You can load the Design System straight from a CDN via UNPKG, powered by Cloudflare:

```html
<link rel="stylesheet" href="https://unpkg.com/@tch/tcds/tcds.min.css">
<script async src="https://unpkg.com/@tch/tcds/tcds.min.js"></script>
```

#### Download archive

You can download the Design System files and place them in your project as desired.

* [Download assets (.zip)](/downloads/tcds-assets.zip) (0kb)

If you wish to include uncompiled assets and compile them yourself, you can download them and the Gulp file, then place them in your project:

* [Download uncompiled assets (.zip)](/downloads/tcds-source.zip) (0kb)
* [Download Gulp file (.js)](/downloads/gulpfile.js) (0kb)

### Twig

#### Setting up an environment

There are multiple ways to use Twig in your environment.

* **Drupal** — The recommended way is to use [Drupal](https://www.drupal.org/) as a CMS, which comes with Twig as the native templating engine.
* **Symfony** — You can also set up a plain [Symfony](https://www.symfony.com/) project, the framework that powers Drupal. This is the recommended option for a headless PHP-based project.
* **Node.js** — If you wish to create a headless JavaScript-based project, you can use a [Node.js](https://nodejs.org/) environment with [Twing](https://github.com/NightlyCommit/twing), a JavaScript port of Twig.
  * For convenience, we've provided a [Node.js starter template](https://github.com/jacecotton/tcds-node-starter) to clone with the TCDS included.

#### Including the templates

The component Twig files will need to be included directly in your project's template directory, which you can download an archive of here.

* [Download components (.zip)](/downloads/tcds-components.zip) (0kb)