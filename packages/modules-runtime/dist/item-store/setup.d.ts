import { ItemStoreContract } from "./store";
import { Id, Item } from "@cnbn/schema";
export type ItemMap = Map<Id, Item>;
export interface ItemStoreFactoryOverrides {
    initialItems?: ItemMap;
    makeItemStore?: (itemMap?: ItemMap) => ItemStoreContract;
}
export declare class ItemStoreSetup {
    static init(overrides?: ItemStoreFactoryOverrides): ItemStoreContract;
}
//# sourceMappingURL=setup.d.ts.map