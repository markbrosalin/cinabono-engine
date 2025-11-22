import { DefaultInMemoryLibraryStore } from "./core/in-memory-library";
import { defaultTemplatesMap } from "./core/in-memory-library";
import { TemplateLibraryContract } from "./contracts";
import { TemplateOfKind } from "@cnbn/schema/shared";

export type TemplateMap = Map<string, TemplateOfKind>;

export interface InMemoryLibraryStoreFactoryOverrides {
    initialTemplates?: TemplateMap;
    makeLibraryStore?: (templateMap: TemplateMap) => TemplateLibraryContract;
}

export class InMemoryLibraryStoreSetup {
    static init(overrides?: InMemoryLibraryStoreFactoryOverrides) {
        const templateMap = overrides?.initialTemplates ?? defaultTemplatesMap;
        const libraryStore =
            overrides?.makeLibraryStore?.(templateMap) ??
            new DefaultInMemoryLibraryStore(templateMap);

        return libraryStore;
    }
}
