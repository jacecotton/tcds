# Form

`tcds-form` wraps native forms, preserving native validation, submission, and
keyboard interaction. Load `form.js` as a module and `form.css` alongside the
base design-system styles. Drupal loads the component assets through its schema.

Use `variant="display"` for large controls and radio choices styled as buttons.
This replaces `.tcds-form--display`; neither the wrapper nor the native form
needs a `tcds-form` class.

```html
<tcds-form variant="display">
  <form action="/submit" method="post">
    <fieldset>
      <legend>Choose a value</legend>
      <div>
        <input type="radio" name="foo" id="foo-1" value="foo-1">
        <label for="foo-1">Foo 1</label>
      </div>
      <div data-tcds-form="radio-other">
        <input type="radio" name="foo" id="foo-other" value="other">
        <label for="foo-other" class="visually-hidden">Other</label>
        <input type="text" id="foo-other-value" placeholder="Other...">
        <label for="foo-other-value" class="visually-hidden">Other value</label>
      </div>
    </fieldset>
    <button type="submit">Submit</button>
  </form>
</tcds-form>
```

Each `radio-other` group must contain one radio and one text input owned by the
same native form. Keep IDs unique. The radio supplies the submission name; the
text input should have **no name**. Existing named companion inputs are supported
if their names are unique and distinct from all other fields in the form; their
entries are removed during submission. Reserve each radio group name for that
radio group, because the component replaces its submitted entry.

Clicking the text field or entering nonempty text selects its radio. A pointer
click on the radio focuses the text field; keyboard selection keeps focus on the
radio. Tabbing into the text field alone does not select it. The text field is
required only while its enabled radio is selected. Selecting another option
preserves the text for later use. Automatic radio selection emits bubbling
`input` and `change` events.

On native submission or `new FormData(form)`, the selected radio's entry is
replaced with the entered text. The radio's DOM value remains `other`. Disabled
controls are not substituted. Multiple groups/forms, inserted markup, browser
page restoration, and native form resets are supported. Removing the wrapper
restores the text inputs' original `required` attributes.

The `content` Twig slot accepts the entire native form, including Drupal render
arrays. `attributes` applies to the wrapper; native form attributes belong on the
form supplied through the slot.

## Sass icons

```scss
@use "../../scss/abstracts/functions" as *;

select {
  background-image: icon("utility", "caret-down-small", #da2530);
}
```

`icon($category, $name, $color: null)` reads the generated icon token and returns
its CSS `url(...)` value. The optional color replaces every `currentcolor`
occurrence, case-insensitively, and encodes hex hashes as `%23`. Omit the color
to return the original token. Pass a Sass color or literal color string; CSS
variables and the surrounding element's `currentColor` cannot cross into an SVG
background image. Missing category/name combinations produce a Sass error.
