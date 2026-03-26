---
title: Tabs
description: Tabs organize content under a horizontal list of labels, enabling comparison between different content within the same context.
image: /dist/images/component-illustration-tabs.png
eleventyNavigation:
  key: Tabs
  parent: Components
  order: 6
---

{{ attach_library("tcds:tabs") }}
{{ attach_library("tcds:tab") }}

{% embed "_includes/example.twig" with {playground: true} %}
{% block content %}
{{ include("./_examples/raised.twig") }}
{% endblock %}
{% endembed %}
