# Cinabono Engine - AI Coding Guidelines

## Project Overview

**Cinabono** is a monorepo-based TypeScript logic simulator engine with a web UI. It implements deterministic circuit simulation with plugin support, event-driven architecture, and dependency injection.

### Tech Stack

- **Monorepo**: pnpm workspaces + Turbo (not npm/yarn)
- **Runtime**: TypeScript with ES2022 target, Solid.js UI framework
- **Simulation**: Custom event-wheel based deterministic runner
- **DI Container**: Custom `okee-di-container` with reflect-metadata decorators
- **Testing**: Vitest (not Jest)

## Architecture Layers

### Core Packages (loosely ordered by dependency)

1. **`@cnbn/schema`** - Schema definitions for circuits, items, links, templates, scopes
2. **`@cnbn/di`** - Custom DI container with decorator-based injection
3. **`@cnbn/entities-runtime`** - EventBus, Store, Saga, AsyncCache, CallbackManager utilities
4. **`@cnbn/modules-runtime`** - Item/Link/Scope stores, compute services, factories
5. **`@cnbn/engine`** - Core CinabonoEngine and CinabonoBuilder with plugin system
6. **`@cnbn/engine-worker`** - Web Worker bridge (CinabonoClient/CinabonoWorker)
7. **`@cnbn/simulation`** - EventTimeWheel, StepSimulator, deterministic runner contracts
8. **`apps/web`** - Solid.js UI consuming engine via Vite + @antv/x6 for graph rendering

### Critical Data Flow

```
Schema Templates → Engine Builder (plugin registration)
↓
CinabonoEngine (api, deps, plugins, infra)
↓
ModulesRuntime (ItemStore, LinkStore, ScopeStore) ← SimulationRunner
↓
EventBus → Plugins listen & emit events
```

## Key Patterns & Conventions

### Dependency Injection (DI)

- **Container usage**: Every package that needs DI has a DIContainer instance
- **Tokens**: Use `DiToken<T>` as keys; define as exported constants in `contracts.ts` or `types.ts`
- **Decorators**: Classes use `@Inject(Token)` via `reflect-metadata` (enabled in tsconfig)
- **Lifetime**: `"singleton"` (cached) or `"transient"` (new instance each call)
- **Example**: [packages/engine/src/plugins](packages/engine/src/plugins) defines `EnginePlugin` system

### Event Bus Pattern

- **EventBus<T>** in `@cnbn/entities-runtime` is the base
- **EngineEventBus** wraps `IEngineEvents` for engine-level pub/sub
- **ScopedEventBus** & **PatternEventBus** for specialized event handling
- Plugins emit/listen via: `engine.api.eventBus.emit(event)` and `.on(type, handler)`

### Plugin System

- **Define**: Use `definePlugin(name, { setup, teardown, api, deps })` factory
- **Register**: `CinabonoBuilder.use(...plugins)`
- **Access**: Available in `CinabonoEngine.plugins` after `.build()`
- **Examples**: [packages/engine/src/**tests**/plugin-examples/](packages/engine/src/__tests__/plugin-examples/) - extend API, extend deps, add event loggers

### Path Aliases

Each package uses consistent internal alias in tsconfig (e.g., `@engine/*` → `./src/*`). Use short imports within a package:

```ts
import { EngineApi } from "@engine/api";
import { EngineDeps } from "@engine/deps";
```

### Testing Pattern

- Tests live in `__tests__/` or `.test.ts` suffix
- Use **Vitest** (not Jest); config in `vitest.config.ts` per package
- Examples in [packages/engine/src/**tests**/PluginPlayground.test.ts](packages/engine/src/__tests__/PluginPlayground.test.ts)
- Use `describe.skip` to disable; replace with `describe` to run

## Build & Development Workflows

### Commands

```bash
pnpm build       # Turbo build all packages (respects dependency order)
pnpm dev         # Turbo dev watch mode
pnpm test        # Turbo test (Vitest)
pnpm lint        # ESLint all TS/TSX
pnpm format      # Prettier format
pnpm clean       # Remove dist, .turbo, *.tsbuildinfo
```

### Build Process

- **Packages**: `tsc` + `tsc-alias` for path resolution (see [package.json scripts](packages/engine/package.json))
- **Web app**: Vite build with SolidJS plugin
- **Turbo pipeline**: Respects `^build` dependency (must build deps first)

### Debugging Tips

- Engine tests: Modify `describe.skip` to `describe` in [PluginPlayground.test.ts](packages/engine/src/__tests__/PluginPlayground.test.ts)
- Worker issues: Check [engine-worker/src/worker-handler.ts](packages/engine-worker/src/worker-handler.ts)
- UI: Run `pnpm dev` from workspace root; Vite auto-reloads

## Linting & Style Rules

**ESLint Config**: [eslint.config.mjs](eslint.config.mjs)

- TypeScript recommended + Prettier integration
- **Exception**: DI package has `@typescript-eslint/no-explicit-any` disabled
- **Unused vars**: Prefix with `_` to suppress warnings (e.g., `_unused`)
- **Console**: Warnings allowed; debugger statements flagged

**Prettier**: Auto-formats `.ts`, `.tsx`, `.md` files

## File Organization Best Practices

### Package Structure

```
packages/my-pkg/
  src/
    index.ts          # Main exports
    contracts.ts      # Interface/token definitions (for DI)
    types.ts          # Type definitions
    my-feature/       # Feature subdirectory
  __tests__/          # Tests (mirrors src structure)
  tsconfig.json       # Package-specific config
  package.json        # Workspace dependency declarations
```

### Web App Structure

```
apps/web/src/
  app/                # Core app layout & providers
  entities/           # Domain models
  features/           # Feature modules
  shared/             # UI components, hooks, config
    config/           # Constants
    hooks/            # Custom Solid.js hooks
    ui/               # Reusable components
    types.ts          # Shared types
  widgets/            # Complex UI widgets
```

## Common Gotchas

1. **Workspace dependencies**: Use `"workspace:*"` in `package.json` (pnpm specific)
2. **Path resolution**: Turbo requires `tsc-alias` step after TypeScript compilation
3. **Reflect metadata**: Must be imported at app entry (`[index.tsx](apps/web/src/index.tsx)`)
4. **EventBus subscription**: Remember to unsubscribe or use one-time listeners to prevent leaks
5. **Simulation determinism**: Items must be processed in order; use event-wheel timing, not async/await
6. **DI Container inheritance**: Child containers can fall back to parent via `_parentResolve`

## References for Common Tasks

- **Add a new plugin**: See [plugin-examples/extend-api.ts](packages/engine/src/__tests__/plugin-examples/extend-api.ts)
- **Extend Engine API**: Add method to api, use `ApiFactories` helpers
- **Add an event type**: Define in engine `events.ts`, register in EventBus contract
- **Create a new store**: Mirror pattern in [modules-runtime/item-store/](packages/modules-runtime/src/item-store/)
- **UI component**: Use SolidJS patterns; example in [web/src/widgets/](apps/web/src/widgets/)
