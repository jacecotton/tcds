Completely informal roadmap here, just stashing loose notes about current thinking.

## Architecture and distribution channels
Source repository:

```
.
├── package.json              (package: @txch/tcds)
└── packages
    ├── tokens
    │   ├── package.json      (package: @txch/tokens)
    │   ├── src
    │   │   └── *.yml
    │   └── dist
    │       ├── js
    │       │   └── *.js      (export { JSON-like })
    │       └── scss
    │           └── *.scss    ($category: ( sass:map ))
    ├── media
    │   ├── package.json      (package: @txch/media)
    │   ├── src
    │   │   ├── fonts/**/*.woff2
    │   │   └── images
    │   │       ├── **/*.png|jpg
    │   │       └── icons/**/*.svg
    │   └── dist
    │       ├── fonts/**/*.woff2
    │       └── images
    │           ├── **/*.png|jpg
    │           └── icons/**/*.svg
    ├── foundation
    │   ├── package.json      (package: @txch/foundation; deps: @txch/tokens, @txch/media)
    │   ├── src
    │   │   ├── color
    │   │   │   ├── _props.scss
    │   │   │   ├── _utilities.scss
    │   │   │   └── _index.scss
    │   │   └── icons
    │   │       └── _props.scss
    │   └── dist
    ├── components
    │   ├── package.json      (package: @txch/components; deps: @txch/foundation)
    │   ├── src
    │   │   ├── accordion
    │   │   │   ├── accordion.js
    │   │   │   ├── accordion.scoped.css
    │   │   │   ├── accordion.shared.css
    │   │   │   └── accordion.html.twig
    │   │   └── … other component folders …
    │   └── dist
    │       ├── js
    │       │   └── *.js
    │       ├── css
    │       │   └── *.css
    │       └── twig
    │           └── *.html.twig
    └── templates
        ├── package.json      (package: @txch/templates; deps: @txch/components)
        ├── src
        └── dist
```

