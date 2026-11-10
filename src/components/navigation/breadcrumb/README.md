# Breadcrumb

A breadcrumb is a path through the site's information hierarchy, from root to
current page. Use a flat list of items rather than recursive child objects: a
trail represents one resolved path, not a navigation tree. Supply the canonical
path for pages that appear in multiple sections; do not derive it from browser
history.

## Twig API

```twig
{{ include('tcds:breadcrumb', {
  items: [
    {text: 'Home', url: '/'},
    {text: 'Services', url: '/services'},
    {text: 'Specialties', url: '/services/specialties'},
    {text: 'Cardiology', url: '/services/specialties/cardiology'},
    {text: 'Your visit'},
  ],
  label: 'Breadcrumb',
}) }}
```

- `items`: ordered array of `{text, url?, attributes?}`. Supply URLs for
  ancestors. The final item always represents the current page; its URL is
  optional. Empty lists render nothing. Text is escaped by Twig's normal
  autoescaping; pass plain text rather than HTML.
- `label`: navigation landmark name; defaults to `Breadcrumb`.
  Distinguish labels if the page contains multiple trails. The template retains
  a fallback for the landmark even when rendered outside Drupal's
  schema/default handling.
- `link_current`: false by default. Set true and provide the last item's URL to
  render it as a self-link.
- `no_collapse`: false by default. Set true for an always-visible wrapping trail.
- `expanded`: false by default. Set true to start with the full trail visible
  and no expansion button.
- `expand_label`: localized accessible name for the ellipsis button; defaults
  to `Show all breadcrumbs`.
- `attributes`: arbitrary attributes for `<tcds-breadcrumb>` (classes, IDs, data
  hooks). Each item's `attributes` applies to its link or span. The component
  owns `href` and `aria-current`.

Drupal's SDC metadata registers the module; the compiled component stylesheet is
loaded through the usual SDC conventions. In standalone pages, load
`breadcrumb.js` as a module, `breadcrumb.css`, and the base design-system CSS.

## Semantics and interaction

The server renders `<tcds-breadcrumb><nav aria-label="Breadcrumb"><ol
role="list">…</ol></nav></tcds-breadcrumb>`. All items remain in the light DOM.
The explicit list role preserves list semantics in browsers that otherwise drop
them for CSS lists with no markers. Separators are decorative CSS slashes and add no
spoken punctuation. Ancestors are native links and follow ordinary link
keyboard behavior.

The current page defaults to `<span aria-current="page">…</span>`: it identifies
the current location without adding a redundant tab stop or reload link. A
self-link is also valid; `link_current` supports that preference and retains
`aria-current="page"`. Do not make an unlinked span focusable or use `href="#"`
as a placeholder. A missing ancestor URL renders plain text rather than a
nonfunctional link; normally all ancestors should have real URLs.

Place the trail near the top of the page, before the main content, so a skip
link can bypass it. Breadcrumbs supplement site navigation. They are not step
indicators and should not be used to represent progress through a form. Usually
omit breadcrumbs on the home page or on sites with no meaningful hierarchy.

## Responsive contraction

Contraction is based on the component's available width, not a viewport
breakpoint. For trails of four or more items that cannot fit on one line, the
component keeps the first item, immediate parent, and current page visible,
provided the ellipsis takes less space than the ancestors it replaces:

```
Home / … / Cardiology / Your visit
```

The ellipsis is a native button with an accessible name and `aria-expanded`.
Enter, Space, or a pointer click reveals the intermediate links in their
original positions and removes the button entirely. If the button had focus,
focus moves to the first revealed link, so ordinary Tab navigation continues
through the trail. This is an inline disclosure, with no menu roles, arrow-key
navigation, focus trap, popover, or outside-click dismissal.

A deliberate expansion lasts for the component instance, including across
resizes and reconnection; refresh or navigation to a new instance starts fresh.
There is no collapse control. Automatic contraction never
hides a focused ancestor. When space becomes sufficient, the button disappears;
if it had focus, focus moves to the first intermediate link. Text is never
ellipsized or clipped. Remaining visible items, long labels, and the expanded
trail wrap as needed, including at narrow widths and increased text sizes.
Hidden ancestors are removed from both the accessibility tree and tab order.

Without JavaScript, the complete trail wraps and all links remain usable. The
custom element cleans up observers and restores all links when disconnected.
Changes to trail items, component size, and loaded fonts trigger remeasurement.
Use `expanded`, `no-collapse`, and `expand-label` for the
corresponding custom-element attributes; the JavaScript properties are
`expanded`, `noCollapse`, and `expandLabel`.

## Other responsive patterns

For short hierarchies, prefer `no_collapse: true`: wrapping adds no interaction
cost. A parent-only link is a simpler small-screen alternative when research
shows users only need to go up one level. Label it with the parent's name and
use its real URL, rather than relying on `history.back()`. This component keeps
the full path available because collapsing to a parent-only link discards the
other ancestor choices. Horizontal scrolling is another option, but can hide
context and require users to discover an extra scroll region. Avoid truncating
individual labels, since it makes similar section names harder to distinguish.

## References

- [WAI breadcrumb pattern](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)
  permits linked or unlinked current-page items, and specifies a named
  navigation landmark and `aria-current` for current-page links.
- [WAI disclosure pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)
  describes the native button/expanded-state interaction used for the ellipsis.
- [GOV.UK breadcrumbs](https://design-system.service.gov.uk/components/breadcrumbs/)
  documents mobile contraction and when breadcrumbs help. Preserving the parent
  and making intermediate ancestors expandable are this component's design
  choices, rather than requirements of that pattern.
