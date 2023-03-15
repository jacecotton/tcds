## WebComponent
`WebComponent` is a [class mixin](https://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/) for [`HTMLElement` interfaces](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) to help create [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) with declarative, state-driven templating.

### Defining a component
Defining a Web Component works like defining any other custom element, only instead of extending `HTMLElement` directly, extend it with the `WebComponent` wrapper:

```js
import {WebComponent} from "@txch/tcds";

class MyComponent extends WebComponent(HTMLElement) {

}

customElements.define("my-component", MyComponent);
```

`<my-component>` can now be used as a valid HTML element on any page with the above script loaded.

You can customize built-in elements by passing the interface of any other HTML element to the `WebComponent` mixin.

```js
class MyComponent extends WebComponent(HTMLUListElement) {

}

customElements.define("my-component", MyComponent, {extends: "ul"});
```

The customized built-in can now be used as `<ul is="my-component">`.

**Note:** Only do this for [elements that can have a shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow#elements_you_can_attach_a_shadow_to). **`WebComponent` is incompatible with elements that cannot.**

### Templating
Provide your component's template, to be rendered within its shadow root, in a static `template` property.

```js
class MyComponent extends WebComponent(HTMLElement) {
  static get template() {
    return `
      <p>Hello world!</p>
    `;
  }
}
```

By using template literals and other basic JavaScript features, you can interpolate data, conditionally render, and recursively render.

```js
class MyComponent extends WebComponent(HTMLElement) {
  static get template() {
    const fruits = ["Banana", "Apple", "Orange"];

    return `
      ${fruits.length ? `
        <p>Fruits:</p>
        <ul>
          ${fruits.map(fruit => `
            <li>${fruit}</li>
          `).join("")}
        </ul>
      ` : `
        <p>No fruits to display.</p>
      `}
    `;
  }
}
```

Each time `WebComponent` performs a `get` of the `template`, the component will be re-rendered respective to the new state of the relevant data as of that `get`. This is done efficiently through DOM "diffing", whereby:

1. The returned template string is converted into a document fragment
2. The document fragment is compared against the "live" shadow tree
3. Any and only the differences are applied to the shadow tree

The `_requestUpdate` method can be used to schedule this process, and should generally be done in response to data changes.

## Lifecycle
In addition to built-in lifecycle methods, `WebComponent` provides two additional methods to handle its reactivity:

```js
class MyComponent extends WebComponent(HTMLElement) {
  mountedCallback() {
    // The component is connected to the DOM, has completed
    // its first render, and all child components are defined.
  }

  updatedCallback(props) {
    // The component has completed a re-render.
  }
}
```

The `props` parameter of the `updatedCallback` is an array of property keys that are responsible for, or associated with, that update.
This can be done by passing a key to the `_requestUpdate` method, which then schedules a single update for after all back-to-back update requests (those within a single [animation frame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)) have been debounced.

