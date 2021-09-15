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

* Have an associated action, like submitting a form or opening a dialog.
* Provide some indication of the action, such as a text label or icon.
* Adhere to and support the overall hierarchy of a page or interface by utilizing scale, color, and proximity.

## Style guide

* **Use specific but simple language.** — Buttons have inherent [interaction cost](https://www.nngroup.com/articles/interaction-cost-definition/ "Interaciton Cost - Nielsen Norman Gorup"); users may be reluctant to click a button if they're not sure about what it will do. Avoid vague and abstract labels like "Click here" or "OK". Prefer explicit labels instead, like "Sign up" or "Confirm choice".
* **Use sentence case** — All-caps text is less efficient to read for sighted users, and some screen readers will spell out all-caps text, letter-by-letter.

When to use this component:

* To control an interface, such as opening a dialog or menu.
* To submit a form.

When not to use this component:

* Avoid using buttons for navigation. Prefer [links](/primitives/links) instead (see [&sect; Semantic buttons vs. links](#semantic-buttons-vs-links)).
* Do not use this component if all you need is a generic HTML `<button>` element for its semantic meaning, without the specific styling and API provided by this component.

## How to use

The following instructions apply to Drupal with Site Studio. For instructions on how to use the Button component in Twig or HTML, see [&sect; Examples](#examples) and [&sect; API](API).

1. While editing a page or component, click the "+" button in the Layout Canvas field.
1. In the side menu that appears, scroll to "Interactive Components".
1. Drag the Button component into the Layout Canvas where desired.
1. Double-click the Button component to edit its fields as needed.

## Examples

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

### Link button

A Button can point to a link, but use caution. Refer to [&sect; Semantic buttons vs. links](#semantic-buttons-vs-links).

<twig>
{% embed "templates/includes/example-box/example-box.html.twig" with {
  examples: {
    "Twig": '{{ include("templates/components/button/button.html.twig", {
  label: "Link button",
  link: "https://texaschildrens.org/"
}) }}',
    "HTML": '<a class="Button" data-component="Button" href="https://texaschildrens.org/">
  Link button
</a>',
  },
} %}
  {% block result %}
    {{ include("templates/components/button/button.html.twig", {
      label: "Link button",
      link: "https://texaschildrens.org/",
    }) }}
  {% endblock %}
{% endembed %}
</twig>

### Sizes

Use smaller or larger buttons to establish a visual hierarchy, simplify the interface, or add emphasis.

<twig>
{% embed "templates/includes/example-box/example-box.html.twig" with {
  examples: {
    "Twig": '{{ include("templates/components/button/button.html.twig", {
  label: "Small button",
  modifiers: ["small"],
}) }}',
    "HTML": '<button class="Button Button--small" data-component="Button">
  Small button
</button>',
  },
} %}
  {% block result %}
    {{ include("templates/components/button/button.html.twig", {
      label: "Small button",
      modifiers: ["small"],
    }) }}
  {% endblock %}
{% endembed %}
</twig>

<twig>
{% embed "templates/includes/example-box/example-box.html.twig" with {
  examples: {
    "Twig": '{{ include("templates/components/button/button.html.twig", {
  label: "Large button",
  modifiers: ["large"],
}) }}',
    "HTML": '<button class="Button Button--large" data-component="Button">
  Large button
</button>',
  },
} %}
  {% block result %}
    {{ include("templates/components/button/button.html.twig", {
      label: "Large button",
      modifiers: ["large"],
    }) }}
  {% endblock %}
{% endembed %}
</twig>

<twig>
{% embed "templates/includes/example-box/example-box.html.twig" with {
  examples: {
    "Twig": '{{ include("templates/components/button/button.html.twig", {
  label: "Full-width button",
  modifiers: ["full-width"],
}) }}',
    "HTML": '<button class="Button Button--full-width" data-component="Button">
  Full-width button
</button>',
  },
} %}
  {% block result %}
    {{ include("templates/components/button/button.html.twig", {
      label: "Full-width button",
      modifiers: ["full-width"],
    }) }}
  {% endblock %}
{% endembed %}
</twig>

### Icons

Use icons as complementary visual aids (see [Icons](/design/icons)).

Button icons should be left-aligned (default) when:

* Used purely as a decorative aid (e.g. check for success).
* Used to indicate the performance of a regressive or destructive action (e.g. left arrow for back, x for cancel).

<twig>
{% embed "templates/includes/example-box/example-box.html.twig" with {
  examples: {
    "Twig": '{{ include("templates/components/button/button.html.twig", {
  label: "Open information",
  icon: "info",
}) }}',
    "HTML": '<button class="Button" data-component="Button">
  <!-- Icon code copied from src/tcds/icons/info.svg -->
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="square" stroke-linejoin="arcs">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 16v-4m0-4h0"/>
  </svg>\n
  Open information
