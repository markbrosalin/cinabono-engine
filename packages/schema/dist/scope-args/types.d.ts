import { MakeOptional } from "../primitives/index.js";
import { CircuitScope, ScopeKind, TabScope } from "../scope/types.js";
export type TabScopeArgs = ScopeArgs<"tab">;
export type CircuitScopeArgs = ScopeArgs<"circuit">;
type ScopeArgs<T extends ScopeKind = ScopeKind> = T extends "tab" ? Pick<TabScope, "kind"> & Partial<TabScope> : T extends "circuit" ? MakeOptional<CircuitScope, "storedItems" | "storedScopes"> : never;
export type ScopeArgsOffKind<K> = Omit<K, "kind">;
export {};
//# sourceMappingURL=types.d.ts.map