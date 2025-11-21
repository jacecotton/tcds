---
layout: layout.njk
title: Button Component
---

{% from "example.njk" import render as example %}

{% call example() %}
<button class="tcds-button">Click es</button>
{% endcall %}

{% call example() %}
<button class="tcds-button tcds-button--secondary">Another Button</button>
{% endcall %}
