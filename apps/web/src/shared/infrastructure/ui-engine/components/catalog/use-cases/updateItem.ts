import { createUseCaseErrResult, createUseCaseOkResult } from "../../../model";
import { catalogUseCaseIssues } from "./issues";
import type { CatalogUpdateItemUseCase, CatalogUseCaseDeps } from "./types";

export const createUpdateItemUseCase = ({
    query,
    state,
    validation,
}: Pick<CatalogUseCaseDeps, "query" | "state" | "validation">): CatalogUpdateItemUseCase => {
    return ({ item }) => {
        const validationResult = validation.validateItem(item);

        if (!validationResult.ok) {
            return createUseCaseErrResult(validationResult.issues);
        }

        if (!query.hasItem(item.ref)) {
            return createUseCaseErrResult(catalogUseCaseIssues.itemNotFound(["ref"], item.ref));
        }

        return createUseCaseOkResult(state.upsertItem(item));
    };
};
