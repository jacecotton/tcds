## Typeface

TCDS uses the [Roboto](https://fonts.google.com/specimen/Roboto) specimen from [Google Fonts](https://fonts.google.com/).

## Type scale

TCDS uses a modular type scale based on a baseline text size of 1 rem (= 16 pixels) and a ratio of 1.25. The resulting sizes larger than the baseline are calculated as <span class="font-slab">1 rem &times; 1.25<sup>n</sup></span> where <span class="font-slab">n = 1..4</span>.

<table class="type-scale-table">
  <thead class="visually-hidden">
    <tr>
      <th>Example</th>
      <th>Font and token</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <div>
          <p class="text-large-4" title="The quick brown fox jumped over the lazy dog">The quick brown fox jumped over the lazy dog</p>
        </div>
      </td>
      <td>
        ~2.44 rem (≈ 39 px)<br>
        <code>.text-large-4</code>
      </td>
    </tr>
    <tr>
      <td>
        <div>
          <p class="text-large-3" title="The quick brown fox jumped over the lazy dog">The quick brown fox jumped over the lazy dog</p>
        </div>
      </td>
      <td>
        ~1.95 rem (≈ 31.2 px)<br>
        <code>.text-large-3</code>
      </td>
    </tr>
    <tr>
      <td>
        <div>
          <p class="text-large-2" title="The quick brown fox jumped over the lazy dog">The quick brown fox jumped over the lazy dog</p>
        </div>
      </td>
      <td>
        ~1.56rem (≈ 25 px)<br>
        <code>.text-large-2</code>
      </td>
    </tr>
    <tr>
      <td>
        <div>
          <p class="text-large-1" title="The quick brown fox jumped over the lazy dog">The quick brown fox jumped over the lazy dog</p>
        </div>
      </td>
      <td>
        1.25 rem (= 20 px)<br>
        <code>.text-large-1</code>
      </td>
    </tr>
    <tr>
      <td>
        <div>
          <p class="text-medium" title="The quick brown fox jumped over the lazy dog">The quick brown fox jumped over the lazy dog</p>
        </div>
      </td>
      <td>
        1 rem (= 16 px)<br>
        <code>.text-medium</code>
      </td>
    </tr>
    <tr>
      <td>
        <div>
          <p class="text-small" title="The quick brown fox jumped over the lazy dog">The quick brown fox jumped over the lazy dog</p>
        </div>
      </td>
      <td>
        0.9 rem (= 14.4 px)<br>
        <code>.text-small</code>
      </td>
    </tr>
    <tr>
      <td>
        <div>
          <p class="text-min" title="The quick brown fox jumped over the lazy dog">The quick brown fox jumped over the lazy dog</p>
        </div>
      </td>
      <td>
        0.8 rem (= 12.8 px)<br>
        <code>.text-min</code>
      </td>
    </tr>
  </tbody>
</table>

## Headings

Heading styles map to the above type scale, with some extra specifications.

All headings have a 1 rem/16 pixel top and bottom spacing. If the heading does not directly follow another heading, it will have a top spacing of 2.5 rem/40 pixels.

<aside>
<details>
  <summary>Technical note</summary>
    
  If a heading HTML tag has a `class` attribute, then no spacing is applied. Heading elements need to also be usable across the code base for their semantic meaning rather than visual styling, and a `class` attribute indicates specific usage (such as in a component) beyond their default, generic purpose (sectioning main content). This is done to make styling individual components easier and more interoperable.
  
  If both the default spacing and a `class` attribute is needed, then a utility class corresponding to the tag name can be added (e.g. `<h1 class="example h1">`). These utility classes (`.h1` through `.h6`) can be added to any element to achieve the visual styling of their indicated heading without the semantic meaning, as exemplified below (the example headings are just `p` tags).
</details>
</aside>

<p class="h1">Heading 1 <span class="visually-hidden">has a</span></p>

700 font weight (bold), secondary theme color (blue), letter spacing -0.02 em.

<p class="h2">Heading 2 <span class="visually-hidden">has a</span></p>

500 font weight (semi-bold), gray 6 color (see [Color](/design/color)).

<p class="h3">Heading 3 <span class="visually-hidden">has a</span></p>

500 font weight (semi-bold), gray 6 color.

<p class="h4">Heading 4 <span class="visually-hidden">has a</span></p>

500 font weight (semi-bold), gray 6 color.

<p class="h5">Heading 5 <span class="visually-hidden">has a</span></p>

500 font weight (semi-bold), gray 6 color.

<p class="h6">Heading 6 <span class="visually-hidden">has a</span></p>

500 font weight (semi-bold), gray 6 color.