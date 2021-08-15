<lead>
  Buttons allow users to trigger an action with a single tap, click, or keypress. This component is a specific implementation of the <code>&lt;button&gt;</code> HTML element, with a standardized design and API.
</lead>

<p>
  <twig>
    {{ include("templates/components/button/button.html.twig", {
      label: "Example button",
      onclick: "alert('Example button clicked.')",
    }) }}
  </twig>
</p>

A button must always:

* Have an associated action, like submitting a form or opening a modal.
* Provide some indication of the action, such as a text label or icon.
* Adhere to and support the overall hierarchy of a page or interface by utilizing scale, color, and proximity.

## Style guide

* **Use specific but simple language.** — Buttons have inherent [interaction cost](https://www.nngroup.com/articles/interaction-cost-definition/ "Interaciton Cost - Nielsen Norman Gorup"); users may be reluctant to click a button if they're not sure about what it will do. Avoid vague and abstract labels like "Click here" or "OK". Prefer explicit labels instead, like "Sign up" or "Confirm choice".
* **Use sentence case for text labels** — All-caps text is less efficient to read for sighted users, and some screen readers will spell out all-caps text, letter-by-letter.

When to use:

* To control an interface, such as opening a modal or menu.
* To submit a form.

When not to use:

* Avoid using buttons for navigation. Prefer [links](/primitives/links) instead.
* Do not use this component if all you need is a generic HTML `<button>` element for its semantic meaning, without the specific styling provided by this component.

## How to use

The following instructions apply to Drupal with Site Studio. For instructions on how to use the Button component in Twig or HTML, see [&sect; Examples](#examples) and [&sect; API](API).

1. While editing a page or component, click the "+" button in the Layout Canvas field.
1. In the side menu that appears, scroll to "Interactive Components".
1. Drag the Button component into the Layout Canvas where desired.
1. Double-click the Button component to edit its fields as needed.

## Examples

Note that the include path may vary depending on the project setup. For instance, within the main site, the templates are accessed via `@tch/` rather than `templates/`.

### Default button

<twig>
{% embed "templates/includes/example-box/example-box.html.twig" with {
  examples: {
    "Twig": '{{ include("templates/components/button/button.html.twig", {
  label: "Default button",
  onclick: "alert(\'Default button clicked.\')",
}) }}',
    "HTML": '<button class="Button" data-component="Button" onclick="alert(\'Default button clicked.\')">
  Default button
</button>',
  },
} %}
  {% block result %}
    {{ include("templates/components/button/button.html.twig", {
      label: "Default button",
      onclick: "alert('Default button clicked.')",
    }) }}
  {% endblock %}
{% endembed %}
</twig>

## Accessibility

## API