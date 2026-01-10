import { E } from "@engine/errors";
import { StructureBuilderResult, TemplateBuilderDeps, StructureBuilderArgs } from "../types";
import { IOBuilder } from "./IOBuilder";
import { InnerItemsMap } from "@cnbn/schema";
import { InnerItemsBuilder } from "./InnerItemsBuilder";

export class StructureBuilder {
    private readonly ioBuilder: IOBuilder;
    private readonly itemsBuilder: InnerItemsBuilder;

    constructor(private readonly _deps: TemplateBuilderDeps) {
        this.ioBuilder = new IOBuilder(_deps);
        this.itemsBuilder = new InnerItemsBuilder(_deps);
    }

    public buildStructure(args: StructureBuilderArgs): StructureBuilderResult {
        const scope = this._deps.getScope(args.scopeId);

        if (!scope) throw E.scope.NotFound(args.scopeId);

        const inputPins = this.ioBuilder.buildInputPins(args.inputIds, scope);
        const outputPins = this.ioBuilder.buildOutputPins(args.outputIds, scope);

        const items: InnerItemsMap = {};
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
