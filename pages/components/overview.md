<lead>
  Components are standardized, reusable elements that help content editors, designers, and developers rapidly prototype and build interfaces.
</lead>

To use a component, copy the example code included in each documentation page, then follow the API for your specific use case. First, make sure you've installed the Design System by following the installation instructions on the [Getting Started](/getting-started#installation) page. Try the [Button](/components/button) as a simple but representative example to get you up to speed.

Note: You can copy either the Twig code (if you have Twig set up, refer to the Getting Started instructions), or the plain HTML code. While the HTML is most convenient because it requires minimal prior setup and can be freely modified, using the Twig code is recommended instead. By using a Twig include, the markup for a component can be updated from one place and reflected everywhere the component is used. Furthermore, it gives a simplified API for making standardized modifications, and can be easier to read at a glance.

All components are designed and coded to meet the Design System's principles and goals as stated on the [Introduction](/) page, as well as the standards specified in the [coding style guide](/style-guide/general). Furthermore, components center the following principles in their development:

* **Maintainability and scalability** — Ease of iteration and routine maintenance is considered from the beginning, from the project's overall architecture to the coding practices employed in each component. The intended result is technical debt that's easy to avoid or pay, as well as requirements that are allowed to change drastically with code that need not.
* **Interoperability** — All components are plug-and-play, working independently of any particular technology stack or environment.

## See also

Different from, but sharing superficial similarities to components are:

* [Patterns](/patterns/overview) — Elements that may be composed of multiple components and other elements, and are not *necessarily* reusable. They are often highly specific to certain content and contexts, such as the [Header](/patterns/header) or [Hero](/patterns/hero).
* [Primitives](/primitives/overview) — Simpler elements than components, the more basic "building blocks" of the web, such as [links](/primtives/links), [headings and paragraphs](/primitives/headings-and-paragraphs). They are documented in the Design System because they have specific styling associated with them, and in some cases guidelines for their use.