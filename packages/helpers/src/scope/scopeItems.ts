import { Id, Scope, ScopeChildItem, WithId } from "@cnbn/schema";
import { pickNonEmpty } from "@cnbn/utils";

export const scopeItems = (scope: Scope) => ({
    append(item: ScopeChildItem & WithId) {
        const { id, inputLinks, outputLinks } = item;
        const filtered = pickNonEmpty({ inputLinks, outputLinks });
        scope.storedItems.set(id, filtered);
    },
    remove(itemId: Id) {
        scope.storedItems.delete(itemId);
    },
    get(itemId: Id) {
        return scope.storedItems.get(itemId);
    },
    listIds() {
        return Array.from(scope.storedItems.keys());
    },
});
