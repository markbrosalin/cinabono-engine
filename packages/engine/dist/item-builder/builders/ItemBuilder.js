import { StructureBuilder } from "./StructureBuilder.js";
import { CircuitIOBinder } from "./CircuitIOBuilder.js";
import { RemapService } from "./RemapService.js";
import { processMany } from "@cnbn/utils";
import { isCircuitArgs, isCircuitItem } from "@cnbn/schema";
import { exportBuilderResult } from "../helpers.js";
export class DefaultItemBuilder {
    _structureBuilder;
    _remapService;
    constructor(deps) {
        this._remapService = new RemapService();
        this._structureBuilder = new StructureBuilder(deps, this._remapService);
    }
    build(itemArgs) {
        const remap = this._remapService.createRemap();
        const result = this._structureBuilder.build(itemArgs, remap);
        if (isCircuitArgs(itemArgs))
            this._remapForCircuit(result, remap);
        return exportBuilderResult(result);
    }
    _remapForCircuit(result, remap) {
        const builtItems = this._structureBuilder.getBuiltItems();
        const binder = new CircuitIOBinder(builtItems);
        processMany(result.items, (item) => {
            if (!isCircuitItem(item))
                return;
            this._remapService.remapCircuitInOutPins(item, remap);
            binder.bind(item);
        });
    }
}
