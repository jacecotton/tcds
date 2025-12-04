For our purposes, a "component" is a bundle of HTML elements that can be dynamically reused across pages and UIs.

Every component has a specification detailing the necessary markup structure, allowed content, and available configuration options for producing the desired design, functionality, and behavior.

Most components, especially if they're heavily customizable, interactive, or complex, will be implemented as [custom HTML elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements) with [shadow DOMs](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM). These will usually have a particular set of slot names and invented attributes for customizing the component and adding content.

```html
<tcds-tabs>
  <!-- custom element -->
  <tcds-tab>
    <h2 slot="title">Tab 1</h2>
    <!-- slot name -->
    <p>...</p>
  </tcds-tab>
  <tcds-tab selected>
    <!-- invented attribute -->
    <h2 slot="title">Tab 2</h2>
    <p>...</p>
  </tcds-tab>
  ...
</tcds-tabs>
```

Other components do not extend far beyond a native HTML element's functionality, like the [`button` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button). In these cases, the component is implemented with these simpler elements and specific class names. Instead of slots, there are expected child elements (usually unclassed and semantic). Instead of invented attributes, they will at most use `data-` attributes, but usually more standard ones.

```html
<button class="tcds-button">
  <!-- class name -->
  <tcds-icon icon="info"></tcds-icon>
  <!-- unclassed child -->
  View details
</button>
```

As exemplified above, all component names use a `tcds-` prefix (Texas Children's Design System), whether custom element or classed element.
