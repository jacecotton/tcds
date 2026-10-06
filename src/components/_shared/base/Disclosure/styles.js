import {css} from "lit";

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

  /**
   * The panel is the tabpanel; hiding the host removes it from layout, the tab
   * order, and the accessibility tree in one move.
   */
  :host(:state(tabs):not(:state(expanded))) {
    display: none;
  }

  :host(:state(expanded)) {
  }

  [part=heading] {
    border-bottom: 1px solid var(--tcds-color-theme-edge);
    transition-property: background-color, border-color;
    transition-duration: var(--tcds-motion-duration-productive);
    transition-timing-function: var(--tcds-motion-easing-enter);
  }

  :host(:state(expanded)) [part=heading] {
    border-color: transparent;
    background-color: var(--tcds-color-theme-surface);
  }

  [part=trigger] {
    appearance: none;
    background-color: transparent;
    border: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: var(--tcds-space-8) var(--tcds-space-component-lg);
    font-family: var(--tcds-font-family-ui);
    font-weight: var(--tcds-font-weight-ui);
    font-size: var(--tcds-font-size-2xl);
    color: var(--tcds-color-theme-text-primary);
    cursor: pointer;
  }

  [part=marker] {
    flex-shrink: 0;
    font-size: var(--tcds-font-size-md);
  }

  :host(:state(expanded)) [part=marker] {
    color: var(--tcds-color-theme-accent);
  }

  [part=marker] {
    flex: none;
  }

  /**
   * Required for the height animation to clip. The panel is set back to
   * 'height: auto' once open, so this only bites during the transition.
   */
  [part=panel] {
    overflow: hidden;
    box-shadow: 0;
    transition-property: background-color, box-shadow;
    transition-duration: var(--tcds-motion-duration-productive);
    transition-timing-function: var(--tcds-motion-easing-enter);
  }

  :host(:state(expanded)) [part=panel] {
    background-color: var(--tcds-color-theme-surface);
    box-shadow: inset 0 -4px 0 var(--tcds-color-theme-accent);
  }

  [part=panel]:focus-visible {
    outline: 2px solid currentcolor;
    outline-offset: 2px;
  }

  [part=content] {
    padding-inline: var(--tcds-space-component-xl);
  }

  :host(:state(plain)) [part=content] {
    padding-block-start: 0;
  }

  :host(:state(accordion)) [part=content] {
    padding-block-end: var(--tcds-space-layout-sm);
  }
`;
