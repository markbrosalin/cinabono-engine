import { Scope, Id } from "@cnbn/schema";

export const scopeScopes = (scope: Scope) => ({
    append(childScopeId: Id) {
        scope.storedScopes.add(childScopeId);
    },
    remove(childScopeId: Id) {
        scope.storedScopes.delete(childScopeId);
    },
    has(childScopeId: Id) {
        return scope.storedScopes.has(childScopeId);
    },
    listIds() {
        return Array.from(scope.storedScopes);
    },
});
