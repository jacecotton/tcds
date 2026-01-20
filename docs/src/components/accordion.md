---
layout: layout.twig
title: Accordion
---

{% set accordion_mock_data = {
  multiple: {
    type: 'boolean',
    label: 'Multiple',
    default: false
  },
  heading_level: {
    type: 'select',
    label: 'Heading level',
    default: 'h3',
    options: ['h2', 'h3', 'h4', 'h5', 'h6'],
  },
  sections: [
    {
      label: "Section 1",
      fields: {
        open: {
          type: 'boolean',
          label: 'Open',
          default: true,
          selector: 'tcds-accordion-section:nth-of-type(1)',
          attribute: 'open'
        },
        title: {
          type: 'text',
          label: 'Title',
          default: 'Accordion Section 1',
          selector: "tcds-accordion-section:nth-of-type(1) [slot='title']",
          attribute: false,
        },
        content: {
          type: "textarea",
          label: "Content (or dropzone)",
          default: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          selector: "tcds-accordion-section:nth-of-type(1) > p",
          attribute: false,
        },
      },
    },
    {
      label: "Section 2",
      fields: {
        open: {
          type: 'boolean',
          label: 'Open',
          default: false,
          selector: 'tcds-accordion-section:nth-of-type(2)',
          attribute: 'open'
        },
        title: {
          type: 'text',
          label: 'Title',
          default: 'Accordion Section 2',
          selector: "tcds-accordion-section:nth-of-type(2) [slot='title']",
          attribute: false,
        },
        content: {
          type: "textarea",
          label: "Content (or dropzone)",
          default: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
          selector: "tcds-accordion-section:nth-of-type(2) > p",
          attribute: false,
        },
      },
    },
  ],
} %}

{% embed "_includes/playground.twig" with { selector: 'tcds-accordion', form: accordion_mock_data } %}
  {% block content %}
    {% embed "tcds:accordion" with {
      sections: [
        {
          title: "Accordion Section 1",
          content: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>",
          open: true,
        },
        {
          title: "Accordion Section 2",
          content: "<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>",
        },
      ],
    } %}{% endembed %}
  {% endblock %}
{% endembed %}
