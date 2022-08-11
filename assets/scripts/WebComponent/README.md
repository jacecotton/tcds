# WebComponent.js

The `WebComponent` class is a utility for more easily creating native web components, or custom elements. It extends the `HTMLElement` class, and adds some helpful features like reactive state-based rendering, props management, and related lifecycle hooks.

The API should be familiar to those used to React, Vue, etc. Concepts such as state, props, declarative rendering, and lifecycle hooks are identical. The primary differences between this and front-end frameworks are:

* Vanilla JavaScript — This is not a "library" or "framework" but rather a utility class for creating native Web Components based on the Custom Elements API.
* Progressively enhanced rendering — Whereas other libraries and frameworks render views entirely with JavaScript (usually in the client), all Web Components are rendered statically as plain content then *enhanced* by the `WebComponent` utility.
* Agnostic — Because it's native JavaScript, Web Components can be used out of the box no matter what other libraries, frameworks, content management systems, or rendering pipelines are used.

## Defining custom elements
To define a custom element, pass the name of the element and a class that extends `WebComponent` as arguments to a `customElements.define` method.

```js
customElements.define("my-component", class MyComponent extends WebComponent {
  // ...
});
```

## Props
Props are set by the component user via attributes at the instance level. Any changes to the component's attributes will update the `this.props` object and trigger a re-render. The `this.props` object is internally immutable, as component authors should never override component users. It is technically possible to do so by manipulating the attributes on the component host (e.g. with `setAttribute`), but this is considered a bad practice and should generally be avoided.

## State
Component state is readable and writable from an internal `this.state` object. Mutations to `this.state` trigger a re-render.

Add state properties one-by-one; do not redefine `this.state` as an object containing your state.

**Do:**
```js
this.state.foo = "bar";
```

**Don't:**
```js
this.state = {
  foo: "bar",
};
```

### Reflected state attributes
If you want some state property to be reflected onto the component instance's DOM, you can return an array with that property inside a static `observedAttributes` getter.

```js
customElements.define("my-component", class MyComponent extends WebComponent {
  static get observedAttributes() {
    return ["foo"];
  }
});
```

Now, any time `this.state.foo` is updated, a `foo` attribute will be added to the component instance's DOM. Note that if `foo` is a boolean, a value-less attribute will be toggled (rather than set to `"true"` and `"false"`).

Example:

```js
static get observedAttributes() {
  return ["foo", "bar"];
}

connected() {
  this.state.foo = true;
  this.state.bar = "baz";
}
```

Result:

```html
<my-component foo bar="baz">
```

Note that any state properties in `observedAttributes` will be excluded from `this.props` population (i.e. `this.props` will not include `foo` or `bar`). So be careful to design your component's API accordingly.

## Rendering
The `WebComponent` class allows for declarative rendering via the `render()` method. You can return a string with component markup that you want to be inserted into the custom element's shadow DOM.

**Tip:** For a JSX-like authoring experience, we recommend using template literals and interpolation.

```js
customElements.define("my-component", class MyComponent extends WebComponent {
  render() {
    return `
      <p>Hello world!</p>
    `;
  }
});
```

You can access state and props from within the render method:

```js
render() {
  return `
    <p>${this.props.greeting || "Hello"} world!</p>
  `;
}
```

```html
<my-component greeting="Goodbye"></my-component>
```

Result:

> Goodbye world!

## Styling
Styles can be added by returning a string in a static `styles` getter. The returned string will be placed between inline `<style>` tags, which will be embedded into the shadow DOM (meaning the styles are encapsulated). While this means the styles will technically be duplicated across component instances, browsers have implemented the Custom Elements API to eliminate redundancies intelligently.

```js
customElements.define("my-component", class MyComponent extends WebComponent {
  static get styles() {
    return `
      p {
        color: red;
      }
    `;
  }

  render() {
    return `
      <p>I am red.</p>
    `;
  }
});
```

```html
<my-component></my-component> <!-- p children will be red -->

<p>I am not red</p> <!-- styles are encapsulated, so p tags outside the component will not be affected -->
```

## Lifecycle hooks
### `connected`
The `connected` hook serves the same purpose as the Custom Element API's `connectedCallback` hook, only it's called after state and props have been proxied, and the `this.props` object has been populated from the component instance's given attributes. If you want to do anything before rendering, mounting, and updating (such as defining elements and initializing variables), do it here.

### `mounted`
The `mounted` hook is called on the available animation frame after the first render pass, and after all child custom elements are defined, but before the `updated` hook. This is where you should add any event listeners, observers, timers, etc., and mutate state as a result of those things.

Because this hook is called before `updated`, do not assume you're working with DOM that reflects any changes made in the `updated` hook. In fact, it is recommended to not do anything to or based upon the DOM in this hook. If possible, restrict operations in this hook to updating state, adding listeners, observers, etc.

### `updated`
The `updated` hook is first called after the `mounted` hook, then after every render after that. This method is essentially for doing any imperative manipulation of the component DOM, if needed.

You can return an object with `state` and `props` child objects, which can contain callback functions to respond to specific state or prop updates.

```javascript
updated() {
  return {
    state: {
      someState: () => {
        // This code runs only when this.state.someState is changed.
      },
    },

    props: {
      someProp: () => {
        // This code runs only when this.props.someProp is changed.
      },
    },
  };
}
```
