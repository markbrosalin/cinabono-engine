import { createUseCaseErrResult, createUseCaseOkResult } from "../../../model";
import { catalogUseCaseIssues } from "./issues";
import type { CatalogCreateItemUseCase, CatalogUseCaseDeps } from "./types";

export const createItemUseCase = ({
    factory,
    query,
    state,
    validation,
}: Pick<CatalogUseCaseDeps, "factory" | "query" | "state" | "validation">): CatalogCreateItemUseCase => {
    return (input) => {
        const item = factory.createItem(input);
        const validationResult = validation.validateItem(item);

        if (!validationResult.ok) {
            return createUseCaseErrResult(validationResult.issues);
        }

        if (!query.hasLibrary(item.ref.libraryId)) {
            return createUseCaseErrResult(
                catalogUseCaseIssues.libraryNotFound(["ref", "libraryId"], item.ref.libraryId),
            );
        }

        if (query.hasItem(item.ref)) {
            return createUseCaseErrResult(catalogUseCaseIssues.itemAlreadyExists(["ref"], item.ref));
        }

        return createUseCaseOkResult(state.upsertItem(item));
    };
};
