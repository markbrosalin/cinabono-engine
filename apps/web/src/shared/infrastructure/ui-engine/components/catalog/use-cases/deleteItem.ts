import { createUseCaseErrResult, createUseCaseOkResult } from "../../../model";
import { catalogUseCaseIssues } from "./issues";
import type { CatalogDeleteItemUseCase, CatalogUseCaseDeps } from "./types";

export const createDeleteItemUseCase = ({
    query,
    state,
}: Pick<CatalogUseCaseDeps, "query" | "state">): CatalogDeleteItemUseCase => {
    return ({ ref }) => {
        const existingItem = query.getItem(ref);

        if (!existingItem) {
            return createUseCaseErrResult(catalogUseCaseIssues.itemNotFound(["ref"], ref));
        }

        const removedItem = state.removeItem(existingItem);

        if (!removedItem) {
            return createUseCaseErrResult(catalogUseCaseIssues.itemNotFound(["ref"], ref));
        }

        return createUseCaseOkResult(removedItem);
    };
};
