---
layout: playground.twig
selector: "tcds-accordion"
form:
  multiple:
    type: boolean
    label: Multiple
    default: false
  heading_level:
    type: select
    label: Heading level
    default: h3
    options:
      - h2
      - h3
      - h4
      - h5
      - h6
  sections:
    - label: Section 1
      fields:
        open:
          type: boolean
          label: Open
          default: false
          selector: "tcds-accordion-section:nth-of-type(1)"
          attribute: open
        title:
          type: text
          label: Title
          default: Accordion Section 1
          selector: "tcds-accordion-section:nth-of-type(1) [slot='title']"
          attribute: false
        content:
          type: textarea
          label: Content (or dropzone)
          default: >-
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          selector: "tcds-accordion-section:nth-of-type(1) > p"
          attribute: false
---

{{ attach_library("tcds:accordion") }}
{{ attach_library("tcds:accordion-section") }}
{{ include("./_examples/basic.twig") }}
