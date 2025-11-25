import { removeChildFromScope, saveChildToScope, scopeLinks, scopeScopes } from "@cnbn/helpers";
export const makeScopeRegistry = (flow) => ({
    item: {
        reg(item, scope, stepName = "reg item to parent scope") {
            return flow.addStep(stepName, () => saveChildToScope(scope, item), () => removeChildFromScope(scope, item));
        },
        unreg(item, scope, stepName = "unreg item from parent scope") {
            return flow.addStep(stepName, () => removeChildFromScope(scope, item), () => saveChildToScope(scope, item));
        },
    },
    link: {
        reg(link, scope, stepName = "reg link to item in parent scope") {
            return flow.addStep(stepName, () => scopeLinks(scope).add(link), () => scopeLinks(scope).remove(link));
        },
        unreg(link, scope, stepName = "unreg link from item in parent scope") {
            return flow.addStep(stepName, () => scopeLinks(scope).remove(link), () => scopeLinks(scope).add(link));
        },
    },
    scope: {
        reg(childId, scope, stepName = "reg scope to parent scope") {
            return flow.addStep(stepName, () => scopeScopes(scope).append(childId), () => scopeScopes(scope).remove(childId));
        },
        unreg(childId, scope, stepName = "unreg scope from parent scope") {
            return flow.addStep(stepName, () => scopeScopes(scope).remove(childId), () => scopeScopes(scope).append(childId));
        },
    },
});
