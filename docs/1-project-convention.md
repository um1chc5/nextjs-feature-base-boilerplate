# Project Convention

## Goals

- Keep business logic isolated per feature.
- Keep reusable, domain-agnostic code inside `shared`.
- Make imports predictable and stable with public boundaries.

## Folder Layout

```txt
src/
  app/
  features/
    <feature-name>/
      components/
      hooks/
      <feature-name>.api.ts
      <feature-name>.type.ts
      <feature-name>.lib.ts
      <feature-name>.store.ts
      index.ts
      # If api/type/store has more than two files, switch to:
      apis/
        <feature-name>.api.ts
        ...
      types/
        <feature-name>.type.ts
        ...
      stores/
        <feature-name>.store.ts
        ...
      sub-features/
        <sub-feature-name>/
          components/
          hooks/
          <sub-feature-name>.api.ts
          <sub-feature-name>.type.ts
          <sub-feature-name>.lib.ts
          <sub-feature-name>.store.ts
          index.ts
          # Same rule: if api/type/store has more than two files
          apis/
            <sub-feature-name>.api.ts
            ...
          types/
            <sub-feature-name>.type.ts
            ...
          stores/
            <sub-feature-name>.store.ts
            ...
  shared/
    components/
    hooks/
    apis/
      shared.api.ts
      index.ts
    types/
      shared.type.ts
      index.ts
    libs/
      shared.lib.ts
      index.ts
    stores/
      shared.store.ts
      index.ts
    index.ts
```

## Naming Rules

- Use `kebab-case` for all file names and folders.
- API files are named `[name].api.ts`.
- Type files are named `[name].type.ts`.
- Lib files are named `[name].lib.ts`.
- Store files are named `[name].store.ts`.
- Do not use `apis`, `types`, or `libs` as filename suffixes.
- For API/type/lib/store, default to single-file modules.
- When one file grows too large or has clear module boundaries, promote it to a folder.
- In a feature folder, if API/type/store grows beyond two files, group them into `apis/`, `types/`, or `stores/` folders.
- In `shared`, use `apis/`, `types/`, and `libs/` folders as the default organization.

## Import Boundaries

- `features/*` can import from `shared/*`.
- A feature should not import another feature's internal files directly.
- Cross-feature usage should happen through the other feature's `index.ts`.
- Prefer importing from feature roots and shared public exports, not deep internals.

## Barrel Exports (`index.ts`)

- Use `index.ts` at public boundaries:
  - Feature root
  - Sub-feature root (if exposed)
  - Shared `apis/`, `types/`, and `libs/` folders
  - Shared `stores/` folder
  - Shared component folders (when exposing component API)
- Avoid unnecessary nested barrels to prevent circular imports.

## Examples

```ts
// Good: feature imports from shared boundary
// Good: feature imports from another feature boundary
import { SomeType } from '@/features/example-feature'
import { getSharedHealth } from '@/shared'

// Avoid: deep import into another feature internals
// import { SomeType } from "@/features/example-feature/types/some-internal-file";
```

## Feature Generator

- Use `pnpm create:feature <feature-name>` to scaffold a new feature.
- Generator enforces `kebab-case` names.
- Generated output includes:
  - `components/`, `hooks/`
  - `<feature-name>.api.ts`
  - `<feature-name>.type.ts`
  - `<feature-name>.lib.ts`
  - `<feature-name>.store.ts`
  - `index.ts`
