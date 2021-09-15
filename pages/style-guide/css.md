<lead>
  This style guide should inform how to write, structure, and organize CSS. It documents all consistently used conventions and rules of thumb across the codebase, and can help with both creating styles and grokking existing ones.
</lead>

## Naming

While naming also applies to markup, the stylesheet should be considered the authoritative owner of naming, therefore guidelines are included here.

* All naming (classes, IDs, custom attributes, variables, etc.) should use `kebab-case` (lowercase, hyphen-separated).
  * One exception to this is the name of components (see [&sect; BEM Classes](#bem-classes)), which should use `PascalCase`.
* Names should be as short as possible, but as long as necessary. For example, `.main-nav` instead of `.main-navigation`, but `.my-button` rather than `.my-btn`.

### Semantic vs. functional

Name classes based on the design pattern followed, then the function or purpose. It is best for a design mockup to prescribe the naming of elements, keeping them generic (i.e. content-agnostic), reusable, and consistent. Class names should then be modeled on that established, documented terminology.

Avoid naming classes based on an element's appearance ("functional" naming) or content ("semantic" naming). This can create class names that are too dependent on the markup or content, which can violate a clear separation of concerns or reduce reusability, respectively.

<details>
  <summary>Examples</summary>
  <twig>
    {{ include("templates/includes/comparison-box/comparison-box.html.twig", {
      examples: {
        "Avoid": [
          {
            content: "Semantic naming is too specific to the content and not reusable.",
            code: {
              lang: "html",
              content: '<div class="doctor-info">
  <img src="dr-smith.jpg" alt="Dr. Smith" class="doctor-info__portrait">
  <h3 class="doctor-info__name">Dr. John Smith</h3>
  ...
</div>'
            },
          },
          {
            content: "Functional naming is too specific to the markup and violates separation of concerns.",
            code: {
              lang: "html",
              content: '<div class="bg-white rounded shadow-md p-4 text-base">
  <img src="dr-smith.jpg" alt="Dr. Smith" class="w-full mb-4">
  <h3 class="text-lg text-gray-500 mb-4">Dr. John Smith</h3>
  ...
</div>',
            },
          },
        ],
        "Prefer": {
          content: "Names based on established design patterns are reusable and do not prescribe a particular appearance, markup structure, or content.",
          code: {
            lang: "html",
            content: '<div class="Card">
  <img src="dr-smith.jpg" alt="Dr. Smith" class="Card__media">
  <h3 class="Card__title">Dr. John Smith</h3>
  ...
</div>',
          },
        },
      },
    }) }}
  </twig>
</details>

There are some exceptions. Semantic naming may be acceptable if the design pattern is intrinsically related to a certain set or type of content. In these instances, avoiding any reference to content in the class name is not required. However, still aim to be as generic and reusable as possible. For instance, in the above example, the more generic alternatives to `portrait` and `name`, which imply a person as the subject, are `media` and `title`, which imply only the *type* of content rather than a subject.

Functional classes (aka utilities, helpers, or tokens) are acceptable while writing and marking up text content, or constructing one-off pages. They should mainly be avoided within components, page templates, and partials (i.e. anything that's reused or systematized).

### BEM convention

Use the [BEM convention](https://sparkbox.com/foundry/bem_by_example "BEM by Example - Sparkbox") for naming classes of most block-level elements (and their children), particularly components, templates, and partials.

When possible, stick to the "one class, zero nesting" principle. Leverage Sass and BEM together to [control scope and keep specificity low](https://css-tricks.com/using-sass-control-scope-bem-naming/ "Using Sass to Control Scope With BEM Naming - CSS-Tricks").

<details>
  <summary>Example</summary>

  HTML:
  ```html
  <article class="Card Card--compact">
    <figure class="Card__media">
      <img src="example.jpg" alt="Example" class="Card__image">
    </figure>
    <div class="Card__body">
      <h3 class="Card__title">My card</h3>
      <p class="Card__copy">Lorem ipsum dolor sit amet.</p>
    </div>
  </article>
  ```

  Sass:
  ```scss
  .Card {
    /* base styles go here */

    &--compact {
      /* "compact" modifier styles go here */
    }

    &__media {
      /* "media" child element styles go here */
    }
  }
  ```

  Compiled CSS:
  ```css
  .Card {
    /* base styles */
  }

  .Card--compact {
    /* modifier styles */
  }

  .Card__media {
    /* child element styles */
  }
  ```
</details>

This keeps specificity as low as possible, while still benefitting from implied parent-child relationships between the elements.

## Specificity management

The general goal with specificity management is to always keep it as low as possible. Higher specificity styles can become difficult to manage and keep track of, especially as a project scales.

* Avoid using `!important`.
* Generally avoid using `#` selectors and compound selectors (`div.class` or `.class-1.class-2`). These selectors have a higher specificity than single classes.
  * If absolutely necessary, wrap these selectors in a `:where()` pseudo-class function to zero out the specificity.
  * Or in the case of IDs, target them with an attribute selector (`[id=my-id]`), which has the same specificity as a class.
* Avoid descendant selectors where possible, which can increase specificity, impact performance (albeit negligibly), and create brittle styles too dependent on the markup. Using BEM can help keep selector depth shallow, while still implying parent-child relationships between elements (see above).

## Nesting

Even with BEM, keep ruleset nesting to a reasonable minimum.

* It can generate unintentionally verbose and high-specificity selectors in the compiled CSS that can be difficult to foresee, particularly if you nest inside a group selector ruleset. Consider using the native `:is()` or `:where()` for grouping parent selectors before nesting.
* It can become difficult to read and organize as the stylesheet grows. In a deeply nested stylesheet, moving blocks of code has to be done with careful regard for placement within the nesting context, which can be easy to break.
* It can become difficult to group related selectors that don't necessarily belong to the same nesting context, potentially leading to duplication or inconsistent code placement.

## Declaration order

By default or when in doubt, order declarations alphabetically (based on the property name).

If a group of declarations act in concert to achieve a single effect (e.g. `position: sticky; top: 0`), group them together regardless of alphabetization. In doing so, list declarations by order of dependence or relevance. For instance, `align-items` is meaningless apart from a flexbox or grid container, so list `display` first.

In sum, while you should generally list declarations alphabetically, it is more important to help those reading your code understand it in a procedural and logical order, rather than having them jump around the ruleset just to understand the cumulative effect of each declaration.

## Commenting

## Syntax formatting

* Use one colon for pseudo-classes (`:hover`) and two for pseudo-elements (`::before`).