---
title: Section
description: Sections help to structure full-width pages, like landing pages.
eleventyNavigation:
  key: Section
  parent: Components
  order: 5
---

{% embed "_includes/example.twig" with {playground: true, full_screen: true} %}
  {% block content %}
    {{ include("./_examples/basic.twig") }}
  {% endblock %}
{% endembed %}
