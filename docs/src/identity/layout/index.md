---
title: Layout
description: Layout tokens establish consistent spacing, sizing, and proportions across the Design System. They create visual rhythm and ensure predictable, responsive behavior.
eleventyNavigation:
  key: Layout
  parent: Identity
  order: 4
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

### Space

Spacing in the Design System is built on a **4px base grid**. All raw spacing tokens are multiples of 4px. Two semantic scales—_component_ and _layout_—map to these raw values for different contexts.

#### Component spacing

Component spacing controls internal dimensions: padding, gaps between child elements, and margins between sibling components.

{{ include("./_includes/space.twig", {tokens: tokens, category: "component"}) }}

**Use component spacing for element interiors.** Padding inside a card, gap between a label and its input, or margin between stacked buttons should use the component scale.

#### Layout spacing

Layout spacing controls structural dimensions: section padding, gaps between major page regions, and margins between content blocks.

{{ include("./_includes/space.twig", {tokens: tokens, category: "layout"}) }}

**Use layout spacing for page structure.** Vertical space between page sections, padding inside a full-width banner, or the gap between a sidebar and main content should use the layout scale.

**Don't mix scales inappropriately.** Layout spacing inside a compact component creates excessive whitespace. Component spacing between page sections makes the layout feel cramped.

### Aspect ratio

Standard aspect ratios ensure consistent proportions across images, media embeds, and content containers.

{{ include("./_includes/aspect-ratio.twig", {tokens: tokens}) }}

**Use landscape (4∶3) for general-purpose images.** This is the default aspect ratio for thumbnails, card images, and editorial photography.

**Use widescreen (16∶9) for video and hero imagery.** This matches standard video dimensions and works well for panoramic content.

**Use square (1∶1) for avatars and icons.** Profile photos, logos, and small media thumbnails work best at equal proportions.

**Avoid portrait (3∶4) in horizontal layouts.** Portrait-oriented images can dominate a row of content. Reserve this ratio for vertically-oriented contexts or deliberately tall compositions.

### Size and breakpoints

Size tokens define maximum widths for content containers, and breakpoints control responsive layout shifts.

{{ include("./_includes/breakpoints.twig", {tokens: tokens}) }}

**Design for the MD breakpoint first.** This is the most common viewport width for our audience. Adapt outward to smaller and larger screens from there.

**Don't design for pixel-perfect breakpoint boundaries.** Layouts should be fluid within each breakpoint range. Use breakpoints as guides for major layout changes (column counts, navigation patterns), not for fine-tuning spacing at specific widths.

{% endblock %}
{% block editors %}

### Spacing

Component spacing is handled automatically by the Design System's components. When configuring components that expose spacing options—like [Section](/components/section), which controls vertical padding—choose from the provided scale rather than specifying custom values.

**Use generous spacing to improve readability.** When in doubt, opt for more whitespace rather than less. Tightly packed content is harder to scan and feels cluttered.

**Be consistent with spacing choices.** If one section uses medium padding, adjacent sections of similar weight should match. Alternating spacing without reason creates visual noise.

### Aspect ratios

Some components allow you to configure aspect ratios for images and media. Use the standard ratios provided rather than arbitrary custom values.

**Use landscape (4∶3) for most content images.** This is the safest and most versatile ratio for general editorial photography and thumbnails.

**Match aspect ratios within a row.** When multiple images or cards sit side by side, they should share the same aspect ratio for a clean, aligned layout.

{% endblock %}
{% block developers %}

### Space

Prefer semantic _component_ or _layout_ space tokens to raw space tokens, where applicable.

#### Raw space

| Token | CSS custom property | JavaScript constant | Value |
| ----- | ------------------- | ------------------- | ----- |

{% for grade, value in tokens.space %}
{% if grade != "$type" and grade != "$description" and grade != "component" and grade != "layout" %}
| `space.{{ grade }}` | `--tcds-space-{{ grade }}` | `Space{{ grade }}` | `{{ value["$value"] }}` |
{% endif %}
{% endfor %}

#### Component space

| Token | CSS custom property | JavaScript constant | Value |
| ----- | ------------------- | ------------------- | ----- |

