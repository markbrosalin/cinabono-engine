import * as Schema from "@cnbn/schema";
import { BuiltItemsMap, ItemBuilderDeps, RemapState } from "../types/ItemBuilder.js";
import { RemapService } from "./RemapService.js";
import { StructureBuilderResult } from "../types/StructureBuilder.js";
export declare class StructureBuilder {
    private readonly _getTpl;
    private readonly _mkItem;
    private readonly _mkScope;
    private readonly _remap;
    private readonly _builtItems;
    constructor(deps: ItemBuilderDeps, remapService: RemapService);
    getBuiltItems(): BuiltItemsMap;
    build<K extends Schema.KindKey>(args: Schema.ItemArgsOfKind<K>, remap?: RemapState): StructureBuilderResult;
    private _buildBase;
    private _buildCircuit;
    private _buildChildren;
    private _getItemArgsOfInnerItem;
}
//# sourceMappingURL=StructureBuilder.d.ts.map