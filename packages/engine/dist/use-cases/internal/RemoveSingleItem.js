import { ApiFactories } from "../../api";
import { getScopeIdFromPath, scopeItems, scopeLinks, scopeScopes } from "@cnbn/helpers";
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
            const removedLinks = removeLinksFromScopeStep();
            if (isCircuitItem(item)) {
                removeCircuitInnerElemsStep();
                remove.scope(item.id);
            }
            ctx.tools.scope.unreg.itemFromScope(item, parentScope);
            const removedItem = remove.item(item.id);
            return { removedItem, tabId: tab.id, removedLinks };
        });
        const removeLinksFromScopeStep = () => {
            const linkIds = scopeLinks(parentScope).listBy(item.id);
            return ctx.tools.flow.addStep("RemoveLinksFromScope", () => {
                const res = [];
                for (const linkId of linkIds) {
                    const removed = ctx.api.item._unlinkSingle({ linkId, tabId: tab.id });
                    res.push(removed);
                }
                return res;
            });
            console.log(tab);
        };
        const removeCircuitInnerElemsStep = () => {
            const { get, remove } = ctx.tools.tab(tab);
            return ctx.tools.flow.addStep("RemoveCircuiChildren", () => {
                const circuitScope = get.scope(item.id);
                // removing inner items
                for (const id of scopeItems(circuitScope).listIds()) {
                    const linkIds = scopeLinks(circuitScope).listBy(id);
                    remove.link(linkIds);
                    remove.item(id);
                }
                // removing inner scopes
                for (const id of scopeScopes(circuitScope).listIds()) {
                    remove.scope(id);
                }
                //почему нет удаления scope и их элементов внутри?
            });
        };
        return removeSingleItem;
    },
}));
