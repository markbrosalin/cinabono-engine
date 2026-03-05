import { createUseCaseErrResult, createUseCaseOkResult } from "../../../model";
import { catalogUseCaseIssues } from "./issues";
import type { CatalogCreateLibraryUseCase, CatalogUseCaseDeps } from "./types";

export const createLibraryUseCase = ({
    factory,
    query,
    state,
    validation,
}: Pick<CatalogUseCaseDeps, "factory" | "query" | "state" | "validation">): CatalogCreateLibraryUseCase => {
    return (input) => {
        const library = factory.createLibrary(input);
        const validationResult = validation.validateLibrary(library);

        if (!validationResult.ok) {
            return createUseCaseErrResult(validationResult.issues);
        }

        if (query.hasLibrary(library.manifest.id)) {
            return createUseCaseErrResult(
                catalogUseCaseIssues.libraryAlreadyExists(["manifest", "id"], library.manifest.id),
            );
        }

        return createUseCaseOkResult(state.upsertLibrary(library));
    };
};
