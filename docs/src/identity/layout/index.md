---
title: Layout
description: Layout tokens establish consistent spacing, sizing, and proportions across the Design System. They create visual rhythm and ensure predictable, responsive behavior.
eleventyNavigation:
  key: Layout
  parent: Identity
  order: 4
---

## Please check back later.
This page is under construction and will be available soon.

* *See the open GitHub issue related to this page: [#26: Add layout documentation](https://github.com/jacecotton/tcds/issues/26)*

{% embed "tcds:tabs" with {
  heading_level: "h2",
  tabs: [
    {
      title: "Designers",
      content: "designers",
    },
    {
      title: "Developers",
      content: "developers",
    }
  ],
} %}
{% block designers %}

{{ include("./_includes/space.twig", {tokens: tokens, category: "component"}) }}
{{ include("./_includes/space.twig", {tokens: tokens, category: "layout"}) }}
{{ include("./_includes/aspect-ratio.twig", {tokens: tokens}) }}

**Use landscape (4∶3) for general-purpose images.** This is the default aspect ratio for thumbnails, card images, and editorial photography.

**Use widescreen (16∶9) for video and hero imagery.** This matches standard video dimensions and works well for panoramic content.

**Use square (1∶1) for avatars and icons.** Profile photos, logos, and small media thumbnails work best at equal proportions.

**Avoid portrait (3∶4) in horizontal layouts.** Portrait-oriented images can dominate a row of content. Reserve this ratio for vertically-oriented contexts or deliberately tall compositions.

{{ include("./_includes/breakpoints.twig", {tokens: tokens}) }}

{% endblock %}
{% block developers %}

| Token | CSS custom property | JavaScript constant | Value |
| ----- | ------------------- | ------------------- | ----- |
{% for grade, value in tokens.space %}
{% if grade != "$type" and grade != "$description" and grade != "component" and grade != "layout" %}
| `space.{{ grade }}` | `--tcds-space-{{ grade }}` | `Space{{ grade }}` | `{{ value["$value"] }}` |
{% endif %}
{% endfor %}

| Token | CSS custom property | JavaScript constant | Value |
| ----- | ------------------- | ------------------- | ----- |
{% for size, value in tokens.space.component %}
{% if size != "$description" %}
| `space.component.{{ size }}` | `--tcds-space-component-{{ size }}` | `SpaceComponent{{ size|capitalize }}` | `{{ value["$value"] }}` |
{% endif %}
{% endfor %}

| Token | CSS custom property | JavaScript constant | Value |
| ----- | ------------------- | ------------------- | ----- |
{% for size, value in tokens.space.layout %}
{% if size != "$description" %}
| `space.layout.{{ size }}` | `--tcds-space-layout-{{ size }}` | `SpaceLayout{{ size|capitalize }}` | `{{ value["$value"] }}` |
{% endif %}
{% endfor %}

| Token | CSS custom property | JavaScript constant | Value |
| ----- | ------------------- | ------------------- | ----- |
{% for grade, value in tokens.size %}
{% if grade != "$type" and grade != "$description" and grade != "layout" and grade != "breakpoint" %}
| `size.{{ grade }}` | `--tcds-size-{{ grade }}` | `Size{{ grade }}` | `{{ value["$value"] }}` |
{% endif %}
{% endfor %}

| Token | CSS custom property | JavaScript constant | Value |
| ----- | ------------------- | ------------------- | ----- |
{% for size, value in tokens.size.layout %}
{% if size != "$description" %}
| `size.layout.{{ size }}` | `--tcds-size-layout-{{ size }}` | `SizeLayout{{ size|capitalize }}` | `{{ value["$value"] }}` |
{% endif %}
{% endfor %}

| Token | CSS custom property | JavaScript constant | Value |
| ----- | ------------------- | ------------------- | ----- |
{% for size, value in tokens.size.breakpoint %}
{% if size != "$description" %}
| `size.breakpoint.{{ size }}` | `--tcds-size-breakpoint-{{ size }}` | `SizeBreakpoint{{ size|capitalize }}` | `{{ value["$value"] }}` |
{% endif %}
{% endfor %}

| Token | CSS custom property | JavaScript constant | Value |
| ----- | ------------------- | ------------------- | ----- |
{% for name, value in tokens["aspect-ratio"] %}
{% if name != "$type" and name != "$description" %}
| `aspect-ratio.{{ name }}` | `--tcds-aspect-ratio-{{ name }}` | `AspectRatio{{ name|capitalize }}` | `{{ value["$value"]|replace({"'": ""}) }}` |
{% endif %}
{% endfor %}

| Token | CSS custom property | JavaScript constant | Value |
| ----- | ------------------- | ------------------- | ----- |
{% for name, value in tokens["z-index"] %}
{% if name != "$type" and name != "$description" %}
| `z-index.{{ name }}` | `--tcds-z-index-{{ name }}` | `ZIndex{{ name|split("-")|map(v => v|capitalize)|join("") }}` | `{{ value["$value"] }}` |
{% endif %}
{% endfor %}

{% endblock %}
{% endembed %}
