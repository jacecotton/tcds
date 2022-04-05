**Work in progress.** See #5

## Developing locally

First, ensure you have installed [Node.js](https://nodejs.org/). Then, clone the repository and install dependencies by running the following:

```bash
git clone git@github.com:jacecotton/tcds.git
cd tcds && npm install
```

Alternatively you can provide the path to your own fork of the project.

To watch for changes and build on every save, run:

```bash
npm run dev
```

To understand the structure of the project, check out [ARCHITECTURE](ARCHITECTURE.md).

## Best practices

We use [editorconfig](https://editorconfig.org/) for basic formatting configuration, as well as [stylelint](https://stylelint.io/) and [eslint](https://eslint.org/) for linting CSS and JavaScript, respectively. We recommend using [Visual Studio Code](https://code.visualstudio.com/) as a code editor, with [respective plugins for editorconfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig), [stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint), and [eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint). This will automatically preconfigure your editor, fix issues on-save when possible, and display in-editor warnings and errors for manual fixes.

If you don't want to install editor plugins, you can lint your code in the terminal by running:

```
npm run lint
```

You can allow the linters to automatically fix what issues it can by running:

```
npm run fix
```

This should be done before committing any changes back to the repository.

## Contributing back

* Branching, pull requests (add template?), etc.
* Semantic versioning, conventional commits, npm publish, etc.
