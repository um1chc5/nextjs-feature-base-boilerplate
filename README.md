# Next.js Feature Boilerplate

Next.js boilerplate with a feature-first architecture, shared module boundaries, and a feature scaffold generator.

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- ESLint + Prettier

## Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Create local environment values:

```bash
cp .env.example .env.local
```

3. Run development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Project Convention

Detailed conventions are documented in `docs/1-project-convention.md`.

Core structure:

- `src/features/*` for domain-specific logic
- `src/shared/*` for cross-feature reusable modules
- `src/shared/apis`, `src/shared/types`, `src/shared/libs` as shared boundaries

## Create a New Feature

Use the generator:

```bash
pnpm create:feature <feature-name>
```

Example:

```bash
pnpm create:feature merchant-payment
```

It creates:

- `components/`, `hooks/`
- `<feature-name>.api.ts`
- `<feature-name>.type.ts`
- `<feature-name>.lib.ts`
- `index.ts`

## Scripts

- `pnpm dev` - start local dev server
- `pnpm build` - production build
- `pnpm start` - run production build
- `pnpm lint` - run ESLint
- `pnpm lint:fix` - auto-fix ESLint issues
- `pnpm prettier` - check formatting
- `pnpm prettier:fix` - apply formatting

## Publish As Template

After pushing this repository to GitHub:

1. Open repository `Settings`
2. Enable `Template repository`
3. Use `Use this template` to bootstrap new projects
