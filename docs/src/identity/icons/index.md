---
title: Icons
description: Icons are illustrative aids for enhancing understanding, supplementing meaning, and reinforcing brand style and tone.
eleventyNavigation:
  key: Icons
  parent: Identity
  order: 3
---

{% embed "tcds:tabs" with {
  heading_level: "h2",
  tabs: [
    {
      title: "Designers",
      content: "designers",
    },
    {
      title: "Editors",
      content: "editors",
    },
    {
      title: "Developers",
      content: "developers",
    },
  ],
} %}
{% block designers %}

<h3>Library</h3>

#### Primary icons
Use primary icons for decoration and navigation assistance, such as in the [Quick Links](/components/quick-links) component.

{% embed "./_includes/library.twig" with {
  category: "primary",
  tokens: tokens,
} %}{% endembed %}

#### Utility icons
Use utility icons in user interface elements, like buttons and other controls in components.

{% embed "./_includes/library.twig" with {
  category: "utility",
  tokens: tokens,
} %}{% endembed %}

#### Media icons
Use media icons in teaser cards and article heroes to indicate the category of content.

{% embed "./_includes/library.twig" with {
  category: "media",
  tokens: tokens,
} %}{% endembed %}

#### Brand icons
Use brand icons for links to social media and to otherwise indicate external services.

{% embed "./_includes/library.twig" with {
  category: "brand",
  tokens: tokens,
} %}{% endembed %}

{% endblock %}
{% block editors %}

### Best practices
Use icons as visual aids to enhance understanding and anchor user attention.

{% embed "_includes/dont-do.twig" with {
  dont: "use icons by themselves, as they may not always have well understood meaning.",
  do_this: "use icons with text or other elements to supplement meaning and support recognition.",
} %}
{% block dont %}
<tcds-icon icon="amenities" class="text-2xl"></tcds-icon>
{% endblock %}
{% block do_this %}
<span class="flex gap-md font-family-ui"><tcds-icon icon="amenities" class="text-2xl"></tcds-icon> See amenities</span>
{% endblock %}
{% endembed %}

When selecting icons, always consider their implied meaning over their decorative value.

{% embed "_includes/dont-do.twig" with {
  dont: "use common icons in novel ways.",
  do_this: "use icons for their most common meaning.",
} %}
{% block dont %}
<span class="flex gap-md font-family-ui"><tcds-icon icon="search" class="text-2xl"></tcds-icon> Expand view</span>
{% endblock %}
{% block do_this %}
<span class="flex gap-md font-family-ui"><tcds-icon icon="search" class="text-2xl"></tcds-icon> Search</span>
{% endblock %}
{% endembed %}

<p>Consider carefully whether you need an icon. Icons are decorative and should be optional.</p>

{% embed "_includes/dont-do.twig" with {
  dont: "use icons where they're not needed.",
  do_this: "ensure icons are meaningful and relevant.",
} %}
{% block dont %}
<span class="flex gap-md font-family-ui"><tcds-icon icon="texas-childrens" class="text-2xl"></tcds-icon> About us</span>
{% endblock %}
{% block do_this %}
<span class="flex gap-md font-family-ui"><tcds-icon icon="mychart" class="text-2xl"></tcds-icon> MyChart</span>
{% endblock %}
{% endembed %}

{% endblock %}
{% block developers %}

### Library
Icon tokens are composed of the icon category and name, with each category being derived from subfolders in the Design System's `src/images/icons/` directory.

See [&sect; CSS custom properties](#css-custom-properties) and [&sect; JavaScript exports](#javascript-exports) below for further usage information.

<style>td svg { height: 1.5em }</style>

|      | Token | CSS custom property | JavaScript constant |
| ---- | ----- | ------------------- | ------------------- |
{% for category, data in tokens.icon %}
{% for token, svg in data %}
| {{ svg["$value"] }} | `icon.{{ category }}.{{ token }}` | `--tcds-icon-{{ category }}-{{ token }}` | `Icon{{ "#{category}-#{token}"|split("-")|map(k => k|capitalize)|join("") }}` |
{% endfor %}
{% endfor %}


### Usage
#### HTML
You can render an icon directly using the [Icon](/components/icon) component.

{% embed "_includes/example.twig" with {open: true} %}
{% block content %}
<tcds-icon icon="testing" style="font-size: 2.5rem"></tcds-icon>
{% endblock %}
{% block code %}
<tcds-icon icon="testing"></tcds-icon>
{% endblock %}
{% endembed %}

Or you can use utility classes, which are generated in the form of `.tcds-icon--[icon]`, with optional `.tcds-icon--[category]` overrides. The default category in case of collisions is reverse alphabetical (e.g. `utility` prevails over `primary`). Example:

{% set icon_class_ex %}
<!-- icon.primary.conditions -->
<span class="tcds-icon--conditions"></span>
<!-- icon.media.conditions -->
<span class="tcds-icon--conditions tcds-icon--media"></span>{% endset %}

<pre class="example__code"><code>{{ icon_class_ex|highlight }}</code></pre>

These classes create a `1x1em`, `currentcolor`-filled square, with the corresponding icon used as the `mask-image`. The icon itself is a pseudo-element (by default `::after`).

To create the icon pseudo-element via `::before` (like if you want to prepend an icon to an existing element, without additional markup), you can use the `.tcds-icon--::before` modifier.

#### CSS custom properties
Custom properties are generated for each icon token (as `--tcds-icon-[category]-[icon]`), embedding the SVG code as encoded data-URIs in a CSS `url()`:

{% set css_custom_prop_ex %}
:root {
  --tcds-icon-brand-facebook: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024' fill='currentcolor'><path d='m750.3 575.9 28.4-185.2H601V270.6c0-50.7 24.8-100.1 104.4-100.1h80.8v-158S712.9 0 642.6 0C496.3 0 400.5 88.7 400.5 249.4v141.3H237.8v185.2h162.7V1024h200.2V575.9h149.5Z'/></svg>");
}{% endset %}
<pre class="example__code"><code>{{ css_custom_prop_ex|highlight }}</code></pre>

You can use these custom properties anywhere you can use an image `url()`, such as `background-image` or `mask-image`.

#### Sass maps
Sass maps are generated for each icon category and name. This can be helpful to iterate through the icon library, but the values should always be referenced via [custom properties](#css-custom-properties).

{% set sass_map_ex %}
@use "sass:map";
@use "_gen/tokens" as *;

@debug map.get($tokens, "icon", "primary"); // => ("accessibility": url(...), "alert": ...){% endset %}
<pre class="example__code"><code>{{ sass_map_ex|highlight }}</code></pre>

#### JavaScript exports
You can import raw SVG code from `/src/js/_gen/tokens.js` in the form of `Icon[Category][Icon]`:

{% set js_ex %}
/* src/js/some-script.js */
import {IconBrandMychart} from "@/js/_gen/tokens.js";

console.log(IconBrandMychart); // => <svg ...>{% endset %}
<pre class="example__code"><code>{{ js_ex|highlight }}</code></pre>

{% endblock %}
{% endembed %}
