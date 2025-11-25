import { Scope, Id } from "@cnbn/schema";
export declare const scopeScopes: (scope: Scope) => {
    append(childScopeId: Id): void;
    remove(childScopeId: Id): void;
    has(childScopeId: Id): boolean;
    listIds(): string[];
};
//# sourceMappingURL=scopeScopes.d.ts.map