import { StructureBuilder } from "./StructureBuilder";
import { CircuitIOBinder } from "./CircuitIOBuilder";
import { RemapService } from "./RemapService";
import { ItemBuilderDeps, ItemBuilderResult, RemapState } from "../types/ItemBuilder";
import { processMany } from "@cnbn/utils";
import { KindKey, ItemArgsOfKind, isCircuitArgs, isCircuitItem } from "@cnbn/schema";
import { exportBuilderResult } from "../helpers";
import { StructureBuilderResult } from "../types/StructureBuilder";

export interface ItemBuilderContract {
    build<K extends KindKey>(args: ItemArgsOfKind<K>): ItemBuilderResult;
}

export class DefaultItemBuilder implements ItemBuilderContract {
    private readonly _structureBuilder: StructureBuilder;
    private readonly _remapService: RemapService;

    constructor(deps: ItemBuilderDeps) {
        this._remapService = new RemapService();
        this._structureBuilder = new StructureBuilder(deps, this._remapService);
    }

    public build<K extends KindKey>(itemArgs: ItemArgsOfKind<K>): ItemBuilderResult {
        const remap = this._remapService.createRemap();
        const result = this._structureBuilder.build(itemArgs, remap);

        if (isCircuitArgs(itemArgs)) this._remapForCircuit(result, remap);

        return exportBuilderResult(result);
    }

    private _remapForCircuit(result: StructureBuilderResult, remap: RemapState) {
        const builtItems = this._structureBuilder.getBuiltItems();
        const binder = new CircuitIOBinder(builtItems);

        processMany(result.items, (item) => {
            if (!isCircuitItem(item)) return;
            this._remapService.remapCircuitInOutPins(item, remap);
            binder.bind(item);
        });
    }
}
