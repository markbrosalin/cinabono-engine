import type { CatalogLibraryDocument } from "@gately/shared/infrastructure/ui-engine/model/catalog";
import type { CatalogCreateLibraryInput } from "../services";
import type { UseCase, UseCaseResult } from "../../../model";
import { createUseCaseErrResult, createUseCaseOkResult } from "../../../model";
import { catalogUseCaseIssues } from "./issues";
import type { CatalogUseCaseDeps } from "./types";

type CatalogCreateLibraryResult = UseCaseResult<CatalogLibraryDocument>;

export type CatalogCreateLibraryUseCase = UseCase<
    CatalogCreateLibraryInput,
    CatalogCreateLibraryResult
>;

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
