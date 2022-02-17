[![npm version](https://badge.fury.io/js/@txch%2Ftcds.svg)](https://badge.fury.io/js/@txch%2Ftcds)

# Texas Children's Design System

[Texas Children's Design System](https://tcds.herokuapp.com/) (TCDS) is a centralized library of web components, design patterns, and design resources. It aims to improve standardization, efficiency, and scalability by providing a single, custom framework for building websites at scale.

## Setting up

**Notes:**
* The following guidance is for how to set up a local instance of this repository, and how to begin updating it from a development perspective.
* For guidance on how to use the Design System in a project, refer to the [Getting Started](https://tcds.herokuapp.com/getting-started) page of the documentation site.
* For guidance on how to contribute to the Design System as a whole, refer to the [Contributing](https://tcds.herokuapp.com/contributing) page.
* For how to use specific parts of the Design System, refer to the [Design](https://tcds.herokuapp.com/design), [Components](https://tcds.herokuapp.com/components), or [Primitives](https://tcds.herokuapp.com/primitives) pages.

**Step 1. Clone the repository**

First, `cd` into the directory you want your local copy of the repository to be. Then run

```bash
git clone https://github.com/jacecotton/tcds.git
```

Now `cd` into the newly created directory by running

```bash
cd tcds
```

**Step 2. Install dependencies**

First, make sure you have Node.js installed on your machine. Then install project dependencies by running

```bash
npm install
```

**Step 3. Build and watch for changes**

Next, run

```bash
npm run build
```

This will build `src/` files to `dist/` and continuously watch for changes, rebuilding on every save.

**Make sure to check out [CONTRIBUTING.md](CONTRIBUTING.md) for guidance on how to best contribute changes to this repository.**