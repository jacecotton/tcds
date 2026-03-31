---
title: Card
description: Cards display snippets of linked content, typically including its image, title, and description.
image: /dist/images/component-illustration-card.png
eleventyNavigation:
  key: Card
  parent: Components
  order: 3
---

{{ attach_library("tcds:card") }}
{{ attach_library("tcds:cta") }}

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
{{ include("./_examples/skeleton.twig") }}
{% endblock %}
{% endembed %}

### Guidance
#### Best practices
**Aim for 20–60 characters for card titles.** Keep titles concise but descriptive. Do not exceed 100 characters.

**Aim for 20–100 characters for card descriptions.** Cards are meant to display snippets and serve as teasers, not layout containers for full content.

**Choose the appropriate heading level for the document outline.** If cards outline a page's overall content, use the semantically appropriate heading element.

#### When to use
**Teasers and calls-to-action.** Cards work best to display preview snippets and route users into further content or provide additional actions.

#### When not to use
**Purely decorative display.** To structure regular content that does not route into further content, consider another component. For instance, you can combine an image and a regular text group together with the [Grid](/components/grid) component.

### Options
#### Orientation
Cards have two possible orientations: *vertical* (image above content), and *horizontal* (image left of content).

* By default, cards are vertical. On small screens (less than the [`size.breakpoint.md`](/identity/layout)), cards become horizontal to save scrolling space, but will switch back to vertical if the card's container (such as a sidebar or carousel slide) is too small (less than `size.breakpoint.xs`).
* Cards try to fill the full width of their container, though vertical cards have a maximum width of {{ tokens.size.2["$value"] }}.

You can lock a card's orientation by setting the **Orientation** option in the component settings.

#### Lite variant
You can use the **Variant** field to create a "lite" card, which removes the [surface treatment](/identity/surfaces) and content padding, and applies a transparent background. This option works well if the card's surface does not need to be as emphasized.

#### Featured variant
You can use the Variant field to create a "featured" card, which applies a translucent navy background to the content area, and overlays the content on the image. This option works well for above-the-fold carousels highlighting featured content.

#### Size
You can use the **Size** field to create a card with larger text and padding. Avoid using this option if multiple cards are displayed in the same section, like a list or grid.

#### Text alignment
You can use the **Text alignment** field to center text within the card. Only use this option for routing purposes, like on landing pages linking to sub-pages. Avoid this option for displaying query results, like article feeds.

#### Heading level
You can configure the **Heading level** of a card's title to structure the content within the rest of the page's outline. Because cards typically display standalone teaser snippets, this is usually not necessary, and the default is *null*.

Only use this option if manual testing with a screen reader helps you to determine a heading element for a card's title would be useful in a given circumstance.

### Features
In addition to a standard image, title, and description field, the following less common fields are available.

#### Meta text
Meta information like dates, categories, estimated reading time, etc. can be displayed as small, muted text above the title.

#### Content tag
Tags can be used to classify content categories and are placed in the top right corner of the card (over the image in vertical cards).

#### Custom footer
Cards have a footer slot for inserting arbitrary elements. We recommend only using [Call to Action](/components/call-to-action) links with the *secondary* variant.

{% endblock %}
{% block developers %}

