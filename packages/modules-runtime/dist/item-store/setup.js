import { DefaultItemStore } from "./store.js";
export class ItemStoreSetup {
    static init(overrides = {}) {
        const itemMap = overrides.initialItems ?? new Map();
        const itemStore = overrides.makeItemStore?.(itemMap) ?? new DefaultItemStore(itemMap);
        return itemStore;
    }
}
