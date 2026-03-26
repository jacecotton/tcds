---
title: Motion
description: Motion provides feedback, guides focus, and communicates spatial relationships. It should feel responsive and purposeful, imparting dimensionality and personality while staying out of the way of the user.
eleventyNavigation:
  key: Motion
  parent: Identity
  order: 5
---

{% embed "tcds:tabs" with {
  heading_level: "h2",
  tabs: [
    {
      title: "Designers",
      content: "designers",
    },
    {
      title: "Editors",
      content: "editors",
    },
    {
      title: "Developers",
      content: "developers",
    }
  ],
} %}
{% block designers %}

### Best practices
**Use as an enhancement, not requirement.** Before using animations, ensure the design is effective and the content is perceivable without it. Then, use it as a [progressive enhancement](https://www.smashingmagazine.com/2009/04/progressive-enhancement-what-it-is-and-how-to-use-it/ "Progressive Enhancement: What It Is, And How To Use It? — Smashing Magazine").

**Strive for meaningfulness and credibility.** Avoid unnecessary, complex, or lengthy animations. When designing with motion, ensure consistency with comparable experiences to ensure credibility.

#### When to use
**Draw attention and direct focus.** Motion attracts the eye and can help overcome [change blindness](https://www.nngroup.com/articles/change-blindness-definition/ "Change Blindness in UX — Nielsen Norman Group") and [tunnel vision](https://www.nngroup.com/articles/tunnel-vision-and-selective-attention/) in users.

**Establish and convey relationships.** Animation can hint towards and reinforce cause-and-effect relationships between elements and events or behaviors.

#### When not to use
**User has indicated reduced motion preference.** Respect user preferences by disabling animations or providing alternatives with reduced activity. See [&sect; Accessibility](#accessibility).

**Lack of contextual meaning or clear purpose.** Do not use animation for the sake of it; rather, use it to meaningfully improve the user experience.

### Timing
#### Easing
Easing curves, or timing functions, control how motion accelerates and decelerates. The Design System provides three options.

{{ include("./_includes/easing.twig", {tokens: tokens}) }}

**Use the translate curve (*ease-in-out*) for sliding elements.** Elements that remain visible throughout an animation should use symmetrical acceleration and deceleration, which feels most natural for continuous movement.

**Use the enter curve (*ease-out*) for revealing elements.** Elements that appear on screen from an invisible state (collapsed accordions, transparent backgrounds, off-screen modals) should decelerate into their final position, settling smoothly into place.

**Use the exit curve (*ease-in*) for disappearing elements.** Elements that leave the screen (closing menus, dismissed modals) should accelerate away, clearing the view quickly.

**Avoid linear easing.** Linear motion looks mechanical and unnatural. Always apply one of the above curves.

#### Duration
Duration determines how long a motion takes. The Design System provides two semantic durations.

{{ include("./_includes/duration.twig", {tokens: tokens}) }}

**Use productive duration ({{ tokens.motion.duration.productive["$value"] }}) for utility motion.** Micro-interactions, like hover and other state changes, should feel instantaneous. The interface should feel especially snappy when a user is performing a task.

**Use expressive duration ({{ tokens.motion.duration.expressive["$value"] }}) for orienting and attention-drawing motion.** Motion for page transitions, modal entrances, or accordion expansions can take more time because they orient the user spatially or draw attention to an important change.

### Animations
The Design System provides a library of reusable keyframe animations for common entrance, exit, and emphasis patterns.

{{ include("./_includes/animations.twig", {tokens: tokens}) }}

**Pair entrances with matching exits.** If an element slides in from the left, it should slide out to the left. If it fades in, it should fade out. Mismatched transitions break the spatial model.

**Combine animations for richer effects.** A modal might use `fade-in` together with `slide-in-up` for a smooth, layered entrance. Keep combinations simple—two animations is usually sufficient.

**Use the spin animation only for loading icons.**

{% endblock %}
{% block editors %}

### Content motion
Motion is handled automatically by components. Editors usually do not need to configure animations directly. New motion requirements can be requested from the design and development team.

{% endblock %}
{% block developers %}

### Easing
| Token | CSS custom property | JavaScript constant | Value |
| ----- | ------------------- | ------------------- | ----- |
{% for curve, value in tokens.motion.easing %}
{% if curve != "$type" %}
| `motion.easing.{{ curve }}` | `--tcds-motion-easing-{{ curve }}` | `MotionEasing{{ curve|capitalize }}` | `cubic-bezier({{ value["$value"]|join(", ") }})` |
{% endif %}
{% endfor %}

`easing` in JavaScript, `animation-timing-function` in CSS.

### Duration
| Token | CSS custom property | JavaScript constant | Value |
| ----- | ------------------- | ------------------- | ----- |
{% for name, value in tokens.motion.duration %}
{% if name != "$type" %}
| `motion.duration.{{ name }}` | `--tcds-motion-duration-{{ name }}` | `MotionDuration{{ name|capitalize }}` | `{{ value["$value"] }}` |
{% endif %}
{% endfor %}

### Animations
Keyframe animation names for use in the `animation-name` CSS property or the Web Animations API.

| Token | CSS `@keyframes` name | JavaScript constant | Description |
| ----- | --------------------- | ------------------- | ----------- |
{% for name, value in tokens.animation %}
| `animation.{{ name }}` | `tcds-animation-{{ name }}` | `Animation{{ name|split("-")|map(v => v|capitalize)|join }}` | {{ value["$description"] }} |
{% endfor %}

#### CSS usage
{% set css_snippet %}
.element {
  animation:
    tcds-animation-fade-in var(--tcds-motion-duration-expressive) var(--tcds-motion-easing-enter) both,
    tcds-animation-slide-in-up var(--tcds-motion-duration-expressive) var(--tcds-motion-easing-enter) both;
}{% endset %}
<pre class="example__code"><code>{{ css_snippet|highlight }}</code></pre>

#### JavaScript usage
{% set js_snippet %}
element.animate([AnimationFadeIn, AnimationSlideInUp], {
  duration: MotionDurationExpressive,
  easing: MotionEasingEnter,
  fill: "both",
});{% endset %}
<pre class="example__code"><code>{{ js_snippet|highlight }}</code></pre>

#### Tips
**Always set `animation-fill-mode: both` (or `forwards`).** Without a fill mode, the element snaps back to its pre-animation state when the animation completes. Setting `both` ensures the element retains the final keyframe's styles.

**Respect `prefers-reduced-motion`.** Disable or shorten animations for users who have requested reduced motion. The Design System's stylesheet handles this globally, but if you're applying animations in JavaScript, check the media query:

{% set reduced_motion_snippet %}
const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;{% endset %}
<pre class="example__code"><code>{{ reduced_motion_snippet|highlight }}</code></pre>

{% endblock %}
{% endembed %}

<!--
https://www.designsystems.com/5-steps-for-including-motion-design-in-your-system/
https://xd.adobe.com/ideas/wp-content/uploads/2021/06/Animation-in-Design-Systems.pdf
https://www.smashingmagazine.com/2019/02/animation-design-system/
https://www.invisionapp.com/inside-design/motion-design-systems/
https://medium.com/@aviadtend/motion-design-system-practical-guide-8c15599262fe

https://ant.design/docs/spec/motion
https://material.io/design/motion/understanding-motion.html#principles
https://www.carbondesignsystem.com/guidelines/motion/overview/
https://www.ibm.com/design/language/animation/overview/
https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/animation/
https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/animation/
https://developer.microsoft.com/en-us/fluentui#/styles/web/motion
https://design.gitlab.com/product-foundations/motion
https://www.audi.com/ci/en/guides/user-interface/ui-animation/response-effect.html
-->
