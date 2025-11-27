import { DefaultInMemoryLibraryStore } from "./core/in-memory-library/index.js";
import { defaultTemplatesMap } from "./core/in-memory-library/index.js";
export class InMemoryLibraryStoreSetup {
    static init(overrides) {
        const templateMap = overrides?.initialTemplates ?? defaultTemplatesMap;
        const libraryStore = overrides?.makeLibraryStore?.(templateMap) ??
            new DefaultInMemoryLibraryStore(templateMap);
        return libraryStore;
    }
}
