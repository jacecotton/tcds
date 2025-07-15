tcds/packages/components
  src/
    icon/
      icon.js -- imports icon.css as constructable stylesheet, also imports from ../utilities
      icon.css
    accordion/
      accordion.js -- shares utilities with other components from ../utilities
      accordion.css
    utlities/
      ...
    index.js
  dist/
    icon.js -- shares runtime, utilities
    accordion.js -- shares runtime, utilities
    runtime.js -- webpack
    utilities.js -- utilities-only bundle
    bundle.js -- everything all together
  package.json
