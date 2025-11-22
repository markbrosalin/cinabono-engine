import { ApiFactories } from "@engine/api";
import { TabContract } from "@engine/tab-factory";
import { getScopeIdFromPath, scopeLinks } from "@cnbn/helpers";
import { Id, isCircuitItem, ItemOfKind, ScopeOfKind } from "@cnbn/schema";

export interface ApiRemoveSingleItem_Fn {
    (payload: ApiRemoveSingleItem_Payload): ApiRemoveSingleItem_Result;
}

export type ApiRemoveSingleItem_Payload = {
    tabId: Id;
    itemId: Id;
};

export type ApiRemoveSingleItem_Result = {
    removedItem: ItemOfKind | undefined;
    tabId: Id;
};

export const _removeSingleItemUC = ApiFactories.config((tokens) => ({
    token: tokens.item._removeSingle,
    factory: (ctx) => {
        let tab: TabContract;
        let item: ItemOfKind;
        let parentScope: ScopeOfKind;

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
        }) as ApiRemoveSingleItem_Fn;

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
