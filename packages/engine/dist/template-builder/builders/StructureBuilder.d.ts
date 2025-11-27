import { StructureBuilderResult, TemplateBuilderDeps, StructureBuilderArgs } from "../types/index.js";
export declare class StructureBuilder {
    private readonly _deps;
    private readonly ioBuilder;
    private readonly itemsBuilder;
    constructor(_deps: TemplateBuilderDeps);
    buildStructure(args: StructureBuilderArgs): StructureBuilderResult;
}
//# sourceMappingURL=StructureBuilder.d.ts.map