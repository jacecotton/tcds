---
title: Blockquote
description: Blockquote
image:
eleventyNavigation:
  key: Blockquote
  parent: Components
  order: 1
---

{{ attach_library("tcds:blockquote") }}

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
{% endblock %}
{% block developers %}

developers

{% endblock %}
{% endembed %}
