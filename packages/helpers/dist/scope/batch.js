import { scopeItems } from "./scopeItems";
import { scopeScopes } from "./scopeScopes";
export const saveChildToScope = (scope, data) => {
    scopeItems(scope).append({
        id: data.id,
        inputLinks: data.inputLinks,
        outputLinks: data.outputLinks,
    });
    if (data.kind === "circuit:logic")
        scopeScopes(scope).append(data.id);
};
export const removeChildFromScope = (scope, data) => {
    scopeItems(scope).remove(data.id);
    if (data.kind === "circuit:logic")
        scopeScopes(scope).remove(data.id);
};
