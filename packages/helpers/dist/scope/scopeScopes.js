export const scopeScopes = (scope) => ({
    append(childScopeId) {
        scope.storedScopes.add(childScopeId);
    },
    remove(childScopeId) {
        scope.storedScopes.delete(childScopeId);
    },
    has(childScopeId) {
        return scope.storedScopes.has(childScopeId);
    },
    listIds() {
        return Array.from(scope.storedScopes);
    },
});
