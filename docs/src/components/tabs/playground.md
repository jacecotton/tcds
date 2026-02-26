---
layout: playground.twig
selector: "tcds-tabs"
form:
  variant:
    type: select
    label: Variant
    default: null
    options:
      - null
      - raised
  sections:
    - label: Tab 1
    - label: Tab 2
      fields:
        selected:
          type: boolean
          label: Selected
          default: false
          selector: "tcds-tab:nth-of-type(2)"
          attribute: selected
        title:
          type: text
          label: Title
          default: Tab 2
          selector: "tcds-tab:nth-of-type(2) [slot='title']"
          attribute: false
        content:
          type: textarea
          label: Content (or dropzone)
          default: >-
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
          selector: "tcds-tab:nth-of-type(2) > p"
          attribute: false
    - label: Tab 3
---

{{ attach_library("tcds:section") }}
{{ attach_library("tcds:tabs") }}
{{ attach_library("tcds:tab") }}
{{ include("./_examples/raised.twig") }}
