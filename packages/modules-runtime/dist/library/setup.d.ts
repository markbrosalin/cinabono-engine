import { TemplateLibraryContract } from "./contracts.js";
import { TemplateOfKind } from "@cnbn/schema/shared";
export type TemplateMap = Map<string, TemplateOfKind>;
export interface InMemoryLibraryStoreFactoryOverrides {
    initialTemplates?: TemplateMap;
    makeLibraryStore?: (templateMap: TemplateMap) => TemplateLibraryContract;
}
export declare class InMemoryLibraryStoreSetup {
    static init(overrides?: InMemoryLibraryStoreFactoryOverrides): TemplateLibraryContract;
}
//# sourceMappingURL=setup.d.ts.map