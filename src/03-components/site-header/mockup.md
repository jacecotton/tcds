1. Should be able to do everything with details.
  a. Main hamburger and search toggle are top-level children.
  b. details[open] > summary { background } changes to x icon
  c. Main hamburger (details and details > div) gets display: contents on desktop (details > summary gets display: none)
  d. [open] overlay is added by the details elements (only top-level ones on mobile), not via host[open]
  e. details exclusivity is done by mimicking "light dismiss" in JS
  f. selectors are tcds-global-header > details and details details
    f.a. Maybe need to be careful to apply certain things only to #primary-menu details?

<header class="global-header">
  <a id="logo" href="/" rel="home" title="Go home">
    <img src="...">
  </a>

  <details id="nav-menus">
    <summary>
      <span class="visually-hidden">Toggle menus</span>
    </summary>
    <div>
      <nav id="primary-menu">
        <ul>
          <li>
            <details>
              <summary>Our system</summary>
              <div>
                ...
              </div>
            </details>
          </li>
        </ul>
      </nav>
      <nav id="utility-menu">
        <ul>
          <li>
            <a href="...">Donate</a>
          </li>
        </ul>
      </nav>
    </div>
  </details>

  <details id="search-menu">
    <summary>
      <span class="visually-hidden">Toggle search</span>
    </summary>
    <div>
      Search content
    </div>
  </details>
</header>