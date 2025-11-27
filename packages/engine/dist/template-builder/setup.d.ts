import { TemplateBuilderContract } from "./builders/index.js";
import { TemplateBuilderArgs, TemplateBuilderDeps, TemplateBuilderResult } from "./types/index.js";
export interface TemplateBuilderFactoryOverride {
    makeTempBuilder?: (deps: TemplateBuilderDeps) => TemplateBuilderContract;
}
export type TemplateBuilderFactory = (deps: TemplateBuilderDeps, args: TemplateBuilderArgs) => TemplateBuilderResult;
export declare class TemplateBuilderSetup {
    static init(override?: TemplateBuilderFactoryOverride): TemplateBuilderFactory;
}
//# sourceMappingURL=setup.d.ts.map