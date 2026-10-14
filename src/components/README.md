## Components
### Directory structure
We follow the [Single Directory Components](https://www.drupal.org/docs/develop/theming-drupal/using-single-directory-components/) architecture for optimal Drupal compatibility.

Per Drupal theming requirements, the `components/` directory is output to root, rather than `dist/` (with the other assets).

### Authoring
Each component generally has the following files:
* `[component].twig`
* `[component].component.yml`
* `[component].js` (optional)
* `[component].styles.js` (optional — for shadow DOM CSS)
* `[component].scss` (optional — for light DOM CSS)

We use the [Lit](https://lit.dev/) library for authoring components as custom elements (where applicable).

#### Twig
Each component's Twig template should use the following boilerplate. Comments are included below to explain once, but do not need to be pasted in each template:

```twig
{# Optional - define base class for reusability. #}
{% set base_class = "some-component" %}

{#
  Allow template consumers to define arbitrary attributes, like custom classes
  or data hooks. Then add base class, then component-specific attributes.

  Note that, per SDC, the `.component.yml` files should own prop required and
  default value information. So all props should be serialized with
  `|default(false)` regardless of type, requirement, or actual default.
#}
{% set attributes = create_attribute(attributes|default({}))
  .addClass(base_class)
  .setAttribute("some-attr", some_attr|default(false))
  ...
%}

{# Whatever root element... #}
<div {{ attributes }}>
...
```

#### JavaScript
Most components are custom elements. All custom element names should be prefixed with `tcds-`. We use Lit where helpful.

```js
import {LitElement} from "lit";
import {html} from "lit/static-html.js";
import {customElement} from "lit/decorators.js";

@customElement("tcds-example")
export default class Example extends LitElement {
  // ...
}
```

Shadow root styles exported from a `.styles.js` file and adopted:

```js
/* example.styles.js */
import {css} from "lit/static-html.js";

export default css`
  :host {
    /* ... */
  }
`;
```
```js
/* example.js */
import styles from "./example.styles.js";

class Example extends LitElement {
  static styles = [styles];
}
```

Some components may need light DOM styles, which can be written in `.scss` files. They will be built to `.css` by the [build process](#build-process).

For non-Lit components that use JavaScript, we follow the pattern of exporting initializer and cleanup functions from the main script and consuming them appropriately in both Drupal-specific and generic entrypoints. In these cases the `.component.yml` file should point to the Drupal-specific entrypoint.

```js
/* example.js */
export initExample(context = document) {
  // ...
}

export destroyExample(context = document) {
  // ...
}
```
```js
/* example.browser.js */
import {initExample, destroyExample} from "./example.js";

const initialize = () => initExample(document);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialize, {once: true});
} else {
  initialize();
}
```
```js
/* example.drupal.js */
import {initExample, destroyExample} from "./example.js";

window.Drupal.behaviors.tcdsExample = {
  attach(context) {
    initExample(context);
  },

  detach(context, settings, trigger) {
    if (trigger === "unload") {
      destroyInit(context);
    }
  },
};
```
```yml
# example.component.yml
libraryOverrides:
  js:
    example.drupal.js:
      attributes: { type: "module" }
      preprocess: false
  dependences:
    - core/drupal
```

This is not needed for custom elements because the behavior is initialized in the element's `constructor`/`connectedCallback` and cleaned up in the `disconnectedCallback` (which is usually a good reason on its own to use a custom element).

### Build process
Rollup handles building component JS files, via the `build:js` script.

`[component].twig` and `[component].component.yml` files are copied over to the [output directory](#directory-structure) as-is, via the `build:components:assets` script.

`[component].scss` files are compiled to CSS via the `build:components:css` script.
