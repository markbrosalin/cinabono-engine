import { TemplateBuilderArgs, TemplateBuilderDeps, TemplateBuilderResult } from "../types";
export interface TemplateBuilderContract {
    buildFromSelection(args: TemplateBuilderArgs): TemplateBuilderResult;
}
export declare class DefaultTemplateBuilder implements TemplateBuilderContract {
    private readonly _deps;
    private readonly _strBuilder;
    constructor(_deps: TemplateBuilderDeps);
    buildFromSelection(args: TemplateBuilderArgs): TemplateBuilderResult;
}
//# sourceMappingURL=TemplateBuilder.d.ts.map