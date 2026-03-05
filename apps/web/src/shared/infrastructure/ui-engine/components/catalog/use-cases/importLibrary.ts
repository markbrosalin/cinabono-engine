import type {
    CatalogImportLibraryUseCase,
    CatalogImportStrategy,
    CatalogUseCaseDeps,
} from "./types";
import { mergeLibraryDocuments } from "./helpers/mergeLibraryDocuments";
import { createUseCaseErrResult, createUseCaseOkResult } from "../../../model";

const DEFAULT_APPLY_STRATEGY: CatalogImportStrategy = "merge";

export const createImportLibraryUseCase = (
    deps: Pick<CatalogUseCaseDeps, "io" | "query" | "state">,
): CatalogImportLibraryUseCase => {
    return ({ library, strategy = DEFAULT_APPLY_STRATEGY }) => {
        const importResult = deps.io.importLibrary(library);
        if (!importResult.ok || !importResult.value) {
            return createUseCaseErrResult(importResult.issues);
        }

        const importedLibrary = importResult.value;
        const currentLibrary = deps.query.getLibrary(importedLibrary.manifest.id);
        const nextLibrary =
            strategy === "replace" || !currentLibrary
                ? importedLibrary
                : mergeLibraryDocuments(currentLibrary, importedLibrary);

        return createUseCaseOkResult(deps.state.upsertLibrary(nextLibrary));
    };
};
