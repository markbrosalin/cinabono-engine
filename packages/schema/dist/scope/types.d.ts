import { HierarchyPath, Id, PinIndex } from "../shared/index.js";
export type StoredScopes = Set<Id>;
export type StoredItems = Map<Id, ScopeChildItem>;
export type ScopeKind = "tab" | "circuit";
export interface ScopeChildItem {
    inputLinks?: InputLinkIds;
    outputLinks?: OutputLinkIds;
}
export interface WithKind {
    kind: ScopeKind;
}
export type InputLinkIds = Record<PinIndex, Id>;
export type OutputLinkIds = Record<PinIndex, Id[]>;
export type Scope<K extends ScopeKind = ScopeKind> = {
    kind: K;
    id: Id;
    path: HierarchyPath;
    storedScopes: StoredScopes;
    storedItems: StoredItems;
};
export type TabScope = Scope<"tab">;
export type CircuitScope = Scope<"circuit">;
//# sourceMappingURL=types.d.ts.map