A root `dist/` folder is generated from this in a release pipeline job (not the build process, as we don't want it kept in the repo).

All it does is take `/packages/**/dist` and copies it to `/dist`, collating all the folders (except for a quick `twig/` &rarr; `components/` rename). (Important note: `/packages/tokens/dist` is gitignored and ephemeral, only used to generate other package's `dist/` folders, so its contents are not included).

```
.
├── css
│   └── *.css
├── js
│   └── *.js
├── images
│   ├── *.(jpg|png)
│   └── icons
│       └── **/*.svg
├── fonts
│   └── **/*.woff2
└── components
    └── *.twig
```

This is then what is archived and pushed to NPM. The NPM package also includes the original `/packages/**/src` files too though, in case downstream users want access to raw modules and utilities. But the archive doesn't include that, only `dist/`.

We can then take that agnostic release and easily turn it into a Drupal module by simply adding:

```
.
├── tcds.info.yml
├── tcds.libraries.yml
├── css
│   └── *.css
├── js
│   └── *.js
├── images
│   ├── *.(jpg|png)
│   └── icons
│       └── **/*.svg
├── fonts
│   └── **/*.woff2
└── components
    └── *.twig
```

This is what we'll make available for install via Composer.

SCSS files, and possibly JS modules, need a public path to reference, especially for example in `@font-face` declarations, and `--tcds-icon-...: url(path?)` props. The solution here is to keep a `/packages/foundation/src/config/_public-path.scss` file, which defines a `$public-path` variable and is `@forward`ed by the Sass entrypoint. By default, the variable is going to be set to `/npm/@txch/tcds@3.0.0/dist` (jsDelivr-friendly). However:

On `npm install`, if a `--assets-dest` (or `--o`) flag is present, a `postinstall` script is going to override this file, setting `$public-path` to either:

* `/`, assuming that the installing `package.json` file lives inside the root-most public directory.
* If a Drupal theme context is detected, it will get the value from `drush php-eval "print drupal_get_path('theme', '<name?>');"`
* The value of `--copy-assets-into`, which might be `.`, in which case it remains `/`, or might be `./assets` or `assets`, in which case `$public-path` will be `/assets`. If the Drupal context applies, then the value of `--copy-assets-to` will be *added* to the value of the `drush` command.
* The value of `--public-path` exactly as-is, as a last resort.

The Design System is then going to be rebuilt, and the `dist/` folder contents are going to be copied into `cwd` (again assuming the presence of `--assets-dest`).

If installing as a module (or rather, probably when we *generate* the module), `$public-path` is going to be rewritten to `/modules/(custom|contrib?)/tcds`.

### Foundation dependency on Media
As part of Media's build step, it should generate a manifest of its icon directory in SCSS, where folders under `dist/images/icons/` are list keys, and filenames therein are list items.

Foundation then looks at these to recursively generate CSS custom properties and utility classes corresponding to the files made available by the Media package.

Thinking so far for settling on this: This is an acceptable forward-dependency relationship, makes more sense than building a manifest within Foundation based on Media's contents and then storing it in `src/`, root, or a `build/output/` folder (which is unintuitive).

## Documentation
The docsite contains top-level menu sections for the **Foundation**, **Components**, and **Templates** packages. Notably, it does not have Tokens or Media sections.

The reason is because Tokens and Foundation have the same module identifiers, so everything can be documented in Foundation, in the context of how Foundation consumes the tokens.

Media is more just behind the scenes info. The icon library can be documented in Foundation > Icons, fonts can be documented in Foundation > Typography, etc. The fact that they're organized this way in the codebase shouldn't really be relevant to consumers, only developers and maintainers, who can visit the repo for that info (and its wiki for documentation on it).

```
Introduction
  Installation                -- NPM, Drupal module, CDN, archive download.
  Architecture                -- Explain the package setup, module endpoints,
                                 building the DS yourself, etc.
  Other resources
    Brand guidelines          -- The Design System is *downstream* of and
                                 *implements* the brand guidelines, but it is
                                 not the source of truth for them.
    Source code documentation -- Link to GitHub wiki, which documents
                                 architecture, coding style guide, roadmap, etc.
Foundation                    -- Includes documentation of custom props and
                                 utility classes, as well as general standards
                                 and usage guidelines.
  Introduction                -- Explain design tokens, and how they're used for
                                 props and utility classes here.
  Color
  Icons                       -- Includes info on the whole library even though
                                 the icon resources are kept in the Media
                                 package. Components > Icon just goes over the
                                 custom element API, but links to Foundation > Icons.
  Layout
    Aspect ratio
    Flex & grid
    Space & size
  Motion
    Animations
    Transitions               -- Add ease-in preset for things fading out, ease-
                                 out preset for things fading in, mirroring
                                 Adobe Spectrum.
  Surface
    Border radius
    Box shadow
  Themed elements
    Headings
    etc...
  Typography                  -- Themed elements > Headings just implements the
                                 Typography module; typography includes font
                                 stacks, type scale, line heights, font weights,
                                 etc., not specific *applications* like
                                 headings, captions, paragraphs, etc. (though it
                                 does provide guidance; for instance Mont/sans-
                                 serif should be used for UI, captions, and
                                 subheadings, while Calluna/serif should be used
                                 for headings and body copy).
  etc...
Components
Templates
```

The architecture for this docsite is:

* Source stored in top-level `docs/` as part of `@txch/tcds` repository.
* Consists of `.md` documents with front matter and `@txch/tcds` dependency for live component demos and Foundation dogfooding.
* SSG powered by 11ty with Nunjucks extension for site templating and rendering component Twig templates. Nunjucks and Twig are mostly mutually intelligible, and the former can be configured to render the latter. Only picking Nunjucks because there's basically no community Twig support in 11tyland.

## Typing
Look into adopting TypeScript for JS files (components, process scripts, etc.)

## Testing
### Browser testing
Some sort of browser testing like Playwright.

### Accessibility testing
Need to look into using [VoiceOver.js](https://www.npmjs.com/package/@accesslint/voiceover) and potentially other tools for automated screen reader tests.

Basic accessibility checks (axe, Lighthouse, etc.) should be automated as part of the PR and deployment workflow.

## Future tech
Keeping an eye on:

* [Declarative Custom Elements](https://github.com/WICG/webcomponents/blob/gh-pages/proposals/Declarative-Custom-Elements-Strawman.md), [DOM Parts Declarative Template API](https://github.com/WICG/webcomponents/blob/gh-pages/proposals/DOM-Parts-Declarative-Template.md), and [Signals](https://github.com/tc39/proposal-signals) to potentially revolutionize how we define custom elements, handle DOM updates, state, etc.
* [Reference Target for Cross-Root ARIA (Proposal)](https://github.com/WICG/webcomponents/blob/gh-pages/proposals/reference-target-explainer.md) to solve long-standing accessibility wrinkles with the Shadow DOM.
* [Design Tokens Community Group](https://www.w3.org/community/design-tokens/) — possibly follow this to normalize our own design tokens (would involve converting back to JSON).
* [HTML `focusgroup` (Explainer)](https://open-ui.org/components/focusgroup.explainer/) for better keyboard navigation and potentially native focus trapping?
* [`import` attributes `with` CSS types](https://chromestatus.com/feature/5205869105250304) to import shadow DOM stylesheets (TCDS currently supports the syntax but transforms module imports to inlined CSS via a custom Rollup plugin).
* [`import` attributes `with` HTML types](https://github.com/WICG/webcomponents/blob/gh-pages/proposals/html-modules-explainer.md) to potentially store custom element templates in separate files as well (possibly related to or mooted by the DCE, DOM Parts, and Signals ideas).
* [`link[rel=expect]`](https://webstatus.dev/features/link-rel-expect?sort=name_asc&start=75) to potentially natively resolve FOUC/CLS issues with custom elements (rather than CSS animation hack) — might be mooted by DCEs.
* [Nunjucks 4](https://github.com/nunjucks/nunjucks4) for revived maintenance and possible compatibility improvements/parity with Twig developments (might contribute to this).

Need to think about:
* CSS layers
