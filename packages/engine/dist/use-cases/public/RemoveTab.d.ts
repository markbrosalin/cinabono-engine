import { Id } from "@cnbn/schema";
export interface RemoveTabUC_Fn {
    (payload: {
        tabId: Id;
    }): {
        isTabRemoved: boolean;
    };
}
export declare const removeTabUC: import("../..").ApiConfigFactory<import("../..").ApiToken<RemoveTabUC_Fn, "public">>;
//# sourceMappingURL=RemoveTab.d.ts.map