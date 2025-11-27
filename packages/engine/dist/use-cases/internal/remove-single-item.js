import { ApiFactories } from "../../api/index.js";
import { getScopeIdFromPath, scopeLinks } from "@cnbn/helpers";
import { isCircuitItem } from "@cnbn/schema";
export const _removeSingleItemUC = ApiFactories.config((tokens) => ({
    token: tokens.item._removeSingle,
    factory: (ctx) => {
        let tab;
        let item;
        let parentScope;
        const removeSingleItem = ((p) => {
            tab = ctx.tools.global.getTab(p.tabId);
            const { remove, get } = ctx.tools.tab(tab);
            item = get.item(p.itemId);
            parentScope = get.scope(getScopeIdFromPath(item.path));
            removeLinksFromScopeStep();
            if (isCircuitItem(item)) {
                ctx.api.scope._removeDeep({
                    tabId: p.tabId,
                    scopeId: item.id,
                });
            }
            // remove item from its parent scope
            ctx.tools.scope.unreg.itemFromScope(item, parentScope);
            // remove the item itself
            const removedItem = remove.item(item.id);
            return {
                removedItem,
                tabId: tab.id,
            };
        });
        const removeLinksFromScopeStep = () => {
            const linkIds = scopeLinks(parentScope).listBy(item.id);
            return ctx.tools.flow.addStep("RemoveLinksFromScope", () => {
                for (const linkId of linkIds) {
                    ctx.api.item._unlinkSingle({
                        linkId,
                        tabId: tab.id,
                    });
                }
            });
        };
        return removeSingleItem;
    },
}));
