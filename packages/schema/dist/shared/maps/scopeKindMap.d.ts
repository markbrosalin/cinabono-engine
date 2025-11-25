import { TabScope, CircuitScope, ScopeKind } from "../../scope";
import { TabScopeArgs, CircuitScopeArgs } from "../../scope-args";
export interface ScopeKindMap {
    tab: {
        Scope: TabScope;
        Args: TabScopeArgs;
    };
    circuit: {
        Scope: CircuitScope;
        Args: CircuitScopeArgs;
    };
}
export type ScopeOfKind<T extends ScopeKind = ScopeKind> = ScopeKindMap[T]["Scope"];
export type ScopeArgsOfKind<T extends ScopeKind = ScopeKind> = ScopeKindMap[T]["Args"];
//# sourceMappingURL=scopeKindMap.d.ts.map