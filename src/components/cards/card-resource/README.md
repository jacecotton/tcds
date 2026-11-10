# Resource card

An image-backed card with one native link covering the card. Supply `link.url`
and meaningful plain-text `link.text`. The optional `image` uses the shared
Drupal Canvas image shape; only `image.src` is rendered, as a decorative CSS
background. Any information conveyed by that image must also be in the text.

Root HTML attributes are accepted through `attributes`. The existing `classes`
string also accepts additional space-separated root classes. The card uses the
dark theme and retains its `tcds-resource-card` CSS class.

## JavaScript entrypoints

- Drupal: SDC metadata loads `card-resource.drupal.js` with `core/drupal` as a
  dependency. `Drupal.behaviors.tcdsCardResource` initializes on attachment and
  destroys on detachment with the `unload` trigger.
- Standalone pages: load `card-resource.browser.js` as a module. It initializes
  immediately if the DOM is ready, or once on `DOMContentLoaded`.
- Manual lifecycle: import `initCardResource` and `destroyCardResource` from
  `card-resource.js`. This module performs no automatic initialization.

Both functions accept a document, fragment, or element, defaulting to `document`.
An element context includes the card itself as well as descendant cards. Repeated
initialization is safe. Destroy restores the original text and icon nodes, so
existing listeners survive cleanup and reinitialization.

The enhancement keeps the final word and caret together when the link wraps.
Without JavaScript the native link remains fully usable. Load the component CSS
and base design-system styles as usual in standalone pages.
