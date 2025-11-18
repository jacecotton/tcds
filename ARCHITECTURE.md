TOOLING
--------------------------------------------------------------------------------
- Style Dictionary for design tokens
  - Add token autocomplete extension for style dictionary
- SSG docs via 11ty + Nunjucks
- npm workspaces for individual packages

PACKAGES
--------------------------------------------------------------------------------
Packages are differentiated by whether dedicated `src`/`dist` pairs are needed.

Tokens are separated out because the `src` is `.json` and the `dist` is `.scss`
and `.js`. This pairing requires its own tooling (Style Dictionary), thus its
own isolated set of dependencies and build scripts (in package root).

It'd be unwise to mix this with, for example, `foundation` styles, because it's
a completely different tooling system + distribution payload + expected
consumption experience. It's literally a different "package".

It could make sense to output tokens as SCSS in `foundation/src/styles` (`.scss`
files), except for the simple fact that that's outputting `src` to `src`, even
though it's a different folder. We could do `foundation/gen/scss` (where `gen`
is gitignored), but that's just a little more confusing than separate packages.

This also means packages can be consumed by a variety of external systems
without bringing in irrelevant code. `tokens` is guaranteed to "stand on its
own".

The only thing that still feels weird about this is the `media` package. Icons
and fonts are natural bedfellows, but they are fundamentally different kinds of
files (unlike with the other packages—tokens deals in JSON, foundation deals in
SCSS, components deals in JS) and thus require different tooling
(hypothetically, as currently we're just copying `src/` to `dist/`). `media`
also feels like a suboptimal name (too generic; `glyphs` would be too specific).

**Current sketch:**
* `@txch/tcds-identity` — brand assets and config: tokens, logos, icons, fonts
  * This makes sense to group this way. As per above, the distinction is whether
    something literally is its own *package*, in other words, the distribution
    method and consumption experience of the various resources within a
    package should feel congruent (even if they're not literally the same kind
    of assets or require different build tools to process). In this case, both
    tokens as well as image and font files are code that is inherently *brought
    in* or *referenced* by other code. The major difference is that image and
    font files are resources requested by the browser over the network, while
    tokens are resources requested by the consuming code at build time. However,
    I think this distinction is negligible, as in both cases, the challenge is
    in the consuming code being able to pull in the reference correctly.
  * Furthermore, just thematically, it makes sense to group tokens, images, and
    fonts together. They constitute the most fundamental elements of our brand
    identity, whether they are graphics that are actually rendered, config files
    that dictate visual design decisions, or fonts for written content. Each
    file serves as the authoritative source of truth for that part of the brand.
* `@txch/tcds-foundation` — basic CSS styles for unclassed elements, as well as
  opt-in styles in the form of functional utility classes. Includes "vanilla"
  components like the HTML `details` or `blockquote` elements.
* `@txch/tcds-components` — specific JavaScript + CSS + Twig/HTML bundles,
  including (may be custom elements, simple classes attached to built-ins, etc.)
  Uses the block__element--modifier convention for class names.
  * primitives
    - Entirely standalone, distinct, individual components. Components that
      *can* but don't *have to be* combined with others (like how buttons *can*
      have an icon). Accordions are not primitives because the plus icon is
      *baked into* the component's shadow DOM. Composition does not include
      built-in HTML elements, so section is not a composite simply because it
      uses heading elements.
    - button, icon, section, masthead, jumbotron, billboard, card, tabs, ribbon,
      callout, quick links, submenu
  * composites
    - Components that consume one or more primitives. Does not include built-in
      HTML elements like headings, links, lists, etc.
    - dialog (base + button), accordion (base + icon), alert-bar (base + icon),
      carousel (base + icon), dialog (base + button + icon), gallery (base
      + dialog/lightbox), map (base + card), site-header (base + icon + button
      + dialog), pagination (base + button + icon), side menu (base + icon)
  * applications — general search (search field, refine search modal, SERP) -
    i.e., a collection of composites that are tightly coupled to each other; one
    doesn't work or make sense without the other.
