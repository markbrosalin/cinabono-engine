import type { CatalogBundleDocument } from "@gately/shared/infrastructure/ui-engine/model/catalog";
import type { CatalogExportBundleOptions } from "../services";
import type { UseCase, UseCaseResult } from "../../../model";
import { createUseCaseErrResult, createUseCaseOkResult } from "../../../model";
import type { CatalogUseCaseDeps } from "./types";

type CatalogExportBundleResult = UseCaseResult<CatalogBundleDocument>;

export type CatalogExportBundleUseCase = UseCase<
    CatalogExportBundleOptions,
    CatalogExportBundleResult
>;

export const createExportBundleUseCase = ({
    io,
}: Pick<CatalogUseCaseDeps, "io">): CatalogExportBundleUseCase => {
    return (input) => {
        const exportResult = io.exportBundle(input);

        if (!exportResult.ok || !exportResult.value) {
            return createUseCaseErrResult(exportResult.issues);
        }

        return createUseCaseOkResult(exportResult.value);
    };
};
