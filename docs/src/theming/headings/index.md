---
title: Headings
description: Heading elements (H1–H6) help structure the outline of page content, providing clear visual cues and navigable landmarks to assistive technology.
eleventyNavigation:
  key: Headings
  parent: Theming
---

{{ attach_library("tcds:table") }}

Heading elements structure page content according to a logical hierarchy known as the *document outline*. They should be used for their semantic meaning (H1 for the page title, H2 for the highest section heading, H3 for subheadings, etc.) — *not* solely for their visual style (large, bold text).

The Design System provides default styles for each heading element, but they can also be used independently of their styling for only their semantic meaning. For example, you may wish to make them visually hidden for accessible landmark names, use the styling of a different heading level, or apply a heading styling to a non-heading element. For these purposes, the Design System provides utility classes, indicated below.

## Styling
{% set heading_styles = {
  "h1": {
    "font": {
      "family": "headings",
      "size": "2xl",
      "weight": "semibold",
    },
    "line-height": "compact",
    "#letter-spacing": "-0.05rem",
  },
  "h2": {
    "font": {
      "family": "headings",
      "size": "xl",
      "weight": "semibold",
    },
    "line-height": "compact",
    "#letter-spacing": "-0.0125rem",
  },
  "h3": {
    "font": {
      "family": "subheadings",
      "size": "lg",
      "weight": "bold",
    },
    "line-height": "compact",
  },
  "h4": {
    "font": {
      "family": "subheadings",
      "size": "ml",
      "weight": "bold",
    },
    "line-height": "compact",
  },
  "h5": {
    "font": {
      "family": "subheadings",
      "size": "md",
      "weight": "bold",
    },
    "line-height": "compact",
  },
  "h6": {
    "font": {
      "family": "subheadings",
      "size": "sm",
      "weight": "bold",
    },
    "line-height": "compact",
  },
} %}

{% embed "tcds:callout" with {theme: "neutral"} %}
{% block content %}
{% for level, styles in heading_styles %}
<p class="{{ level }}">Heading {{ level|slice(1) }}</p>

Usage: `<{{ level }}>` / `.{{ level }}`

<tcds-table {{ loop.last ? "" : "class='padding-bottom-md'" }}>
  <table>
    <thead>
      <tr>
        <th>Style rule</th>
        <th>Custom property</th>
        <th>Token setting</th>
        <th>CSS value</th>
      </tr>
    </thead>
    <tbody>
      {% for style, token in styles %}
        {% if token is iterable %}
          {% for _style, _token in token %}
            {% set rule = [style, _style]|join("-") %}
            {% set custom_prop = ["--tcds", style, _style, _token]|join("-") %}
            {% set token = [style, _style, _token]|join(".") %}
            {% set value = tokens[style][_style][_token]["$value"] %}
            <tr>
              <td><code>{{ rule }}</code></td>
              <td><code>{{ custom_prop }}</code></td>
              <td><code>{{ token }}</code></td>
              <td><code>{{ value }}</code></td>
            </tr>
          {% endfor %}
        {% elseif style|split("")[0] != "#" %}
          {% set rule = style %}
          {% set custom_prop = ["--tcds", style, token]|join("-") %}
          {% set _token = [style, token]|join(".") %}
          {% set value = tokens[style][token]["$value"] %}
          <tr>
            <td><code>{{ rule }}</code></td>
            <td><code>{{ custom_prop }}</code></td>
            <td><code>{{ _token }}</code></td>
            <td><code>{{ value }}</code></td>
          </tr>
        {% else %}
          {% set style = style|slice(1) %}
          {% set rule = style %}
          <tr>
            <td><code>{{ rule }}</code></td>
            <td></td>
            <td></td>
            <td><code>{{ token }}</code></td>
          </tr>
        {% endif %}
      {% endfor %}
    </tbody>
  </table>
</tcds-table>
{% endfor %}
{% endblock %}
{% endembed %}

## Vertical rhythm
Vertical rhythm is implemented in CSS via *block margin* (top and bottom space), and only applies to heading elements (`h1`–`h6`) rather than utility classes.

Block margin is applied contextually, based on where the heading sits relative to its container and siblings:

* **H1 elements** have no block-start (top) margin and a `1em` block-end (bottom) margin (unless they are the last element in their container).
* **H2–H6 elements** have a `1em` block-start margin (unless they are the first element) and a `1em` block-end margin (unless they are the last element).
  * If a heading follows non-heading body content (like paragraphs, lists, or tables), its block-start margin increases to `2em`.
  * The top margin remains at the default `1em` if the heading immediately follows the preceding heading level (e.g., an `h3` following an `h2`) or a [horizontal rule](/theming/horizontal-rule).