* (POSSIBLY) `@txch/tcds-templates`
  * Highly structured content type templates (profiles, locations, site search
    (coordinates individual general search template pieces into a unified
    experience—like placing the search field in a hero—as well as adding
    non-"general search template"-specific pieces like pagination)).
* `@txch/tcds-docs` — SSG TCDS docs
* `@txch/tcds-eslint-config` — our eslint + prettier config

DESIGN TACTICS
--------------------------------------------------------------------------------
- "Density" modes
  - Landing page-type style vs. UI style
- Visual language description (we're downstream of brand - adapt and describe)
  - Soft shapes and surfaces (rounded corners, light shadows)
  - Light backgrounds (dark backgrounds used only for "anchoring" elements like
    navy backgrounds in footers or image and video backgrounds for the heroes of
    major landing pages).
  - Careful use of bold accents (red borders, headings, links, buttons, etc.)
  - Gentle but efficient motion
  - Spacious layouts for major landing pages and promotional content
  - Slightly more relaxed take on "dense" versions of components (tables,
    buttons, forms, etc.), but still dense.

INFORMATION ARCHITECTURE
--------------------------------------------------------------------------------
- Identity (maps to tokens (color) + media (fonts + icons + logos))
  - Color
    - Primary (red) and secondary (navy)
    - After-burn colors (pink and light blue)
  - Typography
    - Fonts (typefaces and weights)
    - Type scale
    - Line height
  - Icons
  - Logos
  - Motion (CONDITIONAL)
    - If we do add, make it about our principles of motion, not about our
      transition presets and keyframe libraries (as in foundation > motion).
      Talk about calm vs. energetic, sequencing metaphors, etc.
    - Gentle but efficient — slower = smaller; bigger = faster; smooth curves;
      graceful; not striking, but concise
  - Surfaces
    - Again, describe *strategic use guidelines*, not *implementation details*.
      For instance, "do not use harsh shadows or large corner radii on small
      elements or to highlight content that is not a significant departure from
      the topic of the page or the point of the interface. An exception would be
      fully rounded/circular elements like buttons."
- Foundation - a library that *implements Identity*
  - Themed elements
    - Blockquote
    - Copy elements (paragraphs, lists, and links)
    - Form elements (buttons, controls, inputs, etc.)
    - Heading elements (implements Identity → Typography)
    - Horizontal rule
    - Media elements (figures, images, videos)
    - Tables
  - Motion
    - Animations - library, when to use each, etc.
    - Transitions - presets, when to use each, etc.
  - Surfaces
    - Backgrounds (`.bg-` documentation)
      - Logo flourish
      - Background image guidelines (sufficient contrast, use of gradients and
        overlays, etc.)
      - Colors
        - Use white for UI backgrounds (combined with box shadow, rounded corners)
        - Use light colors (light blue, pink) for section backgrounds
        - Only use red for accented UI elements (buttons, checked boxes, etc.)
    - Border radius - rounded corners for boxes, buttons, graphics
    - Box shadow - use soft shadows only; light opacity, soft spread
  - Layouts
    - Aspect ratio
    - Flex & grid
    - Space & size
- Components
  - Routing components
    - Billboard
    - Ribbon
  - Hero components
    - Jumbotron
    - Billboard
    - Masthead
    - Nameplate
  - Navigation components
    - Quick links
    - Sub menu
    - Main menu
    - Mega menu
  - Interaction components
    - Tabs
    - Accordion
    - Carousel
    - Dialog
    - Button
  - Generic components
    - Section
    - Callout
    - Card
      - Standard/article card (+ minimalistic, center modifiers)
      - Person card (+ minimalistic modifier)
      - Result card
        - Generic
        - Person
        - Location
    - Icon
- Templates
