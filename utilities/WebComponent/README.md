## WebComponent
`WebComponent` is a base class for creating [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components). It is not a library or framework, but rather a thin abstraction extending the native [custom elements API](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) to add declarative templating with data reactivity.

Unlike libraries also based on Web Components, like [Lit](https://lit.dev/) or [Stencil](https://stenciljs.com/), it introduces no extra utilities and few unique concepts. Instead, most work is deferred to component authors and native APIs.

### Defining a component
Defining a Web Component works like [defining any other custom element]((https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)), only instead of extending [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) directly, extend it with the `WebComponent` mixin.

```js
import {WebComponent} from "@txch/tcds";

class MyComponent extends WebComponent(HTMLElement) {
  constructor() {
    super();
  }
}

customElements.define("my-component", MyComponent);
```

`<my-component>` can now be used as a valid HTML element on any page with the above script loaded.

You can customize built-in elements by passing the interface of any other HTML element to the `WebComponent` mixin.

```js
class MyComponent extends WebComponent(HTMLUListElement) {
  ...
}

customElements.define("my-component", MyComponent, { extends: "ul" });
```

The customized built-in can now be used as `<ul is="my-component">`.

**Note:** Only do this for [elements that can have a shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow#elements_you_can_attach_a_shadow_to). **`WebComponent` is incompatible with elements that cannot.**

### Templating
The `render` method should return your component's template in a string. ([Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) are recommended as it allows for multi-line strings and string interpolation, rather than concatenation.)

```js
class MyComponent extends WebComponent(HTMLElement) {
  render() {
    return `
      <p>Hello world!</p>
    `;
  }
}
```

It is "declarative" because it serves to *describe* what your component should look like based on any given state or condition, rather than what it should *do* in response to state changes and other events (which would be considered "imperative").

It is "reactive" because it is called every time [state](#state) or [props](#props) are updated (or any time an `update` event is dispatched on the element). When `render` is called, `WebComponent` applies any and only differences between the given template and the component's live DOM in light of any changes to state or other conditions (this process is known as "DOM diffing").

`WebComponent` waits to call `render` for all back-to-back updates to be batched within a single [animation frame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame).

### Lifecycle
In addition to built-in lifecycle methods, `WebComponent` provides a couple additional methods to interface with its reactivity. These follow usual conventions used by other UI libraries, but work most similarly to [Vue's](https://vuejs.org/api/options-lifecycle.html) on a technical level.

```js
class MyComponent extends WebComponent(HTMLElement) {
  mountedCallback() {
    // Component has completed first render, and child
    // components have connected. updatedCallback() hook
    // has not yet been called.
  }

  updatedCallback(state, props) {
    // The component's state or prop has been updated.
    // This also runs once after mounting, and after any
    // time an "update" event is dispatched on `this`.
  }
}
```

`updatedCallback`'s `state` and `props` arguments each contain two objects, `newState`/`newProps` and `oldState`/`oldProps`. They are each batches which contain copies of the state/props that were changed, and their new and old values respectively. This is useful to filter state and props so only relevant code is executed:

```js
class MyComponent extends WebComponent(HTMLElement) {
  updatedCallback(state, props) {
    if(state.newState) {
      if("foo" in state.newState) {
        // this.state.foo was changed
        // state.oldState.foo contains previous value of this.state.foo
      }
    }

    if(props.newProps) {
      if("bar" in props.newProps) {
        // this.props.bar was changed
        // props.oldProps.bar contains previous value of this.props.bar
      }
    }
  }
}
```

`WebComponent` makes use of the base interface's `connectedCallback` lifecycle method, therefore if you use it in your child class, **you must call the parent class's corresponding method via `super`.**

```js
class MyComponent extends WebComponent(HTMLElement) {
  connectedCallback() {
    super.connectedCallback();
  }
}
```

### Props
Props are accessible internally from the public `props` property. This object is readonly, and is populated from attributes set by the component user on the component instance.

```html
<my-component foo="bar"></my-component>
```

```js
class MyComponent extends WebComponent(HTMLElement) {
  connectedCallback() {
    super.connectedCallback();
    console.log(this.props); // => { "foo": "bar" }
  }
}
```

The `props` object is readonly because component authors should generally not override component users. However, changes to the element's attributes will trigger a re-render and update the `props` object.

Prop types and default values can be specified within a static `props` object in the component class (see [&sect; Typing](#typing)):

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

Note that `WebComponent`'s prop system negates the built-in method for handling attribute updates (the `observedAttributes` property and `attributeChangedCallback` method). With `WebComponent`, all attributes (except [globals](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes)) are observed by default and synchronized with the `props` property (or `state` property if indicated).

### State
State is internally accessible and mutable from the public `state` property.

```js
class MyComponent extends WebComponent(HTMLElement) {
  connectedCallback() {
    super.connectedCallback();
    this.state.count = 0;
  }

  updatedCallback() {
    console.log(this.state); // => { "count": 0 }
  }
}
```

State types and default values can be specified within a static `state` object in the component class (see [&sect; Typing](#typing)):

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

### Typing
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
      reflected: true,
    },
  };

  static props = {
    ipsum: {
      type: Number,
    },
  };

  connectedCallback() {
    super.connectedCallback();
    console.log(this.state.lorem, typeof this.state.lorem); // => true, "boolean"
    console.log(this.props.ipsum, typeof this.props.ipsum); // =>    2, "number"
  }
}
```

Without declaring types, prop and state types will be inferred from their initial values.

If an `Array` type is set, space-separated value items are split into an array. For instance, given the attribute `ipsum="dolor sit amet"`, the property `props.ipsum` would return `["dolor", "sit", "amet"]`.

Note that the purpose of this type system is synchronization between the live DOM and reactive data stores. As such, type validation and conversion happens at runtime, therefore it is not usable as a general purpose type system. If that's needed, use an IDE and CLI-based tool like [TypeScript](https://www.typescriptlang.org/).

### Styling
The `WebComponent` utility is technically agnostic as to styling. The simplest way to style a component is to embed inline styles in the template.

```js
class MyComponent extends WebComponent(HTMLElement) {
  render() {
    return `
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
  constructor() {
    super();

    const styles = new CSSStyleSheet();
    styles.replaceSync(this.styles);
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  get styles() {
    return `
      :host {
        display: block;
      }
    `;
  }
}
```

For Safari support, the Design System uses [`construct-style-sheets-polyfill`](https://github.com/calebdwilliams/construct-style-sheets).

To separate the CSS into different files and import them as adoptable stylesheets, the Design System uses [`constructable-style-loader`](https://github.com/alextech/constructable-style-loader).

```js
/* index.js */
import styles from "./style.css";

class MyComponent extends WebComponent(HTMLElement) {
  constructor() {
    super();
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

Note that adopting or inserting styles into the shadow root ("shadow styles") scopes and encapsulates the styles to the shadow boundary. To create unscoped styles (useful for having outer DOM context awareness, e.g. whether the component is a `:first-child`, or to style slotted content deeper and more specific than `::slotted` allows, e.g. `[slot="content"] a`), you can adopt other styles into the root node with `this.getRootNode()` ("light styles"). In most cases this will be the `document`, or a parent component's shadow root.

> **Note: This is dangerous.** Adopting a stylesheet into the root node is a side effect. You **must** be careful to merge your added stylesheet with whatever other stylesheets the root node may have adopted. Otherwise, any other stylesheets attached to the root node (such as those from other components) will be wiped out. See below for a safe way to do this.

```js
/* index.js */
import lightStyles from "./style.light.css";

class MyComponent extends WebComponent(HTMLElement) {
  constructor() {
    super();
    this.getRootNode().adoptedStyleSheets = [...this.getRootNode().adoptedStylesheets, ...[lightStyles]];
  }
}
```
```css
/* style.light.css */
my-component:not(:only-child) {
  margin-bottom: 1rem;
}
```

### Events
The `WebComponent` utility is technically agnostic as to event handling. Inline DOM events can be added for declarative event handling, or imperative events can be added with `addEventListener` in the `mountedCallback` hook.

For the former, in order to access the component context, and its public methods and properties, you will have to first get the local root node (the shadow root), then access its host (the custom element itself) from there.

```js
class MyComponent extends WebComponent(HTMLElement) {
  render() {
    return `
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
    return `
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

### Advanced
<details>
  <summary>Forcing an update</summary>

Sometimes you may want to force an update and re-render a component without a change to some state or prop. To do so, dispatch an `update` event on the component instance:

```js
class MyComponent extends WebComponent(HTMLElement) {
  mountedCallback() {
    if(someUseCase) {
      this.dispatchEvent(new Event("update"));
    }
  }
}
```
</details>

<details>
  <summary>Shadow configuration</summary>

To change the `attachShadow` settings, you can pass an object to the `WebComponent` mixin which will be used in the constructor's `attachShadow` call.

```js
class MyComponent extends WebComponent(HTMLElement, {
  delegatesFocus: true, // default is false
  mode: "closed", // default is open
}) {

}
```
</details>

<details>
  <summary>Change or disable base style injection</summary>

By default, the `WebComponent` looks for Design System base styles to inject by querying the `head` for a `link` with a `[title="tcds"]` attribute. If one is not found, it will pull the stylesheet from a CDN.

If you want to configure your own URL for base styles, you can set the `baseStyles` property.

```js
class MyComponent extends WebComponent(HTMLElement) {
  baseStyles = "/path/to/styles.css";
}
```

You can also disable base style injection altogether by setting the property to an empty string.
</details>

<details>
  <summary>Await dependency component availability</summary>

Some components may have a dependency on another component. In these cases you may want to wait to perform some action until the dependency component has mounted. To do so, you can listen for a `mount` event on the dependency component:

```js
class MyComponent extends WebComponent(HTMLElement) {
  connectedCallback() {
    this.closest("dependency-component").addEventListener("mount", () => {
      // <dependency-component> has been mounted.
    });
  }
}
```
</details>

<details>
  <summary>Guard against DOM diffing</summary>

During a component's re-rendering process, any differences in the provided render template are applied to the live DOM (referred to as "DOM diffing").

You may want to designate a static area in a component template that will be ignored during the DOM diffing process. For instance, you may have a component which a third-party library injects content into. To do so, you can use the `static-slot` element:

```js
class MyComponent extends WebComponent(HTMLElement) {
  connectedCallback() {
    super.connectedCallback();
    this.state.count = 0;

    setInterval(() => {
      this.state.count++;
    }, 1000);
  }

  render() {
    return `
      <div>As the count changes, this div will be diffed: ${this.state.count}.</div>
      <static-slot></static-slot>
    `;
  }

  mountedCallback() {
    this.shadowRoot.querySelector("static-slot").textContent = `
      This will not be touched during re-renders.
    `;
  }
}
```

To clarify, elements written *inside the render template* will also not be touched if the data associated with them has not changed between renders. Only elements injected after the fact, i.e. in the `mountedCallback`, will be wiped out on next render, unless guarded by a `static-slot`.

Anything that happens inside the `mountedCallback` will not be repeated after renders subsequent to the first. And it is not recommended to re-inject content into the shadow root on every update via the `updatedCallback`, as it is inefficient and could behave unexpectedly.

Technically, all custom elements are ignored in this way (as the rendering of each component is handled internally), but `static-slot` serves as a no-op custom element that `WebComponent` provides for convenience and clarity.
</details>

<details>
  <summary>Optimize for DOM diffing</summary>

Above, we gave an example of a `div` with a line of text which included interpolated data (`state.count`). Because the interpolated data is an undistinguished part of the rest of the `textContent`, the `div` node's entire `textContent` will be replaced with a re-created version.

This is fine at a smaller scale, though an optimization opportunity would be to isolate the portion that changes into its own node, so that the reconciler can more granularly understand and ignore what has not changed. For example, `state.count` could be wrapped in its own `span`, then the `span` content would be the only thing identified for updating:

```js
class MyComponent extends WebComponent(HTMLElement) {
  ...

  render() {
    return `
      <div>
        As the count changes, this div will be diffed:
        <span>${this.state.count}</span>.
      </div>
      ...
    `;
  }

  ...
}
```
</details>

<details>
  <summary>Performance tips</summary>

As with other component frameworks, be mindful of the entire lifecycle of a component to perform operations in the most effective place possible. Depending on the operation, you may want to do it as early or as late as possible.

The lifecycle order is **asynchronous**: `constructor -> connectedCallback -> render -> (first render ? mountedCallback) -> updatedCallback -> disconnectedCallback`.

* `constructor` — Anything required for first render, *is not* specific to a particular component instance (i.e., applicable to all component instances), and *has no need* for awareness of the particular DOM relative to the component. For example, the `constructor` should download and adopt stylesheets.
* `connectedCallback` — Anything required for first render, but *is* specific to a particular component instance, or *does need* awareness of the particular DOM relative to the component. For example, querying parents, siblings, children, or attributes, fetching data specific to the instance, or setting initial state based on some specific condition.
* `mountedCallback` — Anything you can possibly defer until after the first render. For example, adding interactive functionality, timers, event listeners, and observers. The more you can assign to this hook, the more you will optimize time to first render.
* `updatedCallback` — **Be cautious using this hook**, as it is called after every update and re-render. Beware performing expensive or redundant operations. Consider moving whatever you can back up to `mountedCallback`.
    * If an operation may only *sometimes* need to be repeated on update, or doesn't need to happen immediately after re-render, consider optimization techniques such as memoization, debouncing, early returns, etc.
    * Also be aware that re-renders **do not wait** for this hook—`updatedCallback` is called *after* the render has completed.
* `disconnectedCallback` — To prevent memory leaks and generally optimize memory, undo any side effects done in `connectedCallback` or `mountedCallback` that may still be held in browser memory. For example, remove any event listeners, disconnect any observers, clear any intervals or recursive timeouts, etc.
    * Event listeners and observers added to the component element or its children will automatically be garbage collected when the element is removed, so you do not need to clean them up yourself. You only need to undo *side effects*, i.e. things done outside the component instance, like to the `window` or `document`.
</details>

<details>
  <summary>Syntax highlighting in render template</summary>

An editor plugin like VS Code's [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) can enable HTML syntax highlighting within annotated template literals.

```js
class MyComponent extends WebComponent(HTMLElement) {
  render() {
    return /* html */`
      <p>
        This will be syntax highlighted in a code
        editor with the necessary plugin.
      </p>
    `;
  }
}
```
</details>