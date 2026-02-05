---
title: Identity
description: The visual identity of Texas Children's is expressed through design tokens, fonts, and graphics. These elements are the essence of our brand and should be used consistently across all touchpoints.
eleventyNavigation:
  key: Identity
  order: 1
---

This section should cover design tokens (including color, layout, motion, surface, and typography), icons, and logos (basically a general branding section). It should document everything directly downstream of the tokens, like utility classes.

Theming covers the consumption of those design choices for specific HTML primitives. For example, whereas typography covers things like font stacks, type scales, and when to employ certain design decisions, Theming > Headings documents the *execution* of those guidelines by `h1`–`h6` elements (specific combos of font size, weight, letter-spacing, line-height, and color).

Like all sections, each documentation page should be split by audience. For example:

- Color
  - Audience: Overview (think designer)
    - Generic palette grid
    - Themes and modes (neutral/cool/warm = white/blue/red)
    - Color usage guidelines (do's and don't's)
  - Audience: Editor (also think page builder, site builder, non-SME, etc.)
    - As an editor, you're pretty much only ever setting color as the background of landing page sections, as far as I can think (maybe also heading colors for some sections). Maybe just include guidelines about that (alternate, keep it simple, etc.) Technically this also applies to designers, but I think the design tab will be a lot more expansive (e.g: why do we use navy in the footer? when and how often do we use red-700?) Whereas for editors, advice can be kept a lot more simple (don't stack light cool and warm sections (Y or Z axis), alternate section colors, etc.)
    - Color is a lot more abstracted for editors. They can pick themes and modes, but everything is generally handled for them from there. Write documentation here to reflect that.
  - Audience: Developer (maintainers, downstream users, etc.)
    - Color tokens (more compact swatch table, a la Tailwind)
    - Theme/mode tokens (`[data-]` attributes, how that impacts custom properties, etc.)
    - Utility classes
    - Don't really need usage guidelines — devs should only be adapting pre-existing designs.
      - Maybe have a line to the effect of "don't do impromptu design" that matches the same on the Content/Editor tab.
- Layout
  - Audience: Overview
    - Aspect ratio
    - Size
      - Breakpoints
    - Space
  - Audience: Editor
    - Common container size, component spacing settings
    - Image thumbnail aspect ratio settings?
    - Modal aspect ratio settings?
  - Audience: Developer
    - Layout tokens (unique: z-index documentation)
    - Utility classes
    - Again, if I'm tempted to write usage guidelines here related to either tokens or utilities, consider whether that advice can be moved upstream.
