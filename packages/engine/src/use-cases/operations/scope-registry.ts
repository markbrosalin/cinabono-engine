import { Id, ItemLink, Scope, ScopeChildItem, WithId, WithItemKind } from "@cnbn/schema";
import { removeChildFromScope, saveChildToScope, scopeLinks, scopeScopes } from "@cnbn/helpers";
import { FlowToolContract } from "@engine/use-cases/tools";

export const makeScopeRegistry = (flow: FlowToolContract) => ({
    item: {
        reg(
            item: WithId & WithItemKind & ScopeChildItem,
            scope: Scope,
            stepName = "reg item to parent scope"
        ) {
            return flow.addStep(
                stepName,
                () => saveChildToScope(scope, item),
                () => removeChildFromScope(scope, item)
            );
        },
        unreg(
            item: WithId & WithItemKind & ScopeChildItem,
            scope: Scope,
            stepName = "unreg item from parent scope"
        ) {
            return flow.addStep(
                stepName,
                () => removeChildFromScope(scope, item),
                () => saveChildToScope(scope, item)
            );
        },
    },

    link: {
        reg(link: ItemLink, scope: Scope, stepName = "reg link to item in parent scope") {
            return flow.addStep(
                stepName,
                () => scopeLinks(scope).add(link),
                () => scopeLinks(scope).remove(link)
            );
        },
        unreg(link: ItemLink, scope: Scope, stepName = "unreg link from item in parent scope") {
            return flow.addStep(
                stepName,
                () => scopeLinks(scope).remove(link),
                () => scopeLinks(scope).add(link)
            );
        },
    },

    scope: {
        reg(childId: Id, scope: Scope, stepName = "reg scope to parent scope") {
            return flow.addStep(
                stepName,
                () => scopeScopes(scope).append(childId),
                () => scopeScopes(scope).remove(childId)
            );
        },
        unreg(childId: Id, scope: Scope, stepName = "unreg scope from parent scope") {
            return flow.addStep(
                stepName,
                () => scopeScopes(scope).remove(childId),
                () => scopeScopes(scope).append(childId)
            );
        },
    },
});
