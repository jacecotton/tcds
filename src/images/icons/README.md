## Icon library

This directory serves as our single source of truth for icons.

**Note:** We do not use icon fonts or sprite sheets. Instead, for performance and accessibility, icons can be consumed differently depending on use case (see [Consumption](#consumption)).

### Directory structure

Each subfolder in `icons/` represents a category. This is used to differentiate identically named icons, such as the "x" `utility` icon and the "X" `brand` logo. There are also different variations of the same icon; e.g. `media` icons are mostly compact versions of `primary` icons.

```
icons/
├── brand/
├── media/
├── primary/
└── utility/
```

### Authoring

To add an icon to the library, place the SVG file in a subfolder for the desired category. To add a category, create a new subfolder.

The [build process](#build-process) will handle populating the files into usable tokens, CSS properties, and components.

Best practices:

- Use a minimal amount of SVG code. The contents of each SVG file are used as embedded URLs in CSS custom property values. Check existing icon SVG code for an idea of the attributes you should consider removing. Use markup optimization options in the software used to create or edit the icons.
- Use `currentcolor` as `stroke` and `fill` values wherever applicable, and do not prescribe a fixed `width` and `height` (use `viewBox` instead). The [CSS implementation](#consumption) of the icons tries to render them like any other glyph in surrounding text (inheriting color and size).

### Build process

Icon SVGs are copied to the `/dist/images/icons` directory as-is via the `build:icons` script.

Icon tokens at `/src/tokens/_gen/icons.json` are derived from the `/src/images/icons` directory (also via `build:icons`). Subfolder and file names are used as category and icon names for the token path, e.g. `/icons/utility/check.svg` → `icon.utility.check`. The values of each token are the SVG contents of the corresponding file. Example:

```
{
  "icon": {
    "$type": "icon",
    "brand": {
      "facebook": {
        "$value": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024' fill='currentcolor'><path d='m750.3 575.9 28.4-185.2H601V270.6c0-50.7 24.8-100.1 104.4-100.1h80.8v-158S712.9 0 642.6 0C496.3 0 400.5 88.7 400.5 249.4v141.3H237.8v185.2h162.7V1024h200.2V575.9h149.5Z'/></svg>"
      },
      ...
    },
    ...
  }
}
```

The `build:tokens` script runs Style Dictionary to push these tokens to different formats: [Sass maps](#sass-maps) (at `/src/scss/_gen/_tokens.scss`), [CSS custom properties](#css-custom-properties) (at `/src/scss/_gen/icons.css`), and [JavaScript exports](#javascript-exports) (at `/src/js/_gen/tokens.js`).

> `icons.css` is separate from the main `tokens.css` file to allow for tree-shaking, as the icon bundle is relatively large.

### Consumption

> This document covers consuming icons within the codebase. For documentation about how Design System users consume icons, refer to the Texas Children's Design System product documentation.

#### CSS custom properties

Custom properties are generated for each icon token (as `--tcds-icon-[category]-[icon]`), embedding the SVG code as encoded data-URIs in a CSS `url()`:

```css
:root {
  --tcds-icon-brand-facebook: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024' fill='currentcolor'><path d='m750.3 575.9 28.4-185.2H601V270.6c0-50.7 24.8-100.1 104.4-100.1h80.8v-158S712.9 0 642.6 0C496.3 0 400.5 88.7 400.5 249.4v141.3H237.8v185.2h162.7V1024h200.2V575.9h149.5Z'/></svg>");
}
```

You can use these custom properties anywhere you can use an image `url()`, such as `background-image` or `mask-image`.

#### HTML classes

Classes are generated for each icon in the form of `.tcds-icon--[icon]`, with optional `.tcds-icon--[category]` overrides. The default category in case of collisions is reverse alphabetical (e.g. `utility` prevails over `primary`). Example:

```html
<!-- icon.primary.conditions -->
<span class="tcds-icon--conditions"></span>
<!-- icon.media.conditions -->
<span class="tcds-icon--conditions tcds-icon--media"></span>
```

These classes create a `1x1em`, `currentcolor`-filled square, with the corresponding icon used as the `mask-image`. The icon itself is a pseudo-element (by default `::after`).

To create the icon pseudo-element via `::before` (like if you want to prepend an icon to an existing element, without additional markup), you can use the `.tcds-icon--::before` modifier.

#### Sass maps

Sass maps are generated for each icon category and name. This can be helpful to iterate through the icon library, but the values should always be referenced via [custom properties](#css-custom-properties).

```scss
/* src/scss/some-stylesheet.scss */
@use "sass:map";
@use "_gen/tokens" as *;

@debug map.get($tokens, "icon", "primary"); // => ("accessibility": url(...), "alert": ...)
```

#### JavaScript exports

You can import raw SVG code from `/src/js/_gen/tokens.js` in the form of `Icon[Category][Icon]`:

```js
/* src/js/some-script.js */
import {IconBrandMychart} from "@/js/_gen/tokens.js";

console.log(IconBrandMychart); // => <svg ...>
```