</button>',
  },
} %}
  {% block result %}
    {{ include("templates/components/button/button.html.twig", {
      label: "Open information",
      icon: "info",
    }) }}
  {% endblock %}
{% endembed %}
</twig>

Button icons should be right-aligned when:

* Used to indicate the performance of a progressive action (e.g. right arrow for proceed, down arrow for dropdown).

<twig>
{% embed "templates/includes/example-box/example-box.html.twig" with {
  examples: {
    "Twig": '{{ include("templates/components/button/button.html.twig", {
  label: "Next",
  icon: "chevron-right",
  modifiers: ["icon-right"],
}) }}',
    "HTML": '<button class="Button Button--icon-right" data-component="Button">
  <!-- Icon code copied from src/tcds/icons/chevron-right.svg -->
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.7 17.7" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="square">
    <path d="M2.8,14.8l6-6l-6-6"/>
  </svg>\n
  Next
</button>',
  },
} %}
  {% block result %}
    {{ include("templates/components/button/button.html.twig", {
      label: "Next",
      icon: "chevron-right",
      modifiers: ["icon-right"],
    }) }}
  {% endblock %}
{% endembed %}
</twig>

To conserve space, icons can be used without text. However, a label should still be provided, as it will be used for the screen reader-accessible `aria-label` attribute, and the `title` attribute to surface the text on-hover.

<twig>
{% embed "templates/includes/example-box/example-box.html.twig" with {
  examples: {
    "Twig": '{{ include("templates/components/button/button.html.twig", {
  label: "Close",
  icon: "x",
  modifiers: ["icon-only"],
}) }}',
    "HTML": '<button class="Button Button--icon-only" data-component="Button" aria-label="Close" title="Close">
  <!-- Icon code copied from src/tcds/icons/x.svg -->
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="square" stroke-linejoin="arcs">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
</button>',
  },
} %}
  {% block result %}
    {{ include("templates/components/button/button.html.twig", {
      label: "Close",
      icon: "x",
      modifiers: ["icon-only"],
    }) }}
  {% endblock %}
{% endembed %}
</twig>

For icon-only buttons that control the interface (such as a close button for a dialog or hamburger button for a menu), the round and ghost modifiers work well:

<twig>
{% embed "templates/includes/example-box/example-box.html.twig" with {
  examples: {
    "Twig": '{{ include("templates/components/button/button.html.twig", {
  label: "Close",
  icon: "x",
  modifiers: ["icon-only", "round", "ghost"],
}) }}',
    "HTML": '<button class="Button Button--icon-only Button--round Button--ghost" data-component="Button" aria-label="Close" title="Close">
  <!-- Icon code copied from src/tcds/icons/x.svg -->
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="square" stroke-linejoin="arcs">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
</button>',
  },
} %}
  {% block result %}
    {{ include("templates/components/button/button.html.twig", {
      label: "Close",
      icon: "x",
      modifiers: ["icon-only", "round", "ghost"],
    }) }}
  {% endblock %}
{% endembed %}
</twig>

### Color

Button colors can be changed by adding utility classes to the `custom_classes` prop. See [Color](/design/color) for a full list of utility classes.

<twig>
{% embed "templates/includes/example-box/example-box.html.twig" with {
  examples: {
    "Twig": '{{ include("templates/components/button/button.html.twig", {
  label: "Secondary button",
  custom_classes: ["bg-secondary"],
}) }}\n
{{ include("templates/components/button/button.html.twig", {
  label: "Neutral button",
  custom_classes: ["bg-neutral"],
}) }}',
    "HTML": '<button class="Button bg-secondary" data-component="Button">
  Secondary button
</button>\n
<button class="Button bg-neutral" data-component="Button">
  Neutral button
</button>',
  },
} %}
  {% block result %}
    {{ include("templates/components/button/button.html.twig", {
      label: "Secondary button",
      custom_classes: ["bg-secondary"],
    }) }}
    {{ include("templates/components/button/button.html.twig", {
      label: "Neutral button",
      custom_classes: ["bg-neutral"],
    }) }}
  {% endblock %}
{% endembed %}
</twig>

## Accessibility

### Semantic buttons vs. links

**Buttons**, marked up with the `<button>` element, are used to trigger on-page actions and submit forms. **Links**, marked up with the `<a>` element, are used to navigate a user to a new page (or elsewhere on the current page).

