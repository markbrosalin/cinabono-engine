import type { CatalogDocument } from "@gately/shared/infrastructure/ui-engine/model/catalog";
import type { UseCase, UseCaseResult } from "../../../model";
import { createUseCaseErrResult, createUseCaseOkResult } from "../../../model";
import type { CatalogUseCaseDeps } from "./types";

type CatalogExportCatalogResult = UseCaseResult<CatalogDocument>;

export type CatalogExportCatalogUseCase = UseCase<void, CatalogExportCatalogResult>;

export const createExportCatalogUseCase = ({
    io,
}: Pick<CatalogUseCaseDeps, "io">): CatalogExportCatalogUseCase => {
    return () => {
        const exportResult = io.exportDocument();

        if (!exportResult.ok || !exportResult.value) {
            return createUseCaseErrResult(exportResult.issues);
        }

        return createUseCaseOkResult(exportResult.value);
    };
};
