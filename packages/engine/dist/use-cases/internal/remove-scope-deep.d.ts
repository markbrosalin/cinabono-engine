import { Id, ItemLink, ItemOfKind, ScopeOfKind } from "@cnbn/schema";
export interface ApiRemoveScopeDeep_Fn {
    (payload: {
        tabId: Id;
        scopeId: Id;
    }): {
        removedItems: ItemOfKind[];
        removedScopes: ScopeOfKind[];
        removedLinks: ItemLink[];
    };
}
export declare const _removeScopeDeepUC: import("../../api/index.js").ApiConfigFactory<import("../../api/index.js").ApiToken<ApiRemoveScopeDeep_Fn, "internal">>;
//# sourceMappingURL=remove-scope-deep.d.ts.map