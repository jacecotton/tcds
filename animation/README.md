## Animation system
Texas Children's Design System provides a [WAAPI](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Web_Animations_API_Concepts)-based animation system.

### config.json
The `config.json` file contains two objects: `timing` and `library`. These objects and their properties can be accessed by importing the `config.json` file within JavaScript. They are also the basis from which custom properties and keyframe sets are generated in CSS.

`timing` contains duration and easing presets, named `productive` and `expressive`. Productive animations are snappy and responsive, best suited for animating *productive* behavior and transitions. Expressive animations are natural and smooth, best suited for decorative animation.

`library` contains [Keyframe Format objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats) for use with the [`Element.animate` method](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate). Refer to the [documentation site](https://tcds-site.onrender.com/design/animation) for details about the animation library.

### How to use
#### JavaScript
Animation names are `kebab-case`, therefore the corresponding properties of the `library` object will need to be accessed using square bracket notation.

```js
import animation from "@txch/tcds/animation/config.json";

element.animate(animation.library["fade-in"], {
  duration: animation.timing.productive.duration,
  easing: animation.timing.productive.easing,
}).onfinish = () => console.log("animation complete");
```

#### CSS
In CSS, keyframe sets (prefixed with `tcds-animation`) have been generated from the `library` object, and custom properties (prefixed with `--tcds-animation`) have been generated from the `timing` object.

```js
.element {
  animation: tcds-animation-fade-in
    var(--tcds-animation-productive-duration)
    var(--tcds-animation-productive-easing);
}
```

#### Sass
If you want to generate your own CSS from the `config.json` file using Sass, you can `@use` it as a map. To do so, as well as to compile the Design System yourself, you will need to install and use [`node-sass-json-importer`](https://www.npmjs.com/package/node-sass-json-importer) in your Sass setup (disregard the `node-sass` designation, as it also works with Dart Sass).

```scss
@use "~@txch/tcds/animation/config.json" as *;

@debug $timing; // => (productive, expressive)
@debug $library; // => (fade-in, fade-out, ...)
```

### Notes
This system is designed for simple animation needs only. More complicated animations (composition, multiple offsets, easing changes, dynamic calculations, etc.) should be custom-crafted using browser-native WAAPI components.

Furthemore, it may not always be appropriate to use an animation preset. Per our [animation guidelines](https://tcds-site.onrender.com/design/animation), especially for animating large elements on-screen, it may be better to break consistency and use a tailor-made animation.
