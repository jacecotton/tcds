## WebComponent
`WebComponent` is a base class to help create components using the native [Web Components API](https://developer.mozilla.org/en-US/docs/Web/Web_Components). All it does is provide a way to write reactive components with declarative templating, and helps to manage state, props, the lifecycle, and styling.

This utility is not a library, but brings to Web Components some of the requisite features and best practices for building modern UIs found in libraries like [React](https://reactjs.org/) and [Vue](https://vuejs.org/).

It differs from other Web Component-based libraries, like [Lit](https://lit.dev/) or [Stencil](https://stenciljs.com/), in its aim to bridge only very specific gaps in native browser features. To that end it is a runtime-only tool and leans heavily on the use of vanilla JavaScript by component authors.

This means that while slightly more verbose, it introduces fewer unique concepts and idiosyncracies by leveraging JavaScript fundamentals as much as possible.

## Defining a component
Defining a Web Component works like [defining any other custom element]((https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)), only instead of extending `HTMLElement` directly, extend it with the `WebComponent` wrapper class.

```js
import { WebComponent } from "@txch/tcds";

class MyComponent extends WebComponent(HTMLElement) {

}

customElements.define("my-component", MyComponent);
```

`<my-component>` can now be used as a valid HTML element on any page with the above script loaded.

While it is not recommended to customize built-in elements (as it's [not supported by Safari](https://caniuse.com/custom-elementsv1)*), it is valid to pass the interface of any other HTML element to the `WebComponent` class:

```js
class MyComponent extends WebComponent(HTMLUListElement) {

}

customElements.define("my-component", MyComponent, { extends: "ul" });
```

The customized built-in can now be used as `<ul is="my-component">`.

<small>\* A polyfill may be added in the future.</small>

## Templating
```js
class MyComponent extends WebComponent(HTMLElement) {
  // Define component template in a render method.
  render() {
    return /* html */`
      <p>Hello world!</p>
    `;
  }
}

// ...
```

The `/* html */` annotation before the return value can optionally be added to create syntax highlighting, if a plugin like [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) is enabled in your text editor.

### Shadow parts
You can access any [shadow parts](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/part) created in the template via the public property `parts`.

```js
class MyComponent extends WebComponent(HTMLElement) {
  render() {
    return /* html */`
      <p part="message">Hello world!</p>
    `;
  }

  mounted() {
    console.log(this.parts["message"]); // => p Hello world!
  }
}
```

The `parts` property will return an array of elements if it finds multiple, or the element itself if there is only one.

This is an optional convenience. Alternatively, as [`mounted` occurs after first render](#lifecycle), you can always query the `shadowRoot` to access any element in the rendered result.

## Lifecycle
Methods can be used within a component class to hook into specific points in a component's creation and use. The component lifecycle follows general conventions used by other UI libraries, but is most similar to [Vue's](https://vuejs.org/api/options-lifecycle.html) on a technical level.

```js
class MyComponent extends WebComponent(HTMLElement) {
  connected() {
    // Component has been used and added to the DOM.
    // State and props are ready to use, but first
    // render has not yet happened. Hooks into
    // HTMLElement's connectedCallback.
  }

  mounted() {
    // Component has completed first render, and child
    // components have connected. updated() hook has
    // not yet been called.
  }

  updated() {
    // The component's state or prop has been updated.
    // This also runs once after mounting.
  }
}
```

## Props
Props are accessible internally from the public `props` property. This object is readonly, and is populated from attributes set by the component user on the component instance.

```html
<my-component lorem="ipsum"></my-component>
```

```js
class MyComponent extends WebComponent(HTMLElement) {
  connected() {
    console.log(this.props); // => { "lorem": "ipsum" }
  }
}
```

The `props` object is readonly because component authors should generally not override component users. However, changes to the element's attributes will trigger a re-render and update the `props` object.

The `updated` hook can filter updates by the specific prop that was changed in its `return` object:

```js
class MyComponent extends WebComponent(HTMLElement) {
  updated() {
    return {
      props: {
        "lorem": () => {
          // [lorem] attribute was changed.
        },
      },
    };
  }
}
```

## State
State is internally accessible and mutable from the public `state` property.

```js
class MyComponent extends WebComponent(HTMLElement) {
  connected() {
    this.state.lorem = true;
  }

  updated() {
    console.log(this.state); // => { "lorem": true }
  }
}
```

By default, state is not associated with the component's attributes. However, component authors can choose to expose state to the DOM as attributes by listing the desired state key names in an `observedAttributes` array.

```js
class MyComponent extends WebComponent(HTMLElement) {
  static get observedAttributes() {
    return ["lorem"];
  }
}
```

If `lorem` exists as a property of the `state` object, the `[lorem]` attribute will now automatically be synced to `state.lorem` (in both directions; an update to one will be reflected by the other). This also prevents the `[lorem]` attribute from being registered as a prop.

This is useful to allow component users to set the initial state of a component via an attribute. For instance, the dialog component allows users to set whether it should open on page load by adding a boolean attribute: `<tcds-dialog open>`.

Like props, the `updated` hook can filter updates by the specific state property that was changed in its `return` object:

```js
class MyComponent extends WebComponent(HTMLElement) {
  updated() {
    return {
      state: {
        "lorem": () => {
          // this.state.lorem was changed.
        },
      },
    };
  }
}
```

## Typing
You can initialize static `state` or `props` objects to specify the value types of their properties. Available types are `string`, `number`, `boolean`, and `array`.

```js
class MyComponent extends WebComponent(HTMLElement) {
  static state = {
    lorem: "boolean",
  };

  static props = {
    ipsum: "number",
  };
}
```

This will validate the type of any specified state or prop elsewhere in the component code, and process the corresponding attribute values as their respective types within the `props` and `state` objects (if the `state` key is listed in the `observedAttributes`).

```html
<my-component lorem ipsum="2"></my-component>
```

```js
class MyComponent extends WebComponent(HTMLElement) {
  static get observedAttributes() {
    return ["lorem"];
  }

  static state = {
    lorem: "boolean",
  }

  static props = {
    ipsum: "number",
  }

  connected() {
    console.log(this.state.lorem, typeof this.state.lorem); // => true, "boolean"
    console.log(this.props.ipsum, typeof this.props.ipsum); // =>    2, "number"
  }
}
```

Without declaring types, prop and state types will be inferred from their initial values.

If an `array` type is declared, space-separated value items are split into an array. For instance, given the attribute `ipsum="dolor sit amet"`, the property `props.ipsum` would return `["dolor", "sit", "amet"]`.

Note that the purpose of this type system is synchronization between the live DOM and reactive data stores. As such, type validation and conversion happens at runtime, therefore for performance reasons, this should not be used as a general purpose type system. If that's needed, use an IDE and CLI-based tool like [TypeScript](https://www.typescriptlang.org/).

## Styling
Use [Constructable Stylesheets](https://web.dev/constructable-stylesheets/) to style web components.

```js
class MyComponent extends WebComponent(HTMLElement) {
  connected() {
    this.shadowRoot.adoptedStyleSheets = [new CSSStyleSheet().replaceSync(this.styles)];
  }

  get styles() {
    return /* css */`
      :host {
        color: red;
      }
    `;
  }
}
```

## Events
The `WebComponent` class provides no special way for handling events like most libraries. Instead, DOM events must be used. This means for inline events (like with the `[onclick]` attribute), the context will be relative to the element itself, and the scope will be the document.

So in order to access the component context, and its public methods and properties, you will have to first get the local root node (the shadow root), then access its host (the custom element itself) from there.

```js
class MyComponent extends WebComponent(HTMLElement) {
  render() {
    return /* html */`
      <button
        onclick="this.getRootNode().host.message()"
      >Click me</button>
    `;
  }

  message() {
    alert("Hello world!");
  }
}
```

Alternatively, you can imperatively create event listeners in the `mounted` hook.

```js
class MyComponent extends WebComponent(HTMLElement) {
  render() {
    return /* html */`
      <button part="button">Click me</button>
    `;
  }

  mounted() {
    this.parts["button"].addEventListener("click", this.message.bind(this));
  }

  message() {
    alert("Hello world!");
  }
}
```
