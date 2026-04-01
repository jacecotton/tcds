---
layout: playground.twig
selector: "tcds-card"
form:
  sections:
    - label: Configuration
      fields:
        heading_level:
          type: select
          label: Heading level
          default: " "
          options:
            - " "
            - h2
            - h3
            - h4
            - h5
            - h6
        orientation:
          type: select
          label: Orientation lock
          default: " "
          options:
            - " "
            - "vertical"
            - "horizontal"
        variant:
          type: select
          label: Variant
          default: " "
          options:
            - " "
            - "lite"
            - "featured"
        size:
          type: select
          label: Size
          default: " "
          options:
            - " "
            - "large"
    - label: Content
      fields:
        title:
          type: text
          label: Title
          default: Lorem ipsum dolor sit amet, consectetur
          selector: "tcds-card [slot='title']"
          attribute: false
        description:
          type: textarea
          label: Description
          default: >-
            Ut enim ad minim veniam, quis nostrud exercitation
          selector: "tcds-card [slot='description']"
          attribute: false
        meta:
          type: text
          label: Meta
          default: ""
          selector: "tcds-card [slot='meta']"
          attribute: false
        tag:
          type: text
          label: Tag
          default: ""
          selector: "tcds-card [slot='tag']"
          attribute: false
        footer:
          type: textarea
          label: Footer (slot)
          default: ""
          selector: "tcds-card [slot='footer']"
          attribute: false
---

{{ attach_library("tcds:card") }}
{% embed "./_examples/skeleton.twig" %}
  {% block footer %}
    <div style="border: 2px dashed var(--tcds-color-theme-edge); padding: var(--tcds-space-component-xs) var(--tcds-space-component-sm); font-size: var(--tcds-font-size-sm); color: var(--tcds-color-theme-muted); font-family: var(--tcds-font-family-ui); margin: var(--tcds-space-component-sm) 0 0; text-align: center">footer slot [ + ]</div>
  {% endblock %}
{% endembed %}
