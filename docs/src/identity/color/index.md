---
title: Color
description: Color helps establish brand identity and create effective, appealing designs. It can impart meaning and tone, as well as influence focus and emotion.
eleventyNavigation:
  key: Color
  parent: Identity
  order: 2
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
    }
  ],
} %}
{% block designers %}

### Color palette
Texas Children's Design System provides a limited raw color palette.

#### Red
{% embed "./_includes/swatch.twig" with {palette: "red", tokens: tokens} %}
{% block content %}

Red 700 is the primary brand color, used in the Design System as an accent color (links, buttons, dividers, promotional headlines). Red 50 is used for [warm backgrounds](#warm).

**Use sparingly.** Reserve this color to leverage our brand identity, and never use it for generic emphasis. Its intensity can risk inadvertently diverting attention from the primary user flow.

**Avoid Red 700 for large fills.** This color is too intense for entire sections of content. Consider Red 50 instead, or if you need a dark tone, use the [dark theme](#dark).

{% endblock %}
{% endembed %}

<h4>Blue</h4>

{% embed "./_includes/swatch.twig" with {palette: "blue", tokens: tokens} %}
{% block content %}

Blue is the secondary color. Blue 50 is used as the [cool background](#cool), and Blue 900 the [dark background](#dark).

**Use as a secondary accent.** Blue 900 effectively signals secondary precedence while still drawing attention through stark contrast.

**Try first when you need a little extra color.** Blue is calmer than red, yet more welcoming than white and more lively than [gray](#gray).

{% endblock %}
{% endembed %}

<h4>Gray</h4>

{% embed "./_includes/swatch.twig" with {palette: "gray", tokens: tokens} %}
{% block content %}

Gray is a utility color, used mainly in interface elements (borders, states) and secondary text (metadata, captions).

**Opt first for theme colors.** [Themes](#themes) provide *muted*, *edge*, and *faded* colors to cover most uses for gray.

**Avoid large fills.** Gray can appear drab in large sections. The [neutral theme](#neutral) uses white backgrounds rather than gray, as do component [surfaces](/identity/surfaces) (which use shadows and borders for differentiation).

{% endblock %}
{% endembed %}

{% endblock %}
{% block editors %}

### Color themes
Some components, like [Section](/components/section) or [Callout](/components/callout), have configurable themes.

#### Neutral
Neutral is the default option for most color-configurable components, as well as the theme applied to the base webpage in our CSS.

This is a safe option but can risk feeling sterile, so consider staggering repeated themeable elements with this and the [cool theme](#cool).

{{ include("./_includes/theme-example.twig", {theme: "neutral", tokens: tokens}) }}

#### Cool
Cool is the secondary option for most color-configurable components.

This theme is subtle yet welcoming, and is a good first choice for splashes of color.

{{ include("./_includes/theme-example.twig", {theme: "cool", tokens: tokens}) }}

#### Warm
Warm is the third option for most color-configurable components.

This theme is best used to signify importance (like a timed campaign callout) or especially invoke the Texas Children's brand. It can also be used to break up monotony in color choice, but use it judiciously.

{{ include("./_includes/theme-example.twig", {theme: "warm", tokens: tokens}) }}

#### Dark
Dark is the fourth option for most color-configurable components, and commonly used in anchoring elements like the [Site Footer](/components/site-footer).

This theme is particularly useful for anchoring content in a long-scrolling page to redraw user focus. It helps break up the monotony of our lighter themes through starker contrast, but for this reason should be used judiciously.

{{ include("./_includes/theme-example.twig", {theme: "dark", tokens: tokens}) }}

{% endblock %}
{% block developers %}

### Color palette
Prefer using semantic theme tokens (see below) to raw palette tokens, where applicable.

|   | Token | CSS custom property | JavaScript constant | Value |
| - | ----- | ------------------- | ------------------- | ----- |
{% for color, data in tokens.color.palette %}
{% for grade, value in data %}
{% if grade != "$value" %}
| <div style="background: var(--tcds-color-palette-{{ color }}-{{ grade }}); width: 25px; height: 25px; border-radius: var(--tcds-border-radius-sm)"></div> | `color.palette.{{ color }}.{{ grade }}` | `--tcds-color-palette-{{ color }}-{{ grade }}` | `ColorPalette{{ color|capitalize }}{{ grade }}` | `{{ value["$value"] }}` |
{% else %}
| <div style="background: var(--tcds-color-palette-{{ color }}); width: 25px; height: 25px; border-radius: var(--tcds-border-radius-sm)"></div> | `color.palette.{{ color }}` | `--tcds-color-palette-{{ color }}` | `ColorPalette{{ color|capitalize }}` |  `{{ value }}` |
{% endif %}
{% endfor %}
{% endfor %}

### Color themes
Themes determine the color values of elements according to the following properties or roles:

| Theme alias  | Purpose |
| ------------ | ------- |
| `background` | Primary background fills, like for sections or callouts. |
| `foreground` | Text and strokes that sufficiently contrast with `background` fills for ideal legibility. |
| `accent`     | Text and strokes that pop off `background` fills, like for links and promo headlines (higher contrast than `foreground`). |
| `muted`      | Secondary text and elements like eyebrows, icons, and metadata (lower contrast than `foreground`). |
| `edge`       | Pixel-thin strokes and borders for subtle demarcations. |
| `faded`      | Background fills for elements one tick darker than the `background` fill (wash/watermark effects). |

These semantic aliases map to specific color palette values depending on the theme set:

| Theme name | Purpose |
| ---------- | ------- |
| `neutral` | Default theme (white background, black foreground, etc.) |
| `cool` | Secondary theme (baby blue background, navy foreground, etc.) |
| `warm` | Third theme (blush background, dark gray foreground, etc.) |
| `dark` | Fourth theme (navy background, white foreground, etc.) |

When developing components that can be directly themed or which should adapt to themed parents, you should use [non-theme-specific custom properties](#css) and test their design with different themes in development.

#### HTML
To set a color theme on a component or other themeable element, use the `data-theme` attribute.

| Attribute | Type | Value(s) |
| --------- | ---- | ------ |
| `data-theme` | enum | `neutral \| cool \| warm \| dark` |

#### CSS
When designing themeable components, use the following non-theme-specific custom properties. They will resolve to theme-specific custom properties depending on the `data-theme` attribute.

<label for="theme">Theme</label>
<select id="theme" name="theme" onchange="document.querySelectorAll('[data-theme-selection]').forEach(table => table.hidden = table.getAttribute('data-theme-selection') !== this.value)">
  <option selected value="neutral">Neutral</option>
  <option value="cool">Cool</option>
  <option value="warm">Warm</option>
  <option value="dark">Dark</option>
</select>

{% for theme, data in tokens.color.theme %}
<table data-theme-selection="{{ theme }}" {{ theme == "neutral" ? "" : "hidden" }} style="width: 100%; table-layout: fixed">
<caption><code>data-theme="{{ theme }}"</code></caption>
<tr>
<th style="width: 50px"></th>
<th>Property</th>
<th>Value</th>
</tr>
{% for alias, token in tokens.color.theme[theme] %}
<tr>
<td><div data-theme="{{ theme }}" style="background: var(--tcds-color-theme-{{ alias }}); width: 25px; height: 25px; border-radius: var(--tcds-border-radius-sm)"></div></td>
<td><code>--tcds-color-theme-{{ alias }}</code></td>
<td><code title="{{ token['$value'] }}">var(--tcds-color-theme-{{ theme }}-{{ alias }})</code></td>
</tr>
{% endfor %}
</table>
{% endfor %}

#### JavaScript
TBD (`ThemeProvider`).

#### Reference
{% for theme, data in tokens.color.theme %}

##### {{ theme|capitalize }}
|   | Token | Value |
| - | ----- | ----- |
{% for alias, token in tokens.color.theme[theme] %}
| <div data-theme="{{ theme }}" style="background: var(--tcds-color-theme-{{ alias }}); width: 25px; height: 25px; border-radius: var(--tcds-border-radius-sm)"></div> | `color.theme.{{ theme }}.{{ alias }}` | `{{ token["$value"] }}` |
{% endfor %}
{% endfor %}

#### Tips
**Don't forget to actually set `background-color`.** It can be easy to leave a component or other element's background transparent and then rely on the parent's background to pass through. But if that element then receives a `data-theme`, its foreground and other colors may change, but not the background.

{% endblock %}
{% endembed %}
