---
title: Color
description: Color helps establish brand identity and create effective, appealing designs. It can impart meaning and tone, as well as influence focus and emotion.
eleventyNavigation:
  key: Color
  parent: Identity
  order: 2
---

## Color palette
Texas Children's Design System provides a limited raw color palette.

### Red
{% embed "./_includes/swatch.twig" with {palette: "red", tokens: tokens} %}
{% block content %}

Red 700 is the primary brand color, used in the Design System as an accent color (links, buttons, dividers, promotional headlines). Red 50 is used for [warm backgrounds](#warm).

**Use sparingly.** Reserve this color to leverage our brand identity, and never use it for generic emphasis. Its intensity can risk inadvertently diverting attention from the primary user flow.

**Avoid Red 700 for large fills.** This color is too intense for entire sections of content. Consider Red 50 instead, or if you need a dark tone, use the [dark theme](#dark).

{% endblock %}
{% endembed %}

<h3>Blue</h3>

{% embed "./_includes/swatch.twig" with {palette: "blue", tokens: tokens} %}
{% block content %}

Blue is the secondary color. Blue 50 is used as the [cool background](#cool), and Blue 900 the [dark background](#dark) and most default text color.

**Use as a secondary accent.** Blue 900 effectively signals secondary precedence while still drawing attention through stark contrast.

**Try first when you need a little extra color.** Blue is calmer than red, yet more welcoming than white and more lively than [gray](#gray).

{% endblock %}
{% endembed %}

<h3>Gray</h3>

{% embed "./_includes/swatch.twig" with {palette: "gray", tokens: tokens} %}
{% block content %}

Gray is a utility color, used mainly in interface elements (borders, states) and secondary text (metadata, captions).

**Opt first for theme colors.** [Themes](#themes) provide *muted*, *edge*, and *faded* colors to cover most uses for gray.

**Avoid large fills.** Gray can appear drab in large sections. The [neutral theme](#neutral) uses white backgrounds rather than gray, as do component [surfaces](/identity/surfaces) (which use shadows and borders for differentiation).

{% endblock %}
{% endembed %}

<h2>Color themes</h2>

Themes determine the color values of elements according to the following properties or roles: *background*, *foreground*, *accent*, *muted*, *faded*, and *edge*.

| Theme alias  | Purpose |
| ------------ | ------- |
| *background* | Primary background fills, like for sections or callouts. |
| *foreground* | Text and strokes that sufficiently contrast with *background* fills for ideal legibility. |
| *accent*     | Text and strokes that pop off *background* fills, like for links and promo headlines (higher contrast than *foreground*). |
| *muted*      | Secondary text and elements like eyebrows, icons, and metadata (lower contrast than *foreground*). |
| *edge*       | Pixel-thin strokes and borders for subtle demarcations. |
| *faded*      | Background fills for elements one tick darker than the *background* fill (wash/watermark effects). |

Note that the colors for *muted*, *faded*, and *edge* are dynamically calculated from different blends of the *background* and *foreground*  aliases (or *background* and *accent* in the [warm theme](#warm)'s case).

### Neutral
Neutral is the default option for most color-configurable components, as well as the theme applied to the base webpage in our CSS.

This is a safe option but can risk feeling sterile, so consider staggering repeated themeable elements with this and the [cool theme](#cool).

{{ include("./_includes/theme-example.twig", {theme: "neutral", tokens: tokens}) }}

### Cool
Cool is the secondary option for most color-configurable components.

This theme is subtle yet welcoming, and is a good first choice for splashes of color.

{{ include("./_includes/theme-example.twig", {theme: "cool", tokens: tokens}) }}

### Warm
Warm is the third option for most color-configurable components.

This theme is best used to signify importance (like a timed campaign callout) or especially invoke the Texas Children's brand. It can also be used to break up monotony in color choice, but use it judiciously.

{{ include("./_includes/theme-example.twig", {theme: "warm", tokens: tokens}) }}

### Dark
Dark is the fourth option for most color-configurable components, and commonly used in anchoring elements like the [Site Footer](/components/site-footer).

This theme is particularly useful for anchoring content in a long-scrolling page to redraw user focus. It helps break up the monotony of our lighter themes through starker contrast, but for this reason should be used judiciously.

{{ include("./_includes/theme-example.twig", {theme: "dark", tokens: tokens}) }}
