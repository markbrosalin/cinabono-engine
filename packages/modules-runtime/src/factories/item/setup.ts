import { KindKey, ItemArgsOfKind, ItemOfKind } from "@cnbn/schema";
import { DefaultItemCreator, ItemCreatorContract } from "./creator";

export interface ItemFactoryOverrides {
    makeItemCreator?: () => ItemCreatorContract;
}

export type ItemFactory = <K extends KindKey>(args: ItemArgsOfKind<K>) => ItemOfKind<K>;

export class ItemFactorySetup {
    static init(overrides: ItemFactoryOverrides = {}): ItemFactory {
        const creator = overrides.makeItemCreator?.() ?? new DefaultItemCreator();
        return (args) => creator.create(args);
    }
}
