```html
<div class="tcds-alert-bar">
  <h2 class="tcds-alert-bar__heading">Updates</h2>

  <div class="tcds-alert-bar__alerts">
    <details name="alert">
      <summary>Alert 1</summary>
      <div>
        <p>Alert 1 content</p>
      </div>
    </details>
    <details name="alert">
      <summary>Alert 2</summary>
      <div>
        <p>Alert 2 content</p>
      </div>
    </details>
  </div>

  <!-- rendered via javascript -->
  <button class="tcds-alert-bar__close">
    <span class="visually-hidden">Close alert bar</span>
    <tcds-icon icon="x"></tcds-icon>
  </button>
</div>
```

```css
.alert-bar {
  height: auto;
  display: grid;
  grid-template-columns: 300px 1fr min-content;
  grid-template-rows: 1fr min-content;
  align-items: center;
}

h2 {
  grid-column: 1 / -1;
  grid-row: 1 / 2;
  border-bottom: 1px solid #eee;
  padding: 1rem 0;
}

button {
  grid-column: -2 / -1;
  grid-row: 1 / 2;
}

.alerts {
  display: grid;
  grid-template-columns: repeat(100, fit-content(100%));
  grid-template-rows: 1fr 1fr;
  align-items: center;

  @media (min-width: 1624px) {
    grid-column: 2 / 3;
    grid-row: 1 / -1;
    grid-template-rows: subgrid;
  }
}

details, details[open]::details-content {
  display: contents;
  grid-row: 1 / -1;
}

summary {
  grid-row: 1 / 2;
  user-select: none;
  cursor: pointer;
}

summary + div {
  grid-row: 2 / 3;
  grid-column: 1 / -1;
  padding: 1rem 0;
}
```
