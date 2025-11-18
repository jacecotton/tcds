## Stack
* Document with markdown pages, with embedded Twig code
* Use Eleventy to SSG the site, Nunjucks for templating (near-complete Twig x-compatibility).

## Information architecture
```
Introduction
  Installation                -- NPM, Drupal module, CDN, archive download.
  Architecture                -- Explain the package setup, module endpoints,
                                 building the DS yourself, etc.
  Other resources
    Brand guidelines          -- The Design System is *downstream* of and
                                 *implements* the brand guidelines, but it is
                                 not the source of truth for them.
    Source code documentation -- Link to GitHub wiki, which documents
                                 architecture, coding style guide, roadmap, etc.
Foundation                    -- Includes documentation of custom props and
                                 utility classes, as well as general standards
                                 and usage guidelines.
  Introduction                -- Explain design tokens, and how they're used for
                                 props and utility classes here.
  Color
  Icons                       -- Includes info on the whole library even though
                                 the icon resources are kept in the Media
                                 package. Components > Icon just goes over the
                                 custom element API, but links to Foundation > Icons.
  Layout
    Aspect ratio
    Flex & grid
    Space & size
  Motion
    Animations
    Transitions
  Surface
    Border radius
    Box shadow
  Themed elements
    Headings
    etc...
  Typography                  -- Themed elements > Headings just implements the
                                 Typography module; typography includes font
                                 stacks, type scale, line heights, font weights,
                                 etc., not specific *applications* like
                                 headings, captions, paragraphs, etc. (though it
                                 does provide guidance; for instance Mont/sans-
                                 serif should be used for UI, captions, and
                                 subheadings, while Calluna/serif should be used
                                 for headings and body copy).
  etc...
Components
Templates
```
