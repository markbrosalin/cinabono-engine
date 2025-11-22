import { ApiFactories } from "@engine/api/helpers";
import { Id } from "@cnbn/schema";

export interface RemoveTabUC_Fn {
    (payload: { tabId: Id }): { isTabRemoved: boolean };
}

export const removeTabUC = ApiFactories.config((tokens) => ({
    token: tokens.tab.remove,
    factory: (ctx) => {
        const removeTab = (({ tabId }) => {
            const removedTab = ctx.tools.global.removeTab(tabId);
            if (!removedTab) return { isTabRemoved: false };

            removedTab.close();
            return { isTabRemoved: true };
        }) as RemoveTabUC_Fn;

        return removeTab;
    },
}));
