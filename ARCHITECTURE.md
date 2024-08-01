## Structure
The Design System is divided into four distinct "subsystems": Brand, Layout, Components, and Templates (each having the previous as a dependency).

Each subsystem may contain their own "modules" (e.g. each component in the Components subsystem, or Brand's Color or Typography modules).

### Brand
The Brand subsystem covers everything having to do with the brand identity and visuals, including logos, color, typography, icons, and animation.

### Layout
The Layout subsystem covers the grid system, alignment, standardized breakpoints and aspect ratios, and space and size.

### Components
The Component subsystem contains reusable building blocks for creating rich, interactive, and consistent pages and user interfaces.

### Templates
The Templates subsystem

### SCSS structure
* SCSS files should, to the extent possible, be separated into `props`, `globals`, and `utilities` (imported in that order).
  * "Props" files contain only custom properties, [generated via SCSS and JSON](#json-configuration-files). The properties should only be root-scoped to help simplify scoping questions, and namespaced with `--tcds` to prevent collisions.
  * "Globals" files contain global styles to primitive HTML elements (color for all `a` elements, sizes for all `h[1-6]` elements, etc.) These styles should be limited and treated with the greatest care as they have the broadest applicability. Make liberal use of `:where()` to zero-out selector specificity, making primitive styles easier to override downstream and elsewhere in the codebase.
  * "Utilities" files contain opt-in styles in the form of single classes, like `.visually-hidden` or functional, token-based classes [generated from JSON](#json-configuration-files) like `.font-size-md` or `.margin-bottom-xl`. These are meant to be powerful but opt-in, so they are typically imported last and may use specificity controls like `!important`, etc.

### JSON configuration files
* Trying to keep most configuration (font sizes, color values, animation presets, etc.) in JSON files, which are then used to generate CSS (via SCSS) and can be consumed in JavaScript.
  * The idea here is also to provide a language and domain-agnostic source of truth for "design" settings, or tokens, that could hypothetically be consumed (or updated) by a CMS plugin or design tool like Adobe Xd.
  * Another benefit is that design tweaks or even rebrands *could* be limited strictly to updating JSON configuration, leaving the actual code and architecture in-tact, limiting breaking changes and maximizing backwards compatibility.
    * This could be done without using JSON files, but by clearly separating configuration, it becomes easier to know what can be arbitrarily changed without breaking code.
    * It's also cleaner to track which type of changes (mere configuration vs. code architecture) did and did not occur in version control.
    * Changes to JSON files can also signal an architecture change based on whether the schema is the same. Analyzing any changes to the schema can help give a good preview of how the code would change and what issues may arise.
* Manually typed (S)CSS should be limited to styles that are not based on configuration (for example, not font size-based utility classes).

### Icons
* The single source of truth for icons is the `src/branding/icons/static` directory, where separate SVG files are kept for each icon. However, these actual files are not intended for direct use (colors and other properties cannot be easily changed; they require a separate HTTP request for each icon; referencing the correct path is difficult and not future-proof, etc.)
* Instead, from these static files, a JSON file is generated which directly inlines the SVG code as property values. CSS custom properties are then generated (e.g. `--tcds-icon-check`) with URIs containing data-encoded SVG as the values, which can then be used for `background-image` or `mask-image` values to render the icons.
  * The `tcds-icon` component is basically just a wrapper for using `mask` to render an icon (example `<tcds-icon icon="check"></tcds-icon>` renders a check icon as if it were a font glyph).
* From the JSON file, font files are also generated. Again, these font files are not intended for actual use in production, but rather for uploading to our CMS for the icon picker field in Site Studio (to that end, font files are zipped and then the originals are deleted during the build process).

## Web Components
* Most of our components are Web Components (`tcds`-namespaced custom elements with a shadow DOM). This helps standardize and simplify syntax, abstract internal component markup away from component use, declaratively manage interactive state, and tightly control scoping and pollution issues, among other benefits.
  * Exceptions are components that lack (non-standard) internal state or structural complexity. For example the Action Bar is just a fancy `ul` with links, so it's just regular HTML and CSS.
  * Some Web Components are extended built-in HTML elements, like how `tcds-link-button` is an extension for `a`. The below still generally applies to these elements, though they often lack a shadow DOM, are generally JavaScript feature-sparse, and are set up as built-in extensions strictly for scoping/namespacing and markup standardization reasons.
* Web Components make use of a `WebComponent` mixin for element interfaces. In effect, this mixin provides the following:
  * Automatically creates a shadow DOM and inserts the Design System's shared stylesheet.
  * Expects a `template` property, in turn expected to return a string, which it will then convert into HTML and insert into the shadow DOM, and discriminately apply any updates when requested (via DOM diffing).
  * Updates are requested with the provided `requestUpdate` method. This allows for stateful reactivity and declarative templating for the component's internal markup.
    * Update requests are debounced and batched for each animation frame for performance benefits.
    * **Warning:** `requestUpdate` should only be called inside of `connectedCallback`, `attributeChangedCallback`, or setter methods.
  * Lifecycle methods can be used to hook into this update process. `mountedCallback` is run after the component's first render, and `updatedCallback` is run after every render.
  * Everything else is written and structured like any other custom element.