import { ItemBuilderDeps, ItemBuilderResult } from "../types/ItemBuilder";
import { KindKey, ItemArgsOfKind } from "@cnbn/schema";
export interface ItemBuilderContract {
    build<K extends KindKey>(args: ItemArgsOfKind<K>): ItemBuilderResult;
}
export declare class DefaultItemBuilder implements ItemBuilderContract {
    private readonly _structureBuilder;
    private readonly _remapService;
    constructor(deps: ItemBuilderDeps);
    build<K extends KindKey>(itemArgs: ItemArgsOfKind<K>): ItemBuilderResult;
    private _remapForCircuit;
}
//# sourceMappingURL=ItemBuilder.d.ts.map