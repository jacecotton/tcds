---
title: Icons
description: Icons are illustrative aids for enhancing understanding, supplementing meaning, and reinforcing brand style and tone.
eleventyNavigation:
  key: Icons
  parent: Identity
  order: 3
---

*This page offers icon guidance and documents our icon library. Technical documentation can be found in the [Components](/components) section, like on the [Icon component](/components/icon) page and others.*

## Best practices
Use icons as visual aids to enhance understanding and anchor user attention.

{% embed "_includes/dont-do.twig" with {
  dont: "use icons by themselves, as they may not always have well understood meaning.",
  do_this: "use icons with text or other elements to supplement meaning and support recognition.",
} %}
{% block dont %}
<tcds-icon icon="amenities" class="text-2xl"></tcds-icon>
{% endblock %}
{% block do_this %}
<span class="flex gap-md font-family-ui"><tcds-icon icon="amenities" class="text-2xl"></tcds-icon> See amenities</span>
{% endblock %}
{% endembed %}

When selecting icons, always consider their implied meaning over their decorative value.

{% embed "_includes/dont-do.twig" with {
  dont: "use common icons in novel ways.",
  do_this: "use icons for their most common meaning.",
} %}
{% block dont %}
<span class="flex gap-md font-family-ui"><tcds-icon icon="search" class="text-2xl"></tcds-icon> Expand view</span>
{% endblock %}
{% block do_this %}
<span class="flex gap-md font-family-ui"><tcds-icon icon="search" class="text-2xl"></tcds-icon> Search</span>
{% endblock %}
{% endembed %}

Consider carefully whether you need an icon. Icons are decorative and should be optional.

{% embed "_includes/dont-do.twig" with {
  dont: "use icons where they're not needed.",
  do_this: "ensure icons are meaningful and relevant.",
} %}
{% block dont %}
<span class="flex gap-md font-family-ui"><tcds-icon icon="texas-childrens" class="text-2xl"></tcds-icon> About us</span>
{% endblock %}
{% block do_this %}
<span class="flex gap-md font-family-ui"><tcds-icon icon="mychart" class="text-2xl"></tcds-icon> MyChart</span>
{% endblock %}
{% endembed %}

<h2>Library</h2>

### Primary icons
Use primary icons for decoration and navigation assistance, such as in the [Quick Links](/components/quick-links) component.

{% embed "./_includes/library.twig" with {
  category: "primary",
  tokens: tokens,
} %}{% endembed %}

### Utility icons
Use utility icons in user interface elements, like buttons and other controls in components.

{% embed "./_includes/library.twig" with {
  category: "utility",
  tokens: tokens,
} %}{% endembed %}

### Media icons
Use media icons in teaser cards and article heroes to indicate the category of content.

{% embed "./_includes/library.twig" with {
  category: "media",
  tokens: tokens,
} %}{% endembed %}

### Brand icons
Use brand icons for links to social media and to otherwise indicate external services.

{% embed "./_includes/library.twig" with {
  category: "brand",
  tokens: tokens,
} %}{% endembed %}
