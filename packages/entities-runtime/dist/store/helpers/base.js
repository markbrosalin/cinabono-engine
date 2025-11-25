import { toArray } from "@cnbn/utils";
export const saveInStoreByKey = (store, data, keySelector) => {
    const items = toArray(data);
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const key = keySelector(item, i);
        store.insert(key, item);
    }
};
export function removeFromStore(store, keys) {
    const res = [];
    for (const key of toArray(keys)) {
        const removed = store.remove(key);
        if (removed)
            res.push(removed);
    }
    return Array.isArray(keys) ? res : res[0];
}
