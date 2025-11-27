import { Id } from "@cnbn/schema";
export interface RemoveTabUC_Fn {
    (payload: {
        tabId: Id;
    }): {
        isTabRemoved: boolean;
    };
}
export declare const removeTabUC: import("../../index.js").ApiConfigFactory<import("../../index.js").ApiToken<RemoveTabUC_Fn, "public">>;
//# sourceMappingURL=RemoveTab.d.ts.map