---
title: Tabs
description: Tabs allow users to switch between panels of content from a horizontal list of buttons. They enable convenient comparisons and selections between content within the same context and information type.
eleventyNavigation:
  key: Tabs
  parent: Components
  order: 7
---

{{ attach_library("tcds:tabs") }}
{{ attach_library("tcds:tab") }}

{% embed "_includes/example.twig" with {playground: true} %}
{% block content %}
{{ include("./_examples/raised.twig") }}
{% endblock %}
{% endembed %}
