## Optional equal-height slides

The carousel publishes `--tcds-carousel-slide-max-height` on its host. This is
the largest natural border-box height of its slides, including inactive slides.
It does not apply a slide height by default. Consumers can opt in:

```css
tcds-slide {
  box-sizing: border-box;
  height: var(--tcds-carousel-slide-max-height, auto);
}
```

Measurements update after rendering, light DOM content/attribute changes,
viewport/container width changes, media loads, and font loads. They can shrink
as well as grow, and account for added or removed slides. Explicitly hidden
slides (ordinary `hidden`, rather than `hidden="until-found"`) are excluded.
When the entire carousel has no layout box, its last measurement is retained.

Measurement temporarily overrides slide sizing and content visibility, reads
natural heights, and restores the original inline styles before painting.
