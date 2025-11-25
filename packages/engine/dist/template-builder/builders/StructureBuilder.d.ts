import { StructureBuilderResult, TemplateBuilderDeps, StructureBuilderArgs } from "../types";
export declare class StructureBuilder {
    private readonly _deps;
    private readonly ioBuilder;
    private readonly itemsBuilder;
    constructor(_deps: TemplateBuilderDeps);
    buildStructure(args: StructureBuilderArgs): StructureBuilderResult;
}
//# sourceMappingURL=StructureBuilder.d.ts.map