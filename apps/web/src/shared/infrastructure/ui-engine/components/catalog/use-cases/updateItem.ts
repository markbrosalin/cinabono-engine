import type { CatalogItem } from "@gately/shared/infrastructure/ui-engine/model/catalog";
import type { UseCase, UseCaseResult } from "../../../model";
import { createUseCaseErrResult, createUseCaseOkResult } from "../../../model";
import { catalogUseCaseIssues } from "./issues";
import type { CatalogUseCaseDeps } from "./types";

type CatalogUpdateItemInput = {
    item: CatalogItem;
};

type CatalogUpdateItemResult = UseCaseResult<CatalogItem>;

export type CatalogUpdateItemUseCase = UseCase<CatalogUpdateItemInput, CatalogUpdateItemResult>;

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
