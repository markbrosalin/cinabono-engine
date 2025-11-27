import { StructureBuilder } from "./StructureBuilder.js";
import { uniqueId } from "@cnbn/utils";
export class DefaultTemplateBuilder {
    _deps;
    _strBuilder;
    constructor(_deps) {
        this._deps = _deps;
        this._strBuilder = new StructureBuilder(this._deps);
    }
    buildFromSelection(args) {
        const structure = this._strBuilder.buildStructure(args);
        return {
            hash: uniqueId(),
            kind: "circuit:logic",
            name: args.name,
            ...structure,
        };
    }
}
