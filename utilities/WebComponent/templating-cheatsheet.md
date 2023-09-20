## Twig-to-JavaScript templating cheatsheet
With template literals, standard JavaScript can accomplish any templating tasks Twig can. The important thing to keep in mind is that a JavaScript template is a _string_, so you can only embed _expressions_ which evaluate to strings.

Unlike Twig, you cannot use _statements_ within the template, except where they're allowed within an expression (such as within `Array.map` callback). Statements, like defining and setting variables, should be placed outside the template declaration.

The below is a cheatsheet comparing Twig templating to JavaScript templating. The following JavaScript techniques are not unique or proprietary to the `WebComponent` utility, but are documented here purely for convenience.

## Setting and rendering variables
Twig:
```twig
{% set name = "world" %}

<p>Hello {{ name }}!</p>
```

JavaScript:
```js
let name = "world";

return `
  <p>Hello ${name}!</p>
`;
```

## Conditionals
### Conditional statements
Twig:
```twig
{% if lang == "en" %}
  {% set greeting = "Hello" %}
{% elseif lang == "es" %}
  {% set greeting = "Hola" %}
{% endif %}

<p>{{ greeting }} world!</p>
```

JavaScript:
```js
let greeting;

if(lang == "en") {
  greeting = "Hello";
} else if(lang == "es") {
  greeting = "Hola";
}

return `
  <p>${greeting} world!</p>
`;
```

### Conditional rendering
Twig:
```twig
{% set message = "Hello world!" %}

{% if message %}
  <p>{{ message }}</p>
{% else %}
  <h1>No message :(</h1>
{% endif %}
```

Because we can only use expressions, not statements, for JavaScript we must use a ternary operator interpolated within the string literal:
```js
let message = "Hello world!";

return `
  ${message ? `
    <p>${message}</p>
  ` : `
    <h1>No message :(</h1>
  `}
`;
```

If you do not have an `else` condition, you can place an empty string after the `:` operator. Using a logical `&&` operator is discouraged, because it could potentially evaluate to `undefined` or `false` which would print within the template.

Nested ternaries can be used for `else if` conditions, though it is recommended to avoid this when possible. If your conditionals are complex, consider evaluating them outside the template.

## Iterative rendering
Twig:
```twig
{% set colors = ["red", "green", "blue", "yellow"] %}

<ul>
  {% for color in colors %}
    <li>{{ color }}</li>
  {% endfor %}
</ul>
```

JavaScript:
```js
let colors = ["red", "green", "blue", "yellow"];

return `
  ${colors.map(color => `
    <li>${color}</li>
  `).join("")}
`;
```

Note that because `Array.map` returns an array, you have to `join` that array into a string, which will concatenate each `<li>` item.

## Partials and composition
Twig:
```twig
{# greet.twig #}
<p>{{ greeting }} world!</p>

{# template.twig #}
<h1>My message:</h1>
{{ include("greet.twig", { greeting: "Hello" }) }}
```

Because JavaScript templates are just strings, they can be defined and used anywhere, in any context. They can even be defined as a function accepting arguments for dynamic output, much like a Twig macro or partial:

```js
/* greet.js */
export default data => `
  <p>${data.greeting} world!</p>
`;

/* template.js */
import greet from "greet.js";

export default () => `
  <h1>My message:</h1>
  ${greet({greeting: "Hello"})}
`;
```
