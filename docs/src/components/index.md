---
title: Components
description: Components are reusable building blocks for creating pages and interfaces. They are configurable and content-agnostic while ensuring consistency of design and function.
eleventyNavigation:
  key: Components
  order: 3
---

Building with components improves user experience, benefits from regular updates and centralized quality control, and leverages established solutions to known challenges.

## In this documentation
### Editors and designers
Each page in this section provides a live playground to experiment with component options available to you. They also contain guidance on when to use components, when to choose other components, content recommendations, and other best practices to keep in mind when designing and building out pages.

### Developers and maintainers
Each page will provide live examples with code snippets for how to implement components in various states and configurations. They also include API tables for working with, maintaining, and modifying components in HTML, CSS, and JavaScript.

## Component library
{% set nav = collections.all|eleventyNavigation("Components") %}

<div class="grid gap-lg">
{% for item in nav %}
{{ include("tcds:card", {
  image: {
    src: item.data.image,
    alt: "",
  },
  title: item.title,
  link: item.url,
  description: item.data.description,
  classes: ["grid-item--1/3", "font-family-ui"],
  variant: "lite",
}) }}
{% endfor %}
</div>
