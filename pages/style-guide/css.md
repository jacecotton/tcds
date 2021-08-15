## Naming

While naming also applies to markup, the stylesheet should be considered the authoritative owner of naming, therefore guidelines are included here.

* All naming (classes, IDs, custom attributes, variables, etc.) should use `kebab-case` (lowercase, hyphen-separated).
  * One exception to this is the name of components (see [&sect; BEM Classes](#bem-classes)), which should use `PascalCase`.
* Names should be as short as possible, but as long as necessary. For example, `.main-nav` instead of `.main-navigation`, but `.my-button` rather than `.my-btn`.
* Prioritize semantic accuracy; devise classes according to the element's function or purpose, rather than its presentation or position (e.g. `.main-nav`, not `.top-nav`; `.Button--primary`, not `.Button--red`).
* Above all, prioritize clarity and reusability.

### BEM Classes

Use the [BEM convention](https://sparkbox.com/foundry/bem_by_example "BEM by Example - Sparkbox") for naming classes of block-level elements (and their children). For instance, all components and template partials should use BEM classes.

In most cases, try to stick to *one class, zero nesting*. Leverage Sass and BEM together to [control scope and keep specificity low](https://css-tricks.com/using-sass-control-scope-bem-naming/ "Using Sass to Control Scope With BEM Naming - CSS-Tricks").

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
      <p class="Card__text">Lorem ipsum dolor sit amet.</p>
    </div>
  </article>
  ```

  Sass:
  ```scss
  .Card {
    /* base styles go here */

    &--compact {
      /* compact modifier styles go here */
    }

    &__media {
      /* styles for child element goes here */
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

These keeps specificity as low as possible, while still benefitting from implied parent-child relationships between the elements.

## Specificity management

* Avoid all uses of `!important`, except in exceedingly rare circumstances, like when accessibility is implicated.
* Avoid using `#` selectors and compound selectors (`div.class` or `.class-1.class-2`). These selectors have a higher specificity than single classes, and can become difficult to manage at scale.
  * If absolutely necessary, wrap these selectors in a `:where()` pseudo-class function to zero out the specificity.
  * Or in the case of IDs, target them with an attribute selector (`[id=my-id]`), which has the same specificity as a class.
* Avoid descendant selectors where possible, which can increase specificity, negatively impact performance, and create brittle styles tied too closely to the markup. Using BEM can help keep selector depth shallow, while still implying parent-child relationships between elements (see above).

## Nesting

Even with BEM, keep ruleset nesting to a reasonable minimum.

* It can generate unintentionally verbose and high-specificity selectors in the compiled CSS that can be difficult to foresee. Particularly if you nest within a group of selectors—consider using the native `:is()` or `:where()` for grouping parent selectors before nesting.
* It can become difficult to read and organize as the stylesheet grows. In a deeply nested stylesheet, moving blocks of code has to be done with careful regard for placement within the nesting context, which can be easy to break.
* It can become difficult to group related selectors that don't necessarily belong to the same nesting context, potentially leading to duplication or unpredictable code placement.

## Declaration order

* By default or when in doubt, order declarations alphabetically (based on the property name).
* If a group of declarations act in concert to achieve a single effect (e.g. `position: sticky; top: 0`), group them together regardless of alphabetization.
* In doing so, list declarations by order of dependence or relevance. For instance, `align-items` is meaningless apart from flex or grid, so list `display` first.

In sum, while you should generally list declarations alphabetically, it is more important to help those reading your code understand it in a procedrual and logical order, rather than having them jump around the ruleset just to understand the cumulative effect of each declaration.