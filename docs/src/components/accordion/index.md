---
title: Accordion
description: Accordions collapse content under headings, allowing users to more quickly scan a page and choose whether to see the content by clicking the heading.
eleventyNavigation:
  key: Accordion
  parent: Components
  order: 1
---

{{ attach_library("tcds:accordion") }}
{{ attach_library("tcds:accordion-section") }}

{% embed "_includes/example.twig" with {playground: true} %}
{% block content %}
{{ include("./_examples/basic.twig") }}
{% endblock %}
{% endembed %}
