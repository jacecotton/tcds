# WebComponent
`WebComponent` is a [class mixin](https://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/) for creating [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) with reactivity and declarative templating.

This is not a library, and unlike libraries also based on the [Web Components API](https://developer.mozilla.org/en-US/docs/Web/Web_Components), it does not attempt to abstract away boilerplate or offer extra utilities. Rather than alter the basic experience of creating custom elements, it more fully embraces the browser's own component model.

## Getting started
Defining a Web Component works like defining any other custom element, only instead of extending an element interface directly, extend it with the `WebComponent` wrapper.

For example, extend `HTMLElement` to create an autonomous custom element:

```js
import {WebComponent} from "@txch/tcds";

class MyComponent extends WebComponent(HTMLElement) {

}

customElements.define("my-component", MyComponent);
```

Or any other interface to customize a built-in element:

```js
class MyComponent extends WebComponent(HTMLUListElement) {

}

customElements.define("my-component", MyComponent, {extends: "ul"});
```

By using the `WebComponent` mixin, a [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow) will be automatically attached. As such, only use this mixin for [elements that can have a shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow#elements_you_can_attach_a_shadow_to).

## Templating
You can define your component's internal markup in a `template` property.

```js
class MyComponent extends WebComponent(HTMLElement) {
  get template() {
    return `
      <p>Hello world</p>
    `;
  }
}
```

Using [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals), you can use returns, indentation, and interpolation all without string concatenation. The ability to interpolate data allows for dynamic data-binding, as well as conditional and iterative rendering:

```js
class MyComponent extends WebComponent(HTMLElement) {
  get template() {
    // This could be fetched from some endpoint, defined on the component
    // instance through props, etc.
    const fruits = ["banana", "apple", "orange", "grapes"];

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

## Rendering
Once your component's template is defined, it needs to be rendered to the element's shadow DOM. To do so, you can use the `update` method. Use the [`connectedCallback` hook](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks) to make your first render when the element connects to a document:

```js
class MyComponent extends WebComponent(HTMLElement) {
  get template() {
    // ...
  }

  connectedCallback() {
    this.update();
  }
}
```

The `update` method works like this:

* First, for efficiency, it debounces subsequent calls within a single [animation frame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) so that nothing happens next until all back-to-back update "requests" have been made.
* From there, it converts the returned `template` string into a document fragment, "rendering" it to live HTML. (It also inserts the Design System's [shared stylesheet](https://github.com/jacecotton/tcds/blob/main/index.scss) so that all component shadow DOMs have the same basic styles.)
* It then compares this document fragment against the component's current shadow tree, and applies any differences between them to the shadow DOM (a process known as "DOM diffing").
* If this is the first render pass, it calls the `mountedCallback` hook.
* It lastly calls the `updatedCallback` hook.

See [&sect; Lifecycle](#lifecycle) for details on `mountedCallback` and `updatedCallback`.

## Reactivity
You can call `update` wherever and in response to whatever you want. For instance, this could be useful for creating reactive props and state. The following demonstrates this with attribute-property reflection:

```js
class Dialog extends WebComponent(HTMLElement) {
  static observedAttributes = ["open"];

  get open() {
    return this.hasAttribute("open");
  }

  set open(value) {
    this.toggleAttribute("open", Boolean(value));
  }

  get template() {
    return `
      <div ${!this.open ? "hidden" : ""}>
        ...
      </div>
    `;
  }

  connectedCallback() {
    this.update();
  }

  attributeChangedCallback() {
    this.update();
  }
}
```

Here's an example of reactive internal state without attribute reflection:

```js
class ClickCounter extends WebComponent(HTMLElement) {
  #count = 0;

  get count() {
    return this.#count;
  }

  set count(value) {
    this.#count = value;
    this.update();
  }

  get template() {
    return `
      <button id="clicker">Clicked ${this.count} times</button>
    `;
  }

  // ...

  mountedCallback() {
    this.shadowRoot.clicker.addEventListener("click", () => {
      this.count++;
    });
  }
}
```

(See [&sect; Lifecycle](#lifecycle) for details on `mountedCallback`.)

You can also make [slots](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot) reactive by calling `update` within a [`slotchange` event listener](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement/slotchange_event). This is usually not needed, as changes to slotted content will be automatically reflected to the shadow DOM. However, if your template involves conditional logic based on the presence or content of a slot, this may be useful:

```js
class MyComponent extends WebComponent(HTMLElement) {
  get template() {
    const hasContent = !!this.querySelector("[slot=content]");

    return `
      ${hasContent ? `
        <p>
          <slot name="content"></slot>
        </p>
      ` : `
        <h2>No content</h2>
      `}
    `;
  }

  // ...

  mountedCallback() {
    this.shadowRoot.querySelectorAll("slot[name=content]").forEach((slot) => {
      slot.addEventListener("slotchange", () => {
        this.update();
      });
    });
  }
}
```

## Lifecycle
Aside from built-in lifecycle callbacks, the `WebComponent` mixin provides two methods for hooking into the update process: `mountedCallback` and `updatedCallback`. You may want to use these in response to component renders for performing *imperative* operations that cannot be expressed *declaratively* in the template (such as DOM manipulation).

```js
class MyComponent extends WebComponent(HTMLElement) {
  mountedCallback() {
    // Called after first render.
  }

  updatedCallback() {
    // Called after every render.
  }
}
```

To optimize time to first render, defer any operations you possibly can to `mountedCallback`, such as setting up listeners, observers, intervals, etc. (rather than doing so in the `constructor` or `connectedCallback`).

As `updatedCallback` is called after every render, avoid performing expensive or redundant operations, or accidentally causing infinite recursion.

The `update` method optionally accepts an object as an argument. When `update` calls are debounced, a batch is accumulated of the data passed to them. This batch is then handed off to `updatedCallback`. This can be used to execute code associated only with changes to specific properties, attributes, slots, etc.

For example, given the above `ClickCounter` snippet, we can record and pass the previous `count` value to the `update` method, which will be included in a batch accessible from `updatedCallback`. We can then check for the existence of `count` in the batch before executing associated code:

```js
class ClickCounter extends WebComponent(HTMLElement) {
  // ...

  set count(value) {
    const oldCount = this.#count;
    this.#count = value;
    this.update({count: oldCount});
  }

  // ...

  updatedCallback(old) {
    if("count" in old) {
      console.log(`count changed from ${old.count} to ${this.count}`);
        // onclick => "count changed from 0 to 1"
        // onclick => "count changed from 1 to 2"
        // ...
    }
  }
}
```

An example with slots:

```js
class MyComponent extends WebComponent(HTMLElement) {
  // ...

  mountedCallback() {
    this.shadowRoot.querySelectorAll("slot").forEach((slot) => {
      slot.addEventListener("slotchange", () => {
        this.update({[slot.name]: slot.assignedNodes()});
      });
    });
  }

  updatedCallback(old) {
    const slots = old; // alias

    if("content" in slots) {
      console.log("content slot changed", slots.content);
    }
  }
}
```


### Lazy properties
The above approach does create one potential problem, which is if a component user attempts to set a property on the element before its definition has been loaded (ergo before the getter and setter can intercede). This can be addressed by [making the property lazy](https://web.dev/custom-elements-best-practices/#make-properties-lazy) using a provided `_upgradeProperties` method inside the `connectedCallback`. As a matter of general best practice, this should always be done.

```js
class Dialog extends WebComponent(HTMLElement) {
  ...

  connectedCallback() {
    super.connectedCallback();
    this._upgradeProperties(["open"]);
  }
}
```

## Styling
`WebComponent` automatically injects the Design System's shared stylesheet into the shadow DOM. This can be changed or disabled by setting the `baseStyles` property.

The simplest way to add scoped component styles is to embed inline styles in the template.

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

Note that adopting or inserting styles into the shadow root scopes and encapsulates the styles to the shadow boundary.

To create unscoped styles (useful for having outer DOM context awareness, e.g. whether the component is a `:first-child`, or to style slotted content with greater specificity), you can adopt other styles into the element's root node after connection. In most cases this will be the document, or a parent component's shadow root.

```js
/* index.js */
import lightStyles from "./style.light.css";

class MyComponent extends WebComponent(HTMLElement) {
  connectedCallback() {
    super.connectedCallback();
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
