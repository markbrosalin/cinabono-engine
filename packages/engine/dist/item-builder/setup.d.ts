import { ItemArgsOfKind, KindKey } from "@cnbn/schema";
import { ItemBuilderContract } from "./builders";
import { ItemBuilderDeps, ItemBuilderResult } from "./types/ItemBuilder";
export interface ItemBuilderFactoryOverride {
    makeItemBuilder?: (deps: ItemBuilderDeps) => ItemBuilderContract;
}
export type ItemBuilderFactory = <K extends KindKey>(args: ItemArgsOfKind<K>) => ItemBuilderResult;
export declare class ItemBuilderSetup {
    static init(deps: ItemBuilderDeps, override?: ItemBuilderFactoryOverride): ItemBuilderFactory;
}
//# sourceMappingURL=setup.d.ts.map