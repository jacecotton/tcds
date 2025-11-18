/**
 * Decorator factory for LitElement lifecycle effect methods.
 *
 * Idea submitted for upstreaming this here
 * https://github.com/lit/lit/discussions/5117
 *
 * @param {string} lifecycleMethod - The lifecycle method name ("updated" or
 *   "willUpdate").
 * @returns {Function} - A decorator factory that accepts a dependency array.
 */
function createLifecycleDecorator(lifecycleMethod) {
  return function (deps) {
    return function (target, propertyKey, descriptor) {
      const effectsKey = `__${lifecycleMethod}Effects`;

      if (!target.constructor[effectsKey]) {
        target.constructor[effectsKey] = [];
      }

      target.constructor[effectsKey].push({
        deps,
        method: propertyKey,
      });

      return descriptor;
    };
  };
}

/**
 * Decorator for methods that should run when specific properties change, after
 * the component has updated (post-render).
 *
 * @param {string[]} deps - Array of property names to watch.
 */
export const updated = createLifecycleDecorator("updated");

/**
 * Decorator for methods that should run when specific properties change, before
 * the component has updated (pre-render).
 *
 * Useful for computing derived state that will be used in the render.
 *
 * @param {string[]} deps - Array of property names to watch.
 */
export const willUpdate = createLifecycleDecorator("willUpdate");

/**
 * Helper to run registered effects for a given lifecycle method.
 *
 * @param {Object} instance - The element instance.
 * @param {string} lifecycleMethod - "updated" or "willUpdate".
 * @param {Map} changedProperties - Map of changed properties.
 * @internal
 */
export function runEffects(instance, lifecycleMethod, changedProperties) {
  const effectsKey = `__${lifecycleMethod}Effects`;
  const effects = instance.constructor[effectsKey];

  if (!effects) {
    return;
  }

  for (const {deps, method} of effects) {
    // Check if any of this effect's dependencies changed.
    const shouldRun = deps.some(dep => changedProperties.has(dep));

    if (shouldRun) {
      // Build object of previous values for changed dependencies.
      const previous = {};

      for (const dep of deps) {
        if (changedProperties.has(dep)) {
          previous[dep] = changedProperties.get(dep);
        }
      }

      // Call the effect method with previous values.
      instance[method](previous);
    }
  }
}
