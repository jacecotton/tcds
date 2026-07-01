---
layout: playground.twig
selector: ".tcds-section"
form:
  sections:
    - label: Configuration
      fields:
        "data-theme":
          type: select
          label: Theme
          default: cool
          options:
            - neutral
            - cool
            - warm
            - dark
    - label: Content
      fields:
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
          selector: ".tcds-section p"
          attribute: false
---

{{ attach_library("tcds:section") }}
{{ include("./_examples/basic.twig") }}
