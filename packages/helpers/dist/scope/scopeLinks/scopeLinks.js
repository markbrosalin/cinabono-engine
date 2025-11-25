import { scopeItems } from "../scopeItems";
import { cleanupEmptyMap, isEmptyValue } from "@cnbn/utils";
import { collectLinkIds, collectLinkIdsByType } from "./collectLinks";
import { buildLinkId } from "../../item";
const ensureItem = (scope, itemId) => {
    let item = scopeItems(scope).get(itemId);
    if (!item) {
        scopeItems(scope).append({ id: itemId });
        item = scopeItems(scope).get(itemId);
    }
    return item;
};
export const scopeLinks = (scope) => ({
    add(link) {
        const id = buildLinkId(link);
        const { fromItemId, fromPin, toItemId, toPin } = link;
        // Input link
        const toItem = ensureItem(scope, toItemId);
        (toItem.inputLinks ?? (toItem.inputLinks = {}))[toPin] = id;
        // Output link
        const fromItem = ensureItem(scope, fromItemId);
        const outputs = (fromItem.outputLinks ?? (fromItem.outputLinks = {}));
        (outputs[fromPin] ?? (outputs[fromPin] = [])).push(id);
    },
    remove(link) {
        const { fromItemId, fromPin, toItemId, toPin } = link;
        // Remove input link
        const toItem = scopeItems(scope).get(toItemId);
        if (toItem?.inputLinks && cleanupEmptyMap(toItem.inputLinks, toPin)) {
            delete toItem.inputLinks;
        }
        // Remove output link
        const fromItem = scopeItems(scope).get(fromItemId);
        if (fromItem?.outputLinks) {
            const links = fromItem.outputLinks[fromPin];
            const next = links.filter((l) => l !== buildLinkId(link));
            if (!isEmptyValue(next)) {
                fromItem.outputLinks[fromPin] = next;
            }
            else if (cleanupEmptyMap(fromItem.outputLinks, fromPin)) {
                delete fromItem.outputLinks;
            }
        }
    },
    listBy(itemId) {
        const item = scopeItems(scope).get(itemId);
        return item ? collectLinkIds(item) : [];
    },
    listInputsBy(itemId, pin) {
        const item = scopeItems(scope).get(itemId);
        if (!item)
            return { flat: [], byPin: [] };
        return collectLinkIdsByType(item, "inputLinks", pin);
    },
    listOutputsBy(itemId, pin) {
        const item = scopeItems(scope).get(itemId);
        if (!item)
            return { flat: [], byPin: [] };
        return collectLinkIdsByType(item, "outputLinks", pin);
    },
    listAll() {
        const result = new Set();
        for (const id of scopeItems(scope).listIds()) {
            for (const linkId of scopeLinks(scope).listBy(id)) {
                result.add(linkId);
            }
        }
        return Array.from(result);
    },
});
