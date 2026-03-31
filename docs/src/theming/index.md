---
title: Theming
description: Texas Children's Design System provides a consistent theme to all website elements through its default stylesheet. Overrides are supported and documented here for easy subtheming.
eleventyNavigation:
  key: Theming
  order: 2
---

*This section is primarily intended for developers and content management experts. Designers should refer to the [Site Style Guide](https://texaschildrens.sharepoint.com/sites/MPRPSharedFiles/Shared%20Documents/Forms/AllItems.aspx?id=%2Fsites%2FMPRPSharedFiles%2FShared%20Documents%2FWeb%2FProjects%2FRazorfish1%2FDesign%20Files%2FWebsite%20Style%20Guide%2FTC%5FSiteStyleGuide%2Epdf&parent=%2Fsites%2FMPRPSharedFiles%2FShared%20Documents%2FWeb%2FProjects%2FRazorfish1%2FDesign%20Files%2FWebsite%20Style%20Guide) as the authoritative reference.*

This section documents default styles applied to bare HTML elements, as well as the corresponding CSS tokens (*custom properties*) that can be configured to adjust the theme for different Texas Children's properties. [Components](/components) and [templates](/templates) also document their own CSS tokens for subtheming. See [Identity &sect; Design tokens](/identity#design-tokens) for an overview of how design tokens work.

## Guidance
**Only create subthemes for distinct properties**, *not* sub-entities within a single property.

**Some styles have no configuration options.** Custom properties may not be exposed if the style is considered a matter of best practice (such as minimum font sizes, list indentation, etc.) rather than a matter of design style.

## Usage
There are two approaches to modifying the theme: writing CSS custom properties directly (overrides), or modifying the token files and rebuilding the Design System (forking).

We do not recommend adding your own CSS overrides except through custom properties due to likely issues with specificity, scope, and our use of the shadow DOM. Using custom properties ensures maintainability and scalability over time, especially as the Design System receives updates to the rest of the codebase.

It is possible custom properties and tokens change with updates, but these breaking changes will be indicated within the release notes and migration guidance will be given.

### CSS overrides
This is the easiest and simplest way to subtheme. Simply create a `:root` block somewhere in your CSS and override variables as needed, based on what the documentation indicates is available. We advise that you do this inside a `@layer` that takes precedence over the existing Design System CSS.

In this example, we're overriding tokens documented in the [Identity](/identity) section:

{% set subtheme_ex %}
@layer my-subtheme {
  :root {
    /* Raw tokens */
    --tcds-font-stack-sans-serif: "Proxima Nova", sans-serif;
    --tcds-color-palette-yellow-200: oklch(0.8361 0.1577 85.76);

    /* Semantic tokens */
    --tcds-font-family-headings: var(--tcds-font-stack-sans-serif);
    --tcds-color-theme-warm-background: var(--tcds-color-palette-yellow-200);
  }
}
{% endset %}
<pre class="example__code"><code>{{ subtheme_ex|highlight }}</code></pre>

From here, native HTML element styles will reflect your configurations, as well as any utility classes, components, templates, or other elements styled using tokens.

### Token forking
For Identity-level tokens, if your subtheme is significantly different from the default theme, we recommend forking the Design System and modifying the JSON token files directly. The benefit to doing this is:

1. Token consumption in JavaScript, Sass, and any other formats than CSS will reflect your subtheme.
2. There will be no redundant, unused code from the default token values. The bundle sizes will be optimized to your website's exact needs.

For element-, component-, and template-level tokens, you will still override CSS custom properties for modifications.

All Identity tokens live at `/src/tokens`.

Example changes to `/src/tokens/color/color.json`:

<pre class="example__code"><code>{
  "color": {
    "$type": "color",
    "palette": {
      -- Add or change colors --
      "yellow": {
        "200": {"$value": "oklch(0.8361 0.1577 85.76)"}
      }
      ...
    },
    "brand": {
      -- Modify semantic <-> raw token mappings --
      "primary": {"$value": "{color.palette.yellow.200}"}
    },
    -- Update themes as needed --
    "theme": {
      "neutral": { ... }
    }
  }
}</code></pre>

Example changes to `/src/tokens/typography/font.json`:

<pre class="example__code"><code>{
  "font": {
    "stack": {
      "$type": "fontFamily",
      "sans-serif": {
        "$description": "Our primary font stack.",
        "$value": ["Proxima Nova", "sans-serif"]
      }
    },
    "family": {
      "$type": "fontFamily",
      "primary": {
        "$description": "Display text (headlines, taglines)",
        "$value": "{font.stack.sans-serif}"
      },
      "headings": {
        "$description": "Heading elements (H1 and H2)",
        "$value": "{font.stack.sans-serif}"
      },
      ...
    },
    "weight": { ... },
    "size": {
      "$type": "dimension",
      "xs": {"$value": "0.8rem"},
      "sm": {"$value": "0.9rem"},
      "md": {"$value": "1rem"},
      "ml": {"$value": "1.25rem"},
      "lg": {"$value": "1.5rem"},
      ...
    }
  }
}</code></pre>

(*Note:* you will need to be careful to abide by the existing schema of the token files and the [DTCG specification](https://www.designtokens.org/tr/drafts/format/), otherwise the code generated from them may break, or the API of certain utility classes or components may change in unexpected ways.)

To change the icon library, replace or add icons in the `/src/images/icons` directory and run `build:images`. This will automatically generate an icon manifest at `/src/tokens/_gen/icons.json`, which can be used as tokens.

From here, you can run the `build:tokens` command to build just the tokens (using [Style Dictionary](https://styledictionary.com/)). You will need to run other individual build commands, like `build:css` and `build:js`, for the codebase to reflect your token changes. Or you can simply run `build` to rebuild the entire Design System (recommended). Please refer to the [`tcds` code repository](https://github.com/jacecotton/tcds) for further technical documentation.
