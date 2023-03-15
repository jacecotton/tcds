## WebComponent
`WebComponent` is a [class mixin](https://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/) for [`HTMLElement` interfaces](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) to help create [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) with declarative, state-driven templating.

Concretely, this utility provides exactly three things:

* A way to declaratively define a component template and efficiently render it (`template` property and `_requestUpdate` method)
* Lifecycle hooks for interfacing with this process (`mountedCallback` and `updatedCallback`)
* [Lazy attribute binding](https://web.dev/custom-elements-best-practices/#make-properties-lazy) (`_upgradeProperties` method)

Everything else—reactive properties, attribute synchronization, conditional and recursive rendering, styling, event handling, etc.—is deferred to vanilla JavaScript and documented convention.

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
Provide your component's template, to be rendered within its shadow root, in a `template` property.

```js
class MyComponent extends WebComponent(HTMLElement) {
  template = `
    <p>Hello world!</p>
  `;
}
```

By using a `template` getter method, you can perform arbitrary operations prior to returning a value. By using template literals and other basic JavaScript features, you can interpolate data, conditionally render, and recursively render.

```js
class MyComponent extends WebComponent(HTMLElement) {
  get template() {
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

Note that `WebComponent` makes use of `connectedCallback` internally, so if you use it in your subclass, you must call `super.connectedCallback` first:

```js
class MyComponent extends WebComponent(HTMLElement) {
  connectedCallback() {
    super.connectedCallback();
  }
}
```

### Property-attribute reflection
[Best practices](https://web.dev/custom-elements-best-practices/#attributes-and-properties) stipulate that for attributes with a corresponding property, they should be kept in sync. To do so, we first need to observe the attributes in question:

```js
class Dialog extends WebComponent(HTMLElement) {
  static get observedAttributes() {
    return ["open"];
  }
}
```

Then, we need to define getters and setters for the corresponding properties, and respectively derive the value from the attributes and set the attributes:

```js
class Dialog extends WebComponent(HTMLElement) {
  // ...

  get open() {
    // Or `getAttribute` if not a boolean attribute.
    return this.hasAttribute("open");
  }

  set open(value) {
    // Or `setAttribute` if not a boolean attribute.
    this.toggleAttribute("open", Boolean(value));
  }
}
```

We should not set `this.open = value` in the setter directly. Instead, `this.open` will always read from the current attribute value. This way, we can ensure properties and attributes are always in sync. Thanks to having dedicated getters and setters, we can also tightly control *how* they're kept in sync on a case-by-case basis.

### Lazy properties
Lazily upgrading properties, as explained in the [best practices](https://web.dev/custom-elements-best-practices/#make-properties-lazy), can be accomplished with the provided `_upgradeProperties` method in `connectedCallback`.

```js
class Dialog extends WebComponent(HTMLElement) {
  // ...

  connectedCallback() {
    super.connectedCallback();
    this._upgradeProperties(["open"]);
  }
}
```

This should be done for all observed and synced attributes.

### Reactive properties
To make your component template react to property changes, you can call a `_requestUpdate` wherever that property is updated. This could be inside corresponding [class setters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set) or [`set` proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy), or if your property is synced to an attribute, inside the `attributeChangedCallback`.

The following demonstrates a standalone reactive property (state).

```js
class Counter extends WebComponent(HTMLElement) {
  connectedCallback() {
    super.connectedCallback();
    this._upgradeProperties(["count"]);
  }

  get template() {
    return `
      <button>Clicked ${this.count} times</button>
    `;
  }

  mountedCallback() {
    this.shadowRoot.querySelector("button").addEventListener("click", () => {
      this.count++;
    });
  }

  #count = 0;

  get count() {
    return this.#count;
  }

  set count(value) {
    this.#count = Number(value);
    this._requestUpdate("count");
  }
}
```

The following demonstrates a reactive property synchronized with an attribute.

```js
class Dialog extends WebComponent(HTMLElement) {
  static get observedAttributes() {
    return ["open"];
  }

  connectedCallback() {
    super.connectedCallback();
    this._upgradeProperties(["open"]);
  }

  static get template() {
    return `
      <div ${this.open ? "" : "hidden"}>
        ...
      </div>
    `;
  }

  get open() {
    return this.hasAttribute("open");
  }

  set open(value) {
    this.toggleAttribute("open", Boolean(value));
  }

  attributeChangedCallback(attribute) {
    // By calling `_requestUpdate` here, we can update the template
    // for changes to any property listed in `observedAttributes`,
    // instead of having to call it in each property setter.
    this._requestUpdate(attribute);
  }

  updatedCallback(props) {
    if(props.includes("open")) {
      console.log(`Dialog was ${this.open ? "opened" : "closed"}`);
    }
  }
}
```

Note that by passing the property name to the `_requestUpdate` method, we have access to a `props` array in the `updatedCallback` method which lets us know which properties were responsible for, or associated with, that update.

### Styling
The simplest way to style a component is to embed inline styles in the template.

```js
class MyComponent extends WebComponent(HTMLElement) {
  get template() {
    return `
      <style>
        :host {
          ...
        }
      </style>
    `;
  }
}
```

However, we recommend using the [Constructable Stylesheets API](https://web.dev/constructable-stylesheets/).

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
  ...
}
```

This setup is recommended but entirely optional.

Note that adopting or inserting styles into the shadow root ("shadow styles") scopes and encapsulates the styles to the shadow boundary. To create unscoped styles (useful for having outer DOM context awareness, e.g. whether the component is a `:first-child`, or to style slotted content deeper and more specific than `::slotted` allows), you can adopt other styles into the root node with `this.getRootNode()`. In most cases this will be the document, or a parent component's shadow root.

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
  ...
}
```
