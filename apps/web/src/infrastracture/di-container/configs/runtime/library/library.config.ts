import {
    LibraryStore,
    LibraryExportTool,
    LibraryImportTool,
    LibraryServiceContract,
} from "@gately/domain-model/modules/library";
import { LibraryService } from "@gately/domain-services/libraryService";
import { templatesMap } from "./templates";
import { DIConfig } from "@repo/di/types";
import { LibraryServiceToken } from "@gately/domain-model/shared/di-tokens/app/services";

export const libraryServiceConfig = {
    token: LibraryServiceToken,
    useFactory: () =>
        new LibraryService({
            store: new LibraryStore(templatesMap),
            tools: {
                IMPORT: new LibraryImportTool(),
                EXPORT: new LibraryExportTool(),
            },
        }),
} satisfies DIConfig<LibraryServiceContract>;
