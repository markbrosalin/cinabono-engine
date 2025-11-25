import { pickNonEmpty } from "@cnbn/utils";
export const scopeItems = (scope) => ({
    append(item) {
        const { id, inputLinks, outputLinks } = item;
        const filtered = pickNonEmpty({ inputLinks, outputLinks });
        scope.storedItems.set(id, filtered);
    },
    remove(itemId) {
        scope.storedItems.delete(itemId);
    },
    get(itemId) {
        return scope.storedItems.get(itemId);
    },
    listIds() {
        return Array.from(scope.storedItems.keys());
    },
});
