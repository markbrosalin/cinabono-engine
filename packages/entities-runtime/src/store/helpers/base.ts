import { toArray } from "@cnbn/utils";
import { Insertable, Removable } from "../contracts";

export const saveInStoreByKey = <K, V>(
    store: Insertable<K, V>,
    data: V[] | V,
    keySelector: (entity: V, i: number) => K
): void => {
    const items = toArray(data);
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const key = keySelector(item, i);
        store.insert(key, item);
    }
};

export function removeFromStore<K, V>(store: Removable<K, V>, keys: K[]): V[];
export function removeFromStore<K, V>(store: Removable<K, V>, key: K): V | undefined;
export function removeFromStore<K, V>(store: Removable<K, V>, keys: K | K[]) {
    const res: V[] = [];
    for (const key of toArray(keys)) {
        const removed = store.remove(key);
        if (removed) res.push(removed);
    }
    return Array.isArray(keys) ? res : res[0];
}
