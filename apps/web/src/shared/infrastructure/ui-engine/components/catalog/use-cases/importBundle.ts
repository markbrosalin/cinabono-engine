import type {
    CatalogBundleDocument,
    CatalogLibraryDocument,
} from "@gately/shared/infrastructure/ui-engine/model/catalog";
import type { UseCase, UseCaseResult } from "../../../model";
import { createUseCaseErrResult, createUseCaseOkResult } from "../../../model";
import { createImportLibraryUseCase } from "./importLibrary";
import type { CatalogImportStrategy, CatalogUseCaseDeps } from "./types";

type CatalogImportBundleInput = {
    bundle: CatalogBundleDocument;
    strategy?: CatalogImportStrategy;
};

type CatalogImportBundleResult = UseCaseResult<CatalogLibraryDocument[]>;

export type CatalogImportBundleUseCase = UseCase<
    CatalogImportBundleInput,
    CatalogImportBundleResult
>;

export const createImportBundleUseCase = ({
    io,
    query,
    state,
}: Pick<CatalogUseCaseDeps, "io" | "query" | "state">): CatalogImportBundleUseCase => {
    const importLibrary = createImportLibraryUseCase({ io, query, state });

    return ({ bundle, strategy }) => {
        const importResult = io.importBundle(bundle);

        if (!importResult.ok || !importResult.value) {
            return createUseCaseErrResult(importResult.issues);
        }

        const importedLibraries: CatalogLibraryDocument[] = [];

        for (const library of importResult.value.libraries) {
            const result = importLibrary({
                library: {
                    formatVersion: importResult.value.formatVersion,
                    manifest: library.manifest,
                    items: library.items,
                    ...(library.extensions !== undefined ? { extensions: library.extensions } : {}),
                },
                strategy,
            });

            if (!result.ok || !result.value) {
                return createUseCaseErrResult(result.issues);
            }

            importedLibraries.push(result.value);
        }

        return createUseCaseOkResult(importedLibraries);
    };
};
