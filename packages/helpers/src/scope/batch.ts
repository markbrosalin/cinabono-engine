import { scopeItems } from "./scopeItems";
import { scopeScopes } from "./scopeScopes";
import { Scope, ScopeChildItem, WithId, WithItemKind } from "@cnbn/schema";

export const saveChildToScope = (scope: Scope, data: WithItemKind & WithId & ScopeChildItem) => {
    scopeItems(scope).append({
        id: data.id,
        inputLinks: data.inputLinks,
        outputLinks: data.outputLinks,
    });
    if (data.kind === "circuit:logic") scopeScopes(scope).append(data.id);
};

export const removeChildFromScope = (scope: Scope, data: WithItemKind & WithId) => {
    scopeItems(scope).remove(data.id);
    if (data.kind === "circuit:logic") scopeScopes(scope).remove(data.id);
};
