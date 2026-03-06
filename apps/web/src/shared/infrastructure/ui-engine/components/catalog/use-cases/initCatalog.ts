import type { CatalogDocument } from "@gately/shared/infrastructure/ui-engine/model/catalog";
import type { UseCaseResult } from "../../../model";
import { createUseCaseErrResult, createUseCaseOkResult } from "../../../model";
import { createCatalogDocument } from "../helpers/createCatalogDocument";
import type { CatalogUseCaseDeps } from "./types";

type CatalogInitCatalogInput = {
    document?: CatalogDocument;
};

type CatalogInitCatalogResult = UseCaseResult<CatalogDocument>;

export type CatalogInitCatalogUseCase = (input?: CatalogInitCatalogInput) => CatalogInitCatalogResult;

export const createInitCatalogUseCase = ({
    io,
    state,
}: Pick<CatalogUseCaseDeps, "io" | "state">): CatalogInitCatalogUseCase => {
    return ({ document } = {}) => {
        const nextDocument = document ?? createCatalogDocument();
        const importResult = io.importDocument(nextDocument);

        if (!importResult.ok || !importResult.value) {
            return createUseCaseErrResult(importResult.issues);
        }

        state.replaceDocument(importResult.value);

        return createUseCaseOkResult(importResult.value);
    };
};
