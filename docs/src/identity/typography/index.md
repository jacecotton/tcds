---
title: Typography
description: Typography helps improve readability, establish relationships, and reinforce brand identity.
eleventyNavigation:
  key: Typography
  parent: Identity
---

This page covers our typography principles. See the [Theming](/theming) section for [heading](/theming/headings) and [copy](/theming/copy) styles.

## Typeface
Texas Children's Design System's primary typeface is the serif Calluna, and the secondary typeface is the sans-serif Mont.

{{ include("./_includes/typeface.twig", {
  typeface: "Calluna",
  class: "serif",
  weights: {semibold: "Calluna Semibold", bold: "Calluna Bold"},
  tokens: tokens
}) }}

{{ include("./_includes/typeface.twig", {
  typeface: "Mont",
  class: "sans-serif",
  weights: {semibold: "Mont Semibold", bold: "Mont Bold"},
  tokens: tokens
}) }}

**Use regular Calluna (400) for copy and small text, and Calluna Semibold (600) for large text.** Calluna Bold (700) may be used for emphasis, but avoid using it for headings and consecutive sentences.

**Use Mont Semibold (600) in most sans-serif cases.** Mont (400) may be used for text that needs to be de-emphasized. Mont Bold (700) is usually too heavy, but may be used for emphasis.

**Avoid Mont for paragraphs.** Mont should be used for single headlines, labels, and short captions. Use Calluna for multiple lines of copy.

## Type scale
{{ include("./_includes/type-scale.twig", {tokens: tokens}) }}

**Reserve extra large 3 (3XL) and above for landing pages.** Generally, these sizes are too large for the web. They can work well for promotional displays and routing components, but should be avoided in internal content pages and interfaces.

**Reserve XL and 2XL for section headings.** Heading elements (H1–H2) help organize content and structure a page layout. Subordinate components, like cards or tabs, should use large text (LG) and smaller.

**Avoid medium-large (ML) for standard body copy.** Landing page sections and article ledes may benefit from a slight bump in text size (hence "medium-large" rather than "*n*th-large"). Medium-large also works well for single lines of text and component typography. But long paragraphs of normal text should use medium (MD) sizing.

*Technical note:* Calluna is a naturally small font, so the Design System's stylesheet scales it up to 112% to better match Mont.

## Type color
**Be conservative with type color.** [Color themes](/identity/color#themes) and components handle most color for you. Don't use color for simple decoration or generic emphasis.

## Numerals
**Do not use oldstyle numerals (<span style="font-variant-numeric: oldstyle-nums">0, 1, 2, 3, 4</span>, ...)** Calluna uses oldstyle numerals by default, but the Design System's stylesheet enforces lining numerals (0, 1, 2, 3, 4, ...)

**Use tabular numbers for presenting data (<span style="font-variant-numeric: tabular-nums; font-family: var(--tcds-font-stack-sans-serif);">0, 1, 2, 3, 4</span>, ...)** Tabular numbers have identical horizontal widths (monospacing), which is especially useful where numbers may horizontally align with or substitute each other, like with list markers, table cells, or counters (number fields, countdown timers, etc.)

## Leading trim
**Ensure optical alignment when using Mont.** This font has quirky vertical metrics that cause misalignment when centering text with adjacent elements, like icons, or inside containers. Trim the built-in leading above the cap-height and below the baseline. Apply this only to single-line text (most use cases for Mont).

## Ligatures
**Do not use ligatures.** All ligatures are disabled by the Design System's codebase.

## Text justification
**Avoid right-justifying text in left-to-right languages.** Exceptions may include data inside of tables.

**Avoid center-justifying lengthy paragraphs and multiple lines of large text.** Centered paragraphs may be used but should be minimized. Multiple lines of large text should be generally avoided regardless of alignment.