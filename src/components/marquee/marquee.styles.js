import {css} from "lit";

export default css`
  :host {
    --tcds-marquee-gap: 0px;
    --tcds-marquee-cycle: 0px;
    --tcds-marquee-duration: 1s;

    overflow: hidden;
    gap: var(--tcds-marquee-gap);

    @media (prefers-reduced-motion: reduce) {
      overflow-x: auto;
    }
  }

  :host(:not([hidden])) {
    display: block;
  }

  :host([paused]) {
    --tcds-marquee-play-state: paused;
  }

  [part=track] {
    display: flex;
    flex: 0 0 auto;
    width: max-content;
    background-color: var(--tcds-color-theme-background);
    color: var(--tcds-color-theme-text-primary);
    padding: var(--tcds-space-component-md) 0;
    will-change: transform;
    animation: tcds-marquee-scroll var(--tcds-marquee-duration) linear infinite;
    animation-play-state: var(--tcds-marquee-play-state, running);

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }

    &:hover,
    &:focus-within {
      --tcds-marquee-play-state: paused;
    }
  }

  .group {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    gap: var(--tcds-marquee-gap);
    margin-inline-end: var(--tcds-marquee-gap);

    @media (prefers-reduced-motion: reduce) {
      &:not(:first-child) {
        display: none;
      }
    }
  }

  [part=toggle] {
    appearance: none;
    display: block;
    background: transparent;
    color: var(--tcds-color-theme-default-accent);
    border: 1.5px solid currentcolor;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 1.5rem;
    font-size: .7rem;
    margin: var(--tcds-space-component-sm) auto;
    padding: 0;
    cursor: pointer;
  }

  @keyframes tcds-marquee-scroll {
    from {
      transform: translateX(0);
    }

    to {
      transform: translateX(calc(-1 * var(--tcds-marquee-cycle)));
    }
  }
`;
