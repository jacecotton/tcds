/**
 * Register all components.
 *
 * To register a new component, add an object to the `components` array, provide
 * the `selector` for the root component element, the associated class
 * (`module`), and any `props` (as a callback returning an object with a param
 * of `instance` to refer to the root element selected by the `selector`
 * property).
 */
const components = [
  {
    selector: "[data-component=Tabs]",
    module: Tabs,
    props: (instance) => {
      return {
        hideAll: instance.classList.contains("Tabs--hide-all"),
      };
    },
  },
];

// Loop through the components registry, query the provided selector, call the
// provided class, passing through the instance (root element) and provided
// props (if exists).
components.forEach((component) => {
  document.querySelectorAll(component.selector).forEach((instance) => {
    new component.module(instance, component.props && component.props(instance));
  });
});