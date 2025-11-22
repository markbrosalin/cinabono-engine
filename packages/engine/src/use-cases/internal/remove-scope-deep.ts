import { scopeItems, scopeLinks, scopeScopes } from "@cnbn/helpers";
import { Id, ItemLink, ItemOfKind, Scope, ScopeOfKind } from "@cnbn/schema";
import { ApiFactories } from "@engine/api";

export interface ApiRemoveScopeDeep_Fn {
    (payload: { tabId: Id; scopeId: Id }): {
        removedItems: ItemOfKind[];
        removedScopes: ScopeOfKind[];
        removedLinks: ItemLink[];
    };
}

export const _removeScopeDeepUC = ApiFactories.config((tokens) => ({
    token: tokens.scope._removeDeep,

    factory: (ctx) => {
        let tab: ReturnType<typeof ctx.tools.global.getTab>;

        const removedItems: ItemOfKind[] = [];
        const removedScopes: ScopeOfKind[] = [];
        const removedLinks: ItemLink[] = [];

        const removeScopeDeep = (({ tabId, scopeId }) => {
            tab = ctx.tools.global.getTab(tabId);
            const { get } = ctx.tools.tab(tab);

            const root = get.scope(scopeId);

            ctx.tools.flow.addStep("RemoveScopeDeep", () => {
                removeScopeRecursive(root);
            });

            return {
                removedItems,
                removedScopes,
                removedLinks,
            };
        }) as ApiRemoveScopeDeep_Fn;

        const removeScopeRecursive = (scope: Scope) => {
            const { remove, get } = ctx.tools.tab(tab);

            removeItems();
            removeChildScopes();

            const removedScope = remove.scope(scope.id);
            if (removedScope) removedScopes.push(removedScope);

            function removeItems() {
                for (const itemId of scopeItems(scope).listIds()) {
                    const linkIds = scopeLinks(scope).listBy(itemId);

                    const removedLinks = remove.link(linkIds);
                    removedLinks.push(...removedLinks);

                    const removedItem = remove.item(itemId);
                    if (removedItem) removedItems.push(removedItem);
                }
            }

            function removeChildScopes() {
                for (const childScopeId of scopeScopes(scope).listIds()) {
                    const childScope = get.scope(childScopeId);
                    removeScopeRecursive(childScope);
                }
            }
        };

        return removeScopeDeep;
    },
}));
