---
title: Typography
description: Typography helps improve readability, establish relationships, and reinforce brand identity.
eleventyNavigation:
  key: Typography
  parent: Identity
  order: 8
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

### Typeface
Texas Children's Design System's primary typeface is the serif Calluna, and the secondary typeface is the sans-serif Mont.

{{ include("./_includes/typeface.twig", {
  typeface: "Calluna",
  class: "serif",
  weights: {semibold: "Calluna Semibold", bold: "Calluna Bold"},
  tokens: tokens
}) }}

{{ include("./_includes/typeface.twig", {
  typeface: "Mont",
  class: "sans-serif",
  weights: {semibold: "Mont Semibold", bold: "Mont Bold"},
  tokens: tokens
}) }}

**Use regular Calluna (400) for copy and small text, and Calluna Semibold (600) for large text.** Calluna Bold (700) may be used for emphasis, but avoid using it for headings and consecutive sentences.

**Use Mont Semibold (600) in most sans-serif cases.** Mont (400) may be used for text that needs to be de-emphasized. Mont Bold (700) is usually too heavy, but may be used for emphasis.

**Avoid Mont for paragraphs.** Mont should be used for single headlines, labels, and short captions. Use Calluna for multiple lines of copy.

### Type scale
{{ include("./_includes/type-scale.twig", {tokens: tokens}) }}

**Reserve 3-extra large (3XL) and above for landing pages.** Generally, these sizes are too large for the web. They can work well for promotional displays and routing components, but should be avoided in internal content pages and interfaces.

**Reserve XL and 2XL for section headings.** Heading elements (H1–H2) help organize content and structure a page layout. Subordinate components, like cards or tabs, should use large text (LG) and smaller.

**Avoid medium-large (ML) for standard body copy.** Landing page sections and article ledes may benefit from a slight bump in text size (hence "medium-large" rather than "*n*th-large"). Medium-large also works well for single lines of text and component typography. But long paragraphs of normal text should use medium (MD) sizing.

*Technical note:* Calluna is a naturally small font, so the Design System's stylesheet scales it up to 112% to better match Mont.

### Leading
Website text uses *half-leading*, so we measure line spacing with *line-height* ratios. To calculate baseline-to-baseline leading, multiply the font size by the following measures:

{{ include("./_includes/leading.twig", {tokens: tokens}) }}

{% embed "_includes/dont-do.twig" with {
  dont: "use compact leading for text smaller than medium-large (<&nbsp;#{tokens.font.size.ml["$value"]}).",
  do_this: "use comfortable leading.",
} %}
{% block dont %}
<p style="line-height: var(--tcds-line-height-compact); font-size: var(--tcds-font-size-sm)">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
{% endblock %}
{% block do_this %}
<p style="line-height: var(--tcds-line-height-comfortable); font-size: var(--tcds-font-size-sm)">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
{% endblock %}
{% endembed %}

{% embed "_includes/dont-do.twig" with {
  dont: "use comfortable leading for large text and above (&GreaterEqual;&nbsp;#{tokens.font.size.lg["$value"]}).",
  do_this: "use compact leading.",
} %}
{% block dont %}
<p style="line-height: var(--tcds-line-height-comfortable); font-size: var(--tcds-font-size-lg)">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ...</p>
{% endblock %}
{% block do_this %}
<p style="line-height: var(--tcds-line-height-compact); font-size: var(--tcds-font-size-lg)">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ...</p>
{% endblock %}
{% endembed %}

<h3>Font variants</h3>

**Use lining numerals in most cases (0, 1, 2, 3, 4, ...)** Calluna uses oldstyle numerals by default (<span style="font-variant-numeric: oldstyle-nums">0, 1, 2, 3, 4</span>, ...), which are disabled by the Design System's stylesheet.

**Use tabular numbers for presenting data (<span style="font-variant-numeric: tabular-nums; font-family: var(--tcds-font-stack-sans-serif);">0, 1, 2, 3, 4</span>, ...)** Tabular numbers have identical horizontal widths (monospacing), which works best when numbers may horizontally align with or substitute each other, like with list markers, table cells, or counters (number fields, countdown timers, etc.)

**Do not use ligatures.** Ligatures are disabled by the Design System's stylesheet.

