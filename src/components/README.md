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

### Build process
Rollup handles building component JS files, via the `build:js` script.

`[component].twig` and `[component].component.yml` files are copied over to the [output directory](#directory-structure) as-is, via the `build:components:assets` script.

`[component].scss` files are compiled to CSS via the `build:components:css` script.
