import {css} from "@/js/lit";

export default css`
  :host {
    display: flex;
    flex-direction: column;
  }

  [part="controls"] {
    display: flex;
    gap: 1rem;
    justify-content: end;
    border-bottom: 1px solid var(--tcds-accordion-border-color);
    padding: 0 0 .5rem;
  }

  [part="open-all"],
  [part="close-all"] {
    appearance: none;
    background: none;
    border: 0;
    color: inherit;
    font-family: var(--tcds-font-family-ui);
    font-weight: var(--tcds-font-weight-semibold);
    display: flex;
    gap: 1ch;
  }
`;
