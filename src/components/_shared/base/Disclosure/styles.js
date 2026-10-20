import {css} from "lit";

/**
 * A Disclosure is either an accordion section or tab component, indicated by
 * custom states.
 *
 * This stylesheet contains global styles, plain styles, and accordion styles
 * because tabs can become accordions responsively, so accordion styles apply to
 * both `<tcds-accordion-section>` and `<tcds-tab>` when the `mode` is
 * `accordion`.
 */

export default css`
  :host {
  }

  :host(:not([hidden])) {
    display: block;
  }

  /**
   * In tabs mode the group's tablist supplies the label, so the author's
   * heading is suppressed here to keep it from being announced twice.
   */
  :host(:state(tabs)) slot[name=title] {
    display: none;
  }

  /* The panel uses hidden=until-found. Keep its host laid out so browser
   * search can reveal the content of an inactive tab. */

  :host(:state(accordion)) [part=heading] {
    border-bottom: 1px solid var(--tcds-color-theme-edge);
    transition-property: background-color, border-color;
    transition-duration: var(--tcds-motion-duration-productive);
    transition-timing-function: var(--tcds-motion-easing-enter);
  }

  :host(:state(accordion):state(expanded)) [part=heading] {
    border-color: transparent;
    background-color: var(--tcds-color-theme-surface);
  }

  [part=trigger] {
    appearance: none;
    background-color: transparent;
    border: 0;
  }

  :host(:state(accordion)) [part=trigger] {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: var(--tcds-space-component-lg);
    font-family: var(--tcds-font-family-ui);
    font-weight: var(--tcds-font-weight-ui);
    font-size: var(--tcds-font-size-2xl);
    line-height: var(--tcds-line-height-normal);
    text-align: left;
    color: var(--tcds-color-theme-text-primary);
    cursor: pointer;
  }

  :host(:state(accordion)) [part=marker] {
    flex: none;
    font-size: var(--tcds-font-size-md);
  }

  :host(:state(accordion):state(expanded)) [part=marker] {
    color: var(--tcds-color-theme-accent);
  }

  [part=panel]:focus-visible {
    outline: 2px solid currentcolor;
    outline-offset: 2px;
  }

  :host(:state(accordion)) [part=panel] {
    overflow: hidden;
    box-shadow: 0;
    transition-property: background-color, box-shadow;
    transition-duration: var(--tcds-motion-duration-productive);
    transition-timing-function: var(--tcds-motion-easing-enter);
  }

  :host(:state(accordion):state(expanded)) [part=panel] {
    background-color: var(--tcds-color-theme-surface);
    box-shadow: inset 0 -4px 0 var(--tcds-color-theme-accent);
  }

  :host(:state(plain)) [part=content] {
    padding-block-start: 0;
  }

  :host(:state(accordion)) [part=content] {
    padding-inline: var(--tcds-space-component-xl);
    padding-block: var(--tcds-space-component-md) var(--tcds-space-component-xl);
  }
`;
