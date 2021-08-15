<lead>
  How you write text content has significant accessibility implications. What type of information you convey, and under what context you provide it, can make the difference between an equitable experience for users with disabilities (medical or situational), and one that's frustrating, excluding, or unusable.
</lead>

## General guidance

**Use clear and simple language**. Avoid verbiage that's overly abstract, lengthy, or technical. Users implicated range from those with cognitive challenges (autism, dyslexia) to situational challenges (time constraints, multitasking).

## Headings

Headings, marked up with `h1` through `h6` elements, help break up and organize sections of content. It is important to include them to allow:

* Sighted users to more efficiently scan a page.
* Visually impaired users, and other users of screen readers, to skip to relevant content and understand the outline of a page.
* Search engine algorithms to more deeply understand a page's content.

Heading elements help *outline* a page's landmark regions (navigation, main content, etc.) They should not be thought of as strictly related to their font size.

* Do not use heading elements purely to change font size or emphasize text. If you need large text that doesn't strictly relate to a web page's outline, use CSS or a corresponding utility class (see [Typography](/design/typography)).
* Inversely, you may sometimes need to use a heading element for its semantic meaning, but reduce its size to fit better within the page's design.
  * Heading elements may even be visually hidden, and strictly use to convey semantic meaning to screen readers and search engines.

### Using `h1`

There should only ever be one `h1` element on a page, and it should contain the current page's name or topic. It should not contain the website name, and it should not be used to simply make the biggest text possible.

### Using `h5` and `h6`

`h5` and `h6` elements should generally not be used. If you find yourself needing them, your content is probably too complicated and should be split up between multiple pages or simplified.

Using them can also make a page's outline too deep, which can be cumbersome for users of assistive technology. When in doubt, the best course of action is to test your page with an actual screen reader.

## `alt` text

The `alt` attribute contains **alternative text** to images. It is used by:

* Screen readers to communicate the meaning of an image to a visually impaired user.
* Search engine algorithms to more deeply understand a page's content.
* The browser to visually display to users when an image fails to load, which affords accessibility to situationally disabled users (poor mobile reception, slow internet speeds).

**All images must have an `alt` attribute.** All images that are not purely decorative must have text in this `alt` attribute. This is not only an accessibility mandate, but an SEO one.

### How to write `alt` text

Alternative text should be a literal description of the image. The goal is to convey the same *visual* information to a visually impaired user as a sighted user would receive by looking at the image. The text should function as a suitable substitute to the image.

Avoid contextual, implied, or subjective information:

> Dr. Smith giving a patient an annual checkup.

Prefer literal, objective, and visual information:

> Woman doctor applying stethoscope to boy patient's chest in a doctor's office.

There is a place for descriptions like the former example: [thumbnail captions](/patterns/image-thumbnails.md). These are marked up with `figcaption` elements, and are visually displayed (usually beneath the image). Their purpose is to provide deeper meaning to the image that places it in context. It should be information given to all users, sighted and visually impaired alike.


* Proper use of headings
  * Don't skip levels
  * One H1 per page only
  * Don't use heading tags just to change font size
* Button labels
  * Sentence case
    * All caps can be difficult to read
  * Clear and simple descriptions of associated functionality