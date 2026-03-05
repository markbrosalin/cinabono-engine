import { createUseCaseErrResult, createUseCaseOkResult } from "../../../model";
import { createCatalogDocument } from "../helpers/createCatalogDocument";
import type { CatalogInitCatalogUseCase, CatalogUseCaseDeps } from "./types";

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
