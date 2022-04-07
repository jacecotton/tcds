## Primitive styles

Primitives are basic HTML elements, such as headings, lists, tables, etc. They are generally simple, static, and native features of web browsers. This is in contrast to components, which are often more complex, interactive, and made up of a combination of individual primitives.

The styles included here are global and default. As a result, scope management was used to make the styles as easily overridable as possible. Selector heuristics were also used in some cases to avoid applying any styles in instances where it seemed unlikely to be necessary or desired.

For instance, styles are only applied to [lists](https://github.com/jacecotton/tcds/blob/main/assets/styles/%40tcds/primitives/lists.scss) if a `class` attribute is not used. If it is used and the default stylings are still desired, utility classes are also provided (`.ul` for unordered lists, `.ol` for ordered lists, etc.)