{% for size, value in tokens.space.component %}
{% if size != "$description" %}
| `space.component.{{ size }}` | `--tcds-space-component-{{ size }}` | `SpaceComponent{{ size|capitalize }}` | `{{ value["$value"] }}` |
{% endif %}
{% endfor %}

#### Layout space

| Token | CSS custom property | JavaScript constant | Value |
| ----- | ------------------- | ------------------- | ----- |

{% for size, value in tokens.space.layout %}
{% if size != "$description" %}
| `space.layout.{{ size }}` | `--tcds-space-layout-{{ size }}` | `SpaceLayout{{ size|capitalize }}` | `{{ value["$value"] }}` |
{% endif %}
{% endfor %}

#### Usage

```css
.my-card {
  padding: var(--tcds-space-component-md);
  gap: var(--tcds-space-component-sm);
}

.my-section {
  padding: var(--tcds-space-layout-md) 0;
}
```

### Size

#### Raw size

| Token | CSS custom property | JavaScript constant | Value |
| ----- | ------------------- | ------------------- | ----- |

{% for grade, value in tokens.size %}
{% if grade != "$type" and grade != "$description" and grade != "layout" and grade != "breakpoint" %}
| `size.{{ grade }}` | `--tcds-size-{{ grade }}` | `Size{{ grade }}` | `{{ value["$value"] }}` |
{% endif %}
{% endfor %}

#### Layout size

| Token | CSS custom property | JavaScript constant | Value |
| ----- | ------------------- | ------------------- | ----- |

{% for size, value in tokens.size.layout %}
{% if size != "$description" %}
| `size.layout.{{ size }}` | `--tcds-size-layout-{{ size }}` | `SizeLayout{{ size|capitalize }}` | `{{ value["$value"] }}` |
{% endif %}
{% endfor %}

#### Breakpoints

| Token | CSS custom property | JavaScript constant | Value |
| ----- | ------------------- | ------------------- | ----- |

{% for size, value in tokens.size.breakpoint %}
{% if size != "$description" %}
| `size.breakpoint.{{ size }}` | `--tcds-size-breakpoint-{{ size }}` | `SizeBreakpoint{{ size|capitalize }}` | `{{ value["$value"] }}` |
{% endif %}
{% endfor %}

#### Usage

Use breakpoint tokens in media queries and layout size tokens for `max-width` constraints.

```css
@media (min-width: 690px) {
  /* MD breakpoint and above */
}

.my-container {
  max-width: var(--tcds-size-layout-lg);
  margin: 0 auto;
}
```

### Aspect ratio

| Token | CSS custom property | JavaScript constant | Value |
| ----- | ------------------- | ------------------- | ----- |

{% for name, value in tokens["aspect-ratio"] %}
{% if name != "$type" and name != "$description" %}
| `aspect-ratio.{{ name }}` | `--tcds-aspect-ratio-{{ name }}` | `AspectRatio{{ name|capitalize }}` | `{{ value["$value"]|replace({"'": ""}) }}` |
{% endif %}
{% endfor %}

#### Usage

```css
.my-thumbnail {
  aspect-ratio: var(--tcds-aspect-ratio-landscape);
}
```

### Z-index

Z-index tokens manage the stacking order of persistent and overlay UI elements. Use these instead of arbitrary z-index values.

| Token | CSS custom property | JavaScript constant | Value |
| ----- | ------------------- | ------------------- | ----- |

{% for name, value in tokens["z-index"] %}
{% if name != "$type" and name != "$description" %}
| `z-index.{{ name }}` | `--tcds-z-index-{{ name }}` | `ZIndex{{ name|split("-")|map(v => v|capitalize)|join("") }}` | `{{ value["$value"] }}` |
{% endif %}
{% endfor %}

#### Usage

```css
.my-sticky-toolbar {
  position: sticky;
  z-index: var(--tcds-z-index-action-bar);
}
```

#### Tips

**Never use raw z-index numbers.** Always use the token. This ensures layers stack predictably and prevents conflicts between components.

**The stacking order is intentional.** Dialogs (600) sit above site headers (500), which sit above alert bars (400), and so on. If your component needs to appear above another, use the appropriate layer—don't increment ad hoc.

{% endblock %}
{% endembed %}
