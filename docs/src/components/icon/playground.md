---
layout: playground.twig
selector: "tcds-icon"
form:
  icon:
    type: select
    label: Icon
    options: use_icon_library
    default: "texas-childrens"
---

{{ attach_library("tcds:icon") }}
{{ include("./_examples/basic.twig") }}
