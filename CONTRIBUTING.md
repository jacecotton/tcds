This guide is for setting up and contributing to the Texas Children's Design System project. It is not a guide for using the Design System in a project. For that, refer to the [documentation site](https://tcds.herokuapp.com/).

## Setting up

First, ensure you have installed [Node.js](https://nodejs.org/). Then, clone the repository and install dependencies by running the following:

```bash
git clone git@github.com:jacecotton/tcds.git
cd tcds && npm install
```

Before making any changes, it's a good idea to create and switch to a new branch now by running the following:

```
git checkout -b my-new-branch
```

To watch for changes and build on every save, run:

```bash
npm run dev
```

To understand the structure of the project, check out [ARCHITECTURE](ARCHITECTURE.md).

## Best practices

We use [editorconfig](https://editorconfig.org/) for basic formatting configuration, as well as [stylelint](https://stylelint.io/) and [eslint](https://eslint.org/) for linting CSS and JavaScript, respectively. This enforces the basic formatting rules of our [coding style guide](https://tcds.herokuapp.com/style-guide).

We recommend using [Visual Studio Code](https://code.visualstudio.com/) as a code editor, with [respective plugins for editorconfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig), [stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint), and [eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint). This will configure your editor, fix issues on-save when possible, and display in-editor warnings and errors for manual fixes. The necessary configuration files are already included in the repository.

If you use a different editor, there are likely equivalent plugins. If you don't want to install any plugins, you can lint your code in the terminal by running:

```
npm run lint
```

You can allow the linters to automatically fix what issues it can by running:

```
npm run fix
```

This should be done before committing any changes back to the repository.

<details>
<summary>Details</summary>

You can lint and fix granularly by specifying `styles` or `scripts`:
* `lint:styles`
* `lint:scripts`
* `fix:styles`
* `fix:scripts`
</details>

## Submitting your changes

When opening a pull request, use the provided template, ensure you follow the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) standard in the title, and link to related issues in the description using [supported keywords](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue).

While pull requests should include some information about the motivation and context behind the changes, they should generally correspond to at least one issue. Issues should be used to describe motivation in greater detail, while pull request descriptions should focus on the actual changes and their implications.

Before submitting a pull request, make sure your branch is up to date with `main`. **Do not merge `main` into your branch.** Rather, rebase your local `main` with the remote. This is to ensure a cleaner history by always listing your local changes after those on `main`, regardless of the actual chronology.

```
git pull --rebase origin main
```
