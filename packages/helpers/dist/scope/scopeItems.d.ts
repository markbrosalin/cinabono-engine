import { Id, Scope, ScopeChildItem, WithId } from "@cnbn/schema";
export declare const scopeItems: (scope: Scope) => {
    append(item: ScopeChildItem & WithId): void;
    remove(itemId: Id): void;
    get(itemId: Id): ScopeChildItem | undefined;
    listIds(): string[];
};
//# sourceMappingURL=scopeItems.d.ts.map