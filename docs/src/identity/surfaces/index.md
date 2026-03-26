---
title: Surfaces
description: Surfaces use white backgrounds, generous corner radii to invoke the rounded shape of our logomark, and drop shadows to impart depth and dimensionality.
eleventyNavigation:
  key: Surfaces
  parent: Identity
  order: 7
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

### Corner radius
Corder radius is implemented on the web as *border radius*.

{{ include("./_includes/corner-radius.twig", {tokens: tokens}) }}

**Scale radius with element size.** Use smaller radii (XS, SM) for compact interface elements like input fields or badges. Use larger radii (MD, LG) for prominent surfaces like cards and quick links.

**Avoid rounding large containers.** Sections, page regions, and other layout-level containers should have sharp corners. Avoid the "bento box" aesthetic.

**Use fully rounded shapes sparingly.** Circular and pill shapes (where the radius equals half the element's height) should generally be reserved for special cases, like [Call to Action](/components/call-to-action) links, or elements for which the shape is strictly logical, like [radio inputs](/theming/forms).

#### Inner corner radius

When a rounded element has padding and contains another rounded element, the inner element's corner radius should equal the outer element's radius minus the padding between them.

<div style="display: flex; justify-content: center; margin: 3em 0">
<div style="display: inline-flex; padding: var(--tcds-space-component-sm); border-radius: var(--tcds-border-radius-lg); background: var(--tcds-color-theme-neutral-background); box-shadow: var(--tcds-box-shadow-md)">
<div style="padding: var(--tcds-space-component-lg); border-radius: calc(var(--tcds-border-radius-lg) - var(--tcds-space-component-sm)); background: var(--tcds-color-theme-warm-background); border: 1px dashed var(--tcds-color-theme-warm-edge)">
<code class="text-sm">inner radius = outer radius &minus; padding</code>
</div>
</div>
</div>

This prevents the inner element's corners from appearing visually misaligned with the outer element's curvature.

### Drop shadow
Drop shadows impart depth and dimensionality. They signal that an element floats above the page surface—use them to reinforce visual hierarchy, not for decoration.

{{ include("./_includes/drop-shadow.twig", {tokens: tokens}) }}

**Match shadow intensity to elevation.** Elements that float above many layers of content (sticky navigation, modal overlays) warrant a heavier shadow (MD, LG). Elements that sit just above their immediate context (cards, form dropdowns) should use lighter shadows (XS, SM).

**Do not overuse shadows.** Shadows lose their meaning if every surface has one. When most elements are flat, the ones with shadows draw appropriate attention. Overuse flattens and distorts the visual hierarchy.

{% endblock %}
{% block editors %}

### Surface styles

Surface treatments—corner radius and drop shadow—are handled by the Design System's components. When using components like [Card](/components/card), [Callout](/components/callout), or [Quick Links](/components/quick-links), the appropriate surface styling is applied automatically.

**Prefer borders and edge colors over shadows for general content separation.** Borders are lighter-weight and keep the page feeling flat and clean. Shadows should be reserved for elements that genuinely float above the page.

**Don't request custom border radii or shadows.** If a surface needs rounding or depth, it should come from a component that provides it. Ad hoc surface treatments risk inconsistency.

{% endblock %}
{% block developers %}

### Border radius

| Token | CSS custom property | JavaScript constant | Value |
| ----- | ------------------- | ------------------- | ----- |

{% for size, value in tokens["border-radius"] %}
{% if size != "$type" %}
| <div style="width: 40px; height: 40px; background: var(--tcds-color-theme-faded); border: 1px solid var(--tcds-color-theme-edge); border-radius: var(--tcds-border-radius-{{ size }})"></div> | `--tcds-border-radius-{{ size }}` | `BorderRadius{{ size|capitalize }}` | `{{ value["$value"] }}` |
{% endif %}
{% endfor %}

#### Usage

Use border-radius tokens via CSS custom properties. Prefer semantic component-level properties (like `--tcds-button-border-radius` or `--tcds-field-border-radius`) where they exist.

```css
.my-surface {
  border-radius: var(--tcds-border-radius-md);
}
```

### Box shadow

| Token | CSS custom property | JavaScript constant | Value |
| ----- | ------------------- | ------------------- | ----- |

{% for size, value in tokens["box-shadow"] %}
{% if size != "$type" %}
| <div style="width: 40px; height: 40px; background: var(--tcds-color-theme-background); border-radius: var(--tcds-border-radius-sm); box-shadow: var(--tcds-box-shadow-{{ size }})"></div> | `--tcds-box-shadow-{{ size }}` | `BoxShadow{{ size|capitalize }}` | `{{ value["$value"].offsetX }} {{ value["$value"].offsetY }} {{ value["$value"].blur }} {{ value["$value"].color }}` |
{% endif %}
{% endfor %}

#### Usage

```css
.my-floating-element {
  box-shadow: var(--tcds-box-shadow-sm);
}
```

#### Tips

**Remember the inner radius rule.** When nesting rounded elements, calculate the inner radius as `outer radius − padding`. In CSS:

```css
.outer {
  border-radius: var(--tcds-border-radius-lg);
  padding: var(--tcds-space-component-md);
}

.inner {
  border-radius: calc(var(--tcds-border-radius-lg) - var(--tcds-space-component-md));
}
```

**Avoid combining heavy shadows with borders.** A shadow already provides edge definition. Adding a visible border to a shadowed element is usually redundant and can look heavy-handed. Use one or the other.

{% endblock %}
{% endembed %}