### Implementation
#### Basic usage
Cards are implemented with the `tcds-card` element. Card titles can be added with a `[slot=title]` attribute on any of the following elements, in order of preference:
1. an `a` element (with a `[href]` attribute set to the card's main link)
2. a heading element (`h2`–`h6`), which can optionally contain an `a` element
3. a `p` element (only if the card has no link—not recommended)

Card descriptions should be marked up with a `p` element with a `[slot=description]` attribute.

Card images should be marked up with either a `figure`, `picture > img`, or `img` element with a `[slot=image]` attribute (on the outer-most element).

{% embed "_includes/example.twig" with {code: true, open: true} %}
{% block content %}
{{ include("./_examples/basic.twig") }}
{% endblock %}
{% endembed %}

<p>
Note that if a card has an empty <code>figure[slot=image]</code> element, a Texas Children's logomark (<tcds-icon icon="texas-childrens"></tcds-icon>) placeholder will be rendered automatically. To avoid this behavior, only conditionally include the element in your templating logic, or use a <code>picture</code>/<code>img</code> element.
</p>

#### Orientation
Orientation is handled automatically by default:
* All cards start vertical
* On smaller screens (below `size.breakpoint.md`), the card will go horizontal to save scrolling space
* If the card's container is too small (below `size.breakpoint.sm`) the card will return to vertical

You can lock the orientation to either `horizontal` or `vertical` with the `[orientation]` attribute (however cards with `[orientation=horizontal]` will still become vertical if the card's container is too small).

{% embed "_includes/example.twig" with {code: true, highlight: 1} %}
{% block content %}
{{ include("./_examples/orientation.twig") }}
{% endblock %}
{% endembed %}

#### Lite variant
Lite cards can be created with a `[variant=lite]` attribute.

{% embed "_includes/example.twig" with {code: true, highlight: 1} %}
{% block content %}
{{ include("./_examples/lite.twig") }}
{% endblock %}
{% endembed %}

#### Featured variant
*Coming soon.*

#### Size
*Coming soon.*

#### Meta text
Meta text can be added with an element with a `[slot=meta]` attribute. `small` is recommended, or `p`, or `p > small`.

When templating, consider the type of information that may be added here. For instance, if it's likely to be a date, use the appropriate semantics (`time[timestamp]`).

{% embed "_includes/example.twig" with {code: true, highlight: 3} %}
{% block content %}
{{ include("./_examples/meta.twig") }}
{% endblock %}
{% endembed %}

#### Content tag
A content tag can be added with a `[slot=tag]` element. `small` is recommended.

{% embed "_includes/example.twig" with {code: true, highlight: 3} %}
{% block content %}
{{ include("./_examples/tag.twig") }}
{% endblock %}
{% endembed %}

#### Custom footer
Footers can be added with a `footer` element and a `[slot=footer]` attribute.

{% embed "_includes/example.twig" with {code: true, highlight: [5, 6, 7]} %}
{% block content %}
{{ include("./_examples/footer.twig") }}
{% endblock %}
{% endembed %}

Note in this example we're adding a [Call to Action](/components/call-to-action) as a `span`, because the link is already added by the `[slot=title]` element and applies to the entire card surface.

### API reference
#### HTML
{% set html_attrs = [
  {
    name: "orientation",
    type: "enum",
    options: ["horizontal", "vertical"],
    required: false,
  },
  {
    name: "variant",
    type: "enum",
    options: ["featured", "lite"],
    required: false,
  },
  {
    name: "size",
    type: "enum",
    options: ["large"],
    required: false,
  },
] %}
{% set html_slots = [
  {
    name: "title",
    required: true,
    allowed: ["a", "p", "h2", "h3", "h4", "h5", "h6"],
  },
  {
    name: "description",
    required: false,
    allowed: ["p"],
  },
  {
    name: "meta",
    required: false,
    allowed: ["p", "small", "span"],
  },
  {
    name: "tag",
    required: false,
    allowed: ["p", "small", "span"],
  },
  {
    name: "footer",
    required: false,
    allowed: ["footer"],
  },
] %}
{{ include("_includes/api/html.twig", {
  attributes: html_attrs,
  slots: html_slots,
}) }}

#### CSS
{% set css_props = [
  {
    name: "--tcds-card-background-color",
    syntax: "color",
    default: "var(--tcds-color-theme-neutral-background)",
  },
  {
    name: "--tcds-card-foreground-color",
    syntax: "color",
    default: "var(--tcds-color-theme-neutral-foreground)",
  },
  {
    name: "--tcds-card-border-radius",
    syntax: "length",
    default: "var(--tcds-border-radius-sm)",
  },
  {
    name: "--tcds-card-box-shadow",
    syntax: "string",
    default: "var(--tcds-box-shadow-sm)",
  },
  {
    name: "--tcds-card-content-padding-block",
    syntax: "length",
    default: "1em",
  },
  {
    name: "--tcds-card-content-padding-inline",
    syntax: "length",
    default: "1em",
  },
  {
    name: "--tcds-card-content-padding",
    syntax: "string",
    default: "var(--tcds-card-content-padding-block) var(--tcds-card-content-padding-inline)",
  },
  {
    name: "--tcds-card-content-gap",
    syntax: "length",
    default: "1em",
  },
  {
    name: "--tcds-card-content-font-family",
    syntax: "string",
    default: "var(--tcds-font-family-copy)",
  },
  {
    name: "--tcds-card-title-font-size",
    syntax: "length",
    default: "var(--tcds-font-size-lg)",
  },
  {
    name: "--tcds-card-title-line-height",
    syntax: "number",
    default: "var(--tcds-line-height-compact)",
  },
  {
    name: "--tcds-card-description-font-size",
    syntax: "length",
    default: "var(--tcds-font-size-md)",
  },
  {
    name: "--tcds-card-description-line-height",
    syntax: "number",
    default: "var(--tcds-line-height-comfortable)",
  },
  {
    name: "--tcds-card-width",
    syntax: "length",
    default: "var(--tcds-size-layout-xs)",
  },
  {
    name: "--tcds-card-image-aspect-ratio",
    syntax: "ratio",
    default: "initial",
  },
  {
    name: "--tcds-card-image-gradient",
    syntax: "color",
    default: "hidden",
  }
] %}
{{ include("_includes/api/css.twig", {
  custom_properties: css_props,
}) }}

{% endblock %}
{% endembed %}
