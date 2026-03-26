---
title: Accordion
description: Accordions collapse content under headings, expanding it when a heading is clicked.
image: /dist/images/component-illustration-accordion.png
eleventyNavigation:
  key: Accordion
  parent: Components
  order: 1
---

{{ attach_library("tcds:accordion") }}
{{ attach_library("tcds:accordion-section") }}

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

{% embed "tcds:callout" with {
  custom_classes: ["key-points"],
} %}
{% block content %}

**Key points:**

* Use accordions, if necessary, to let users focus only on the content they need
* Accordion sections open one at a time, unless you specify otherwise
* Accordion sections can be open by default or deep linked to

{% endblock %}
{% endembed %}

### Guidance
#### Best practices
**Aim for 20–60 characters for accordion section titles.** Titles should be concise enough to be read quickly, but clear enough to provide sufficient [information scent](https://www.nngroup.com/articles/information-scent/). Avoid multi-line titles.

**Use sentence case for accordion section titles.** All-uppercase text is more difficult to read. Furthermore, screen readers sometimes interpret uppercase words as common initialisms (such as ADD or US), erroneously spelling them out letter by letter.

**Choose the appropriate heading level for the document outline.** Each accordion title should have the appropriate heading level based on the section it's contained within. For instance, if an accordion is below an H2 heading, configure the component to use H3 titles.

**Avoid nesting accordions or other disclosure patterns.** While possible, needing to do so may indicate that your content is too complex and needs to be simplified.

#### When to use
**For audience tailoring or progressive disclosure.** When content may be relevant only to a particular audience, or only in a certain sequence, accordions allow users to focus on the information they need by scanning section headings to skip over less relevant sections. For example, "Frequently Asked Questions" sections.

**For navigation comfort or decluttering.** If a page becomes too long to comfortably navigate, and cannot be simplified or split into multiple pages, accordions can help better organize and condense content.

#### When not to use
**When there is little content to collapse.** The [interaction cost](https://www.nngroup.com/articles/interaction-cost-definition/) of accordions should be weighed against the space actually saved. Avoid using accordions simply to break up content or target specific audiences if the content is sparse or the distinctions minor.

**When most content is generally relevant.** If most users may find the information useful, at any time or in any sequence, try showing it by default.

**Low engagement or discoverability.** If there is evidence to suggest users are missing relevant content, show it by default.

**When a different component is a better fit.** For quickly comparing different pieces of content of the same information type, consider the [Tabs](/components/tabs) component. For collapsing only a single, independent section, consider [Details](/components/details).

### Options
#### Heading level
You can configure the **Heading level** for all of an accordion's section titles to structure the content within the rest of the page's outline. Doing so is important for improving comprehension by computer agents (assistive technology like screen readers, search engines, and AI crawlers).

Since most accordions will be used within a page's top-level section (H2), the default configuration is **H3**.

#### Default open
You can configure a section to be expanded by default with the **Open** toggle. This can be useful if one section contains the primary or required content, leaving the secondary or optional content to be selectively disclosed.

If the [Multiple option](#multiple-open-sections) is enabled, you can configure multiple sections to be opened at once, though this is discouraged as it may confuse the user.

#### Multiple open
The **Multiple** option allows users to open multiple sections at once. It automatically provides "open all" and "close all" buttons to make the interface easier to manage.

Consider enabling the Multiple option if your use case fits the following:

* The contained information might need to be compared or cross-referenced
* The accordion is being used in an interface or to organize filters or other selection options

Otherwise, disable the Multiple option to minimize cognitive load and simplify the experience.

### Features
#### Deep-linking sections
You can open and scroll to an accordion section on page-load ("jump-linking"). When linking to a page with an accordion you wish to jump-link to, add an anchor hash to the end of the URL that matches the ID of a section.

Section IDs are automatically generated from the title by converting it to a [slug](https://www.semrush.com/blog/what-is-a-url-slug/). For instance, "My Accordion Title" derives the ID `my-accordion-title`, which you can then append to a URL (`/some/example-page#my-accordion-title`).

You can also jump-link to an element with an ID inside of an accordion ("deep-linking") using the same method.

#### Text search reveal
Similar to deep-linking, browser text search (CMD/CTRL + F) will cause an accordion section to automatically open if it contains matching text (not counting the accordion section heading).

#### Viewport tracking
In accordions without the Multiple option enabled, opening a shorter section beneath a longer section may cause the newly opened section heading to "land" above the upper bound of the viewport. In these cases the accordion component will cause the browser to automatically scroll to the top of the section heading to keep the user oriented.

#### Mobile sticky headings
On smaller viewports, accordion section headings will scroll with the user to the bottom of the content to allow for easy toggling.

{% endblock %}
{% block developers %}

### Implementation
#### Basic usage
Accordions are implemented with the `tcds-accordion` and `tcds-accordion-section` elements. Accordion section headings are marked up with regular heading elements (`h2`–`h6`) with a `[slot=title]` attribute. Content can have arbitrary markup and is inserted into the default slot.

{% embed "_includes/example.twig" with {code: true, open: true} %}
{% block content %}
{{ include("./_examples/basic.twig") }}
{% endblock %}
{% endembed %}

#### Default open
The `[open]` attribute controls and reflects a section's open state. You can add it to a specific `tcds-accordion-section` element to open it by default.

{% embed "_includes/example.twig" with {code: true, highlight: 12} %}
{% block content %}
{{ include("./_examples/default-open.twig") }}
{% endblock %}
{% endembed %}

#### Multiple open
Use the `[multiple]` attribute to allow multiple accordion sections to be opened at a time. "Open all" and "close all" buttons will automatically be rendered.

{% embed "_includes/example.twig" with {code: true, highlight: 1} %}
{% block content %}
{{ include("./_examples/multiple-open.twig") }}
{% endblock %}
{% endembed %}

#### Heading level
Control the heading level of an accordion section with the `[slot=title]` element (repeatable heading elements only, i.e. `h2`–`h6`).

{% set heading_level_example %}
<tcds-accordion-section>
  <h2 slot="title">Accordion section at H2 level</h2>
  ...
</tcds-accordion-section>{% endset %}

<pre class="example__code">
<code>
{{ heading_level_example|highlight }}</code></pre>

**Note:** This does not cause any visual change.

### API reference
#### Twig
##### `tcds-accordion`
{% set twig_props = [
  {
    name: "multiple",
    type: "boolean",
    default: "false",
    required: false,
  },
  {
    name: "sections",
    type: "array",
    required: false,
    notes: "Collection of objects for <code>tcds:accordion-section</code> data (see below for schema).",
  },
] %}

{% set twig_slots = [
  {
    name: "sections",
    required: false,
    notes: "Arbitrary slot for <code>tcds:accordion-section</code> children.",
  },
] %}

{{ include("_includes/api/twig.twig", {
  props: twig_props,
  slots: twig_slots,
}) }}

##### `tcds-accordion-section`
{% set twig_props_section = [
  {
    name: "heading_level",
    type: "enum",
    options: ["h2", "h3", "h4", "h5", "h6"],
    default: "h3",
    required: false,
  },
  {
    name: "open",
    type: "boolean",
    default: "false",
    required: false,
  },
  {
    name: "title",
    type: "string",
    required: true,
  },
  {
    name: "content",
    type: "any",
    required: false,
    notes: "Required only if <code>content</code> block is not defined. Must be string or render result.",
  },
] %}
{% set twig_slots_section = [
  {
    name: "content",
    required: false,
    notes: "Required only if <code>content</code> prop is not defined. Must be render result.",
  },
] %}

{{ include("_includes/api/twig.twig", {
  props: twig_props_section,
  slots: twig_slots_section,
}) }}

#### HTML
##### `tcds-accordion`
{% set html_attrs = [
  {
    name: "multiple",
    type: "boolean",
    default: "false",
    required: false,
  },
] %}
{% set html_slots = [
  {
    name: "default",
    required: false,
    allowed: ["any"],
  },
] %}
{{ include("_includes/api/html.twig", {
  attributes: html_attrs,
  slots: html_slots,
}) }}

##### `tcds-accordion-section`
{% set html_attrs_section = [
  {
    name: "open",
    type: "boolean",
    default: "false",
    required: false,
  },
] %}
{% set html_slots_section = [
  {
    name: "title",
    required: true,
    allowed: ["h2", "h3", "h4", "h5", "h6"],
  },
  {
    name: "default",
    required: false,
    allowed: ["any"],
  },
] %}
{{ include("_includes/api/html.twig", {
  attributes: html_attrs_section,
  slots: html_slots_section,
}) }}

#### JavaScript
##### `TCDSAccordion`
{% set js_methods = [
  {
    name: "showAll",
    modifiers: ["async"],
    description: "Open all sections belonging to this accordion.",
    parameters: [
      {
        name: "filter",
        type: "function(HTMLElement) { Boolean }",
        description: "An optional filter to exclude sections from opening given custom criteria.",
      },
    ],
    returns: "Promise&lt;Array&lt;Boolean>>",
  },
  {
    name: "closeAll",
    modifiers: ["async"],
    description: "Close all sections belonging to this accordion.",
    parameters: [
      {
        name: "filter",
        type: "function(HTMLElement)",
        returns: "boolean",
        description: "An optional filter to exclude sections from closing given custom criteria.",
      },
    ],
    returns: "Promise&lt;Array&lt;Boolean>>",
  },
] %}
{{ include("_includes/api/js.twig", {
  methods: js_methods,
}) }}

##### `TCDSAccordionSection`

#### CSS
* custom properties

{% endblock %}
{% endembed %}
