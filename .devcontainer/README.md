# Dev Container

This repository's dev container reuses the root `docker-compose.yml` and attaches VS Code to the `tcds` service.

- Opening the repository in the dev container starts the `tcds` service.
- VS Code attaches to `/app` inside the container.
- Port `8080` is forwarded and labeled as `TCDS Docs`.
- The container uses the existing `npm run dev` workflow rather than a separate editor-only startup path.

## Notes

- `overrideCommand` is set to `false` because the service needs its normal `npm run dev` command.
- The image and service are already configured for file watching with polling in `docker-compose.yml`.
- If you change `.devcontainer/devcontainer.json`, rebuild the container from VS Code.

## Devcontainer guidance

Using a devcontainer primarily changes where the tools run, not how the project works.

- It standardizes the Node and toolchain versions across the team.
- It reduces host-machine setup and version drift.
- It makes onboarding easier for contributors who do not already have the right local environment.

### What changes

- Your VS Code terminal runs inside the container instead of using host-installed Node and npm.
- The repo files are still your local files, mounted into the container at `/app`.
- The docs/dev site is still available at `http://localhost:8080`.

### What stays the same

- The main workflow is still `npm run dev`.
- Git still operates on the same repository.
- Generated outputs like `dist/`, `components/`, and `docs/_site` still appear in the working tree.

### Prerequisities

- Docker Desktop or another compatible Docker engine
- VS Code
- The Dev Containers extension for VS Code

### Basic usage

1. Open the repository in VS Code.
2. Run `Dev Containers: Reopen in Container`.
3. Wait for the container to build and start.
4. Use the VS Code terminal inside the container for project commands.
5. Open `http://localhost:8080` for the docs/dev site.

### Important mental model

- The container is the development machine.
- The host provides Docker, VS Code, and the checked-out files.
- If a tool is installed only on the host, it is not automatically available inside the container.
- If you install something interactively inside the container, it can disappear on rebuild.
- Add persistent container setup to the Dockerfile or devcontainer config.

### What to look out for

- File watching can behave differently in containers, so this repo enables polling in `docker-compose.yml`.
- Ports need to be forwarded or published for the browser to reach the running app.
- Rebuilding the container can take time the first time.
- If behavior differs between the host terminal and the container terminal, treat the container behavior as the source of truth when using the devcontainer workflow.

### When to rebuild

Rebuild the dev container after changing any of these files:

- `Dockerfile`
- `docker-compose.yml`
- `.devcontainer/devcontainer.json`

### Troubleshooting

- Check the Dev Containers logs in VS Code if the container fails to open.
- Check `docker compose logs` if the service starts but the site is not working.
