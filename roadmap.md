## Typing
Look into adopting TypeScript for JS files (components, process scripts, etc.)

## Testing
### Browser testing
Some sort of browser testing like Playwright.

### Accessibility testing
Need to look into using [VoiceOver.js](https://www.npmjs.com/package/@accesslint/voiceover) and potentially other tools for automated screen reader tests.

Basic accessibility checks (axe, Lighthouse, etc.) should be automated as part of the PR and deployment workflow.

## Future tech
Keeping an eye on:

* [Declarative Custom Elements](https://github.com/WICG/webcomponents/blob/gh-pages/proposals/Declarative-Custom-Elements-Strawman.md), [DOM Parts Declarative Template API](https://github.com/WICG/webcomponents/blob/gh-pages/proposals/DOM-Parts-Declarative-Template.md), and [Signals](https://github.com/tc39/proposal-signals) to potentially revolutionize how we define custom elements, handle DOM updates, state, etc.
* [Reference Target for Cross-Root ARIA (Proposal)](https://github.com/WICG/webcomponents/blob/gh-pages/proposals/reference-target-explainer.md) to solve long-standing accessibility wrinkles with the Shadow DOM.
* [Design Tokens Community Group](https://www.w3.org/community/design-tokens/) — possibly follow this to normalize our own design tokens (would involve converting back to JSON).
* [HTML `focusgroup` (Explainer)](https://open-ui.org/components/focusgroup.explainer/) for better keyboard navigation and potentially native focus trapping?
* [`import` attributes `with` CSS types](https://chromestatus.com/feature/5205869105250304) to import shadow DOM stylesheets (TCDS currently supports the syntax but transforms module imports to inlined CSS via a custom Rollup plugin).
* [`import` attributes `with` HTML types](https://github.com/WICG/webcomponents/blob/gh-pages/proposals/html-modules-explainer.md) to potentially store custom element templates in separate files as well (possibly related to or mooted by the DCE, DOM Parts, and Signals ideas).
* [`link[rel=expect]`](https://webstatus.dev/features/link-rel-expect?sort=name_asc&start=75) to potentially natively resolve FOUC/CLS issues with custom elements (rather than CSS animation hack) — might be mooted by DCEs.
* [Nunjucks 4](https://github.com/nunjucks/nunjucks4) for revived maintenance and possible compatibility improvements/parity with Twig developments (might contribute to this).

Need to think about:
* CSS layers
