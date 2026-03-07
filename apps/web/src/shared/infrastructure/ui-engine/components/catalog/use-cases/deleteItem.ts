import type { CatalogItem, CatalogItemRef } from "@gately/shared/infrastructure/ui-engine/model/catalog";
import type { UseCase, UseCaseResult } from "../../../model";
import { createUseCaseErrResult, createUseCaseOkResult } from "../../../model";
import { catalogUseCaseIssues } from "./issues";
import type { CatalogUseCaseDeps } from "./types";

type CatalogDeleteItemInput = {
    ref: CatalogItemRef;
};

type CatalogDeleteItemResult = UseCaseResult<CatalogItem>;

export type CatalogDeleteItemUseCase = UseCase<CatalogDeleteItemInput, CatalogDeleteItemResult>;

export const createDeleteItemUseCase = ({
    query,
    state,
}: Pick<CatalogUseCaseDeps, "query" | "state">): CatalogDeleteItemUseCase => {
    return ({ ref }) => {
        const existingItem = query.getItem(ref);

        if (!existingItem) {
            return createUseCaseErrResult(catalogUseCaseIssues.itemNotFound(["ref"], ref));
        }

        const dependentItem = query.getDependentItems(ref)[0];
        if (dependentItem) {
            return createUseCaseErrResult(
                catalogUseCaseIssues.itemHasDependents(["ref"], ref, dependentItem.ref),
            );
        }

        const removedItem = state.removeItem(existingItem);

        if (!removedItem) {
            return createUseCaseErrResult(catalogUseCaseIssues.itemNotFound(["ref"], ref));
        }

        return createUseCaseOkResult(removedItem);
    };
};
