---
title: Card
description: Cards display snippets of linked-to content, typically including its image, title, and text blurb.
image: /dist/images/component-illustration-card.png
eleventyNavigation:
  key: Card
  parent: Components
  order: 3
---

{{ attach_library("tcds:card") }}
{{ attach_library("tcds:cta") }}

{% embed "_includes/example.twig" with {playground: true} %}
{% block content %}
{{ include("./_examples/basic.twig") }}
{% endblock %}
{% endembed %}
