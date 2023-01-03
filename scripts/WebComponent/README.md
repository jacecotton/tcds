## WebComponent
`WebComponent` is a base class for creating [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components), simply adding declarative templating and reactive state and props to the native [custom elements API]((https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)).

This utility is not a library, but brings to Web Components some of the requisite features and best practices for building modern UIs found in libraries like [React](https://reactjs.org/) and [Vue](https://vuejs.org/).

It differs from other Web Component-based libraries, like [Lit](https://lit.dev/) or [Stencil](https://stenciljs.com/), in its aim to bridge only very specific gaps in native browser features. To that end it introduces minimal unique features, concepts, and patterns, and leans heavily on the use of vanilla JavaScript by component authors.

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

  mountedCallback() {
    console.log(this.parts["message"]); // => p Hello world!
  }
}
```

The `parts` property will return an array of elements if it finds multiple, or the element itself if there is only one.

This is an optional convenience. Alternatively, as [`mountedCallback` occurs after first render](#lifecycle), you can always query the `shadowRoot` to access any element in the rendered result.

## Lifecycle
In addition to `HTMLElement`'s normal lifecycle methods (`connectedCallback`, `disconnectedCallback`, etc.), `WebComponent` provides a couple additional methods to work with its reactivity. These follow usual conventions used by other UI libraries, but is most similar to [Vue's](https://vuejs.org/api/options-lifecycle.html) on a technical level.

```js
class MyComponent extends WebComponent(HTMLElement) {
  mountedCallback() {
    // Component has completed first render, and child
    // components have connected. updatedCallback() hook
    // has not yet been called.
  }

  updatedCallback() {
    // The component's state or prop has been updated.
    // This also runs once after mounting.
  }
}
```

## Props
Props are accessible internally from the public `props` property. This object is readonly, and is populated from attributes set by the component user on the component instance.

```html
<my-component foo="bar"></my-component>
```

```js
class MyComponent extends WebComponent(HTMLElement) {
  connected() {
    console.log(this.props); // => { "foo": "bar" }
  }
}
```

The `props` object is readonly because component authors should generally not override component users. However, changes to the element's attributes will trigger a re-render and update the `props` object.

Prop types and default values can be specified within a static `props` object in the component class:

```js
class MyComponent extends WebComponent(HTMLElement) {
  static props = {
    multiple: {
      type: Boolean,
      default: false,
    },
  };
}
```

The `updatedCallback` hook can filter updates by the specific prop that was changed in its `return` object:

```js
class MyComponent extends WebComponent(HTMLElement) {
  updatedCallback() {
    return {
      props: {
        multiple: () => {
          // [multiple] attribute was changed.
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
  connectedCallback() {
    this.state.count = 0;
  }

  updatedCallback() {
    console.log(this.state); // => { "count": 0 }
  }
}
```

State types and default values can be specified within a static `state` object in the component class:

```js
class MyComponent extends WebComponent(HTMLElement) {
  static state = {
    count: {
      type: Number,
      default: 2,
    },
  };
}
```

By default, state is not reflected (synced to a corresponding attribute on the component DOM). However, this can be done by enabling `reflected`:

```js
class MyComponent extends WebComponent(HTMLElement) {
  static state = {
    count: {
      // ...
      reflected: true,
    },
  }
}
```

If `count` exists as a property of the `state` object, the `[count]` attribute will now automatically be synced to `state.count` (in both directions; an update to one will be reflected by the other). This also prevents the `[count]` attribute from being registered as a prop.

This is useful to allow component users to set the initial state of a component via an attribute. For instance, the dialog component allows users to set whether it should open on page load by adding a boolean attribute: `<tcds-dialog open>`.

Like props, the `updatedCallback` hook can filter updates by the specific state property that was changed in its `return` object:

```js
class MyComponent extends WebComponent(HTMLElement) {
  updatedCallback() {
    return {
      state: {
        count: () => {
          // this.state.count was changed.
        },
      },
    };
  }
}
```

## Typing
Available state and prop types are `String`, `Number`, `Boolean`, and `Array`.

Specifying types will validate the type of any specified state or prop elsewhere in the component code, and process the corresponding attribute values as their respective types within the `props` and `state` objects (if the `state` is `reflected`).

```html
<my-component lorem ipsum="2"></my-component>
```

```js
class MyComponent extends WebComponent(HTMLElement) {
  static state = {
    lorem: {
      type: Boolean,
    },
  };

  static props = {
    ipsum: {
      type: Number,
    },
  };

  connectedCallback() {
    console.log(this.state.lorem, typeof this.state.lorem); // => true, "boolean"
    console.log(this.props.ipsum, typeof this.props.ipsum); // =>    2, "number"
  }
}
```

Without declaring types, prop and state types will be inferred from their initial values.

If an `Array` type is set, space-separated value items are split into an array. For instance, given the attribute `ipsum="dolor sit amet"`, the property `props.ipsum` would return `["dolor", "sit", "amet"]`.

Note that the purpose of this type system is synchronization between the live DOM and reactive data stores. As such, type validation and conversion happens at runtime, therefore it is not usable as a general purpose type system. If that's needed, use an IDE and CLI-based tool like [TypeScript](https://www.typescriptlang.org/).

## Styling
The `WebComponent` utility is technically agnostic as to styling. The simplest way to style a component is to embed inline styles in the template.

```js
class MyComponent extends WebComponent(HTMLElement) {
  render() {
    return /* html */`
      <style>
        :host {
          display: block;
        }
      </style>
      ...
    `;
  }
}
```

However, we recommend using [Constructable Stylesheets](https://web.dev/constructable-stylesheets/).

```js
class MyComponent extends WebComponent(HTMLElement) {
  connectedCallback() {
    this.shadowRoot.adoptedStyleSheets = [new CSSStyleSheet().replaceSync(this.styles)];
  }

  get styles() {
    return /* css */`
      :host {
        display: block;
      }
    `;
  }
}
```

Note that Safari does not currently support Constructable Stylesheets. We recommend using the [`construct-style-sheets-polyfill`](https://github.com/calebdwilliams/construct-style-sheets).

The Design System also uses [`constructable-style-loader`](https://github.com/alextech/constructable-style-loader) so we can separate the CSS into a different file, then import it as an adoptable stylesheet.

```js
/* index.js */
import styles from "./styles.css";

class MyComponent extends WebComponent(HTMLElement) {
  connectedCallback() {
    this.shadowRoot.adoptedStyleSheets = [styles];
  }
}
```
```css
/* style.css */
:host {
  display: block;
}
```

This setup is recommended but entirely optional.

## Events
The `WebComponent` utility is technically agnostic as to event handling. Inline DOM events can be added for declarative event handling, or imperative events can be added with `addEventListener` in the `mountedCallback` hook.

For the former, in order to access the component context, and its public methods and properties, you will have to first get the local root node (the shadow root), then access its host (the custom element itself) from there.

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

Or, the imperative way:

```js
class MyComponent extends WebComponent(HTMLElement) {
  render() {
    return /* html */`
      <button part="button">Click me</button>
    `;
  }

  mountedCallback() {
    this.parts["button"].addEventListener("click", this.message.bind(this));
  }

  message() {
    alert("Hello world!");
  }
}
```
