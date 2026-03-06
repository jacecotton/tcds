---
title: Identity
description: The visual identity of Texas Children's is expressed in the Design System through design tokens, fonts, and graphics.
eleventyNavigation:
  key: Identity
  order: 1
---

*This section documents the Design System's implementation of the Texas Children's identity for the web. For authoritative brand identity information, see the [Brand Campaign Creative Playbook](https://texaschildrens.sharepoint.com/sites/MPRPSharedFiles/Shared%20Documents/Forms/AllItems.aspx?id=%2Fsites%2FMPRPSharedFiles%2FShared%20Documents%2FWeb%2FProjects%2FRazorfish1%2FDesign%20Files%2FTCH%5FDesign%20Lookbook%2Epdf&parent=%2Fsites%2FMPRPSharedFiles%2FShared%20Documents%2FWeb%2FProjects%2FRazorfish1%2FDesign%20Files).*

## Design tokens
### Conceptual overview
Design tokens are named variables that represent our design values, like specific hex colors, font sizes, or spacing metrics. These tokens serve as labels in design tools like Figma and as variables in code, keeping design and development in sync.

A token is a text string with segments ordered from general to specific, such as `color.palette.red.50`. In this example, `50` represents a specific shade, `red` contains all available shades of red, `palette` holds all raw colors, and `color` encompasses both our [color palette](/identity/color#palette) and [theme aliases](/identity/color#theming).

### In this documentation
Throughout this site, documentation pages indicate which tokens are available for different design values. Many values have multiple aliases for different applications. For example, the "cool background" token (`color.theme.cool.background`) points to the "blue 50" token (`color.palette.blue.50`), which in turn points to the hex code.

Typically, you'll find a "literal" token representing the dictionary value, and "semantic" aliases based on function or role—like the "heading font" token (`font.family.headings`), which is a semantic alias for the raw "serif font" token (`font.stack.serif`). Developers are encouraged to use semantic tokens where available and applicable.

### Technical information
Our design tokens are defined in JSON files at [`/src/tokens`](https://github.com/jacecotton/tcds/tree/jace-dev/src/tokens) in the codebase, providing a single source of truth. When we update the Design System, these JSON files are automatically transformed into platform-specific formats for Figma, CSS, and JavaScript. The documentation on this site also directly pulls from the source JSON when displaying values.

During transformation, token names adapt to each language's syntax and conventions. For instance, `color.palette.red.50` becomes `--tcds-color-palette-red-50` in CSS (*custom property*), and `ColorPaletteRed50` in JavaScript (*constant*). Platform nuances are documented in the relevant areas of the codebase rather than here.

## Fonts
Licensing issues, etc.

## Graphics
Icons and logos
