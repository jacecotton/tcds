`WebComponent` is a [class mixin](https://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/) for [element interfaces](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) for creating declaratively-written reactive [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements).

This documentation assumes familiarity with the [Web Components API](https://developer.mozilla.org/en-US/docs/Web/Web_Components), as this utility introduces very few concepts.

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

**Note:** Only do this for [elements that can have a shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow#elements_you_can_attach_a_shadow_to). **`WebComponent` is incompatible with elements that cannot.**

## Templating
Define your component markup in a `template` property.

```js
class MyComponent extends WebComponent(HTMLElement) {
  template = `
    <p>Hello world</p>
  `;
}
```

When the element connects, a shadow root will be attached and the markup will be inserted inside.

From then on, every time the component updates, the template will be compared against the existing shadow tree, then any differences between them will be applied to the shadow DOM.

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

The `old` parameter provides access to the updated attributes' previous values (so for example, given `foo="bar"`, `this.setAttribute("foo", "baz")` would result in an `updatedCallback` call, within which you could compare `old.foo` (`bar`) to `this.foo` (`baz`)).

## Reactive attributes
Reactive attributes are attributes that trigger a re-render when changed.

To specify reactive attributes, list them in a static `observedAttributes` property.

```js
class MyComponent extends WebComponent(HTMLElement) {
  static observedAttributes = ["foo", "bar"];
}
```

When the `[foo]` or `[bar]` attributes change, the element's shadow tree will be re-rendered. As with standard custom elements, you can hook into these attribute changes with the `attributeChangedCallback` method.

You can also choose to only make certain observed attributes reactive by overriding the `attributeChangedCallback` method and calling `_requestUpdate` for select attribute(s).

```js
class MyComponent extends WebComponent(HTMLElement) {
  static observedAttributes = ["foo", "bar", "baz"];

  attributeChangedCallback(name, previousValue) {
    // [foo] will no longer trigger a re-render.
    if(name === "bar" || name === "baz") {
      this._requestUpdate({[name]: previousValue});
    }
  }
}
```

## Attribute-property reflection
Like with the attributes of native HTML elements, a custom element's primitive attributes should generally correspond to an internal property (see [best practices](https://web.dev/custom-elements-best-practices/#avoid-reentrancy-issues)). Attributes and properties should be kept in sync at least downwards (attribute to property), and depending on the property, also upwards (property to attribute).

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

Here, we do not allow setting `this.open` directly. Instead, attempts to set the property update the attribute, the attribute change is observed, then when the property is read it pulls from the attribute's new value. This way the property and attribute are always in sync without causing infinite recursion or other problems.

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
As mentioned above, any changes to observed attributes will automatically trigger a re-render. However, you may want to update the component after a change to a property that is *not* associated with an attribute, or some other arbitrary condition or behavior.

The `_requestUpdate` method can be called to schedule an update. Update requests (including those dispatched from attribute changes) are debounced within a single animation frame before an update is actually made to make the rendering step more efficient.

Class setters and set proxies can be used to detect changes to properties, then you can call `_requestUpdate` from there.

```js
class ClickCounter extends WebComponent(HTMLElement) {
  #count = 0;

  get count() {
    return this.#count;
  }

  set count(value) {
    const old = this.#count;
    this.#count = Number(value);
    this._requestUpdate({count: old});
  }

  template = `
    <button id="clicker">Clicked ${this.count} times</button>
  `;

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
