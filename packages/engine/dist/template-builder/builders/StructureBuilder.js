import { E } from "../../errors";
import { IOBuilder } from "./IOBuilder";
import { InnerItemsBuilder } from "./InnerItemsBuilder";
export class StructureBuilder {
    _deps;
    ioBuilder;
    itemsBuilder;
    constructor(_deps) {
        this._deps = _deps;
        this.ioBuilder = new IOBuilder(_deps);
        this.itemsBuilder = new InnerItemsBuilder(_deps);
    }
    buildStructure(args) {
        const scope = this._deps.getScope(args.scopeId);
        if (!scope)
            throw E.scope.NotFound(args.scopeId);
        const inputPins = this.ioBuilder.buildInputPins(args.inputIds, scope);
        const outputPins = this.ioBuilder.buildOutputPins(args.outputIds, scope);
        const items = {};
        for (const id of args.logicIds) {
            items[id] = this.itemsBuilder.buildInnerItem(id, scope);
        }
        // здесь позже будут toggles and lamps для создания изолированной схемы
        return {
            inputPins,
            outputPins,
            items,
        };
    }
}
