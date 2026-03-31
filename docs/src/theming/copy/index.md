---
title: Copy
description: Copy elements include paragraphs and lists, and are used to present the main text content of a page.
eleventyNavigation:
  key: Copy
  parent: Theming
---
{{ attach_library("tcds:table") }}

## Styling
Paragraphs (`p`) and list items (`li`) generally have the exact same styling.

{% embed "tcds:callout" with {theme: "neutral"} %}
{% block content %}

Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia possimus facilis reprehenderit doloremque voluptatem asperiores. Totam, minus non placeat, perferendis dolorem rem, corrupti odit ut similique quo vitae nisi in? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit, magni?

Optio eaque obcaecati magni. Odit tempora itaque magni facilis, nisi tempore ratione possimus reiciendis assumenda! Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem dolore sit porro ut officiis nulla excepturi error ullam ad tempore.

* Lorem ipsum dolor sit amet consectetur adipisicing elit. In, a!

<tcds-table>
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
      <tr>
        <td><code>font-family</code></td>
        <td><code>--tcds-font-family-copy</code></td>
        <td><code>font.family.copy</code></td>
        <td><code>{{ tokens.font.family.copy["$value"] }}</code></td>
      </tr>
      <tr>
        <td><code>font-size</code></td>
        <td><code>--tcds-font-size-md</code></td>
        <td><code>font.size.md</code></td>
        <td><code>{{ tokens.font.size.md["$value"] }}</code></td>
      </tr>
      <tr>
        <td><code>line-height</code></td>
        <td><code>--tcds-line-height-comfortable</code></td>
        <td><code>line-height.comfortable</code></td>
        <td><code>{{ tokens["line-height"].comfortable["$value"] }}</code></td>
      </tr>
    </tbody>
  </table>
</tcds-table>
{% endblock %}
{% endembed %}

### Lists
First-level unordered (`ul`) and ordered lists (`ol`) are indented with 4 spaces, while second-level and above are indented with 2 spaces.

{% embed "tcds:callout" with {theme: "neutral"} %}
{% block content %}

First-level unordered lists use `bullet` markers, while second-level lists use empty bullets.

* Lorem ipsum dolor sit amet consectetur adipisicing elit. In, a!
* Corporis, quibusdam? Architecto ad recusandae repellendus? Alias est dolorum aliquam?
    * Delectus voluptate consectetur aspernatur! A iusto beatae architecto animi molestias suscipit iste.
* Hic nemo quos, sint exercitationem suscipit eveniet esse ut quis?

First-level ordered lists use `decimal` markers (1, 2, 3), while second-level lists use `upper-alpha` (A, B, C), and third-level use `upper-roman` (I, II, III).

1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, non?
    1. Hic esse architecto impedit consectetur! Vero sit maiores, omnis rerum eius tempora.
        1. Distinctio hic iste aut magni mollitia nostrum quae explicabo perferendis rerum aliquam.
        1. Maxime quasi dolores sit veniam eveniet deleniti molestias obcaecati, cum mollitia accusamus.
        1. Impedit a voluptatum sed facere sint rem vel laudantium est tempore atque!
    1. Sint, itaque nemo? Modi aliquid ex molestias vero ab voluptatibus tempora facilis?
1. Omnis aliquam temporibus fugit ratione harum magni quidem ullam sit!
1. Magnam iste dolorem earum laborum ex sunt illum error deleniti.

*Note:* Ordered lists use `tabular-nums` for a monospacing effect.

{% endblock %}
{% endembed %}

### Links
Unless styled differently (like in menus or components), links (`a`) use the [theme accent color](/identity/color) (`color.theme.accent`). Links are underlined until hovered over, to provide more visual affordance for links than color alone.

{% embed "tcds:callout" with {theme: "neutral"} %}
{% block content %}

[This is a link](#link-example)

Links to external websites are indicated by an icon: [www.texaschildrens.org](https://www.texaschildrens.org)

| Style rule | Custom property | Token setting | CSS value |
| ---------- | --------------- | ------------- | --------- |
| `color` | `--tcds-link-color` | `color.theme.accent` | `{color.palette.red.500}` |
| `color` | `--tcds-link-color-hover` | `color.theme.accent` | `{color.palette.red.500}` |
{% endblock %}
{% endembed %}

### Small text
Small text, like for captions or fine print (`small`) or superscript (`sup`) or subscript (`sub`), is reduced by 85% with a floor of [extra-small text](/identity/typography) (`font.size.xs`).

{% embed "tcds:callout" with {theme: "neutral"} %}
{% block content %}
<p><small>A caption or fine print copy.</small></p>

Regular text with superscript<sup>1</sup> and subscript<sub>2</sub>
{% endblock %}
{% endembed %}

## Vertical rhythm
Vertical rhythm is implemented in CSS via *block margin* (top and bottom space), and only applies to base elements (`p`, `ul`, etc.) rather than utility classes.

Block margin is applied contextually, based on where the element sits relative to its container and siblings:

* **Paragraph elements** have a `1em` block-start (top) margin (unless they are the first element in their container, preceded by a slotted element, or are themselves slotted elements), and a `1em` block-end (bottom) margin (unless they are the last contentful child in their container).
* **List elements** have a block-end margin of `1em` (unless they are nested inside a list item (`li`) element).
