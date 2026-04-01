---
title: Icon
description: Icons are illustrative aids for enhancing understanding and supplementing meaning.
eleventyNavigation:
  key: Icon
  parent: Components
  order: 4
---

{{ attach_library("tcds:icon") }}

{% embed "tcds:tabs" with {
  heading_level: "h2",
  tabs: [
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
{% block editors %}
{% embed "_includes/example.twig" with {playground: true} %}
{% block content %}
{{ include("./_examples/basic.twig") }}
{% endblock %}
{% endembed %}

### Guidance
#### Best practices

#### When to use

#### When not to use

### Options

### Features

{% endblock %}
{% block developers %}

### Implementation
#### Basic usage
{% embed "_includes/example.twig" with {code: true, open: true} %}
{% block content %}
{{ include("./_examples/basic.twig") }}
{% endblock %}
{% endembed %}

### API reference
#### HTML
{% set html_attrs = [
  {
    name: "orientation",
    type: "enum",
    options: ["horizontal", "vertical"],
    required: false,
  },
  {
    name: "variant",
    type: "enum",
    options: ["featured", "lite"],
    required: false,
  },
  {
    name: "size",
    type: "enum",
    options: ["large"],
    required: false,
  },
] %}
{% set html_slots = [
  {
    name: "title",
    required: true,
    allowed: ["a", "p", "h2", "h3", "h4", "h5", "h6"],
  },
  {
    name: "description",
    required: false,
    allowed: ["p"],
  },
  {
    name: "meta",
    required: false,
    allowed: ["p", "small", "span"],
  },
  {
    name: "tag",
    required: false,
    allowed: ["p", "small", "span"],
  },
  {
    name: "footer",
    required: false,
    allowed: ["footer"],
  },
] %}
{{ include("_includes/api/html.twig", {
  attributes: html_attrs,
  slots: html_slots,
}) }}

#### CSS
{% set css_props = [
  {
    name: "--tcds-card-background-color",
    syntax: "color",
    default: "var(--tcds-color-theme-neutral-background)",
  },
  {
    name: "--tcds-card-foreground-color",
    syntax: "color",
    default: "var(--tcds-color-theme-neutral-foreground)",
  },
  {
    name: "--tcds-card-border-radius",
    syntax: "length",
    default: "var(--tcds-border-radius-sm)",
  },
  {
    name: "--tcds-card-box-shadow",
    syntax: "string",
    default: "var(--tcds-box-shadow-sm)",
  },
  {
    name: "--tcds-card-content-padding-block",
    syntax: "length",
    default: "1em",
  },
  {
    name: "--tcds-card-content-padding-inline",
    syntax: "length",
    default: "1em",
  },
  {
    name: "--tcds-card-content-padding",
    syntax: "string",
    default: "var(--tcds-card-content-padding-block) var(--tcds-card-content-padding-inline)",
  },
  {
    name: "--tcds-card-content-gap",
    syntax: "length",
    default: "1em",
  },
  {
    name: "--tcds-card-content-font-family",
    syntax: "string",
    default: "var(--tcds-font-family-copy)",
  },
  {
    name: "--tcds-card-title-font-size",
    syntax: "length",
    default: "var(--tcds-font-size-lg)",
  },
  {
    name: "--tcds-card-title-line-height",
    syntax: "number",
    default: "var(--tcds-line-height-compact)",
  },
  {
    name: "--tcds-card-description-font-size",
    syntax: "length",
    default: "var(--tcds-font-size-md)",
  },
  {
    name: "--tcds-card-description-line-height",
    syntax: "number",
    default: "var(--tcds-line-height-comfortable)",
  },
  {
    name: "--tcds-card-width",
    syntax: "length",
    default: "var(--tcds-size-layout-xs)",
  },
  {
    name: "--tcds-card-image-aspect-ratio",
    syntax: "ratio",
    default: "initial",
  },
  {
    name: "--tcds-card-image-gradient",
    syntax: "color",
    default: "hidden",
  }
] %}
{{ include("_includes/api/css.twig", {
  custom_properties: css_props,
}) }}

{% endblock %}
{% endembed %}
