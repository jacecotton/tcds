<lead>
  Texas Children's Web Design System (TCDS) is a centralized library of resources to help create high-quality digital properties for the web.
</lead>

## Explore

<twig>
  {% set contents = [
    {
      title: "Design Resources",
      subtitle: "Guidelines and reference material for designs.",
    },
    {
      title: "Components",
      subtitle: "Code and documentation for reusable interface elements.",
    },
    {
      title: "Patterns",
      subtitle: "Templates and documentation for common design patterns.",
    },
    {
      title: "Primitives",
      subtitle: "Documentation and guidance for HTML building blocks.",
    },
    {
      title: "Content",
      subtitle: "Guidelines on writing content for the web.",
    },
    {
      title: "Code Reference",
      subtitle: "Documentation for the TCDS code base.",
    },
    {
      title: "Style Guide",
      subtitle: "Guidelines on writing code within the TCDS and across TCH.",
    },
  ] %}

  <ul class="row">
    {% for item in contents %}
      <li>
        {{ include("templates/components/tile/tile.html.twig", {
          title: item.title,
          subtitle: item.subtitle,
        }) }}
      </li>
    {% endfor %}
  </ul>
</twig>

## Principles

* Consistent
* Intuitive
* Standardized
  * Accessibility
  * Performance
* Adaptable

## Goals

* Improve user experience
* Increase productivity
  * Make it faster and easier to prototype, iterate, and deploy with confidence