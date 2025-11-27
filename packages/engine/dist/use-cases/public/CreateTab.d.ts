import { Id, TabScopeArgs } from "@cnbn/schema";
export interface CreateTabUC_Fn {
    (payload?: Partial<Pick<TabScopeArgs, "id" | "storedItems" | "storedScopes">>): {
        tabId: Id;
    };
}
export declare const createTabUC: import("../../index.js").ApiConfigFactory<import("../../index.js").ApiToken<CreateTabUC_Fn, "public">>;
//# sourceMappingURL=CreateTab.d.ts.map