import { TemplateBuilderArgs, TemplateBuilderDeps, TemplateBuilderResult } from "../types";
import { StructureBuilder } from "./StructureBuilder";
import { uniqueId } from "@cnbn/utils";

export interface TemplateBuilderContract {
    buildFromSelection(args: TemplateBuilderArgs): TemplateBuilderResult;
}

export class DefaultTemplateBuilder implements TemplateBuilderContract {
    private readonly _strBuilder: StructureBuilder;

    constructor(private readonly _deps: TemplateBuilderDeps) {
        this._strBuilder = new StructureBuilder(this._deps);
    }

    public buildFromSelection(args: TemplateBuilderArgs): TemplateBuilderResult {
        const structure = this._strBuilder.buildStructure(args);

        return {
            hash: uniqueId(),
            kind: "circuit:logic",
            name: args.name,
            ...structure,
        };
    }
}