Generally, links should look like links, and buttons should look like buttons. Links that look like buttons, although a common practice, should be avoided where possible, as it can cause confusion for users of assistive technology that depend on the correspondance between semantics, functionality, and appearance.

If a design simply calls for a link that looks like a button, this may be done with the [`link` property](#link). If this cannot be avoided, use language that unambiguously communicates what the link button will do when clicked.

### Touch target size

By default, the stylesheet for this component does not allow buttons to scale lower than a minimum touch target size on either axis. This is still mentioned here regardless as a cautionary note.

Having a sufficient touch target size increases general usability for all users, but most notably accomodates users with motor function and visual impairments.

### Icon-only buttons

Always provide a text label for buttons that only have icons. This text label will not be visible if the [`icon-only` modifier](#modifiers) is used, but instead used as the `aria-label` for assistive tools, as well as for the tooltip for users of pointer devices.

Where permitted by the available screen space, try to always provide a visible text label. Buttons with only icons can sometimes be ambiguous, and their meaning may not be clear to users of different ages, cultural backgrounds, and cognitive abilities.

## API

<twig>
{% set properties = {
  specific: [
    {
      name: "label",
      value: "—",
      type: "string",
      description: "The text label of the button. If <code>icon-only</code>, this is used as the button's accessible <code>aria-label</code>.",
      required: "yes",
    },
    {
      name: "type",
      value: "<ul>
        <li><code>button</code> (default)</li>
        <li><code>submit</code></li>
        <li><code>reset</code></li>
        <li><code>file</code></li>
      </ul>",
      type: "string",
      description: "The <a href='https://www.w3.org/TR/2011/WD-html5-20110525/the-button-element.html#attr-button-type' title='4.10.8 The button element - W3C.org'>HTML button type</a>.",
      required: "no",
    },
    {
      name: "role",
      value: "<ul>
        <li><code>standard</code> (default)</li>
        <li><code>primary</code></li>
        <li><code>secondary</code></li>
      </ul>",
      type: "string",
      description: "The role of the button in the overall interface.",
      required: "no",
    },
    {
      name: "link",
      value: "—",
      type: "string",
      description: "The URL or path the button should point to.",
      required: "no",
    },
    {
      name: "disabled",
      value: "<ul>
        <li><code>true</code></li>
        <li><code>false</code> (default)</li>
      </ul>",
      type: "boolean",
      description: "Disables the button's functionality, and adds appropriate visual styling.",
      required: "no",
    },
    {
      name: "tooltip",
      value: "—",
      type: "string",
      description: "A tooltip to display when the button is hovered on. This may be helpful to provide additional instruction or context.",
      required: "no",
    },
    {
      name: "icon",
      value: "See <a href='/design/icons'>icon system</a>",
      type: "string",
      description: "The icon slug (e.g. <code>check</code>, <code>arrow-right</code>) to add to the left side of the button (or, combine with a <a href='#modifiers'>modifier</a> of <code>icon-right</code> to add the icon to the right).",
      required: "no",
    },
  ],
  global: [
    {
      name: "modifiers",
      value: "<ul>
        <li><code>small</code></li>
        <li><code>large</code></li>
        <li><code>icon-right</code></li>
      </ul>",
      type: "array",
      description: "Modifiers specific to the button component.",
      required: "no",
    },
    {
      name: "custom_classes",
      value: "—",
      type: "array",
      description: "Custom classes to add to the component's root element. This may be useful for adding global utilities or custom modifiers.",
      required: "no",
    },
    {
      name: "custom_attributes",
      value: "—",
      type: "array",
      description: "Custom attributes to add to the component's root element. This may be useful for adding custom JavaScript hooks.",
      required: "no",
    },
  ],
} %}
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Value</th>
      <th>Type</th>
      <th>Description</th>
      <th>Required?</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th colspan="5">Component-specific properties</th>
    </tr>
    {% for prop in properties.specific %}
      <tr id="{{ prop.name }}">
        <td><code>{{ prop.name }}</code></td>
        <td>{{ prop.value|raw }}</td>
        <td><code>{{ prop.type }}</code></td>
        <td>{{ prop.description|raw }}</td>
        <td>{{ prop.required }}</td>
      </tr>
    {% endfor %}
    <tr>
      <th colspan="5">Global properties</th>
    </tr>
    {% for prop in properties.global %}
      <tr id="{{ prop.name }}">
        <td><code>{{ prop.name }}</code></td>
        <td>{{ prop.value|raw }}</td>
        <td><code>{{ prop.type }}</code></td>
        <td>{{ prop.description|raw }}</td>
        <td>{{ prop.required }}</td>
      </tr>
    {% endfor %}
  </tbody>
</table>
</twig>