import type { CatalogLibraryDocument } from "@gately/shared/infrastructure/ui-engine/model/catalog";
import type { UseCase, UseCaseResult } from "../../../model";
import { createUseCaseErrResult, createUseCaseOkResult } from "../../../model";
import { createCatalogItemRefKey } from "../helpers/createItemRefKey";
import { catalogUseCaseIssues } from "./issues";
import type { CatalogUseCaseDeps } from "./types";

type CatalogDeleteLibraryInput = {
    libraryId: string;
};

type CatalogDeleteLibraryResult = UseCaseResult<CatalogLibraryDocument>;

export type CatalogDeleteLibraryUseCase = UseCase<
    CatalogDeleteLibraryInput,
    CatalogDeleteLibraryResult
>;

export const createDeleteLibraryUseCase = ({
    query,
    state,
}: Pick<CatalogUseCaseDeps, "query" | "state">): CatalogDeleteLibraryUseCase => {
    return ({ libraryId }) => {
        const library = query.getLibrary(libraryId);
        if (!library) {
            return createUseCaseErrResult(
                catalogUseCaseIssues.libraryNotFound(["libraryId"], libraryId),
            );
        }

        const externalDependentItems = new Map<string, typeof library.items[number]>();

        library.items.forEach((item) => {
            query.getDependentItems(item.ref).forEach((dependentItem) => {
                if (dependentItem.ref.libraryId === libraryId) {
                    return;
                }

                externalDependentItems.set(
                    createCatalogItemRefKey(dependentItem.ref),
                    dependentItem,
                );
            });
        });

        const externalDependentItem = [...externalDependentItems.values()][0];
        if (externalDependentItem) {
            return createUseCaseErrResult(
                catalogUseCaseIssues.libraryHasDependents(
                    ["libraryId"],
                    libraryId,
                    externalDependentItem.ref,
                ),
            );
        }

        const removedLibrary = state.removeLibrary(libraryId);

        if (!removedLibrary) {
            return createUseCaseErrResult(
                catalogUseCaseIssues.libraryNotFound(["libraryId"], libraryId),
            );
        }

        return createUseCaseOkResult(removedLibrary);
    };
};