### Type color
**Be conservative with type color.** [Color themes](/identity/color#themes) and components handle most color for you. Don't use color for simple decoration or generic emphasis.

{% endblock %}
{% block editors %}

### Text styles
TBD

### Text justification
**Avoid right-justifying text in left-to-right languages.** Exceptions may include data inside tables.

**Avoid center-justifying lengthy paragraphs and multiple lines of large text.** Centered paragraphs may be used but should be minimized. Multiple lines of large text should be generally avoided regardless of alignment.

{% endblock %}
{% block developers %}

### Font stacks
Prefer semantic *font family* tokens (see below) to raw font stack tokens, where applicable.

| Token | CSS custom property | JavaScript constant | Value |
| ----- | ------------------- | ------------------- | ----- |
{% for stack, value in tokens.font.stack %}
{% if stack != "$type" %}
| <code>font.stack.{{ stack }}</code> | <code>--tcds-font-stack-{{ stack }}</code> | <code>FontStack{{ stack|split("-")|map(v => v|capitalize)|join("") }}</code> | <code>{{ value["$value"]|join(", ") }}</code> |
{% endif %}
{% endfor %}

### Font families
| Token | CSS custom property | JavaScript constant | Value |
| ----- | ------------------- | ------------------- | ----- |
{% for family, value in tokens.font.family %}
{% if family != "$type" %}
| <code>font.family.{{ family }}</code> | <code>--tcds-font-family-{{ family }}</code> | <code>FontFamily{{ family|split("-")|map(v => v|capitalize)|join("") }}</code> | <code>{{ value["$value"] }}</code> |
{% endif %}
{% endfor %}

### Font weights
| Token | CSS custom property | JavaScript constant | Value |
| ----- | ------------------- | ------------------- | ----- |
{% for weight, value in tokens.font.weight %}
{% if weight != "$type" %}
| <code>font.weight.{{ weight }}</code> | <code>--tcds-font-weight-{{ weight }}</code> | <code>FontWeight{{ weight|capitalize }}</code> | <code>{{ value["$value"] }}</code> |
{% endif %}
{% endfor %}

### Font sizes
Use the following to set font sizes directly. To ensure the proper use of `line-height`, consider using [text styles](#text-styles).

| Token | CSS custom property | JavaScript constant | Value |
| ----- | ------------------- | ------------------- | ----- |
{% for size, value in tokens.font.size %}
{% if size != "$type" %}
| <code>font.size.{{ size }}</code> | <code>--tcds-font-size-{{ size }}</code> | <code>FontSize{{ size|capitalize }}</code> | <code>{{ value["$value"] }}</code> |
{% endif %}
{% endfor %}

### Line heights
| Token | CSS custom property | JavaScript constant | Value |
| ----- | ------------------- | ------------------- | ----- |
{% for line_height, value in tokens["line-height"] %}
{% if line_height != "$type" %}
| <code>line-height.{{ line_height }}</code> | <code>--tcds-line-height-{{ line_height }}</code> | <code>LineHeight{{ line_height|capitalize }}</code> | <code>{{ value["$value"] }}</code> |
{% endif %}
{% endfor %}

### Text styles
Text styles ensure a proper combination of <code>font-size</code> and <code>line-height</code>.

<table>
<tr>
<th>Style</th>
<th>Utility class</th>
<th>SCSS mixin</th>
<th>Properties</th>
</tr>
{% for size, value in tokens.font.size %}
{% if size != "$type" %}
<tr>
<td>{{ {
  "xs": "Extra small",
  "sm": "Small",
  "md": "Medium",
  "ml": "Medium-large",
  "lg": "Large",
  "xl": "Extra large",
  "2xl": "2-extra large",
  "3xl": "3-extra large",
  "4xl": "4-extra large",
  "5xl": "5-extra large",
}[size] ?: size }}</td>
<td><code>.text-{{ size }}</code></td>
<td><code>text("{{ size }}")</code></td>
<td><pre>font-size: var(--tcds-font-size-{{ size }});
line-height: var(--tcds-line-height-{{ size in ["5xl", "4xl", "3xl", "2xl", "xl", "lg"] ? "compact" : "comfortable" }});</pre></td>
</tr>
{% endif %}
{% endfor %}
</table>

{% endblock %}
{% endembed %}
