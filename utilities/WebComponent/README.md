## WebComponent
`WebComponent` is a [class mixin](https://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/) for [`HTMLElement` interfaces](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) to help create [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) in a reactive and declarative manner.

Rather than providing extra utilities and boilerplate abstractions, as with libraries also bulit on the [Web Components API](https://developer.mozilla.org/en-US/docs/Web/Web_Components) like [Lit](https://lit.dev/) or [Stencil](https://stenciljs.com/), this utility is deliberately barebones. It instead encourages convention and defers most work to vanilla JavaScript, further embracing the browser's own component model instead of inventing a new one.

This utility has only three goals:

* Provide declarative templating with automatic and efficient DOM diffing
* Encourage and, where appropriate, enforce compliance with [best practices for custom elements](https://web.dev/custom-elements-best-practices/)
* Support and encourage compliance with existing convention among browser-native HTML elements

In doing so it further embraces the browser's own component model, rather than concocting a new one, while still providing the minimum DX requirements for building modern, component-based UIs.

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
