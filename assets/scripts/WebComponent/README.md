# WebComponent.js

The `WebComponent` class is used to create custom web components. It extends the `HTMLElement` interface, and adds some helpful features like reactive state-based rendering, props management, and related lifecycle hooks.

## Props
Props are like settings for a component. The component provides the API, and props are set to interface with the API.

Props are set by the component user via attributes on the component at the instance level. They are tracked and mirrored to an internal `this.props` object, which is immutable. Any changes to the component's attributes will trigger a re-render. As such, a best practice while creating components is to never use `setAttribute` on the component's host.

## State
State is the internal data of a component that keeps track of changes to the component as it's interacted with. Whether an accordion section is collapsed, whether a carousel is playing, the current slide a carousel is on, etc. is the component's state.

Component state is readable and writable from an internal `this.state` object. Mutations to `this.state` trigger a re-render.

In some cases, state may be "reflected" by the component DOM through a boolean attribute on the host element. These attributes can be set by the user of the component to set the initial value of some state, but will also be changed by the component code when the state changes. So do not treat state attributes like props.

## Lifecycle
### `mounted`
The `mounted` hook is called on the available animation frame after the first render pass, and after all child custom elements are defined. This is where you should add any event listeners, observers, timers, etc., and mutate state as a result of those things.

Todo:
* Maybe instead of putting this in a `requestAnimationFrame` after the `state-change` event listener, put it in the `connectedCallback` hook?

### `updated`
The `updated` hook is called any time `this.state` or `this.props` is mutated and the re-render pass has completed. This method is essentially for doing any imperative manipulation of the component DOM, whereas the `render` method is for declarative rendering.

The `updated` method returns a state object, with each state key being set to a callback function that runs when that particular state is updated. This way you can run code selectively based on the appropriate state.

```javascript
class MyComponent extends WebComponent {
  constructor() {
    ...
  }

  render() {
    return `...`;
  }

  updated() {
    return {
      someState: () => {
        // This code runs only when this.state.someState is changed.
      },
    }
  }
}

## Notes
* The Web Component API's default lifecycle callback is utilized by the `WebComponent` class and are thus reserved for it. It is not recommended to use them; instead, use the provided callbacks (e.g. `mounted` instead of `connectedCallback`, `updated` instead of `attributeChangedCallback`, etc.) If you do use the Web Component API's provided callbacks, make sure to first invoke the `super`'s callback (e.g. `super.attributeChangedCallback()`).
