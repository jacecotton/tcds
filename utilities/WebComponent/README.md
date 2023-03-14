## WebComponent
`WebComponent` is a [class mixin](https://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/) for [`HTMLElement` interfaces](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) to help create [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) in a reactive and declarative manner. At only 1.3kb minified and compressed, it is not a library or framework but an extremely thin abstraction layer.

In comparison to libraries also built on [Web Components API](https://developer.mozilla.org/en-US/docs/Web/Web_Components), like [Lit](https://lit.dev/) or [Stencil](https://stenciljs.com/), `WebComponent` is deliberately barebones and offers few unique features. It instead defers to **convention**, further embracing the browser's own component model instead of inventing a new one.

The below documented conventions are based on existing native HTML elements ("built-ins"), particularly those with shadow DOMs and interactivity (`dialog`, `details`, etc.), and comply with the Google Developers' [Custom Element Best Practices](https://web.dev/custom-elements-best-practices/) document.
