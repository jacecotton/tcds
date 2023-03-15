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

The `_requestUpdate` method can be used to tell `WebComponent` to "refresh" the component. `WebComponent` will debounce all back-to-back update requests (those within a single [animation frame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)), and then start the rendering process (rather than inefficiently re-rendering once every update).

### Lifecycle
In addition to built-in lifecycle methods, `WebComponent` provides two additional methods to handle its reactivity:

```js
class MyComponent extends WebComponent(HTMLElement) {
  mountedCallback() {
    // The component is connected to the DOM, has completed
    // its first render, and all child components are defined.
  }

  updatedCallback() {
    // The component has completed a re-render.
  }
}
```

### Reactive properties
To make your component template reactive to element properties, you can call a `_requestUpdate` inside [class setters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set) or [proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy).

```js
class MyComponent extends WebComponent(HTMLElement) {
  static get template() {
    return `
      <p>Country: ${this.country || "United States"}</p>
    `;
  }

  set country(value) {
    this.country = value;
    this._requestUpdate("country");
  }

  mountedCallback() {
    this.country = "Mexico";
  }

  updatedCallback(props) {
    if(props.includes("country")) {
      console.log("this.country was updated to", this.country);
    }
  }
}
```

The rendered output will be `<p>Country: Mexico</p>` after the component mounts, then `this.country was updated to: Mexico` will be logged to the console.

Note that by passing the property key to the `_requestUpdate` method, we have access to a `props` array in the `updatedCallback` method which lets us know which property keys were responsible for, or associated with, that update.

### Property-attribute reflection
