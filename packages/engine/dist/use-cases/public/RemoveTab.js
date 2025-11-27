import { ApiFactories } from "../../api/helpers/index.js";
export const removeTabUC = ApiFactories.config((tokens) => ({
    token: tokens.tab.remove,
    factory: (ctx) => {
        const removeTab = (({ tabId }) => {
            const removedTab = ctx.tools.global.removeTab(tabId);
            if (!removedTab)
                return { isTabRemoved: false };
            removedTab.close();
            return { isTabRemoved: true };
        });
        return removeTab;
    },
}));
