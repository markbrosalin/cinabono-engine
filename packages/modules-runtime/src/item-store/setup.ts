import { DefaultItemStore, ItemStoreContract } from "./store";
import { Id, Item } from "@cnbn/schema";

export type ItemMap = Map<Id, Item>;

export interface ItemStoreFactoryOverrides {
    initialItems?: ItemMap;
    makeItemStore?: (itemMap?: ItemMap) => ItemStoreContract;
}

export class ItemStoreSetup {
    static init(overrides: ItemStoreFactoryOverrides = {}): ItemStoreContract {
        const itemMap = overrides.initialItems ?? new Map();
        const itemStore = overrides.makeItemStore?.(itemMap) ?? new DefaultItemStore(itemMap);
        return itemStore;
    }
}
