import { StructureBuilderResult } from "../../item-builder/types/StructureBuilder.js";
import { ItemFactory, ScopeFactory } from "@cnbn/modules-runtime";
import * as Schema from "@cnbn/schema";
export interface InnerItemsBuilderCtx {
    innerItems: Schema.InnerItemsMap;
    circuitScope: Schema.CircuitScope;
    path: Schema.HierarchyPath;
    remap: RemapState;
}
export type ItemBuilderResult<K extends Schema.KindKey = Schema.KindKey> = Omit<StructureBuilderResult, "linkIds"> & {
    linkIds: Schema.Id[];
    builtItem: Schema.ItemOfKind<K>;
};
export interface ItemBuilderDeps {
    getTemplate: Schema.Read<"template">;
    itemFactory: ItemFactory;
    scopeFactory: ScopeFactory;
}
export interface RemapState {
    itemIdMap: Map<Schema.Id, Schema.Id>;
    linkIdMap: Map<Schema.Id, Schema.Id>;
}
export type BuiltItemsMap = Map<Schema.Id, Schema.ItemOfKind>;
//# sourceMappingURL=ItemBuilder.d.ts.map