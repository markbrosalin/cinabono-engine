import { ScopeKind } from "../scope/types.js";
import { ScopeArgsOfKind } from "../shared/index.js";
import { CircuitScopeArgs, TabScopeArgs } from "./types.js";
export declare const isScopeArgs: (value: unknown) => value is ScopeArgsOfKind<ScopeKind>;
export declare const isTabScopeArgs: (args: unknown) => args is TabScopeArgs;
export declare const isCircuitScopeArgs: (args: unknown) => args is CircuitScopeArgs;
//# sourceMappingURL=guards.d.ts.map