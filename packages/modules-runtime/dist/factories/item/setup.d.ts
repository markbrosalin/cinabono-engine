import { KindKey, ItemArgsOfKind, ItemOfKind } from "@cnbn/schema";
import { ItemCreatorContract } from "./creator";
export interface ItemFactoryOverrides {
    makeItemCreator?: () => ItemCreatorContract;
}
export type ItemFactory = <K extends KindKey>(args: ItemArgsOfKind<K>) => ItemOfKind<K>;
export declare class ItemFactorySetup {
    static init(overrides?: ItemFactoryOverrides): ItemFactory;
}
//# sourceMappingURL=setup.d.ts.map