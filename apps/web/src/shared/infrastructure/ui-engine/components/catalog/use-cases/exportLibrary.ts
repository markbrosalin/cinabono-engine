import type { CatalogLibraryDocument } from "@gately/shared/infrastructure/ui-engine/model/catalog";
import type { CatalogExportLibraryOptions } from "../services";
import type { UseCase, UseCaseResult } from "../../../model";
import { createUseCaseErrResult, createUseCaseOkResult } from "../../../model";
import type { CatalogUseCaseDeps } from "./types";

type CatalogExportLibraryResult = UseCaseResult<CatalogLibraryDocument>;

export type CatalogExportLibraryUseCase = UseCase<
    CatalogExportLibraryOptions,
    CatalogExportLibraryResult
>;

export const createExportLibraryUseCase = ({
    io,
}: Pick<CatalogUseCaseDeps, "io">): CatalogExportLibraryUseCase => {
    return (input) => {
        const exportResult = io.exportLibrary(input);

        if (!exportResult.ok || !exportResult.value) {
            return createUseCaseErrResult(exportResult.issues);
        }

        return createUseCaseOkResult(exportResult.value);
    };
};
