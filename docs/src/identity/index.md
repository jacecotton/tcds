---
title: Identity
description: The visual identity of Texas Children's is expressed in the Design System through design tokens, fonts, and graphics. These elements form part of our brand and should be used consistently across all touchpoints.
eleventyNavigation:
  key: Identity
  order: 1
---

## Design tokens
### Conceptual introduction
Design tokens are named variables that store fundamental design decisions—like a specific hex color, font size, or spacing value. These tokens serve as labels in design tools like Figma and as variables in code, keeping design and development in sync.

A token is a text string with segments ordered from general to specific, such as `color.palette.red.50`. In this example, `50` represents a specific shade, `red` contains all available shades of red, `palette` holds all raw colors, and `color` encompasses both our [color palette](/identity/color#palette) and [theme aliases](/identity/color#theming).

### In this documentation
Throughout this site, documentation pages indicate which tokens are available for different design values. Many values have multiple aliases pointing to the same underlying value. For example, `color.palette.blue.900` and `color.theme.cool.foreground` share the same hex code. 

Typically, you'll find a "raw" token representing the literal value, plus "semantic" aliases based on function or role—like `font.family.headings` (semantic), which references `font.stack.serif` (raw). Developers are encouraged to use semantic tokens where available and applicable.

### Technical information
Our design tokens are defined in JSON files at [`/src/tokens`](https://github.com/jacecotton/tcds/tree/jace-dev/src/tokens) in the codebase, providing a single source of truth. When we build the Design System, these JSON files are automatically transformed into platform-specific formats for Figma, CSS, and JavaScript. The documentation on this site also directly pulls from the source JSON when displaying values.

During transformation, token names adapt to each language's syntax and conventions. For instance, `color.palette.red.50` becomes `--tcds-color-palette-red-50` in CSS and `ColorPaletteRed50` in JavaScript. Platform nuances are documented in the relevant areas of the codebase rather than here.

## Fonts
Licensing issues, etc.

## Graphics
Icons and logos

----
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
