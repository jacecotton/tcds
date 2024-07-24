## A primer on Web Components
Most of our components are [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements), and most of these use the [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow). The **Web Components API** refers collectively to these and other related APIs.

The shadow DOM allows developers to write component markup with JavaScript and then isolate it from the outer DOM. Generally, shadow DOM markup contains no content or semantics, rather only markup necessary for functionality, structure, or dynamic UI. Content is received either from an API or from contentful, semantic markup in the "surface DOM" via attributes or slots.

For example, whereas a React component might look something like:

```html
<SomeComponent title="Some heading" />
```

With Web Components, template and content authors would write:

```twig
<some-custom-element>
  <h2 slot="title">Some heading</h2> <!-- contentful, semantic, non-functional markup -->
</some-custom-element>
```

Component authors can then program the shadow DOM to consume this content, while adding additional, isolated markup programmatically:

```html
<some-custom-element>
  #shadow-root
  |  <div> <!-- non-semantic structural markup -->
  |    <slot name="title">
  |      ↳ h2 ("Some heading") <!-- slotted (variable) content -->
  |    </slot>
  |    <button>...</button> <!-- markup only for dynamic functionality -->
  |  </div>
  |  ...
  ...
</some-custom-element>
```

This allows component authors to focus on (and co-locate) internal non-semantic markup and functionality, while allowing component users to focus only on content and semantics, rather than implementation details. It also helps provide *progressive enhancement* instead of total reliance on JavaScript—if the JavaScript fails for whatever reason, the input markup and content will still be readable (and can be styled separately with `:not(:defined)`).

The shadow DOM has other benefits thanks to its encapsulation and isolation. Shadow DOM can neither pollute nor be polluted by its outer context, providing style scoping and script isolation out of the box. This helps with maintainability and consistency, but also yields performance advantages thanks to some safe assumptions and reuse opportunities browsers can make during rendering.

