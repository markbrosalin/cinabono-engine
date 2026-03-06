import type { CatalogLibraryDocument } from "@gately/shared/infrastructure/ui-engine/model/catalog";
import type { UseCase, UseCaseResult } from "../../../model";
import { createUseCaseErrResult, createUseCaseOkResult } from "../../../model";
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
    state,
}: Pick<CatalogUseCaseDeps, "state">): CatalogDeleteLibraryUseCase => {
    return ({ libraryId }) => {
        const removedLibrary = state.removeLibrary(libraryId);

        if (!removedLibrary) {
            return createUseCaseErrResult(
                catalogUseCaseIssues.libraryNotFound(["libraryId"], libraryId),
            );
        }

        return createUseCaseOkResult(removedLibrary);
    };
};
