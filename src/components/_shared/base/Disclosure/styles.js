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
  }

  [part=trigger] {
    appearance: none;
    background-color: transparent;
    border: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: var(--tcds-space-component-sm) 0;
    font-family: var(--tcds-font-family-ui);
    font-weight: var(--tcds-font-weight-ui);
    font-size: var(--tcds-font-size-2xl);
    cursor: pointer;
  }

  [part=marker] {
    flex-shrink: 0;
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
  }

  [part=panel]:focus-visible {
    outline: 2px solid currentcolor;
    outline-offset: 2px;
  }

  [part=content] {
    padding-block: var(--tcds-space-component-md);
  }

  :host(:state(plain)) [part=content] {
    padding-block-start: 0;
  }
`;
