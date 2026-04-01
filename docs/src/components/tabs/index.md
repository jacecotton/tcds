---
title: Tabs
description: Tabs organize content under a horizontal list of labels, enabling comparison between different content within the same context.
image: /dist/images/component-illustration-tabs.png
eleventyNavigation:
  key: Tabs
  parent: Components
  order: 7
---

{{ attach_library("tcds:tabs") }}
{{ attach_library("tcds:tab") }}

{% embed "tcds:tabs" with {
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
{{ include("./_examples/raised.twig") }}
{% endblock %}
{% endembed %}
{% endblock %}
{% block developers %}
developers
{% endblock %}
{% endembed %}
