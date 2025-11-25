import { ScopeKind } from "../scope/types";
import { ScopeArgsOfKind } from "../shared";
import { CircuitScopeArgs, TabScopeArgs } from "./types";
export declare const isScopeArgs: (value: unknown) => value is ScopeArgsOfKind<ScopeKind>;
export declare const isTabScopeArgs: (args: unknown) => args is TabScopeArgs;
export declare const isCircuitScopeArgs: (args: unknown) => args is CircuitScopeArgs;
//# sourceMappingURL=guards.d.ts.map