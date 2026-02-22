# Dating Front

Next.js 16 frontend application with React 19, TailwindCSS 4, Zustand, React Query, i18next.

## Project setup

```bash
# install dependencies
$ pnpm install
```

## Compile and run the project on local mode

```bash
# development (watch mode)
$ pnpm start:dev

# build
$ pnpm build

# production mode
$ pnpm start
```

## Linting and formatting

```bash
# check code with biome
$ pnpm lint

# format code with biome
$ pnpm format
```

## Run docker development

> **⚠ ATTENTION:** Docker dev mode currently disabled — need to fix file polling issue on Windows.

```bash
# build image
$ docker compose -f docker-compose.dev.yml build

# up containers
$ docker compose -f docker-compose.dev.yml up
```

## Run docker production

```bash
# build image
$ docker compose -f docker-compose.prod.yml build

# up containers
$ docker compose -f docker-compose.prod.yml up

# check result on http://localhost:3000
```
