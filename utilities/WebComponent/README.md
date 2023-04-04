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
Once your component's template is defined, it needs to be rendered to the element's shadow DOM. To do so, you can use the `update` method. Use the `connectedCallback` hook to make your first render when the element connects to a document:

```js
class MyComponent extends WebComponent(HTMLElement) {
  get template() {
    return `
      <p>Hello world</p>
    `;
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

## Lifecycle
`WebComponent` uses both `connectedCallback` and `attributeChangedCallback` internally. So if you wish to use them in your subclass while preserving default behavior, you must call the respective `super` methods.

```js
class MyComponent extends WebComponent(HTMLElement) {
  connectedCallback() {
    super.connectedCallback();
    ...
  }

  attributeChangedCallback() {
    super.attributeChangedCallback();
    ...
  }
}
```

In both cases, `WebComponent` uses these methods in order to schedule a component update (for the initial render and after every [observed attribute change](#reactive-attributes), respectively).

`WebComponent` also provides two additional lifecycle callbacks:

```js
class MyComponent extends WebComponent(HTMLElement) {
  mountedCallback() {
    // Called after first render.
  }

  updatedCallback(old) {
    // Called after each render.
  }
}
```

The `old` parameter provides access to the updated attributes' previous values. So for example, given `[foo="bar"]`, running `this.setAttribute("foo", "baz")` would result in an `updatedCallback` call, within which you could compare `old.foo` to `this.foo` (`bar` &rarr; `baz`).

## Reactive attributes
To make an attribute trigger a re-render when changed, first mark them for observation:

```js
class MyComponent extends WebComponent(HTMLElement) {
  static observedAttributes = ["foo", "bar"];
}
```

When the `[foo]` or `[bar]` attributes change, the element's shadow tree will be re-rendered. As with standard custom elements, you can hook into these attribute changes with the `attributeChangedCallback` method.

You can also choose to only make certain observed attributes reactive by overriding the `attributeChangedCallback` method and calling `_requestUpdate` only for select attribute(s) (passing the attribute `name` and `oldValue`).

```js
class MyComponent extends WebComponent(HTMLElement) {
  static observedAttributes = ["foo", "bar", "baz"];

  attributeChangedCallback(name, oldValue) {
    // Changing [foo] will no longer trigger a re-render.
    if(name === "bar" || name === "baz") {
      this._requestUpdate(name, oldValue);
    }
  }
}
```

## Attribute-property reflection
Like with the attributes of native HTML elements, a custom element's primitive attributes should generally correspond to an internal property (see [best practices](https://web.dev/custom-elements-best-practices/#avoid-reentrancy-issues)). Attributes and properties should be kept in sync at least downwards (attribute to property), and if "stateful", also upwards (property to attribute).

To do so, first observe the attribute, define a getter for the corresponding property that returns a value derived from the attribute (optionally with type casting), and a setter that updates the attribute (optionally with type validation).

```js
class Dialog extends WebComponent(HTMLElement) {
  static observedAttributes = ["open"];

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

Here, we do not allow setting `this.open` directly. Instead, attempts to set the property update the attribute, the attribute change is observed, then when the property is read it returns the attribute's new value. This way the property and attribute are always in sync without causing infinite recursion or other problems.

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

## Reactive state
As mentioned above, any changes to observed attributes will automatically trigger a re-render. However, you may want to update the component after a change to a property that is *not* associated with an attribute, or according to some other condition or event.

The `_requestUpdate` method can be called to arbitrarily schedule an update. To make the rendering step more efficient, update requests (including those dispatched from attribute changes) are debounced within a single animation frame.

Class setters and set proxies can be used to detect changes to properties, then you can call `_requestUpdate` from there.

```js
class ClickCounter extends WebComponent(HTMLElement) {
  #count = 0;

  get count() {
    return this.#count;
  }

  set count(value) {
    const oldValue = this.#count;
    this.#count = Number(value);
    this._requestUpdate(count, oldValue);
  }

  get template() {
    return `
      <button id="clicker">Clicked ${this.count} times</button>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this._upgradeProperties(["count"]);
  }

  mountedCallback() {
    this.shadowRoot.clicker.addEventListener("click", () => {
      this.count++;
    })
  }

  updatedCallback(old) {
    if("count" in old) {
      console.log(`count updated from ${old.count} to ${this.count}`);
    }
  }
}
```

Note that you only need to pass the old value to the `_requestUpdate` method if you want it to be accessible from within the `updatedCallback` method.

## Reactive slots
You can also make slot changes reactive. Normally, this is not required, as changes to slotted content are automatically projected to the shadow DOM. However, if your template contains conditional logic based on the presence of slotted content, you can trigger a re-render associated with slot changes using the `slotchange` event and `_requestUpdate`:

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
        <span>No content</span>
      `}
    `;
  }

  mountedCallback() {
    this.shadowRoot.querySelectorAll("slot").forEach((slot) => {
      slot.addEventListener("slotchange", () => {
        this._requestUpdate(slot.name, slot.assignedNodes());
      });
    });
  }
}
```

As previously mentioned, you only need to pass arguments to the `_requestUpdate` call if you want access to that information in the `updatedCallback`. The `slot.assignedNodes()` argument gives an array of nodes assigned to the slot.

```js
class MyComponent extends WebComponent(HTMLElement) {
  ...

  updatedCallback(changed) {
    if("content" in changed) {
      // content slot changed
    }
  }
}
```

Note that there's no built-in way to differentiate between attributes, other properties, and slots in `updatedCallback`, which can become difficult to manage. A recommended convention is to prepend slot names with a `$` when you pass them to the `_requestUpdate` call.

```js
class MyComponent extends WebComponent(HTMLElement) {
  ...

  mountedCallback() {
    this.shadowRoot.querySelectorAll("slot").forEach((slot) => {
      slot.addEventListener("slotchange", () => {
        this._requestUpdate(`$${slot.name}`, slot.assignedNodes());
      });
    });
  }

  updatedCallback(changed) {
    if("$content" in changed) {
      // content slot changed
    }
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