* For more information on Web Components generally, see [Web Components - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)
* For best practices for authoring custom elements, see [Custom Element Best Practices - web.dev](https://web.dev/articles/custom-elements-best-practices)

## Authoring custom elements
The Design System provides some utilities to cover functional gaps in creating custom elements.

### Declarative templating
By default, the custom element authoring experience is *imperative* and relies on traditional DOM manipulation techniques. This can be quite cumbersome, especially for more interactive, state-driven components that require complex markup and logic.

The Design System provides a `declarative` [class mixin](https://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/) for element interfaces, which allows you to define a `template` property for declaratively expressing your component's markup. The `template` can then be applied to the component's shadow DOM on-demand, via `requestUpdate`. (This only works for [elements that have a shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow#elements_you_can_attach_a_shadow_to).)

> **Note:** This is not to be confused with the [Declarative Shadow DOM API](https://developer.chrome.com/docs/css-ui/declarative-shadow-dom), which is used to render a shadow DOM from the server — not for state-based (i.e. client-side) reactive UI updates. This can also be useful, but is beyond the scope of this document.
>
> This is also not to be confused with the [`template` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template) more generally, which is only dynamic insofar as you can design your component API with slots. The `declarative` mixin's `template` property's rendering and updating is *evaluated*, meaning it can do conditional and iterative rendering, as well as interpolate computed values at runtime.

To use `declarative`, create a custom element like normal, only wrap the element interface in a `declarative()` mixin. You must also attach a shadow root:

```js
class ClickCounter extends declarative(HTMLElement) {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
  }
}

customElements.define("click-counter", ClickCounter);
```

Then, you can define your `template`, and make your first render when the component connects to the outer DOM using the `connectedCallback` hook:

```js
class ClickCounter extends declarative(HTMLElement) {
  get template() {
    return `
      <button>Clicked 0 times</button>
    `;
  }

  constructor() {
    ...
  }

  connectedCallback() {
    this.requestUpdate();
  }
}
```

### Reactive UI updates
`requestUpdate` can be called at any time and in any place in the component class (other than in the `constructor`—it's also probably unwise to use it anywhere that *responds* to `requestUpdate`, like [`mountedCallback` and `updatedCallback`](#component-lifecycle)). State and other data can be bound to the template, allowing you to dynamically re-render the component in response to state changes.

To continue with the `ClickCounter` example, a `count` property can be updated on every `click` event, then a `count` setter can call `requestUpdate`. The `count` property can then be bound to the `template` using template literals:

```js
class ClickCounter extends declarative(HTMLElement) {
  #count = 0;

  get count() {
    return this.#count;
  }

  set count(value) {
    this.#count = value;
    // Schedule a re-render when count is changed.
    this.requestUpdate();
  }

  get template() {
    // Bind the count property to the template, and call a `clickHandler` method
    // on click. `getRootNode` references the shadow root, and `host` references
    // that root's container (`click-counter`), which has a `clickHandler`
    // method defined below.
    return `
      <button onclick="this.getRootNode().host.clickHandler()">
        Clicked ${this.count} times
      </button>
    `;
  }

  constructor() {
    ...
  }

  connectedCallback() {
    ...
  }

  clickHandler() {
    // Update the state when the button is clicked. Note that no mind is paid
    // here to the markup or render cycle — all we need to worry about is
    // associating a user action with a piece of state.
    this.count++;
  }
}

customElements.define("click-counter", ClickCounter);
```

<details>
  <summary>Performance notes</summary>

> * Back-to-back `requestUpdate` calls (those made within a single [animation frame](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame)) will be debounced and batched for efficiency.
> * When a request task is fired, the template will be dynamically re-evaluated, then the live shadow DOM will be selectively updated based on the calculated differences to the template. This helps maintain end-user state (like form inputs and selections) while reducing total DOM operations.
</details>

#### Component lifecycle
In addition to built-in lifecycle callbacks, the `declarative` mixin provides two methods for hooking into the update process: `mountedCallback` and `updatedCallback`. You may want to use these in response to component renders for performing *imperative* operations that cannot be expressed declaratively in the template (such as DOM manipulation).

```js
class ClickCounter extends declarative(HTMLElement) {
  mountedCallback() {
    // Called after first render.
  }

  updatedCallback() {
    // Called after every render.
  }
}
```

`mountedCallback` is useful for doing anything that depends upon the component's internal markup, like querying elements and setting up event listeners. To optimize time to first render, defer any operations you possibly can to `mountedCallback` (rather than doing so in the `constructor` or `connectedCallback`).

As `updatedCallback` is called after every render, avoid performing expensive or redundant operations, or accidentally causing infinite recursion.

> **Tip:**
>
> Any object passed to a `requestUpdate` call will be passed through to `updatedCallback` (batched `requestUpdate` calls will merge the objects passed to each).
>
> This can be useful for only responding to specific data changes within `updatedCallback`, as well as tracking previous values before the change. For example:
>
> ```js
> set prop(value) {
>   const old = this.#prop;
>   this.#prop = value;
>   this.requestUpdate({prop: old});
> }
>
> ...
>
> updatedCallback(old) {
>   if("prop" in old) {
>     console.log(`prop changed from ${old.prop} to ${this.prop}`);
>   }
> }
> ```

### Styling
We recommend using the [Constructable Stylesheets API](https://web.dev/articles/constructable-stylesheets) to style shadow DOM elements. This provides for programmatic control over the stylesheet, as well as separation from the shadow DOM template.

Natively, this can be achieved by writing the CSS in a local property and instantiating a `CSSStyleSheet` manually:

```js
class SomeComponent extends HTMLElement {
  styles = `
    :host {
      ...
    }
  `;

  constructor() {
    super();
    this.attachShadow({mode: "open"});

    const styles = new CSSStyleSheet();
    styles.replaceSync(this.styles);
    this.shadowRoot.adoptedStyleSheets = [styles];
  }
}
```

For convenience, we use [`constructable-style-loader`](https://github.com/alextech/constructable-style-loader) to separate the CSS into its own file and import it to the script file, ready for adoption. This is optional.

```js
import styles from "./styles.css";

class SomeComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.adoptedStyleSheets = [styles];
  }
}
```

Remember that shadow DOM styles are encapsulated, so by default, it will share no styles with the rest of the Design System or website. Since you cannot adopt an external stylesheet to the `shadowRoot`, we provide a convenient utility to bring in the shared Design System stylesheet to your component's shadow DOM. Simply prepend an `importSharedStyles` reference to your `declarative` element's `template`:

```js
import {declarative, importSharedStyles} from "../utilities/index.js";

class SomeComponent extends declarative(HTMLElement) {
  get template() {
    return importSharedStyles() + `
      <div>...</div>
    `;
  }
}
```

<details>
  <summary>Technical information</summary>

`importSharedStyles` looks for a stylesheet in the outer document with a `[title]` of `tcds`. If it finds one, it will create inline `<style>` tags and `@import` the stylesheet, using the path defined in the `[href]` of the `<link>`. If it doesn't find one, as a last resort it will pull a copy from a CDN (via unpkg). This is considerably slower, however, so always ensure that a `[title="tcds"]` attribute is present in the `<link>` reference to the Design System's main stylesheet when you use it in your project.
</details>

### Lazy loading dynamic properties
If a component user attempts to set a property before a component definition has been loaded, then that property's getter or setter won't intercede.

Best practice is to refresh all dynamic properties (by deleting and re-setting them) on `connectedCallback`. We provide a convenient utility for doing so called `refreshProperties`:

```js
import {refreshProperties} from "../utilities/index.js";

class SomeComponent extends HTMLElement {
  get someProperty() { ... }
  set someProperty() { ... }

  connectedCallback() {
    refreshProperties.apply(this, ["someProperty"]);
  }
}
```

## Why not a framework?
Web Component API-based libraries (like [Lit](https://lit.dev/)) provide useful abstractions and nice ergonomics, but also vendor lock-in, syntactic quirks, and maintenance overhead. No further browser developments will align vanilla JavaScript with Lit closer than it is today. This defeats the purpose we've identified for using Web Components in the first place: to leverage the native web platform's future-proofness, low maintenance, and universal applicability.

The `declarative` utility is designed to introduce as few idiosyncracies and opinions as possible, with minimal to no abstractions. We've also designed the utility along the grain of the web, such that if, for example, native runtime DOM reconciliation (aka "DOM diffing") comes to browsers, the utility can be removed, potentially with minimal refactoring.