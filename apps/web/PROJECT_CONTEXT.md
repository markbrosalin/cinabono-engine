# UI Engine Project Context

## 1) Project Goal

The project is moving to a component-based UI Engine architecture with clear ownership:

- shared services for cross-cutting runtime infrastructure
- isolated components with local services
- strict domain model for catalog/workspace data
- component APIs focused on use-cases (not raw internal primitives)

Primary current target is the `catalog` component (model + services + import/export + next use-case layer).

## 2) Architecture Rules (Important)

### Shared placement rule

- `apps/web/src/shared/**` (root shared) is for app-wide reusable things.
- `apps/web/src/shared/infrastructure/ui-engine/shared/**` (inside engine) is only for engine-local shared pieces.
- Do not mix them.

### Engine communication

- Components should not depend directly on each other.
- Preferred communication:
    - shared services (event bus, protocol hubs)
    - explicit component-level APIs / use-case methods
- Avoid hidden coupling through direct runtime internals.

### Code quality constraints

- Follow SOLID and DRY.
- Prefer small composable helpers/services over large monolithic functions.
- Avoid dead code and temporary adapters for legacy unless explicitly required.

## 3) Current UI Engine State

### Shared services

- Event Bus exists and is actively used for engine-level events.
- Snapshot hub/protocol concept exists.

### Components

- `workspace-session` is already migrated to internal local services.
- `catalog` is the active refactor area.
- `graph-runtime` still contains legacy patterns and is planned for deeper refactor later.

### Catalog domain model

Model lives under:

- `apps/web/src/shared/infrastructure/ui-engine/model/catalog`

Main entities:

- Catalog document (root payload)
- Libraries
- Items
- Item modules (logic, ports, interaction, timing, composition)
- Bundle document (root refs + sliced libraries)

Composition boundary is modeled explicitly (`inputs` / `outputs`), enabling linked/isolated view scenarios.

## 4) Catalog Services (Current)

Local services:

- `state`: in-memory CRUD over catalog document
- `query`: semantic read operations and dependency closure
- `factory`: normalized entity creation
- `validation`: entity/document/module validation
- `io`: import/export orchestration (`import` + `export`)

### Import/export status

- `exportBundle` is already domain-complete for current model.
- `importBundle` now validates:
    - format/header
    - root refs presence
    - duplicate library ids
    - duplicate item refs
    - missing dependency refs through root closure traversal
- Import still returns validated payload; apply/use-case layer is the next stage.

## 5) Next Implementation Plan (Confirmed)

Before use-cases:

1. Move issue creation pattern to reusable shared helper in engine model/shared.
2. Deduplicate dependency BFS traversal used in both `query` and `io/import`.
3. Add shared `getCompositionDependencies(item)` helper and reuse it.
4. Simplify `createCatalogExportService` (remove redundant duplicate checks where closure already dedups).
5. Simplify `createCatalogStateService.upsertItem` (remove double library search).
6. Simplify `CatalogStateApi` typing in `components/catalog/types.ts` (single source of truth after `Pick`).

Then:

7. Add component-level use-case API:
    - `applyImportLibrary`
    - `applyImportBundle`
    - `applyImportDocument` with explicit strategy (`merge | replace`) and normalized results.

## 6) Working Commands

From repo root:

- `pnpm --filter web test`
- `pnpm --filter web build`

## 7) Notes For New Chat

- Start from `catalog` component and this plan.
- Do not re-introduce direct component-to-component coupling.
- Do not add legacy adapters “for build only”.
- Keep diffs minimal and delete obsolete code when moving logic.
