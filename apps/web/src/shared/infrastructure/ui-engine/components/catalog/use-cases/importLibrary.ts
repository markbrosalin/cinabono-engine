import type { CatalogLibraryDocument } from "@gately/shared/infrastructure/ui-engine/model/catalog";
import type { UseCase, UseCaseResult } from "../../../model";
import { createUseCaseErrResult, createUseCaseOkResult } from "../../../model";
import { mergeLibraryDocuments } from "./helpers/mergeLibraryDocuments";
import type { CatalogImportStrategy, CatalogUseCaseDeps } from "./types";

type CatalogImportLibraryInput = {
    library: CatalogLibraryDocument;
    strategy?: CatalogImportStrategy;
};

type CatalogImportLibraryResult = UseCaseResult<CatalogLibraryDocument>;

export type CatalogImportLibraryUseCase = UseCase<
    CatalogImportLibraryInput,
    CatalogImportLibraryResult
>;

const DEFAULT_APPLY_STRATEGY: CatalogImportStrategy = "merge";

export const createImportLibraryUseCase = ({
    io,
    query,
    state,
}: Pick<CatalogUseCaseDeps, "io" | "query" | "state">): CatalogImportLibraryUseCase => {
    return ({ library, strategy = DEFAULT_APPLY_STRATEGY }) => {
        const importResult = io.importLibrary(library);
        if (!importResult.ok || !importResult.value) {
            return createUseCaseErrResult(importResult.issues);
        }

        const importedLibrary = importResult.value;
        const currentLibrary = query.getLibrary(importedLibrary.manifest.id);
        const nextLibrary =
            strategy === "replace" || !currentLibrary
                ? importedLibrary
                : mergeLibraryDocuments(currentLibrary, importedLibrary);

        return createUseCaseOkResult(state.upsertLibrary(nextLibrary));
    };
};
